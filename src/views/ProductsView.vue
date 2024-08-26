<template>
  <Products />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Products from "@/components/Pages/Products/Products.vue";
@Component({
  components: {
    Products,
  },
})
export default class ProductsView extends Vue {}
</script>
