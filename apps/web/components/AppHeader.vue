<template>
  <header
    class="fixed top-0 left-0 z-50 w-full backdrop-blur-sm"
  >
    <div
      class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
    >
      <!-- Logo / nom -->
      <NuxtLink
        to="/"
        class="text-sm font-extrabold tracking-wide text-white drop-shadow"
      >
        BLOOMER
      </NuxtLink>

      <!-- Navigation -->
      <nav class="flex items-center gap-4 text-sm font-semibold text-white">
        <NuxtLink
          to="/bloomer"
          class="opacity-80 transition hover:opacity-100"
        >
          Bloomer
        </NuxtLink>

        <NuxtLink
          to="/lego-creation"
          class="opacity-80 transition hover:opacity-100"
        >
          Créations
        </NuxtLink>

        <NuxtLink
          to="/shows-cultes"
          class="opacity-80 transition hover:opacity-100"
        >
          Séries cultes
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
