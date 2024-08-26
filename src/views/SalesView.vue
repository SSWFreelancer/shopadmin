<template>
  <Sales />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sales from "@/components/Pages/Sales/Sales.vue";
@Component({
  components: {
    Sales,
  },
})
export default class SalesView extends Vue {}
</script>
