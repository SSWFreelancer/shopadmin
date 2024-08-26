<template>
  <div class="sales">
    <Title title="Продажи" />
    <div class="table">
      <table>
        <thead>
          <tr>
            <th
              class="table-sort"
              :class="getHeaderClass('id')"
              @click="sortProducts('id')"
            >
              ID
            </th>
            <th
              class="table-sort"
              :class="getHeaderClass('user')"
              @click="sortProducts('user')"
            >
              Клиент
            </th>
            <th
              class="table-sort"
              :class="getHeaderClass('createdAt')"
              @click="sortProducts('createdAt')"
            >
              Дата
            </th>
            <th
              class="table-sort"
              :class="getHeaderClass('totalCost')"
              @click="sortProducts('totalCost')"
            >
              Стоимость
            </th>
            <th
              class="table-sort"
              :class="getHeaderClass('delivery')"
              @click="sortProducts('delivery')"
            >
              Статус
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sale in salesData" :key="sale.id">
            <td>{{ sale.id }}</td>
            <td>{{ sale.user }}</td>
            <td>{{ formatDate(sale.createdAt) }}</td>
            <td>${{ sale.totalCost }}</td>
            <td>{{ sale.delivery }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Title from "@/components/ui/Title.vue";
import axios from "axios";
interface SalesData {
  id: string;
  user: string;
  createdAt: string;
  totalCost: number;
  delivery: string;
}
@Component({
  components: {
    Title,
  },
})
export default class Sales extends Vue {
  salesData: SalesData[] = [];
  async mounted() {
    await this.fetchSalesData();
  }

  async fetchSalesData() {
    try {
      const response = await axios.get<SalesData[]>(
        "https://course-js.javascript.ru/api/rest/orders?createdAt_gte=2024-07-27T10%3A29%3A37.086Z&createdAt_lte=2024-08-26T10%3A29%3A37.086Z&_sort=createdAt&_order=desc&_start=0&_end=30"
      );
      this.salesData = response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    } as const;
    return new Intl.DateTimeFormat("ru-RU", options).format(date);
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

    this.salesData.sort((a, b) => {
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

<style lang="sass" scoped>
@import "@/assets/sass/pages/Sales/sales.sass"
</style>
