-- CreateTable
CREATE TABLE "DiyCreation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "coverUrl" TEXT,
    "images" JSONB NOT NULL,
    "sourceUrl" TEXT,
    "creator" TEXT,
    "craft" TEXT,
    "tags" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
