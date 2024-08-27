<template>
  <div class="products">
    <Title title="Товары" />
    <div class="products__filter">
      <div class="products__column">
        <span> Сортировать по: </span>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Название товара"
        />
      </div>
      <div class="products__column">
        <span> Цена: </span>
        <div class="products__rangewrapper">
          <span> ${{ this.priceRange[0] }} </span>
          <div class="products__range" ref="rangeSlider"></div>
          <span> ${{ this.priceRange[1] }} </span>
        </div>
      </div>
      <div class="products__column">
        <span> Статус: </span>
        <select v-model="statusFilter">
          <option value="Любой">Любой</option>
          <option value="Активный">Активный</option>
          <option value="Неактивный">Неактивный</option>
        </select>
      </div>
    </div>
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
          <td
            class="table__notfound"
            v-if="filteredProducts.length === 0"
            colspan="6"
          >
            Нет данных
          </td>
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import ProductCard from "../Products/ProductCard.vue";
import Title from "@/components/ui/Title.vue";
import { Product } from "./index";
@Component({
  components: {
    ProductCard,
    Title,
  },
})
export default class Products extends Vue {
  products: Product[] = [];
  loading: boolean = true;

  minPrice: number = 0;
  maxPrice: number = 250;
  priceRange: [number, number] = [this.minPrice, this.maxPrice];
  async mounted() {
    await this.fetchProducts();
    const slider = this.$refs.rangeSlider as HTMLElement & { noUiSlider?: any };
    noUiSlider.create(slider, {
      start: [this.minPrice, this.maxPrice],
      connect: true,
      step: 1,
      range: {
        min: this.minPrice,
        max: this.maxPrice,
      },
    });

    slider.noUiSlider?.on("update", (values: string[]) => {
      this.priceRange = values.map((value) => parseFloat(value)) as [
        number,
        number
      ];
    });
  }

  async fetchProducts() {
    try {
      const response = await axios.get<Product[]>(
        "https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category&_sort=title&_order=asc&_start=0&_end=30"
      );
      this.products = response.data;
      this.minPrice = Math.min(...this.products.map((p) => p.price));
      this.maxPrice = Math.max(...this.products.map((p) => p.price));
      this.priceRange = [this.minPrice, this.maxPrice];
      const slider = this.$refs.rangeSlider as HTMLElement & {
        noUiSlider?: any;
      };
      slider.noUiSlider?.updateOptions({
        range: {
          min: this.minPrice,
          max: this.maxPrice,
        },
        start: [this.minPrice, this.maxPrice],
      });
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

  searchQuery: string = "";
  statusFilter: string = "Любой";

  get filteredProducts() {
    return this.products.filter((product) => {
      const matchesName = product.title
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= this.priceRange[0] &&
        product.price <= this.priceRange[1];
      const matchesStatus =
        this.statusFilter === "Любой" ||
        (this.statusFilter === "Активный" && product.status === 1) ||
        (this.statusFilter === "Неактивный" && product.status === 0);

      return matchesName && matchesPrice && matchesStatus;
    });
  }
}
</script>
<style lang="sass">
@import "@/assets/sass/pages/Products/product.sass"
</style>
