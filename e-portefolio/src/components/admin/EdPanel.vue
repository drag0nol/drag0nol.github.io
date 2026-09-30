<script setup>
// Bloc titré regroupant des champs. Les actions éventuelles (slot « actions ») sont alignées à droite du titre.
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<template>
  <section class="ed-panel">
    <header class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 class="text-lg font-bold text-indigo-200">{{ title }}</h3>
        <p v-if="description" class="ed-hint mt-0.5">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="flex items-center gap-2"><slot name="actions" /></div>
    </header>
    <slot />
  </section>
</template>
