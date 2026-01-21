<template>
  <div class="h-screen w-screen overflow-hidden">
    <div class="flex h-full w-full">
      <!-- DOOMER -->
      <NuxtLink
        to="/doomer"
        class="group relative flex h-full w-1/2 items-center justify-center transition-all duration-700 ease-in-out hover:w-[60%]"
      >
        <!-- Background image -->
        <div
          class="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style="background-image: url('/images/home/doomer.jpg')"
        ></div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/60 transition-all duration-700 group-hover:bg-black/40"></div>

        <!-- Content -->
        <div class="relative z-10 text-center text-white">
          <h1 class="text-5xl font-extrabold tracking-tight">DOOMER</h1>
          <p class="mt-4 max-w-xs text-sm text-zinc-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Monde froid, fatigue mentale, scroll infini.
          </p>
        </div>
      </NuxtLink>

      <!-- BLOOMER -->
      <NuxtLink
        to="/bloomer"
        class="group relative flex h-full w-1/2 items-center justify-center transition-all duration-700 ease-in-out hover:w-[60%]"
      >
        <!-- Background image -->
        <div
          class="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style="background-image: url('/images/home/bloomer.jpg')"
        ></div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-amber-900/40 transition-all duration-700 group-hover:bg-amber-900/20"></div>

        <!-- Content -->
        <div class="relative z-10 text-center text-white">
          <h1 class="text-5xl font-extrabold tracking-tight">BLOOMER</h1>
          <p class="mt-4 max-w-xs text-sm text-zinc-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Création, nostalgie, passions, monde réenchanté.
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
