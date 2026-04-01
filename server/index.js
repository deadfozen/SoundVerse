import express from "express";
import sqlite3 from "sqlite3";
import {open} from "sqlite";
const app = express();
app.use(express.json());
const bd = await open({filename: "./music.bd", driver: sqlite3.Database)};
await bd.exec(`
	CREATE TABLE IF NOT EXISTS tracks (
		id INTEGER PRIMARY KEY,
		title TEXT,
		artist TEXT,
		file_id TEXT,
		created_at DATATIME DEFAULT CURRENT_TIMESTAMP
	)
`);
app.get("/tracks", async (req, res) => {
	const tracks = await bd.all("SELECT* FROM tracks ORDER BY id DESC");
	res.json(tracks);
});
app.post("/track", async (req, res) => {
	const {title, artist, file_id) = req.body;
	await bd.run(
		"INSERT INTO tracks (title, artist, file_id) VALUES (?, ?, ?)",
		[title, artist, file_id]
	);
	res.sendStatus(200);
});
app.listen(3001, () => console.log("API running"));
