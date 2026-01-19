const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 🔥 Nettoyage
  await prisma.creation.deleteMany();
  await prisma.vinyl.deleteMany();
  await prisma.showEpisode.deleteMany();
  await prisma.aestheticPost.deleteMany();

  // 🎵 VINYLS
  await prisma.vinyl.createMany({
    data: [
      {
        title: "Modal Soul",
        artist: "Nujabes",
        year: 2005,
        coverUrl: "https://i.imgur.com/Wp3gZxF.jpg",
        tags: "lofi,jazz,nostalgie",
      },
      {
        title: "Discovery",
        artist: "Daft Punk",
        year: 2001,
        coverUrl: "https://i.imgur.com/YQZ7GkO.jpg",
        tags: "electro,french,classic",
      },
      {
        title: "Graduation",
        artist: "Kanye West",
        year: 2007,
        coverUrl: "https://i.imgur.com/JyJZx4V.jpg",
        tags: "hip-hop,2000s",
      },
      {
        title: "Blonde",
        artist: "Frank Ocean",
        year: 2016,
        coverUrl: "https://i.imgur.com/6sF9XKf.jpg",
        tags: "rnb,introspective",
      },
    ],
  });

  // 📺 EPISODES CULTES
  await prisma.showEpisode.createMany({
    data: [
      {
        show: "Simpsons",
        title: "Marge vs. the Monorail",
        season: 4,
        episode: 12,
        communityRank: 1,
        linkUrl: "https://www.simpsonspark.com/episodes/marge-vs-the-monorail/",
        note: "Humour absurde et critique parfaite.",
      },
      {
        show: "Simpsons",
        title: "Homer Badman",
        season: 6,
        episode: 9,
        communityRank: 2,
        note: "Toujours actuel sur les médias.",
      },
      {
        show: "South Park",
        title: "Make Love, Not Warcraft",
        season: 10,
        episode: 8,
        communityRank: 1,
        note: "Un épisode culte de la culture geek.",
      },
      {
        show: "South Park",
        title: "Scott Tenorman Must Die",
        season: 5,
        episode: 4,
        communityRank: 2,
        note: "Un des épisodes les plus marquants.",
      },
    ],
  });

  // 🌇 AESTHETIC
  await prisma.aestheticPost.createMany({
    data: [
      {
        title: "Sunset in LA",
        imageUrl: "https://i.imgur.com/3QyQb5G.jpg",
        vibe: "golden hour",
        tags: "sunset,california",
      },
      {
        title: "Cozy Room",
        imageUrl: "https://i.imgur.com/Nv7xQpA.jpg",
        vibe: "cozy,night",
        tags: "room,light",
      },
      {
        title: "Vinyl Collection",
        imageUrl: "https://i.imgur.com/j0QeF3n.jpg",
        vibe: "music,collection",
        tags: "vinyl,analog",
      },
    ],
  });

  // 🧱 CREATIONS
  await prisma.creation.createMany({
    data: [
      {
        title: "LEGO Mecha",
        type: "lego",
        imageUrl: "https://i.imgur.com/Rt3yFzN.jpg",
        description: "Construction personnelle inspirée des animés.",
        author: "anon",
        tags: "lego,mecha",
      },
      {
        title: "Fan-art Simpsons",
        type: "drawing",
        imageUrl: "https://i.imgur.com/8Q9ZQdT.jpg",
        description: "Style rétro.",
        author: "anon",
        tags: "fanart,simpsons",
      },
      {
        title: "DIY Desk Lamp",
        type: "diy",
        imageUrl: "https://i.imgur.com/6qQvN4E.jpg",
        description: "Lampe faite maison avec récupération.",
        author: "anon",
        tags: "diy,cozy",
      },
    ],
  });
}

main()
  .then(() => console.log("🌱 Seed BLOOMER terminé"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
