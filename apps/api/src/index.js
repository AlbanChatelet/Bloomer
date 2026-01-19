const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

// -------- BLOOMER API (lecture simple) --------

// Creations
app.get("/creations", async (req, res) => {
  const items = await prisma.creation.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(items);
});

// Vinyls
app.get("/vinyls", async (req, res) => {
  const items = await prisma.vinyl.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items);
});

// Episodes
app.get("/episodes", async (req, res) => {
  const items = await prisma.showEpisode.findMany({
    orderBy: { communityRank: "asc" },
  });
  res.json(items);
});

// Aesthetics
app.get("/aesthetics", async (req, res) => {
  const items = await prisma.aestheticPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(items);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API Bloomer sur http://localhost:${port}`));
