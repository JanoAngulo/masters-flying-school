<script setup lang="ts">
// Same toggletip markup as the ported fleet tables, so usePageEnhancements wires it up unchanged.
// The slot holds the last word of the term: it stays on one line with the button, so the "?" never wraps alone.
// The wrapper sits on the text baseline, then top lifts the 20px circle so its center meets the middle of the capitals at any font size.
defineProps<{ id: string; term: string; note: string }>()
</script>

<template>
  <span class="whitespace-nowrap"><slot /><span class="relative inline-block top-[calc(4.3px_-_.36em)]"><button type="button" data-tip aria-expanded="false" :aria-controls="id" :aria-label="`What does ${term} mean?`" class="-my-3 -ml-2 -mr-3 inline-flex h-11 w-11 items-center justify-center text-ink-muted hover:text-red"><span class="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[11px] font-bold leading-none" aria-hidden="true">?</span></button><span :id="id" role="note" hidden class="absolute left-0 top-full z-20 mt-1 block w-64 whitespace-normal rounded-md bg-navy p-3 text-left text-sm font-normal leading-snug text-white shadow-lg">{{ note }}</span></span></span>
</template>
