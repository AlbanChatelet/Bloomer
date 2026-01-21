<script setup lang="ts">
type Trigger = {
  title: string;
  why: string;
  quickFix: string;
  tag: string;
};

const triggers: Trigger[] = [
  {
    title: "Scroll infini",
    why: "Tu cherches une pause mais ton cerveau ne déconnecte jamais : tu restes en alerte.",
    quickFix: "Mode avion 10 minutes + mets ton tel hors de portée.",
    tag: "écrans",
  },
  {
    title: "Actu anxiogène",
    why: "Information ≠ contrôle. Trop d’actus donne l’impression que tout brûle en permanence.",
    quickFix: "Un seul créneau “news” par jour (ex: 18h–18h15).",
    tag: "news",
  },
  {
    title: "Isolement",
    why: "Même entouré en ligne, tu peux être seul. Et tout devient plus lourd.",
    quickFix: "Envoie juste un message simple à quelqu’un : “t’es dispo ?”.",
    tag: "social",
  },
  {
    title: "Sommeil cassé",
    why: "Sans sommeil, le monde a l’air plus hostile et ton énergie s’effondre.",
    quickFix: "Ce soir : écran off 30 min avant dodo + lumière plus chaude.",
    tag: "sommeil",
  },
  {
    title: "Zéro mouvement",
    why: "Corps immobile = humeur qui chute. Même un petit mouvement aide.",
    quickFix: "2 minutes : 20 squats ou une mini marche dehors.",
    tag: "corps",
  },
  {
    title: "Plus de passions",
    why: "Quand tu ne crées plus, tu subis. Et tout paraît fade.",
    quickFix: "15 minutes “activité simple” : Lego, dessin, musique, rangement.",
    tag: "passions",
  },
  {
    title: "Comparaison sociale",
    why: "Tu compares ton coulisses à la vitrine des autres. Ça te casse.",
    quickFix: "Unfollow 3 comptes qui te plombent + mute stories 24h.",
    tag: "réseaux",
  },
  {
    title: "Lumière froide, ville clinique",
    why: "Ambiance blanche/bleue = ressenti plus dur. Le décor joue sur l’humeur.",
    quickFix: "Mets une lampe chaude / bougie / playlist calme + range un coin.",
    tag: "ambiance",
  },
];

type Action = { title: string; detail: string; time: "5" | "15" };

const actions: Action[] = [
  { title: "Respirer dehors", detail: "5 minutes. Juste sortir et regarder le ciel.", time: "5" },
  { title: "Bouger un peu", detail: "20 squats / 10 pompes / marche rapide.", time: "5" },
  { title: "Eau + visage", detail: "Boire un verre d’eau + se laver le visage.", time: "5" },
  { title: "Ranger 1 surface", detail: "Un bureau / un coin de lit / une étagère.", time: "5" },
  { title: "Musique “safe”", detail: "Un album/playlist qui te calme (pas d’algo).", time: "5" },
  { title: "Mini douche + vêtements propres", detail: "Reset simple, sans objectif parfait.", time: "15" },
  { title: "Marche + lumière", detail: "10–15 min dehors. Même sans motivation.", time: "15" },
  { title: "Manger un truc basique", detail: "Un vrai truc simple : œufs, pâtes, fruit, soupe.", time: "15" },
  { title: "Message à quelqu’un", detail: "“Tu fais quoi ?” / “Ça va ?” / “T’es dispo ?”", time: "15" },
  { title: "Créer un truc", detail: "Lego / dessin / écriture 10 lignes / bricolage.", time: "15" },
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
    <!-- Top bar -->
    <nav class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NuxtLink to="/" class="text-sm font-extrabold tracking-wide text-white">
          BLOOMER
        </NuxtLink>

        <div class="flex items-center gap-2">
          <NuxtLink
            to="/bloomer"
            class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-white/15"
          >
            Aller vers Bloomer →
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <header class="mx-auto max-w-6xl px-6 pt-14 pb-10">
      <p class="text-sm tracking-wide text-slate-400">DOOMER</p>
      <h1 class="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
        Quand le monde devient <span class="text-slate-300">gris</span>.
      </h1>
      <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
        Pas de morale, pas de “sois positif”. Juste : comprendre ce qui te vide, et reprendre un peu de contrôle
        avec des gestes simples.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href="#triggers"
          class="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/20"
        >
          Comprendre ce qui plombe
        </a>
        <a
          href="#actions"
          class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white"
        >
          Micro-actions (5–15 min)
        </a>
        <a
          href="#replace"
          class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/15"
        >
          Remplacer le scroll
        </a>
      </div>
    </header>

    <!-- SECTION: TRIGGERS -->
    <section id="triggers" class="mx-auto max-w-6xl px-6 py-10">
      <div class="flex items-end justify-between gap-6">
        <div>
          <h2 class="text-2xl font-bold">🧊 Ce qui te vide</h2>
          <p class="mt-2 max-w-2xl text-slate-300">
            Des causes simples qui, cumulées, te mettent en mode “tout est lourd”.
          </p>
        </div>
      </div>

      <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="t in triggers"
          :key="t.title"
          class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 hover:bg-white/7"
        >
          <div class="flex items-center justify-between gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-300">
              {{ t.tag }}
            </p>
          </div>

          <h3 class="mt-2 text-base font-bold leading-snug text-white">
            {{ t.title }}
          </h3>

          <p class="mt-2 text-sm text-slate-300">
            {{ t.why }}
          </p>

          <div class="mt-4 rounded-xl bg-white/5 p-3 text-sm text-slate-200 ring-1 ring-white/10">
            <span class="text-slate-400">Petit geste :</span>
            <span class="ml-1">{{ t.quickFix }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- SECTION: ACTIONS -->
    <section id="actions" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-2xl font-bold">🕯️ Micro-actions (anti-boucle)</h2>
      <p class="mt-2 max-w-2xl text-slate-300">
        Quand t’as zéro énergie, le but c’est pas “devenir une machine”.
        Juste : casser la boucle, 5 à 15 minutes.
      </p>

      <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="a in actions"
          :key="a.title"
          class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 hover:bg-white/7"
        >
          <div class="flex items-center justify-between gap-4">
            <p class="text-sm font-bold text-white">{{ a.title }}</p>
            <span
              class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200"
            >
              {{ a.time }} min
            </span>
          </div>

          <p class="mt-2 text-sm text-slate-300">{{ a.detail }}</p>
        </div>
      </div>
    </section>

    <!-- SECTION: DIGITAL DETOX -->
    <section class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-2xl font-bold">📵 Détox numérique (sans morale)</h2>
      <p class="mt-2 max-w-2xl text-slate-300">
        Juste des réglages concrets pour que ton tel arrête de piloter ton humeur.
      </p>

      <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
          <p class="text-sm font-bold text-white">Mode “No feed”</p>
          <ul class="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Mets Insta/TikTok dans un dossier</li>
            <li>• Enlève les raccourcis de la home</li>
            <li>• Pas de scroll “au réveil”</li>
          </ul>
        </div>

        <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
          <p class="text-sm font-bold text-white">Mode “Actus”</p>
          <ul class="mt-3 space-y-2 text-sm text-slate-300">
            <li>• 1 créneau fixe par jour</li>
            <li>• Pas d’actus avant de dormir</li>
            <li>• Évite le doomscroll</li>
          </ul>
        </div>

        <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
          <p class="text-sm font-bold text-white">Notifications</p>
          <ul class="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Tout off sauf messages importants</li>
            <li>• Badge rouge = piège</li>
            <li>• Silence 1h/jour</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- SECTION: REPLACE -->
    <section id="replace" class="mx-auto max-w-6xl px-6 py-12">
      <div class="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
        <h2 class="text-2xl font-bold text-white">🌗 Remplacer par quelque chose</h2>
        <p class="mt-3 max-w-2xl text-slate-300">
          Ok. Tu coupes le scroll. Mais tu mets quoi à la place ?
          BLOOMER te file des trucs qui marquent : albums, épisodes cultes, créations, images qui respirent.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <NuxtLink
            to="/bloomer"
            class="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-white"
          >
            Aller vers Bloomer →
          </NuxtLink>

          <NuxtLink
            to="/lego-creation"
            class="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-slate-100 hover:bg-white/15"
          >
            Inspirations LEGO
          </NuxtLink>

          <NuxtLink
            to="/shows-cultes"
            class="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-slate-100 hover:bg-white/15"
          >
            Épisodes cultes
          </NuxtLink>
        </div>
      </div>

      <footer class="mt-10 text-center text-sm text-slate-400">
        Le but n’est pas d’être parfait. Juste de remettre un peu de chaleur, petit à petit.
      </footer>
    </section>
  </div>
</template>
