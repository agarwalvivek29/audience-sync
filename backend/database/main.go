package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoDB client and collections
var mongoClient *mongo.Client
var credentialsCollection *mongo.Collection

func main() {
	var err error

	// MongoDB connection string
	mongoURI := "mongodb+srv://newuser:plsfuckingwork@vivekdb.hu2xj.mongodb.net/audiencesync"

	// Connect to MongoDB
	mongoClient, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer func() {
		if err := mongoClient.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Failed to disconnect MongoDB: %v", err)
		}
	}()

	// Set collections
	credentialsCollection = mongoClient.Database("mydb").Collection("users")

	// Create a router and define routes
	r := mux.NewRouter()
	r.HandleFunc("/post/{collection}", postHandler).Methods("POST")
	r.HandleFunc("/get/{collection}/{field}/{value}", getHandler).Methods("GET")
	r.HandleFunc("/query/{userid}", queryHandler).Methods("POST")

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),           // Allow all origins
		handlers.AllowedMethods([]string{"GET", "POST"}), // Allow specific methods
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)
	// Start the HTTP server
	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", corsHandler(r)))
}

// UserCredentials represents a user's PostgreSQL database credentials
type UserCredentials struct {
	UserID string `bson:"userid"`
	DB     struct {
		Host     string `bson:"host"`
		Port     string `bson:"port"`
		Database string `bson:"database"`
		Username string `bson:"username"`
		Password string `bson:"password"`
	} `bson:"db"`
}

// postHandler adds a document to the specified MongoDB collection
func postHandler(w http.ResponseWriter, r *http.Request) {
	collectionName := mux.Vars(r)["collection"]
	collection := mongoClient.Database("mydb").Collection(collectionName)

	var document map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&document); err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, document)
	if err != nil {
		http.Error(w, "Failed to insert document", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Document added to collection '%s'\n", collectionName)
}

// getHandler retrieves documents based on a field and value
func getHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	collectionName := vars["collection"]
	field := vars["field"]
	value := vars["value"]

	collection := mongoClient.Database("mydb").Collection(collectionName)
	filter := bson.M{field: value}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		http.Error(w, "Failed to query documents", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var results []bson.M
	if err = cursor.All(ctx, &results); err != nil {
		http.Error(w, "Failed to parse documents", http.StatusInternalServerError)
		return
	}

	if len(results) == 0 {
		http.Error(w, "No matching documents found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

// queryHandler handles the dynamic SQL query execution
func queryHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID := vars["userid"]

	userCreds, err := getUserCredentials(userID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get user credentials: %v", err), http.StatusInternalServerError)
		return
	}

	var query struct {
		SQL string `json:"sql"`
	}
	if err := json.NewDecoder(r.Body).Decode(&query); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	userDB, err := connectToUserDatabase(userCreds)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to connect to user's database: %v", err), http.StatusInternalServerError)
		return
	}
	defer userDB.Close()

	rows, err := userDB.Query(query.SQL)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to execute query: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	results, err := parseRows(rows)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to parse query results: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

// getUserCredentials fetches PostgreSQL credentials for the given user from MongoDB
func getUserCredentials(userID string) (*UserCredentials, error) {
	var creds UserCredentials
	filter := bson.M{"userid": userID}

	err := credentialsCollection.FindOne(context.TODO(), filter).Decode(&creds)
	if err != nil {
		return nil, err
	}
	return &creds, nil
}

// connectToUserDatabase establishes a connection to the user's PostgreSQL database
func connectToUserDatabase(creds *UserCredentials) (*sql.DB, error) {
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=require",
		creds.DB.Host, creds.DB.Port, creds.DB.Username, creds.DB.Password, creds.DB.Database)
	return sql.Open("postgres", connStr)
}

// parseRows converts SQL query results into a slice of maps
func parseRows(rows *sql.Rows) ([]map[string]interface{}, error) {
	columns, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	results := []map[string]interface{}{}
	for rows.Next() {
		values := make([]interface{}, len(columns))
		valuePtrs := make([]interface{}, len(columns))

		for i := range values {
			valuePtrs[i] = &values[i]
		}

		if err := rows.Scan(valuePtrs...); err != nil {
			return nil, err
		}

		rowMap := map[string]interface{}{}
		for i, col := range columns {
			val := values[i]
			b, ok := val.([]byte)
			if ok {
				rowMap[col] = string(b)
			} else {
				rowMap[col] = val
			}
		}
		results = append(results, rowMap)
	}
	return results, nil
}
