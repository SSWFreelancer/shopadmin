<template>
  <div class="subtitle">{{ subtitle }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/assets/sass/ui/subtitle.sass";
@Component
export default class Subtitle extends Vue {
  @Prop() subtitle!: string;
}
</script>
