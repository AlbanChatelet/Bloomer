const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
console.log("DATABASE_URL (seed) =", process.env.DATABASE_URL);

async function main() {
  // 🔥 Nettoyage
  await prisma.creation.deleteMany();
  await prisma.vinyl.deleteMany();
  await prisma.showEpisode.deleteMany();
  await prisma.aestheticPost.deleteMany();
  await prisma.musicAlbum.deleteMany();
  await prisma.musicAesthetic.deleteMany();
  await prisma.showEpisode.deleteMany();
  await prisma.legoCreation.deleteMany();

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

  // 🎵 MUSIC ALBUMS (CLÉS DU PROJET)
  await prisma.musicAlbum.createMany({
    data: [
      // ROCK
      {
        title: "Abbey Road",
        artist: "The Beatles",
        year: 1969,
        genre: "rock",
        region: "UK",
        coverUrl: "https://en.wikipedia.org/wiki/Abbey_Road",
        coverImageUrl: "/images/MusicAlbums/abbey_road.jpg",
      },
      {
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        year: 1973,
        genre: "rock",
        region: "UK",
        coverUrl: "https://en.wikipedia.org/wiki/The_Dark_Side_of_the_Moon",
        coverImageUrl: "/images/MusicAlbums/the-dark-side-of-the-moon.png",
      },
      {
        title: "Nevermind",
        artist: "Nirvana",
        year: 1991,
        genre: "rock",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Nevermind",
        coverImageUrl: "/images/MusicAlbums/nevermind.jpg",
      },
      {
        title: "OK Computer",
        artist: "Radiohead",
        year: 1997,
        genre: "rock",
        region: "UK",
        coverUrl: "https://en.wikipedia.org/wiki/OK_Computer",
        coverImageUrl: "/images/MusicAlbums/ok-computer.png",
      },
      {
        title: "Exile on Main St.",
        artist: "The Rolling Stones",
        year: 1972,
        genre: "rock",
        region: "UK",
        coverUrl: "https://en.wikipedia.org/wiki/Exile_on_Main_St.",
        coverImageUrl: "/images/MusicAlbums/exile-on-main-st.jpg",
      },

      // JAZZ
      {
        title: "Kind of Blue",
        artist: "Miles Davis",
        year: 1959,
        genre: "jazz",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Kind_of_Blue",
        coverImageUrl: "/images/MusicAlbums/kind_of_blue.jpg",
      },
      {
        title: "A Love Supreme",
        artist: "John Coltrane",
        year: 1965,
        genre: "jazz",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/A_Love_Supreme",
        coverImageUrl: "/images/MusicAlbums/a_love_supreme.jpg",
      },
      {
        title: "Time Out",
        artist: "Dave Brubeck",
        year: 1959,
        genre: "jazz",
        region: "US",
        coverUrl:
          "https://en.wikipedia.org/wiki/Time_Out_(Dave_Brubeck_Quartet_album)",
        coverImageUrl: "/images/MusicAlbums/time-out.jpg",
      },
      {
        title: "Head Hunters",
        artist: "Herbie Hancock",
        year: 1973,
        genre: "jazz",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Head_Hunters",
        coverImageUrl: "/images/MusicAlbums/head-hunters.png",
      },
      {
        title: "Mingus Ah Um",
        artist: "Charles Mingus",
        year: 1959,
        genre: "jazz",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Mingus_Ah_Um",
        coverImageUrl: "/images/MusicAlbums/mingus-ah-um.jpg",
      },

      // HIP-HOP
      {
        title: "Illmatic",
        artist: "Nas",
        year: 1994,
        genre: "hiphop",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Illmatic",
        coverImageUrl: "/images/MusicAlbums/illmatic.jpg",
      },
      {
        title: "My Beautiful Dark Twisted Fantasy",
        artist: "Kanye West",
        year: 2010,
        genre: "hiphop",
        region: "US",
        coverUrl:
          "https://en.wikipedia.org/wiki/My_Beautiful_Dark_Twisted_Fantasy",
        coverImageUrl:
          "/images/MusicAlbums/my-beautiful-dark-twisted-fantasy.jpg",
      },
      {
        title: "good kid, m.A.A.d city",
        artist: "Kendrick Lamar",
        year: 2012,
        genre: "hiphop",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Good_Kid,_M.A.A.D_City",
        coverImageUrl: "/images/MusicAlbums/good-kid-maad-city.jpg",
      },
      {
        title: "The Low End Theory",
        artist: "A Tribe Called Quest",
        year: 1991,
        genre: "hiphop",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/The_Low_End_Theory",
        coverImageUrl: "/images/MusicAlbums/the-low-end-theory.jpg",
      },
      {
        title: "Aquemini",
        artist: "OutKast",
        year: 1998,
        genre: "hiphop",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Aquemini",
        coverImageUrl: "/images/MusicAlbums/aquemini.jpg",
      },

      // ELECTRO
      {
        title: "Discovery",
        artist: "Daft Punk",
        year: 2001,
        genre: "electro",
        region: "FR",
        coverUrl: "https://en.wikipedia.org/wiki/Discovery_(Daft_Punk_album)",
        coverImageUrl: "/images/MusicAlbums/discovery.png",
      },
      {
        title: "Selected Ambient Works 85–92",
        artist: "Aphex Twin",
        year: 1992,
        genre: "electro",
        region: "UK",
        coverUrl:
          "https://en.wikipedia.org/wiki/Selected_Ambient_Works_85%E2%80%9392",
        coverImageUrl: "/images/MusicAlbums/selected.png",
      },
      {
        title: "†",
        artist: "Justice",
        year: 2007,
        genre: "electro",
        region: "FR",
        coverUrl: "https://en.wikipedia.org/wiki/%E2%80%A0_(Justice_album)",
        coverImageUrl: "/images/MusicAlbums/Cross.jpg",
      },
      {
        title: "Music Has the Right to Children",
        artist: "Boards of Canada",
        year: 1998,
        genre: "electro",
        region: "UK",
        coverUrl:
          "https://en.wikipedia.org/wiki/Music_Has_the_Right_to_Children",
        coverImageUrl: "/images/MusicAlbums/music-children.jpg",
      },
      {
        title: "Trans-Europe Express",
        artist: "Kraftwerk",
        year: 1977,
        genre: "electro",
        region: "DE",
        coverUrl: "https://en.wikipedia.org/wiki/Trans-Europe_Express_(album)",
        coverImageUrl: "/images/MusicAlbums/trans-europe-express.png",
      },

      // POP US
      {
        title: "Thriller",
        artist: "Michael Jackson",
        year: 1982,
        genre: "pop_us",
        region: "US",
        coverUrl:
          "https://en.wikipedia.org/wiki/Thriller_(Michael_Jackson_album)",
        coverImageUrl: "/images/MusicAlbums/thriller.png",
      },
      {
        title: "Purple Rain",
        artist: "Prince",
        year: 1984,
        genre: "pop_us",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Purple_Rain_(album)",
        coverImageUrl: "/images/MusicAlbums/purple-rain.jpg",
      },
      {
        title: "Like a Prayer",
        artist: "Madonna",
        year: 1989,
        genre: "pop_us",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Like_a_Prayer_(album)",
        coverImageUrl: "/images/MusicAlbums/like-a-prayer.png",
      },
      {
        title: "Blonde",
        artist: "Frank Ocean",
        year: 2016,
        genre: "pop_us",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Blonde_(Frank_Ocean_album)",
        coverImageUrl: "/images/MusicAlbums/blonde.jpeg",
      },
      {
        title: "Born to Die",
        artist: "Lana Del Rey",
        year: 2012,
        genre: "pop_us",
        region: "US",
        coverUrl: "https://en.wikipedia.org/wiki/Born_to_Die",
        coverImageUrl: "/images/MusicAlbums/born-to-die.png",
      },

      // FR
      {
        title: "Gang",
        artist: "Johnny Hallyday",
        year: 1986,
        genre: "fr",
        region: "FR",
        coverUrl: "https://fr.wikipedia.org/wiki/Gang_(album)",
        coverImageUrl: "/images/MusicAlbums/gang.jpg",
      },
      {
        title: "Amoureux de Paname",
        artist: "Renaud",
        year: 1975,
        genre: "fr",
        region: "FR",
        coverUrl: "https://fr.wikipedia.org/wiki/Amoureux_de_Paname",
        coverImageUrl: "/images/MusicAlbums/renaud.jpg",
      },
      {
        title: "Prose combat",
        artist: "MC Solaar",
        year: 1994,
        genre: "fr",
        region: "FR",
        coverUrl: "https://fr.wikipedia.org/wiki/Prose_combat",
        coverImageUrl: "/images/MusicAlbums/prose-combat.jpg",
      },

      // ASIA
      {
        title: "Modal Soul",
        artist: "Nujabes",
        year: 2005,
        genre: "asia",
        region: "JP",
        coverUrl: "https://en.wikipedia.org/wiki/Modal_Soul",
        coverImageUrl: "/images/MusicAlbums/modal-soul.jpg",
      },
      {
        title: "First Love",
        artist: "Hikaru Utada",
        year: 1999,
        genre: "asia",
        region: "JP",
        coverUrl:
          "https://en.wikipedia.org/wiki/First_Love_(Hikaru_Utada_album)",
        coverImageUrl: "/images/MusicAlbums/first-love.png",
      },
      {
        title: "Solid State Survivor",
        artist: "Yellow Magic Orchestra",
        year: 1979,
        genre: "asia",
        region: "JP",
        coverUrl: "https://en.wikipedia.org/wiki/Solid_State_Survivor",
        coverImageUrl: "/images/MusicAlbums/solid-state-survivor.jpg",
      },
      {
        title: "Love Yourself: Tear",
        artist: "BTS",
        year: 2018,
        genre: "asia",
        region: "KR",
        coverUrl: "https://en.wikipedia.org/wiki/Love_Yourself:_Tear",
        coverImageUrl: "/images/MusicAlbums/love-yourself-tears.jpeg",
      },

      // AFRICA
      {
        title: "Zombie",
        artist: "Fela Kuti",
        year: 1976,
        genre: "africa",
        region: "NG",
        coverUrl: "https://en.wikipedia.org/wiki/Zombie_(Fela_Kuti_album)",
        coverImageUrl: "/images/MusicAlbums/zombie.jpg",
      },
      {
        title: "African Giant",
        artist: "Burna Boy",
        year: 2019,
        genre: "africa",
        region: "NG",
        coverUrl: "https://en.wikipedia.org/wiki/African_Giant",
        coverImageUrl: "/images/MusicAlbums/african_giant.png",
      },
      {
        title: "Talking Timbuktu",
        artist: "Ali Farka Touré",
        year: 1994,
        genre: "africa",
        region: "ML",
        coverUrl: "https://en.wikipedia.org/wiki/Talking_Timbuktu",
        coverImageUrl: "/images/MusicAlbums/talking-timbuktu.jpg",
      },
    ],
  });

  await prisma.musicAesthetic.createMany({
    data: [
      {
        title: "Vinyl records & album covers wall decor",
        imageUrl: "/images/music-aesthetic/pin-73113193947026784.jpg",
        sourceUrl: "https://fr.pinterest.com/pin/73113193947026784/",
        vibe: "wall decor",
        tags: "vinyl,decor,wall",
      },
      {
        title: "Idée story - vinyls aux pieds",
        imageUrl: "/images/music-aesthetic/pin-62909726038198348.jpg",
        sourceUrl: "https://fr.pinterest.com/pin/62909726038198348/",
        vibe: "creative photo",
        tags: "vinyl,photo,aesthetic",
      },
      {
        title: "Décorations originales de vinyles sur un mur",
        imageUrl: "/images/music-aesthetic/pin-72198400273264887.jpg",
        sourceUrl: "https://fr.pinterest.com/pin/72198400273264887/",
        vibe: "wall decor",
        tags: "vinyl,decor,wall",
      },
      {
        title: "Chambre décorée avec des vinyles (vintage)",
        imageUrl: "/images/music-aesthetic/pin-1970393583899303.jpg",
        sourceUrl: "https://fr.pinterest.com/pin/1970393583899303/",
        vibe: "vintage room",
        tags: "vinyl,room,vintage",
      },
    ],
  });

  await prisma.showEpisode.createMany({
    data: [
      // -------- SIMPSONS (SimpsonsPark) --------
      {
        show: "Simpsons",
        title: "Qui a tiré sur Mr Burns ? (Partie 1)",
        season: 6,
        episode: 25,
        communityRank: 1,
        linkUrl:
          "https://www.simpsonspark.com/episodes/qui_a_tire_sur_mr_burns_partie_1",
      },
      {
        show: "Simpsons",
        title: "Homer, le baron de la bière",
        season: 8,
        episode: 18,
        communityRank: 2,
        linkUrl:
          "https://www.simpsonspark.com/episodes/homer_le_baron_de_la_biere",
      },
      {
        show: "Simpsons",
        title: "Homer contre New York",
        season: 9,
        episode: 1,
        communityRank: 3,
        linkUrl: "https://www.simpsonspark.com/episodes/homer_contre_new_york",
      },
      {
        show: "Simpsons",
        title: "Homer le grand",
        season: 6,
        episode: 12,
        communityRank: 4,
        linkUrl: "https://www.simpsonspark.com/episodes/homer_le_grand",
      },
      {
        show: "Simpsons",
        title: "Lac Terreur",
        season: 5,
        episode: 2,
        communityRank: 5,
        linkUrl: "https://www.simpsonspark.com/episodes/lac_terreur",
      },
      {
        show: "Simpsons",
        title: "L'ennemi d'Homer",
        season: 8,
        episode: 23,
        communityRank: 6,
        linkUrl: "https://www.simpsonspark.com/episodes/l_ennemi_d_homer",
      },
      {
        show: "Simpsons",
        title: "Simpson Horror Show V",
        season: 6,
        episode: 6,
        communityRank: 7,
        linkUrl: "https://www.simpsonspark.com/episodes/simpson_horror_show_v",
      },

      // -------- SOUTH PARK (Fandom FR) --------
      {
        show: "South Park",
        title: "Casa Bonita",
        season: 7,
        episode: 11,
        communityRank: 1,
        linkUrl: "https://southpark.fandom.com/fr/wiki/Casa_Bonita",
      },
      {
        show: "South Park",
        title: "Make Love, Not Warcraft",
        season: 10,
        episode: 8,
        communityRank: 2,
        linkUrl: "https://www.imdb.com/fr/title/tt0850173/",
      },
      {
        show: "South Park",
        title: "Le Noël des petits animaux de la forêt",
        season: 8,
        episode: 14,
        communityRank: 3,
        linkUrl:
          "https://southpark.fandom.com/fr/wiki/Le_No%C3%ABl_des_petits_animaux_de_la_for%C3%AAt",
      },
      {
        show: "South Park",
        title: "Servietsky",
        season: 5,
        episode: 8,
        communityRank: 4,
        linkUrl:
          "https://southpark.fandom.com/fr/wiki/Servietsky_(%C3%A9pisode)",
      },
      {
        show: "South Park",
        title: "Scott Tenorman doit mourir",
        season: 5,
        episode: 4,
        communityRank: 5,
        linkUrl:
          "https://southpark.fandom.com/fr/wiki/Scott_Tenorman_doit_mourir",
      },
      {
        show: "South Park",
        title: "Piégé dans le placard",
        season: 9,
        episode: 12,
        communityRank: 6,
        linkUrl:
          "https://southpark.fandom.com/fr/wiki/Pi%C3%A9g%C3%A9_dans_le_placard",
      },
      {
        show: "South Park",
        title: "Stop clopes",
        season: 7,
        episode: 13,
        communityRank: 7,
        linkUrl: "https://southpark.fandom.com/fr/wiki/Stop_clopes",
      },

      // -------- MALCOLM (titres FR, liens OK même en EN) --------
      {
        show: "Malcolm",
        title: "Reese rejoint l'armée (Partie 2)",
        season: 5,
        episode: 22,
        communityRank: 1,
        linkUrl:
          "https://malcolminthemiddle.fandom.com/wiki/Reese_Joins_the_Army:_Part_2",
      },
      {
        show: "Malcolm",
        title: "Le cadeau de Noël de Hal",
        season: 6,
        episode: 6,
        communityRank: 2,
        linkUrl:
          "https://malcolminthemiddle.fandom.com/wiki/Hal%27s_Christmas_Gift",
      },
      {
        show: "Malcolm",
        title: "Patins à roulettes",
        season: 1,
        episode: 13,
        communityRank: 3,
        linkUrl: "https://malcolminthemiddle.fandom.com/wiki/Rollerskates",
      },
      {
        show: "Malcolm",
        title: "Remise des diplômes",
        season: 7,
        episode: 22,
        communityRank: 4,
        linkUrl: "https://malcolminthemiddle.fandom.com/wiki/Graduation",
      },
      {
        show: "Malcolm",
        title: "Réunion de famille",
        season: 4,
        episode: 3,
        communityRank: 5,
        linkUrl: "https://malcolminthemiddle.fandom.com/wiki/Family_Reunion",
      },
      {
        show: "Malcolm",
        title: "Si les garçons étaient des filles",
        season: 4,
        episode: 10,
        communityRank: 6,
        linkUrl:
          "https://malcolminthemiddle.fandom.com/wiki/If_Boys_Were_Girls",
      },
      {
        show: "Malcolm",
        title: "L'anniversaire de Lois",
        season: 2,
        episode: 3,
        communityRank: 7,
        linkUrl: "https://malcolminthemiddle.fandom.com/wiki/Lois%27_Birthday",
      },
    ],
  });

  console.log("🌱 Seed séries (Simpsons / South Park / Malcolm) terminé");
  await prisma.legoCreation.createMany({
    data: [
      {
        title: "The Scream by Edvard Munch",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/771eb3af-4dc9-43cb-8d02-459f6b0420a1",
        category: "art",
        tags: "lego,art,diy",
        imageUrl: "/images/lego/the-scream.webp",
      },
      {
        title: "La Belle Ruelle",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/75207a92-112c-45da-b58f-64a17dca1648",
        category: "architecture",
        tags: "lego,street,architecture",
        imageUrl: "/images/lego/la-belle-ruelle.webp",
      },
      {
        title: "LEGO Monopoly",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/ee298e6d-eb0b-438a-82f7-09dc0a830134",
        category: "game",
        tags: "lego,boardgame,nostalgia",
        imageUrl: "/images/lego/monopoly-lego.webp",
      },
      {
        title: "Plants vs. Zombies – Diorama",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/0d2fa210-d50c-46ef-a7b7-dcdf4e776a29",
        category: "diorama",
        tags: "lego,game,diorama",
        imageUrl: "/images/lego/pvz.webp",
      },
      {
        title: "1950s American Drive-in Diner With Roller Skating Girls",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/17282a1d-f716-40db-9195-3fada1496fb3",
        category: "diorama",
        tags: "lego,retro,american",
        imageUrl: "/images/lego/american-1950-diner.webp",
      },
      {
        title: "Boombox Stereo",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/efda62aa-1ea2-4815-968d-e4f55fc41049",
        category: "object",
        tags: "lego,music,retro",
        imageUrl: "/images/lego/bombox-stereo.webp",
      },
      {
        title: "Medieval Chess Set With Storage Drawer",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/3c4b23a9-6b7d-433a-8b51-68ac44dee09f",
        category: "game",
        tags: "lego,chess,medieval",
        imageUrl: "/images/lego/medieval-chess.webp",
      },
      {
        title: "Avenue De La Fantaisie – Paris House and Street Scene",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/4e8f5390-d1b0-4a36-8d3f-3dc3ff4f975b",
        category: "architecture",
        tags: "lego,paris,street",
        imageUrl: "/images/lego/avenue-fantaisie-paris.webp",
      },
      {
        title: "Asterix & Obelix – Village",
        sourceUrl:
          "https://beta.ideas.lego.com/product-ideas/9dde912f-198f-4872-a900-47e912e7e751",
        category: "diorama",
        tags: "lego,asterix,nostalgia",
        imageUrl: "/images/lego/asterix-obelix.webp",
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
