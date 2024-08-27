<template>
  <Product />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Product from "@/components/Pages/Product/Product.vue";
@Component({
  components: {
    Product,
  },
})
export default class ProductView extends Vue {}
</script>
