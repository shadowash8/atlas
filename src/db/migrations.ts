// src/db/migrations.ts

import type { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 1;

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const result = await db.getFirstAsync<{ user_version: number }>(
        "PRAGMA user_version"
    );

    let currentVersion = result?.user_version ?? 0;

    if (currentVersion >= DATABASE_VERSION) {
        return;
    }

    if (currentVersion === 0) {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;

            CREATE TABLE IF NOT EXISTS artifacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
            
                title TEXT NOT NULL,
                description TEXT,
            
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
            
                favorite INTEGER NOT NULL DEFAULT 0,
                color TEXT
            );
            
            CREATE TABLE IF NOT EXISTS attachments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
            
                artifact_id INTEGER NOT NULL,
            
                name TEXT NOT NULL,
                uri TEXT NOT NULL,
                type TEXT NOT NULL,
                size INTEGER NOT NULL,
            
                FOREIGN KEY(artifact_id)
                    REFERENCES artifacts(id)
                    ON DELETE CASCADE
            );
        `);

        currentVersion = 1;
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
