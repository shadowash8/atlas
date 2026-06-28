import type { SQLiteDatabase } from "expo-sqlite";
import type { Artifact } from "@/types/artifact";

export async function createArtifact(
    db: SQLiteDatabase,
    title: string,
    description = ""
) {
    const now = new Date().toISOString();

    const result = await db.runAsync(
        `
      INSERT INTO artifacts
      (title, description, created_at, updated_at, favorite, color)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
        title,
        description,
        now,
        now,
        0,
        null
    );

    return result.lastInsertRowId;
}

export async function getArtifacts(
    db: SQLiteDatabase
): Promise<Artifact[]> {
    const rows = await db.getAllAsync<any>(`
    SELECT
      id,
      title,
      description,
      created_at AS createdAt,
      updated_at AS updatedAt,
      favorite,
      color
    FROM artifacts
    ORDER BY updated_at DESC
  `);

    return rows.map(row => ({
        ...row,
        favorite: Boolean(row.favorite),
    }));
}

export async function getArtifact(
    db: SQLiteDatabase,
    id: number
) {
    return db.getFirstAsync<Artifact>(
        `
      SELECT
        id,
        title,
        description,
        created_at AS createdAt,
        updated_at AS updatedAt,
        favorite,
        color
      FROM artifacts
      WHERE id = ?
    `,
        id
    );
}

export async function updateArtifact(
    db: SQLiteDatabase,
    artifact: Artifact
) {
    await db.runAsync(
        `
      UPDATE artifacts
      SET
        title = ?,
        description = ?,
        updated_at = ?,
        favorite = ?,
        color = ?
      WHERE id = ?
    `,
        artifact.title,
        artifact.description,
        new Date().toISOString(),
        artifact.favorite ? 1 : 0,
        artifact.color,
        artifact.id
    );
}

export async function deleteArtifact(
    db: SQLiteDatabase,
    id: number
) {
    await db.runAsync(
        `DELETE FROM artifacts WHERE id = ?`,
        id
    );
}
