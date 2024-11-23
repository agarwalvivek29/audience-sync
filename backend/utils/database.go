package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
	// PostgreSQL connection string
	dsn := "postgresql://username:QnSsviHA9e7g@ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech/sih1708?sslmode=require"

	// Open a connection to the database
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		log.Fatalf("Failed to open database connection: %v", err)
	}
	defer db.Close()

	// Ping the database to ensure the connection is valid
	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	fmt.Println("Connected to the database!")

	// Query example
	query := "SELECT id, message FROM syslog LIMIT 5"
	rows, err := db.Query(query)
	if err != nil {
		log.Fatalf("Failed to execute query: %v", err)
	}
	defer rows.Close()

	// Process rows
	for rows.Next() {
		var id int
		var message string
		if err := rows.Scan(&id, &message); err != nil {
			log.Fatalf("Failed to scan row: %v", err)
		}
		fmt.Printf("ID: %d, message: %s\n", id, message)
	}

	// Check for errors encountered during iteration
	if err := rows.Err(); err != nil {
		log.Fatalf("Error iterating rows: %v", err)
	}
}

// package database

// import (
// 	"context"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"github.com/jackc/pgx/v4",
// 	"utils/config"
// )

// // QueryResult holds the query result as a slice of maps (for JSON output).
// type QueryResult []map[string]interface{}

// // ExecuteQuery runs a query on the database and returns the result in JSON format.
// func ExecuteQuery(config config.DBConfig, query string) ([]byte, error) {
// 	// Create the connection string
// 	connStr := fmt.Sprintf("postgres://%s:%s@%s:%d/%s", config.User, config.Password, config.Host, config.Port, config.DBName)

// 	// Parse the config
// 	connConfig, err := pgx.ParseConfig(connStr)
// 	if err != nil {
// 		log.Fatalf("Unable to parse connection config: %v", err)
// 		return nil, err
// 	}

// 	// Create a connection pool
// 	pool, err := pgx.NewPool(connConfig, 10) // 10 max connections in 
// }