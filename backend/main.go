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



package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

// Struct to hold the database names
type Database struct {
	Name string `json:"datname"`
}

func getDatabases(w http.ResponseWriter, r *http.Request) {
	// Connect to the PostgreSQL server (without specifying a database)
	connStr := "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=postgres"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	// Query to get all non-template databases
	rows, err := db.Query("SELECT datname FROM pg_database WHERE datistemplate = false;")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var databases []Database
	for rows.Next() {
		var dbName string
		if err := rows.Scan(&dbName); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		databases = append(databases, Database{Name: dbName})
	}

	// Convert result to JSON and send as response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(databases); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func main() {
	http.HandleFunc("/databases", getDatabases)

	port := ":5000"
	fmt.Printf("Server running on http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
