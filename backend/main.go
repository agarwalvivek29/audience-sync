// package main

// import  (
//     "gofr.dev/pkg/gofr";
// 	// "utils/database";
// 	// "utils/config"
// )

// func main() {
//     // initialise gofr object
//     app := gofr.New()

// 	// var databaseconfig = config.DBConfig

//     // register route greet
//     app.GET("/", func(ctx *gofr.Context) (interface{}, error) {
//         return "Hello"
//     })

//     // Runs the server, it will listen on the default port 8000.
//     // it can be over-ridden through configs
//    app.Run()
// }



// package main

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"

// 	_ "github.com/lib/pq"
// )

// // Struct to hold the database names
// type Database struct {
// 	Name string `json:"datname"`
// }

// func getDatabases(w http.ResponseWriter, r *http.Request) {
// 	// Connect to the PostgreSQL server (without specifying a database)
// 	connStr := "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=postgres"
// 	db, err := sql.Open("postgres", connStr)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	defer db.Close()

//     //check ki audienceSync database hai ki nahi

//     targetDB:="audienceSync"

//     var exists bool
//     err = db.QueryRow("SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1)", targetDB).Scan(&exists)
//     if err !=nil{
//         log.Fatalf("Error checking if database exists: %v", err)
//     }
//     if !exists{
//         _, err = db.Exec("CREATE DATABASE " + targetDB)
//         if err !=nil{
//             log.Fatalf("Failed to create Database: %v", err)
//         }
//         fmt.Printf("Database '%s' created successfully.\n", targetDB)
//     }
//     else {
// 		fmt.Printf("Database '%s' already exists.\n", targetDB)
// 	}

//     // Connect to 'audienceSync' database
// 	audienceSyncConnStr := fmt.Sprintf("host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 user=username password=QnSsviHA9e7g dbname=%s sslmode=require", targetDB)
//     audienceSyncDB, err := sql.Open("postgres", audienceSyncConnStr)
//     if err != nil {
//        log.Fatalf("Failed to connect to 'audienceSync' database: %v", err)
//     }
//     defer audienceSyncDB.Close()

//     // Create 'schema' table
// 	createTableQuery := `
//     CREATE TABLE IF NOT EXISTS schema (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         field JSONB NOT NULL
//     );`
//      _, err = audienceSyncDB.Exec(createTableQuery)
//      if err != nil {
//          log.Fatalf("Failed to create 'schema' table: %v", err)
//      }
//      fmt.Println("Table 'schema' created or already exists.")
//      databaseName := targetDB
//      fields := map[string]string{
// 		"attribute1": "VARCHAR",
// 		"attribute2": "INTEGER",
// 	}
// 	fieldsJSON, _ := json.Marshal(fields)

// 	insertQuery := `
// 		INSERT INTO schema (name, field)
// 		VALUES ($1, $2)
// 		ON CONFLICT DO NOTHING; -- Optional to avoid duplicate entries
// 	`
// 	_, err = audienceSyncDB.Exec(insertQuery, databaseName, fieldsJSON)
// 	if err != nil {
// 		log.Fatalf("Failed to insert record into 'schema' table: %v", err)
// 	}
//     fmt.Println("Record inserted into 'schema' table.")
// }

// 	// Query to get all non-template databases
// 	rows, err := db.Query("SELECT datname FROM pg_database WHERE datistemplate = false;")
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	var databases []Database
// 	for rows.Next() {
// 		var dbName string
// 		if err := rows.Scan(&dbName); err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}
// 		databases = append(databases, Database{Name: dbName})
// 	}

// 	// Convert result to JSON and send as response
// 	w.Header().Set("Content-Type", "application/json")
// 	if err := json.NewEncoder(w).Encode(databases); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// }

// func main() {
// 	http.HandleFunc("/databases", getDatabases)

// 	port := ":5000"
// 	fmt.Printf("Server running on http://localhost%s\n", port)
// 	log.Fatal(http.ListenAndServe(port, nil))
// }



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

// // Check and create the audienceSync database and schema table
// func setupAudienceSync(db *sql.DB) error {
// 	targetDB := "audienceSync"

// 	// Check if the database exists
// 	var exists bool
// 	err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1)", targetDB).Scan(&exists)
// 	if err != nil {
// 		return fmt.Errorf("error checking database existence: %v", err)
// 	}

// 	// Create database if not exists
// 	if !exists {
// 		_, err = db.Exec("CREATE DATABASE " + targetDB)
// 		if err != nil {
// 			return fmt.Errorf("failed to create database: %v", err)
// 		}
// 		fmt.Printf("Database '%s' created successfully.\n", targetDB)
// 	} else {
// 		fmt.Printf("Database '%s' already exists.\n", targetDB)
// 	}

// 	// Connect to the target database
// 	audienceSyncConnStr := fmt.Sprintf("host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 user=username password=QnSsviHA9e7g dbname=%s sslmode=require", targetDB)
// 	audienceSyncDB, err := sql.Open("postgres", audienceSyncConnStr)
// 	if err != nil {
// 		return fmt.Errorf("failed to connect to 'audienceSync' database: %v", err)
// 	}
// 	defer audienceSyncDB.Close()

// 	// Create the schema table
// 	createTableQuery := `
//     CREATE TABLE IF NOT EXISTS schema (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) UNIQUE NOT NULL,
//         field JSONB NOT NULL
//     );`
// 	_, err = audienceSyncDB.Exec(createTableQuery)
// 	if err != nil {
// 		return fmt.Errorf("failed to create 'schema' table: %v", err)
// 	}
// 	fmt.Println("Table 'schema' created or already exists.")

// 	// Insert example data into the schema table
// 	fields := map[string]string{
// 		"attribute1": "VARCHAR",
// 		"attribute2": "INTEGER",
// 	}
// 	fieldsJSON, _ := json.Marshal(fields)

// 	insertQuery := `
// 		INSERT INTO schema (name, field)
// 		VALUES ($1, $2)
// 		ON CONFLICT (name) DO NOTHING;
// 	`
// 	_, err = audienceSyncDB.Exec(insertQuery, targetDB, fieldsJSON)
// 	if err != nil {
// 		return fmt.Errorf("failed to insert record into 'schema' table: %v", err)
// 	}
// 	fmt.Println("Record inserted into 'schema' table.")
// 	return nil
// }

// // Handler to list all databases
// func getDatabases(w http.ResponseWriter, r *http.Request) {
// 	connStr := "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=postgres"
// 	db, err := sql.Open("postgres", connStr)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	defer db.Close()

// 	// Check and set up the audienceSync database
// 	if err := setupAudienceSync(db); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// Query all non-template databases
// 	rows, err := db.Query("SELECT datname FROM pg_database WHERE datistemplate = false;")
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	defer rows.Close()

// 	var databases []Database
// 	for rows.Next() {
// 		var dbName string
// 		if err := rows.Scan(&dbName); err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}
// 		databases = append(databases, Database{Name: dbName})
// 	}

// 	// Convert result to JSON and send as response
// 	w.Header().Set("Content-Type", "application/json")
// 	if err := json.NewEncoder(w).Encode(databases); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// }

// func main() {
// 	http.HandleFunc("/databases", getDatabases)

// 	port := ":5000"
// 	fmt.Printf("Server running on http://localhost%s\n", port)
// 	log.Fatal(http.ListenAndServe(port, nil))
// }


package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

type Database struct {
	Name string `json:"datname"`
}

type SchemaRecord struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Field string `json:"field"`
}

// Check and create the audienceSync database and schema table
func setupAudienceSync(db *sql.DB) ([]SchemaRecord, error) {
	targetDB := "audienceSync"

	// Check if the database exists
	var exists int;
	err := db.QueryRow("SELECT CASE WHEN EXISTS (SELECT 1 FROM pg_database WHERE datname = $1 ) THEN 1 ELSE 0 END", targetDB).Scan(&exists)
	if err != nil {
		return nil, fmt.Errorf("error checking database existence: %v", err)
	}
    fmt.Println("Exists: %v",exists);
	// Create database if not exists
	if exists != 1 {
		_, err = db.Exec("CREATE DATABASE " + targetDB)
		if err != nil {
			return nil, fmt.Errorf("failed to create database: %v", err)
		}
		fmt.Printf("Database '%s' created successfully.\n", targetDB)
	} else {
		fmt.Printf("Database '%s' already exists.\n", targetDB)
	}
	// If database is newly created, create the schema table
	if exists != 1 {
		createTableQuery := `
		CREATE TABLE IF NOT EXISTS schema (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100) UNIQUE NOT NULL,
			field JSONB NOT NULL
		);`
		_, err = audienceSyncDB.Exec(createTableQuery)
		if err != nil {
			return nil, fmt.Errorf("failed to create 'schema' table: %v", err)
		}
		fmt.Println("Table 'schema' created or already exists.")

		// Insert example data into the schema table
		fields := map[string]string{
			"attribute1": "VARCHAR",
			"attribute2": "INTEGER",
		}
		fieldsJSON, _ := json.Marshal(fields)

		insertQuery := `
			INSERT INTO schema (name, field)
			VALUES ($1, $2)
			ON CONFLICT (name) DO NOTHING;
		`
		_, err = audienceSyncDB.Exec(insertQuery, targetDB, fieldsJSON)
		if err != nil {
			return nil, fmt.Errorf("failed to insert record into 'schema' table: %v", err)
		}
		fmt.Println("Record inserted into 'schema' table.")
	}

	// // Query and return all records from the schema table
	var records []SchemaRecord
	// rows, err := audienceSyncDB.Query("SELECT id, name, field FROM schema;")
	// if err != nil {
	// 	return nil, fmt.Errorf("failed to query schema table: %v", err)
	// }
	// defer rows.Close()

	// for rows.Next() {
	// 	var record SchemaRecord
	// 	if err := rows.Scan(&record.ID, &record.Name, &record.Field); err != nil {
	// 		return nil, fmt.Errorf("failed to scan row: %v", err)
	// 	}
	// 	records = append(records, record)
	// }

	return records, nil
}

// Handler to list all databases and show schema table content for audienceSync
func getDatabases(w http.ResponseWriter, r *http.Request) {
	connStr := "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=postgres"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	// Check and set up the audienceSync database and get schema table content
	records, err := setupAudienceSync(db)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If schema table records are found, return them as JSON
	if len(records) > 0 {
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(records); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		// If no records in schema table, show that the table is empty
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("The schema table is empty."))
	}
}

func main() {
	http.HandleFunc("/databases", getDatabases)

	port := ":5000"
	fmt.Printf("Server running on http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
