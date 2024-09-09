import "reflect-metadata"
import app from "./app"
import { appDataSource } from "./db"

async function main() {
    await appDataSource.initialize()
    app.listen(3000)
    console.log("Server is runing on port", 3000)
}

main()