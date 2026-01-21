-- CreateTable
CREATE TABLE "MusicAlbum" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" INTEGER,
    "genre" TEXT NOT NULL,
    "region" TEXT,
    "coverUrl" TEXT,
    "vibe" TEXT,
    "classic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
