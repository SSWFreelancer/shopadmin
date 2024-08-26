<template>
  <div class="title">{{ title }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/assets/sass/ui/title.sass";
@Component
export default class Title extends Vue {
  @Prop() title!: string;
}
</script>
