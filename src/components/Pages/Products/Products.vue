<template>
  <div class="products">
    <Title title="Товары" />
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
              :class="getHeaderClass('status')"
              class="table-sort"
              @click="sortProducts('status')"
            >
              Статус
            </th>
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
            :sales="product.status == 1 ? 'Активен' : 'Неактивен'"
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
import Title from "@/components/ui/Title.vue";
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
  status: number;
  images: ProductImage[];
}
@Component({
  components: {
    ProductCard,
    Title,
  },
})
export default class Products extends Vue {
  products: Product[] = [];
  loading: boolean = true;

  async mounted() {
    await this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await axios.get<Product[]>(
        "https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category&_sort=title&_order=asc&_start=0&_end=30"
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
