<template>
  <tr>
    <td>
      <div class="table__image">
        <img :src="product.images[0]?.url" :alt="product.title" />
      </div>
    </td>
    <td>{{ product.title }}</td>
    <td>{{ product.subcategory.title }}</td>
    <td>{{ product.quantity }}</td>
    <td>${{ product.price }}</td>
    <td v-if="sales">
      {{ product.sales }}
    </td>
    <td v-else>{{ product.status == 1 ? "Активен" : "Неактивен" }}</td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product } from "./index";
@Component
export default class ProductCard extends Vue {
  @Prop({ required: true }) product!: Product;
  @Prop({ required: false }) sales!: boolean;
}
</script>

<style lang="sass">
@import "@/assets/sass/pages/Products/product.sass"
</style>
