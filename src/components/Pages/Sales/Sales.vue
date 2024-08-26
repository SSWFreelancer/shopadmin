<template>
  <div class="sales">
    <Title title="Продажи" />
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Дата</th>
            <th>Стоимость</th>
            <th>Статус</th>
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
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/pages/Sales/sales.sass"
</style>
