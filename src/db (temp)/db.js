import Database from "better-sqlite3";

const db = new Database("database.db");

// Create Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT,
    time TEXT,
    duration INTEGER
  )
`).run();