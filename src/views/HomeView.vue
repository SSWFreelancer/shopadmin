<template>
  <Home />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Home from "@/components/Pages/Home/Home.vue";
@Component({
  components: {
    Home,
  },
})
export default class View extends Vue {}
</script>
