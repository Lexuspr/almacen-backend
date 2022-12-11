import { createPool } from "mysql2/promise"
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, JAWSDB_URL } from "../config.js"

let pool;

if (JAWSDB_URL) {
    pool = createPool(JAWSDB_URL)
} else {
    pool = createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })
}

export {pool}