// package main

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"

// 	_ "github.com/lib/pq"
// )

// type Database struct {
// 	Name string `json:"datname"`
// }

// type SchemaRecord struct {
// 	ID    int    `json:"id"`
// 	Name  string `json:"name"`
// 	Field string `json:"field"`
// }

// // Check and create the audienceSync database and schema table
// func setupAudienceSync(db *sql.DB) ([]SchemaRecord, error) {
// 	targetDB := "audienceSync"

// 	// Check if the database exists
// 	var exists int;
// 	err := db.QueryRow("SELECT CASE WHEN EXISTS (SELECT 1 FROM pg_database WHERE datname = $1 ) THEN 1 ELSE 0 END", targetDB).Scan(&exists)
// 	if err != nil {
// 		return nil, fmt.Errorf("error checking database existence: %v", err)
// 	}
//     fmt.Println("Exists: %v",exists);
// 	// Create database if not exists
// 	if exists != 1 {
// 		_, err = db.Exec("CREATE DATABASE " + targetDB)
// 		if err != nil {
// 			return nil, fmt.Errorf("failed to create database: %v", err)
// 		}
// 		fmt.Printf("Database '%s' created successfully.\n", targetDB)
// 	} else {
// 		fmt.Printf("Database '%s' already exists.\n", targetDB)
// 	}
// 	// If database is newly created, create the schema table
// 	 // Open a new connection to the target database
//      audienceSyncDB, err := sql.Open("postgres", "your_connection_string_with_audienceSync_database")
//      if err != nil {
//          return nil, fmt.Errorf("failed to connect to audienceSync database: %v", err)
//      }
//      defer audienceSyncDB.Close()
 
//      // Create the schema table
//      createTableQuery := `
//          CREATE TABLE IF NOT EXISTS schema (
//              id SERIAL PRIMARY KEY,
//              name VARCHAR(100) UNIQUE NOT NULL,
//              field JSONB NOT NULL
//          );`
//      _, err = audienceSyncDB.Exec(createTableQuery)
//      if err != nil {
//          return nil, fmt.Errorf("failed to create 'schema' table: %v", err)
//      }
//      fmt.Println("Table 'schema' created or already exists.")
 
//      // Insert example data into the schema table
//      fields := map[string]string{
//          "attribute1": "VARCHAR",
//          "attribute2": "INTEGER",
//      }
//      fieldsJSON, _ := json.Marshal(fields)
 
//      insertQuery := `
//          INSERT INTO schema (name, field)
//          VALUES ($1, $2)
//          ON CONFLICT (name) DO NOTHING;
//      `
//      _, err = audienceSyncDB.Exec(insertQuery, targetDB, fieldsJSON)
//      if err != nil {
//          return nil, fmt.Errorf("failed to insert record into 'schema' table: %v", err)
//      }
//      fmt.Println("Record inserted into 'schema' table.")
 
//      // Query and return all records from the schema table
//      var records []SchemaRecord
//      rows, err := audienceSyncDB.Query("SELECT id, name, field FROM schema;")
//      if err != nil {
//          return nil, fmt.Errorf("failed to query schema table: %v", err)
//      }
//      defer rows.Close()
 
//      for rows.Next() {
//          var record SchemaRecord
//          if err := rows.Scan(&record.ID, &record.Name, &record.Field); err != nil {
//              return nil, fmt.Errorf("failed to scan row: %v", err)
//          }
//          records = append(records, record)
//      }
 
//      return records, nil
//  }
// // Handler to list all databases and show schema table content for audienceSync
// func getDatabases(w http.ResponseWriter, r *http.Request) {
// 	connStr := "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=postgres"
// 	db, err := sql.Open("postgres", connStr)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	defer db.Close()

// 	// Check and set up the audienceSync database and get schema table content
// 	records, err := setupAudienceSync(db)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// If schema table records are found, return them as JSON
// 	if len(records) > 0 {
// 		w.Header().Set("Content-Type", "application/json")
// 		if err := json.NewEncoder(w).Encode(records); err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}
// 	} else {
// 		// If no records in schema table, show that the table is empty
// 		w.WriteHeader(http.StatusOK)
// 		w.Write([]byte("The schema table is empty."))
// 	}
// }

// func main() {
// 	http.HandleFunc("/databases", getDatabases)

// 	port := ":5000"
// 	fmt.Printf("Server running on http://localhost%s\n", port)
// 	log.Fatal(http.ListenAndServe(port, nil))
// }




// //good code

// package main

// import (
// 	"context"
// 	"encoding/json"
// 	"fmt"
// 	"github.com/gorilla/mux"
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// 	"log"
// 	"net/http"
// 	"time"
// )

// // MongoDB client and database
// var client *mongo.Client

// func main() {
// 	// Initialize MongoDB connection
// 	var err error
// 	client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb+srv://newuser:plsfuckingwork@vivekdb.hu2xj.mongodb.net/audiencesync"))
// 	if err != nil {
// 		log.Fatalf("Failed to connect to MongoDB: %v", err)
// 	}
// 	defer func() {
// 		if err = client.Disconnect(context.TODO()); err != nil {
// 			log.Fatalf("Failed to disconnect MongoDB: %v", err)
// 		}
// 	}()

// 	// Create a new router
// 	r := mux.NewRouter()

// 	// Define routes
// 	r.HandleFunc("/post/{collection}", postHandler).Methods("POST")
// 	r.HandleFunc("/get/{collection}/{field}/{value}", getHandler).Methods("GET")

// 	// Start the server
// 	log.Println("Server running on :8080")
// 	log.Fatal(http.ListenAndServe(":8080", r))
// }

// // postHandler adds a document to the specified MongoDB collection
// func postHandler(w http.ResponseWriter, r *http.Request) {
// 	collectionName := mux.Vars(r)["collection"]
// 	collection := client.Database("mydb").Collection(collectionName)

// 	// Decode JSON body into a map
// 	var document map[string]interface{}
// 	if err := json.NewDecoder(r.Body).Decode(&document); err != nil {
// 		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
// 		return
// 	}
// 	defer r.Body.Close()

// 	// Insert the document into the collection
// 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// 	defer cancel()

// 	_, err := collection.InsertOne(ctx, document)
// 	if err != nil {
// 		http.Error(w, "Failed to insert document", http.StatusInternalServerError)
// 		return
// 	}

// 	w.WriteHeader(http.StatusCreated)
// 	fmt.Fprintf(w, "Document added to collection '%s'\n", collectionName)
// }

// // getHandler retrieves documents based on a field and value
// func getHandler(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	collectionName := vars["collection"]
// 	field := vars["field"]
// 	value := vars["value"]

// 	collection := client.Database("mydb").Collection(collectionName)

// 	// Build the query
// 	filter := bson.M{field: value}

// 	// Execute the query
// 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// 	defer cancel()

// 	cursor, err := collection.Find(ctx, filter)
// 	if err != nil {
// 		http.Error(w, "Failed to query documents", http.StatusInternalServerError)
// 		return
// 	}
// 	defer cursor.Close(ctx)

// 	// Parse the results
// 	var results []bson.M
// 	if err = cursor.All(ctx, &results); err != nil {
// 		http.Error(w, "Failed to parse documents", http.StatusInternalServerError)
// 		return
// 	}

// 	if len(results) == 0 {
// 		http.Error(w, "No matching documents found", http.StatusNotFound)
// 		return
// 	}

// 	// Return the results as JSON
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(results)
// }


// package main

// import (
// 	"context"
// 	"database/sql"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"

// 	"github.com/gorilla/mux"
// 	_ "github.com/lib/pq"
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// )

// // MongoDB client and collection
// var mongoClient *mongo.Client
// var credentialsCollection *mongo.Collection

// func main() {
// 	var err error

// 	// MongoDB connection string
// 	mongoURI := "mongodb+srv://newuser:plsfuckingwork@vivekdb.hu2xj.mongodb.net/audiencesync"

// 	// Connect to MongoDB
// 	mongoClient, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
// 	if err != nil {
// 		log.Fatalf("Failed to connect to MongoDB: %v", err)
// 	}
// 	defer func() {
// 		if err := mongoClient.Disconnect(context.TODO()); err != nil {
// 			log.Fatalf("Failed to disconnect MongoDB: %v", err)
// 		}
// 	}()

// 	// Set credentials collection in MongoDB
// 	credentialsCollection = mongoClient.Database("masterdb").Collection("users_credentials")

// 	// Create a router and define routes
// 	r := mux.NewRouter()
// 	r.HandleFunc("/query/{userid}", queryHandler).Methods("POST")

// 	// Start the HTTP server
// 	log.Println("Server running on :8080")
// 	log.Fatal(http.ListenAndServe(":8080", r))
// }

// // UserCredentials represents a user's PostgreSQL database credentials
// type UserCredentials struct {
// 	UserID   string `bson:"userid"`
// 	Host     string `bson:"host"`
// 	Port     string `bson:"port"`
// 	Database string `bson:"database"`
// 	Username string `bson:"username"`
// 	Password string `bson:"password"`
// }

// // queryHandler handles the dynamic SQL query execution
// func queryHandler(w http.ResponseWriter, r *http.Request) {
// 	// Extract userid from route parameters
// 	vars := mux.Vars(r)
// 	userID := vars["userid"]

// 	// Fetch PostgreSQL credentials for the user from MongoDB
// 	userCreds, err := getUserCredentials(userID)
// 	if err != nil {
// 		http.Error(w, fmt.Sprintf("Failed to get user credentials: %v", err), http.StatusInternalServerError)
// 		return
// 	}

// 	// Decode SQL query from request body
// 	var query struct {
// 		SQL string `json:"sql"`
// 	}
// 	if err := json.NewDecoder(r.Body).Decode(&query); err != nil {
// 		http.Error(w, "Invalid request body", http.StatusBadRequest)
// 		return
// 	}
// 	defer r.Body.Close()

// 	// Connect to the user's PostgreSQL database
// 	userDB, err := connectToUserDatabase(userCreds)
// 	if err != nil {
// 		http.Error(w, fmt.Sprintf("Failed to connect to user's database: %v", err), http.StatusInternalServerError)
// 		return
// 	}
// 	defer userDB.Close()

// 	// Execute the SQL query
// 	rows, err := userDB.Query(query.SQL)
// 	if err != nil {
// 		http.Error(w, fmt.Sprintf("Failed to execute query: %v", err), http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	// Parse the query results into a JSON response
// 	results, err := parseRows(rows)
// 	if err != nil {
// 		http.Error(w, fmt.Sprintf("Failed to parse query results: %v", err), http.StatusInternalServerError)
// 		return
// 	}

// 	// Send the results as a JSON response
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(results)
// }

// // getUserCredentials fetches PostgreSQL credentials for the given user from MongoDB
// func getUserCredentials(userID string) (*UserCredentials, error) {
// 	var creds UserCredentials
// 	filter := bson.M{"userid": userID}

// 	err := credentialsCollection.FindOne(context.TODO(), filter).Decode(&creds)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &creds, nil
// }

// // connectToUserDatabase establishes a connection to the user's PostgreSQL database
// func connectToUserDatabase(creds *UserCredentials) (*sql.DB, error) {
// 	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=require",
// 		creds.Host, creds.Port, creds.Username, creds.Password, creds.Database)
// 	return sql.Open("postgres", connStr)
// }

// // parseRows converts SQL query results into a slice of maps
// func parseRows(rows *sql.Rows) ([]map[string]interface{}, error) {
// 	columns, err := rows.Columns()
// 	if err != nil {
// 		return nil, err
// 	}

// 	results := []map[string]interface{}{}
// 	for rows.Next() {
// 		values := make([]interface{}, len(columns))
// 		valuePtrs := make([]interface{}, len(columns))

// 		for i := range values {
// 			valuePtrs[i] = &values[i]
// 		}

// 		if err := rows.Scan(valuePtrs...); err != nil {
// 			return nil, err
// 		}

// 		rowMap := map[string]interface{}{}
// 		for i, col := range columns {
// 			val := values[i]
// 			b, ok := val.([]byte)
// 			if ok {
// 				rowMap[col] = string(b)
// 			} else {
// 				rowMap[col] = val
// 			}
// 		}
// 		results = append(results, rowMap)
// 	}
// 	return results, nil
// }




package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

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

	// Start the HTTP server
	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
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
