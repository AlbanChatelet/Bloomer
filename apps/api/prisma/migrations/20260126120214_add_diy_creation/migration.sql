/*
  Warnings:

  - Made the column `coverUrl` on table `DiyCreation` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiyCreation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "sourceUrl" TEXT,
    "creator" TEXT,
    "craft" TEXT,
    "tags" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DiyCreation" ("coverUrl", "craft", "createdAt", "creator", "id", "images", "note", "sourceUrl", "tags", "title") SELECT "coverUrl", "craft", "createdAt", "creator", "id", "images", "note", "sourceUrl", "tags", "title" FROM "DiyCreation";
DROP TABLE "DiyCreation";
ALTER TABLE "new_DiyCreation" RENAME TO "DiyCreation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
