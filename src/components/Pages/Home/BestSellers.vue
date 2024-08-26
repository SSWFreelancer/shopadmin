<template>
  <div class="bestsellers">
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
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :imgsrc="product.images[0]?.url"
            :title="product.title"
            :subcategoryTitle="product.subcategory.title"
            :quantity="product.quantity"
            :price="product.price"
            :sales="product.sales"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

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
