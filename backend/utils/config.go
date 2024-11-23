package config

// DBConfig holds the configuration for connecting to the database.
type DBConfig struct {
	Host     string
	User     string
	Password string
	DBName   string
	Port     int
}