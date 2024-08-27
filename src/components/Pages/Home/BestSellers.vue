<template>
  <div class="bestsellers">
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Фото</th>
            <th
              class="table-sort"
              :class="getHeaderClass('title')"
              @click="sortProducts('title')"
            >
              Название
            </th>
            <th>Категория</th>
            <th
              class="table-sort"
              :class="getHeaderClass('quantity')"
              @click="sortProducts('quantity')"
            >
              Количество
            </th>
            <th
              :class="getHeaderClass('price')"
              class="table-sort"
              @click="sortProducts('price')"
            >
              Цена
            </th>
            <th
              :class="getHeaderClass('sales')"
              class="table-sort"
              @click="sortProducts('sales')"
            >
              Продажи
            </th>
          </tr>
        </thead>
        <tbody>
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            :sales="true"
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
import { Product } from "./index";

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

  sortKey: string = "";
  sortOrder: number = 1;

  sortProducts(key: string) {
    if (this.sortKey === key) {
      this.sortOrder *= -1;
    } else {
      this.sortKey = key;
      this.sortOrder = 1;
    }

    this.products.sort((a, b) => {
      const aValue = this.getNestedValue(a, key);
      const bValue = this.getNestedValue(b, key);

      if (aValue < bValue) return -1 * this.sortOrder;
      if (aValue > bValue) return 1 * this.sortOrder;
      return 0;
    });
  }

  getNestedValue(obj: any, key: string) {
    return key.split(".").reduce((o, i) => o[i], obj);
  }
  getHeaderClass(key: string) {
    return {
      active: this.sortKey === key,
      up: this.sortKey === key && this.sortOrder === 1,
      down: this.sortKey === key && this.sortOrder === -1,
    };
  }
}
</script>
