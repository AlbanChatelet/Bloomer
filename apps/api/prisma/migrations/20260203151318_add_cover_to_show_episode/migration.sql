/*
  Warnings:

  - Added the required column `cover` to the `ShowEpisode` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShowEpisode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "show" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "season" INTEGER,
    "episode" INTEGER,
    "communityRank" INTEGER,
    "linkUrl" TEXT,
    "note" TEXT,
    "cover" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ShowEpisode" ("communityRank", "createdAt", "episode", "id", "linkUrl", "note", "season", "show", "title") SELECT "communityRank", "createdAt", "episode", "id", "linkUrl", "note", "season", "show", "title" FROM "ShowEpisode";
DROP TABLE "ShowEpisode";
ALTER TABLE "new_ShowEpisode" RENAME TO "ShowEpisode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
