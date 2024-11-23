package main

import {
	"gofr.dev/pkg/gofr",
	"utils/database",
	"utils/configs"
}

func main() {
    // initialise gofr object
    app := gofr.New()

	// var databaseconfig = config.DBConfig

    // register route greet
    app.GET("/", func(ctx *gofr.Context) (interface{}, error) {

        return "Hello"
    })

    // Runs the server, it will listen on the default port 8000.
    // it can be over-ridden through configs
   app.Run()
}