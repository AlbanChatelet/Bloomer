<script setup lang="ts">
import HomeHeader from "~/components/HomeHeader.vue"
</script>

<template>
  <div class="h-screen w-screen overflow-hidden">
    <!-- HEADER -->
    <HomeHeader />

    <!-- CONTENU -->
    <div class="flex h-full w-full flex-col-reverse md:flex-row">
      
      <!-- DOOMER -->
      <NuxtLink
        to="/doomer"
        class="group relative flex h-1/2 w-full
               items-end pb-16
               md:h-full md:w-1/2 md:items-center md:pb-0
               justify-center
               transition-all duration-700 ease-in-out
               md:hover:w-[60%]"
      >
        <!-- BG -->
        <div
          class="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style="background-image: url('/images/home/doomer.png')"
        ></div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/60 transition-all duration-700 group-hover:bg-black/40"></div>

        <!-- Texte -->
        <div class="relative z-10 text-center text-white px-6">
          <h1 class="text-4xl font-extrabold tracking-tight md:text-5xl">
            DOOMER
          </h1>

          <p
            class="mt-4 max-w-xs text-sm text-zinc-200
                   opacity-100 md:opacity-0
                   transition-opacity duration-500 md:group-hover:opacity-100"
          >
            <span class="underline-doomer shadow-doomer">
              Monde froid, saturation mentale, perte de sens
            </span>
          </p>
        </div>
      </NuxtLink>

      <!-- BLOOMER -->
      <NuxtLink
        to="/bloomer"
        class="group relative flex h-1/2 w-full
               items-end pb-16
               md:h-full md:w-1/2 md:items-center md:pb-0
               justify-center
               transition-all duration-700 ease-in-out
               md:hover:w-[60%]"
      >
        <!-- BG -->
        <div
          class="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style="background-image: url('/images/home/bloomer.jpg')"
        ></div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-amber-900/40 transition-all duration-700 group-hover:bg-amber-900/20"></div>

        <!-- Texte -->
        <div class="relative z-10 text-center text-white px-6">
          <h1 class="text-4xl font-extrabold tracking-tight md:text-5xl">
            BLOOMER
          </h1>

          <p
            class="mt-4 max-w-xs text-sm text-zinc-100
                   opacity-100 md:opacity-0
                   transition-opacity duration-500 md:group-hover:opacity-100"
          >
            <span class="underline-bloomer shadow-bloomer">
              Créer, ressentir, redonner du relief au réel
            </span>
          </p>
        </div>
      </NuxtLink>

    </div>
  </div>
</template>

<style scoped>
/* base soulignement */
.underline-doomer,
.underline-bloomer {
  position: relative;
  display: inline-block;
  padding-bottom: 6px;
}

/* ligne animée */
.underline-doomer::after,
.underline-bloomer::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

/* couleurs */
.underline-doomer::after {
  background: linear-gradient(
    to right,
    rgba(34, 211, 238, 0.9),
    rgba(34, 211, 238, 0.4)
  );
}

.underline-bloomer::after {
  background: linear-gradient(
    to right,
    rgba(251, 191, 36, 0.4),
    rgba(251, 191, 36, 0.9)
  );
}

/* hover desktop */
@media (min-width: 768px) {
  .group:hover .underline-doomer::after,
  .group:hover .underline-bloomer::after {
    transform: scaleX(1);
  }
}

/* ombres texte */
.shadow-doomer {
  text-shadow:
    0 2px 8px rgba(0, 0, 0, 0.85),
    0 0 12px rgba(34, 211, 238, 0.25);
}

.shadow-bloomer {
  text-shadow:
    0 2px 8px rgba(0, 0, 0, 0.75),
    0 0 12px rgba(251, 191, 36, 0.25);
}
</style>
