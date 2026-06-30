import type { SQLiteDatabase } from "expo-sqlite";
import type { Artifact } from "@/types/artifact";
import { generateArtifactId } from "@/hooks/crypto";

export async function createArtifact(
    db: SQLiteDatabase,
    title: string,
    description = "",
    tags: string[] = []
) {
    const now = new Date().toISOString();
    const uniqueId = generateArtifactId();

    await db.runAsync(
        `
        INSERT INTO artifacts
        (
            id,
            title,
            description,
            tags,
            created_at,
            updated_at,
            favorite,
            color
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        uniqueId,
        title,
        description,
        JSON.stringify(tags),
        now,
        now,
        0,
        null
    );

    return uniqueId;
}

export async function getArtifacts(
    db: SQLiteDatabase
): Promise<Artifact[]> {
    const rows = await db.getAllAsync<any>(`
    SELECT
      id,
      title,
      description,
      tags,
      created_at AS createdAt,
      updated_at AS updatedAt,
      favorite,
      color
    FROM artifacts
    ORDER BY updated_at DESC
  `);

    return rows.map(row => ({
        ...row,
        id: String(row.id),
        favorite: Boolean(row.favorite),
        tags: JSON.parse(row.tags ?? "[]"),
    }));
}

export async function getArtifact(
    db: SQLiteDatabase,
    id: string
) {
    return db.getFirstAsync<Artifact>(
        `
      SELECT
        id,
        title,
        description,
        tags,
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
        tags = ?,
        updated_at = ?,
        favorite = ?,
        color = ?
    WHERE id = ?
    `,
        artifact.title,
        artifact.description,
        JSON.stringify(artifact.tags),
        new Date().toISOString(),
        artifact.favorite ? 1 : 0,
        artifact.color,
        artifact.id
    );
}

export async function deleteArtifact(
    db: SQLiteDatabase,
    id: string
) {
    await db.runAsync(
        `DELETE FROM artifacts WHERE id = ?`,
        id
    );
}
