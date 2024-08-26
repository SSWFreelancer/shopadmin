<template>
  <div class="bestsellers">
    <ProductCard />
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Количество</th>
            <th>Цена</th>
            <th>Продажи</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <div class="table__image">
                <img :src="product.images[0]?.url" :alt="product.title" />
              </div>
            </td>
            <td>{{ product.title }}</td>
            <td>{{ product.subcategory.title }}</td>
            <td>{{ product.quantity }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.sales }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.table
    overflow-x: auto
    @media(max-width: 1023px)
        width: calc(100% + 24px)
        margin-left: -12px
        padding: 0 12px
    & table
        min-width: 750px
        width: 100%
        border-collapse: collapse
        font-size: 16px
        background: #fff
        & th, td
            padding: 15px
        & th
            text-align: left
            color: #c2cfe0
            font-weight: 500
        & tr
            border-top: 1px solid #eff1f4
        & thead tr
            border: none
    &__image
        width: 30px
        margin: 0 auto
        & img
            width: 100%
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import ProductCard from "../Products/ProductCard.vue";
interface ProductImage {
  url: string;
  source: string;
}

interface ProductSubcategory {
  title: string;
}
interface Product {
  id: string;
  title: string;
  subcategory: ProductSubcategory;
  quantity: number;
  price: number;
  sales: number;
  images: ProductImage[];
}
@Component({
  components: {
    ProductCard,
  },
})
export default class Bestsellers extends Vue {
  products: Product[] = [];
  loading: boolean = true;

  async mounted() {
    await this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await axios.get<Product[]>(
        "https://course-js.javascript.ru/api/dashboard/bestsellers?from=2024-07-27T07%3A30%3A20.857Z&to=2024-08-26T07%3A30%3A20.857Z&_sort=title&_order=asc&_start=0&_end=30"
      );
      this.products = response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
