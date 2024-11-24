// // // package main

// // // import (
// // // 	"database/sql"
// // // 	"encoding/json"
// // // 	"fmt"
// // // 	"log"
// // // 	"net/http"

// // // 	_ "github.com/lib/pq"
// // // )

// // // type Database struct {
// // // 	Name string `json:"datname"`
// // // }

// // // type SchemaRecord struct {
// // // 	ID    int    `json:"id"`
// // // 	Name  string `json:"name"`
// // // 	Field string `json:"field"`
// // // }

// // // // Check and create the audienceSync database and schema table
// // // func setupAudienceSync(db *sql.DB) ([]SchemaRecord, error) {
// // // 	targetDB := "audiencesync"

// // // 	// Check if the database exists
// // // 	var exists int
// // // 	err := db.QueryRow("SELECT CASE WHEN EXISTS (SELECT 1 FROM pg_database WHERE datname = 'audiencesync' ) THEN 1 ELSE 0 END").Scan(&exists)
// // // 	if err != nil {
// // // 		return nil, fmt.Errorf("error checking database existence: %v", err)
// // // 	}
// // // 	fmt.Println("Exists: %v", exists)
// // // 	// Create database if not exists
// // // 	if exists != 1 {
// // // 		_, err = db.Exec("CREATE DATABASE " + targetDB)
// // // 		if err != nil {
// // // 			return nil, fmt.Errorf("failed to create database: %v", err)
// // // 		}
// // // 		fmt.Printf("Database '%s' created successfully.\n", targetDB)
// // // 	} else {
// // // 		fmt.Printf("Database '%s' already exists.\n", targetDB)
// // // 	}
// // // 	// If database is newly created, create the schema table
// // // 	var records []SchemaRecord

// // // 	if exists != 1 {
// // // 		createTableQuery := `
// // // 		CREATE TABLE IF NOT EXISTS schema (
// // // 			id SERIAL PRIMARY KEY,
// // // 			name TEXT UNIQUE NOT NULL,
// // // 			field TEXT NOT NULL
// // // 		);`
// // // 		fmt.Println("Creating 'schema' table...")
// // // 		audienceSyncDB, err := sql.Open("postgres", "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=audiencesync")
// // // 		_, err = audienceSyncDB.Exec(createTableQuery)
// // // 		if err != nil {
// // // 			return nil, fmt.Errorf("failed to create 'schema' table: %v", err)
// // // 		}
// // // 		fmt.Println("Table 'schema' created or already exists.")

// // // 		// Insert example data into the schema table
// // // 		fields := map[string]string{
// // // 			"attribute1": "VARCHAR",
// // // 			"attribute2": "INTEGER",
// // // 		}
// // // 		fieldsJSON, _ := json.Marshal(fields)

// // // 		insertQuery := `
// // // 			INSERT INTO schema (name, field)
// // // 			VALUES ($1, $2)
// // // 			ON CONFLICT (name) DO NOTHING;
// // // 		`
// // // 		_, err = audienceSyncDB.Exec(insertQuery, targetDB, fieldsJSON)
// // // 		if err != nil {
// // // 			return nil, fmt.Errorf("failed to insert record into 'schema' table: %v", err)
// // // 		}
// // // 		fmt.Println("Record inserted into 'schema' table.")

// // // 		rows, err := audienceSyncDB.Query("SELECT id, name, field FROM schema;")
// // // 		if err != nil {
// // // 			return nil, fmt.Errorf("failed to query schema table: %v", err)
// // // 		}
// // // 		defer rows.Close()

// // // 		for rows.Next() {
// // // 			var record SchemaRecord
// // // 			if err := rows.Scan(&record.ID, &record.Name, &record.Field); err != nil {
// // // 				return nil, fmt.Errorf("failed to scan row: %v", err)
// // // 			}
// // // 			records = append(records, record)
// // // 		}

// // // 		return records, nil

// // // 	}
// // // 	return records, nil
// // // }

// // // // Handler to list all databases and show schema table content for audienceSync
// // // func getDatabases(w http.ResponseWriter, r *http.Request) {
// // // 	connStr := "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=postgres"
// // // 	db, err := sql.Open("postgres", connStr)
// // // 	if err != nil {
// // // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // // 		return
// // // 	}
// // // 	defer db.Close()

// // // 	// Check and set up the audienceSync database and get schema table content
// // // 	records, err := setupAudienceSync(db)
// // // 	if err != nil {
// // // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // // 		return
// // // 	}

// // // 	// If schema table records are found, return them as JSON
// // // 	if len(records) > 0 {
// // // 		w.Header().Set("Content-Type", "application/json")
// // // 		if err := json.NewEncoder(w).Encode(records); err != nil {
// // // 			http.Error(w, err.Error(), http.StatusInternalServerError)
// // // 			return
// // // 		}
// // // 	} else {
// // // 		// If no records in schema table, show that the table is empty
// // // 		w.WriteHeader(http.StatusOK)
// // // 		w.Write([]byte("The schema table is empty."))
// // // 	}
// // // }

// // // func main() {
// // // 	http.HandleFunc("/databases", getDatabases)

// // // 	port := ":5000"
// // // 	fmt.Printf("Server running on http://localhost%s\n", port)
// // // 	log.Fatal(http.ListenAndServe(port, nil))
// // // }

// // package main

// // import (
// // 	"database/sql"
// // 	"encoding/json"
// // 	"fmt"
// // 	"log"
// // 	"net/http"

// // 	_ "github.com/lib/pq"
// // )

// // type SchemaRecord struct {
// // 	TableName string          `json:"table_name"`
// // 	Fields    json.RawMessage `json:"fields"`
// // }

// // // Connect to a database
// // func connectDB(connectionString string) (*sql.DB, error) {
// // 	db, err := sql.Open("postgres", connectionString)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("failed to connect to database: %v", err)
// // 	}
// // 	return db, nil
// // }

// // // Check if a database exists
// // func databaseExists(db *sql.DB, dbName string) (bool, error) {
// // 	var exists bool
// // 	query := fmt.Sprintf("SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = '%s')", dbName)
// // 	err := db.QueryRow(query).Scan(&exists)
// // 	if err != nil {
// // 		return false, fmt.Errorf("error checking database existence: %v", err)
// // 	}
// // 	fmt.Println("Exists Database: %v", exists)
// // 	return exists, nil
// // }

// // // Create a new database
// // func createDatabase(db *sql.DB, dbName string) error {
// // 	_, err := db.Exec("CREATE DATABASE " + dbName)
// // 	if err != nil {
// // 		return fmt.Errorf("failed to create database: %v", err)
// // 	}
// // 	return nil
// // }

// // // Create the schema table if it doesn't exist
// // func createSchemaTable(db *sql.DB) error {
// // 	createTableQuery := `
// // 		CREATE TABLE IF NOT EXISTS schema (
// // 			table_name TEXT PRIMARY KEY,
// // 			fields JSONB NOT NULL
// // 		);`
// // 	_, err := db.Exec(createTableQuery)
// // 	if err != nil {
// // 		return fmt.Errorf("failed to create 'schema' table: %v", err)
// // 	}
// // 	return nil
// // }

// // // Populate the schema table with table names and their fields
// // func populateSchemaTable(db *sql.DB) error {
// // 	tablesQuery := `
// // 		SELECT
// // 		table_name,
// // 		column_name
// // 		FROM
// // 		information_schema.columns
// // 		WHERE
// // 		table_schema = 'public';
// // 	`

// // 	relationsQuery := `
// // 		-- query to get the relationship b/w different tables
// // 		-- This query shows the relationships between tables based on foreign key constraints.
// // 		-- It does not include relationships based on data values or other implicit connections.

// // 		SELECT
// // 		'FK_' || t1.relname || '_' || t2.relname AS relationship_name,
// // 		t1.relname AS table1,
// // 		t2.relname AS table2,
// // 		a.attname AS column1,
// // 		b.attname AS column2
// // 		FROM
// // 		pg_constraint AS c
// // 		JOIN
// // 		pg_class AS t1
// // 		ON
// // 		c.conrelid = t1.oid
// // 		JOIN
// // 		pg_class AS t2
// // 		ON
// // 		c.confrelid = t2.oid
// // 		JOIN
// // 		pg_attribute AS a
// // 		ON
// // 		c.conkey[1] = a.attnum
// // 		AND a.attrelid = t1.oid
// // 		JOIN
// // 		pg_attribute AS b
// // 		ON
// // 		c.confkey[1] = b.attnum
// // 		AND b.attrelid = t2.oid
// // 		WHERE
// // 		c.contype = 'f';
// // 	`

// // 	rows, err := db.Query(tablesQuery)
// // 	if err != nil {
// // 		return fmt.Errorf("failed to query table names: %v", err)
// // 	}
// // 	defer rows.Close()

// // 	for rows.Next() {
// // 		var tableName string
// // 		if err := rows.Scan(&tableName); err != nil {
// // 			return fmt.Errorf("failed to scan table name: %v", err)
// // 		}

// // 		fieldsQuery := fmt.Sprintf(`
// // 			SELECT column_name, data_type
// // 			FROM information_schema.columns
// // 			WHERE table_name = '%s';`, tableName)

// // 		fieldRows, err := db.Query(fieldsQuery)
// // 		if err != nil {
// // 			return fmt.Errorf("failed to query fields for table '%s': %v", tableName, err)
// // 		}
// // 		defer fieldRows.Close()

// // 		fields := make(map[string]string)
// // 		for fieldRows.Next() {
// // 			var columnName, dataType string
// // 			if err := fieldRows.Scan(&columnName, &dataType); err != nil {
// // 				return fmt.Errorf("failed to scan field details: %v", err)
// // 			}
// // 			fields[columnName] = dataType
// // 		}

// // 		fieldsJSON, _ := json.Marshal(fields)

// // 		insertQuery := `
// // 			INSERT INTO schema (table_name, fields)
// // 			VALUES ($1, $2)
// // 			ON CONFLICT (table_name) DO NOTHING;
// // 		`
// // 		_, err = db.Exec(insertQuery, tableName, fieldsJSON)
// // 		if err != nil {
// // 			return fmt.Errorf("failed to insert into 'schema' table: %v", err)
// // 		}
// // 	}
// // 	return nil
// // }

// // // Retrieve all schema records
// // func getSchemaRecords(db *sql.DB) ([]SchemaRecord, error) {
// // 	query := "SELECT table_name, fields FROM schema;"
// // 	rows, err := db.Query(query)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("failed to query schema records: %v", err)
// // 	}
// // 	defer rows.Close()

// // 	var records []SchemaRecord
// // 	for rows.Next() {
// // 		var record SchemaRecord
// // 		if err := rows.Scan(&record.TableName, &record.Fields); err != nil {
// // 			return nil, fmt.Errorf("failed to scan schema record: %v", err)
// // 		}
// // 		records = append(records, record)
// // 	}
// // 	return records, nil
// // }

// // // Main handler function
// // func getDatabases(w http.ResponseWriter, r *http.Request) {
// // 	connStr := "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=postgres"
// // 	db, err := connectDB(connStr)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}
// // 	defer db.Close()

// // 	dbName := "audiencesync"
// // 	exists, err := databaseExists(db, dbName)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	if !exists {
// // 		err = createDatabase(db, dbName)
// // 		if err != nil {
// // 			http.Error(w, err.Error(), http.StatusInternalServerError)
// // 			return
// // 		}
// // 		fmt.Printf("Database '%s' created successfully.\n", dbName)
// // 	} else {
// // 		fmt.Printf("Database '%s' already exists.\n", dbName)
// // 	}

// // 	audienceSyncConnStr := fmt.Sprintf("user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=%s", dbName)
// // 	audienceSyncDB, err := connectDB(audienceSyncConnStr)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}
// // 	defer audienceSyncDB.Close()

// // 	err = createSchemaTable(audienceSyncDB)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	err = populateSchemaTable(audienceSyncDB)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	records, err := getSchemaRecords(audienceSyncDB)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	w.Header().Set("Content-Type", "application/json")
// // 	json.NewEncoder(w).Encode(records)
// // }

// // func main() {
// // 	http.HandleFunc("/databases", getDatabases)

// // 	port := ":5000"
// // 	fmt.Printf("Server running on http://localhost%s\n", port)
// // 	log.Fatal(http.ListenAndServe(port, nil))
// // }

// package main

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"

// 	_ "github.com/lib/pq"
// )

// type SchemaRecord struct {
// 	userId    string `json:"userId"`
// 	data      string `json:"data"`
// 	tableName string `json:"tableName"`
// }

// const (
// 	connStr        = "user=username password=QnSsviHA9e7g host=ep-ancient-queen-a1nkd2pi.ap-southeast-1.aws.neon.tech port=5432 sslmode=require dbname=postgres"
// 	targetDB       = "audiencesync"
// 	schemaTable    = "schema"
// 	schemaTableDDL = `
// 		CREATE TABLE IF NOT EXISTS schema (
// 			id SERIAL PRIMARY KEY,
// 			name TEXT UNIQUE NOT NULL,
// 			field JSONB NOT NULL
// 		);
// 	`
// )

// // Setup database connection
// func connectDB(connectionString string) (*sql.DB, error) {
// 	db, err := sql.Open("postgres", connectionString)
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to connect to database: %v", err)
// 	}
// 	return db, nil
// }

// // Ensure the `audiencesync` database exists
// func ensureDatabaseExists(db *sql.DB) error {
// 	var exists int
// 	err := db.QueryRow("SELECT 1 FROM pg_database WHERE datname = $1", targetDB).Scan(&exists)
// 	if err == sql.ErrNoRows {
// 		_, err = db.Exec("CREATE DATABASE " + targetDB)
// 		if err != nil {
// 			return fmt.Errorf("failed to create database '%s': %v", targetDB, err)
// 		}
// 		fmt.Printf("Database '%s' created successfully.\n", targetDB)
// 	} else if err != nil {
// 		return fmt.Errorf("failed to check database existence: %v", err)
// 	} else {
// 		fmt.Printf("Database '%s' already exists.\n", targetDB)
// 	}
// 	return nil
// }

// // Ensure the `schema` table exists
// func ensureSchemaTable(db *sql.DB) error {
// 	_, err := db.Exec(schemaTableDDL)
// 	if err != nil {
// 		return fmt.Errorf("failed to create `schema` table: %v", err)
// 	}
// 	return nil
// }

// // Get table schemas and aggregate them into JSON objects
// func getTableSchemas(db *sql.DB) (map[string]map[string]string, error) {
// 	tablesQuery := `
// 		SELECT
// 			table_name,
// 			column_name,
// 			data_type
// 		FROM
// 			information_schema.columns
// 		WHERE
// 			table_schema = 'public';
// 	`

// 	rows, err := db.Query(tablesQuery)
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to fetch table schemas: %v", err)
// 	}
// 	defer rows.Close()

// 	tableSchemas := make(map[string]map[string]string)
// 	for rows.Next() {
// 		var tableName, columnName, dataType string
// 		if err := rows.Scan(&tableName, &columnName, &dataType); err != nil {
// 			return nil, fmt.Errorf("failed to scan row: %v", err)
// 		}

// 		if _, exists := tableSchemas[tableName]; !exists {
// 			tableSchemas[tableName] = make(map[string]string)
// 		}
// 		tableSchemas[tableName][columnName] = dataType
// 	}
// 	fmt.Println("Table Schemas: %v", tableSchemas)
// 	return tableSchemas, nil
// }

// // Insert table schemas into the `schema` table
// func storeSchemas(db *sql.DB, tableSchemas map[string]map[string]string) error {
// 	insertQuery := `
// 		INSERT INTO schema (name, field)
// 		VALUES ($1, $2)
// 		ON CONFLICT (name) DO UPDATE SET field = EXCLUDED.field;
// 	`

// 	for tableName, fields := range tableSchemas {
// 		fieldsJSON, err := json.Marshal(fields)
// 		if err != nil {
// 			return fmt.Errorf("failed to marshal fields for table '%s': %v", tableName, err)
// 		}

// 		_, err = db.Exec(insertQuery, tableName, fieldsJSON)
// 		if err != nil {
// 			return fmt.Errorf("failed to insert schema for table '%s': %v", tableName, err)
// 		}
// 	}

// 	return nil
// }

// // Fetch and return all schema records
// func getSchemaRecords(w http.ResponseWriter, r *http.Request) ([]SchemaRecord, error) {
// 	db, err := connectDB(connStr)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return nil, err
// 	}
// 	defer db.Close()

// 	userId := r.URL.Query().Get("userId")

// 	rows, err := db.Query("SELECT data, tableName FROM schema WHERE userId = %s;", userId)
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to query schema table: %v", err)
// 	}
// 	defer rows.Close()

// 	var records []SchemaRecord
// 	for rows.Next() {
// 		var record SchemaRecord
// 		if err := rows.Scan(&record.data, &record.tableName); err != nil {
// 			return nil, fmt.Errorf("failed to scan row: %v", err)
// 		}
// 		records = append(records, record)
// 	}

// 	return records, nil
// }

// // // HTTP handler to list all schemas
// // func getSchemasHandler() {
// // 	db, err := connectDB(connStr)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}
// // 	defer db.Close()

// // 	// Ensure the `audiencesync` database and `schema` table exist
// // 	if err := ensureDatabaseExists(db); err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	audienceSyncDB, err := connectDB(connStr + " dbname=" + targetDB)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}
// // 	defer audienceSyncDB.Close()

// // 	if err := ensureSchemaTable(audienceSyncDB); err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	// Fetch and store schemas
// // 	tableSchemas, err := getTableSchemas(audienceSyncDB)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	if err := storeSchemas(audienceSyncDB, tableSchemas); err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	// Retrieve schema records
// // 	records, err := getSchemaRecords(audienceSyncDB)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	// Return the records as JSON
// // 	w.Header().Set("Content-Type", "application/json")
// // 	if err := json.NewEncoder(w).Encode(records); err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}
// // }

// func main() {
// 	http.HandleFunc("/schemas/:userId", getSchemaRecords)

// 	port := ":5000"
// 	fmt.Printf("Server running on http://localhost%s\n", port)
// 	log.Fatal(http.ListenAndServe(port, nil))
// }

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// RequestPayload defines the structure for Gemini API request
type RequestPayload struct {
	Contents []struct {
		Parts []struct {
			Text string `json:"text"`
		} `json:"parts"`
	} `json:"contents"`
}

// TemplateRequest defines the structure for template endpoint request
type TemplateRequest struct {
	Moto        []string `json:"moto"`
	CompanyName string   `json:"company_name"`
	Description string   `json:"description"`
	Logo        string   `json:"logo"`
	URL         string   `json:"url"`
}

// VisualRequest defines the structure for visual endpoint request
type VisualRequest struct {
	Query string `json:"query"`
}

// Default mottos
var (
	M1 = `Welcoming New Users 
    Motto: A warm welcome to your journey with us!
    Details: Include a friendly greeting, introduction to our platform, and an action button to explore further.`

	M3 = `Converting Free Users to Pro Users 
    Motto: Unlock the ultimate experience!
    Details: Highlight the benefits of upgrading, include a limited-time discount, and a clear call-to-action to upgrade now.`

	M6 = `Churn Recall
    Motto: We Miss You! Let's Reconnect.
    Details: Emphasize the value and benefits the user enjoyed previously, along with new features, offers, or updates they may have missed. 
            Include a personalized message acknowledging their past engagement, a compelling incentive to return (like a discount, free trial extension, or exclusive content), and a clear call-to-action to re-engage with the platform.`
)

func removeSymbols(response string) string {
	return strings.TrimSpace(strings.ReplaceAll(response, "*", ""))
}

func generateContent(apiKey string, prompt string) (string, error) {
	payload := RequestPayload{
		Contents: []struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		}{
			{
				Parts: []struct {
					Text string `json:"text"`
				}{
					{
						Text: prompt,
					},
				},
			},
		},
	}

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("error marshalling JSON: %v", err)
	}

	url := fmt.Sprintf("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=%s", apiKey)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return "", fmt.Errorf("error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("error making request: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("error reading response: %v", err)
	}

	return removeSymbols(string(body)), nil
}

func handleTemplate(c *gin.Context) {
	var request TemplateRequest
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(request.Moto) == 0 {
		request.Moto = []string{M1, M6, M3}
	}

	prompt := fmt.Sprintf(`You are a creative Templates Creator. Your task is to design visually appealing, engaging, and professional HTML email templates that captivate the audience and align with the provided motto.
        Create an HTML template for the motto: %v for the company: %s.
        Ensure the design is modern, vibrant, and responsive across devices.
        Use eye-catching headings, clear sections, and an engaging call-to-action (CTA).
        Add emoji's and icons to enhance the visual appeal and highlight key information.
        Add professional styling with attractive colors, fonts, and spacing to make the email visually appealing and easy to read.
        Use these other details if needed %s, %s and %s.
        Provide only the complete HTML code for the template. No other information, like explanation of the code and all is needed.
        Do not add any placeholders or variables in the code. The code should be ready to use as is.`,
		request.Moto, request.CompanyName, request.Description, request.Logo, request.URL)

	apiKey := os.Getenv("API_KEY")
	response, err := generateContent(apiKey, prompt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.String(http.StatusOK, response)
}

func handleSQLQuery(c *gin.Context) {
	var events []string
	if err := c.BindJSON(&events); err != nil {
		events = []string{"cart addition", "cart deletion", "favorite hotel", "favorite food", "offer clicks", "food clicks"}
	}

	schema := `{
        tables: [
        {
        name: 'Users',
        fields: [
        { name: 'user_id', type: 'uuid' },
        { name: 'name', type: 'varchar' },
        { name: 'email', type: 'varchar' },
        { name: 'phone_number', type: 'varchar' },
        { name: 'location', type: 'json' },
        { name: 'preferences', type: 'json' },
        { name: 'created_at', type: 'timestamp' },
        { name: 'last_active', type: 'timestamp' },
        { name: 'tags', type: 'json' },
        { name: 'total_orders', type: 'integer' },
        ],
        },
        {
        name: 'Restaurants',
        fields: [
        { name: 'restaurant_id', type: 'uuid' },
        { name: 'name', type: 'varchar' },
        { name: 'cuisine', type: 'json' },
        { name: 'location', type: 'json' },
        { name: 'average_cost_for_two', type: 'float' },
        { name: 'rating', type: 'float' },
        { name: 'tags', type: 'json' },
        { name: 'menu_items_count', type: 'integer' },
        { name: 'created_at', type: 'timestamp' },
        { name: 'last_active', type: 'timestamp' },
        ],
        },
        {
        name: 'MenuItems',
        fields: [
        { name: 'menu_item_id', type: 'uuid' },
        { name: 'restaurant_id', type: 'uuid' },
        { name: 'name', type: 'varchar' },
        { name: 'price', type: 'float' },
        { name: 'category', type: 'varchar' },
        { name: 'tags', type: 'json' },
        { name: 'availability_status', type: 'boolean' },
        ],
        },
        {
        name: 'Orders',
        fields: [
        { name: 'order_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' },
        { name: 'restaurant_id', type: 'uuid' },
        { name: 'menu_items', type: 'json' },
        { name: 'total_amount', type: 'float' },
        { name: 'status', type: 'varchar' },
        { name: 'created_at', type: 'timestamp' },
        { name: 'updated_at', type: 'timestamp' },
        ],
        },
        {
        name: 'Events',
        fields: [
        { name: 'event_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' },
        { name: 'event_type', type: 'varchar' },
        { name: 'event_details', type: 'json' },
        { name: 'timestamp', type: 'timestamp' },
        ],
        },
        {
        name: 'SearchQueries',
        fields: [
        { name: 'search_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' },
        { name: 'query', type: 'varchar' },
        { name: 'result_count', type: 'integer' },
        { name: 'timestamp', type: 'timestamp' },
        ],
        },
        ],
        relationships: [
        { fromTable: 'MenuItems', toTable: 'Restaurants', fromField: 'restaurant_id', toField: 'restaurant_id' },
        { fromTable: 'Orders', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
        { fromTable: 'Orders', toTable: 'Restaurants', fromField: 'restaurant_id', toField: 'restaurant_id' },
        { fromTable: 'Events', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
        { fromTable: 'SearchQueries', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
        ],
        }`

	prompt := fmt.Sprintf(`You are an SQL Query Generator and Metadata Creator. Based on the given schema and requirements, generate SQL queries only and provide a JSON metadata object for each query. 
        Use the schema as %s and events as %v...
        
        User Segmentations.....

        Users Based on Static Data
        a. Users Who Recently Joined
        b. High-Value Users

        Users Based on Event-Based Dynamic Data
        a. Users Who Frequently Add Items to Cart
        b. Users Who Favorite Hotels or Foods
        c. Users Clicking Offers Frequently

        Users Based on Purchase Behavior
        a. Active Buyers
        b. Inactive Users
        c. Users Spending the Most Money

        Users Based on Search Behavior
        a. Users With High Search Activity
        b. Users Searching for Specific Cuisine

        Combination Segments
        a. Users Engaged with Specific Restaurants
        b. Users Who Added Items to Cart but Didn't Complete Orders
        c. Users Who Viewed Food But Didn't Purchase

        Demographic and Behavioral Insights
        a. Young Active Users

        High-Value Event-Driven Users
        a. Users Triggering Multiple Event Types`, schema, events)

	apiKey := os.Getenv("API_KEY")
	response, err := generateContent(apiKey, prompt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.String(http.StatusOK, response)
}

func handleVisual(c *gin.Context) {
	var request VisualRequest
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	prompt := fmt.Sprintf(`You are a system designed to simplify SQL queries into a visualizable and user-friendly JSON format. Your goal is to extract essential parts of the SQL query and structure them for easy understanding. Break down the query into the following parts:

    Selected Tables: Identify all tables involved in the query (e.g., in SELECT, JOIN, etc.).

    Conditions: Specify the conditions applied to each table. Break them into:
    field: The column where the condition is applied.
    operator: The operator used (e.g., =, LIKE, <, >).
    value: The value being compared or searched.

    Joins: Identify relationships between tables:
    from: Source table.
    to: Destination table.
    fromField: Column in the source table used in the join.
    toField: Column in the destination table used in the join.

    SQL Query to be Converted: %s`, request.Query)

	apiKey := os.Getenv("API_KEY")
	response, err := generateContent(apiKey, prompt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.String(http.StatusOK, response)
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	router := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	router.Use(cors.New(config))

	// Routes
	router.POST("/template", handleTemplate)
	router.POST("/SQLquery", handleSQLQuery)
	router.POST("/visual", handleVisual)

	// Start server
	if err := router.Run(":8083"); err != nil {
		log.Fatal(err)
	}
}
