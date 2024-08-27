<template>
  <div class="home">
    <div class="home__block">
      <Title title="Панель управления" />
      <div class="home__cards">
        <div class="home__card">
          <div class="home__card-top">
            <span> Заказы </span>
            <router-link to="/sales"> Подробнее </router-link>
          </div>
          <div class="home__overcount">{{ totalCount }}</div>
          <div class="home__monthstats">
            <div
              class="home__stats"
              v-for="order in formattedOrders"
              :key="order.date"
              :style="{ height: (order.count / biggestCount) * 100 + '%' }"
            >
              <div class="home__dec">
                {{ order.date }}
                <span>
                  {{ order.count }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="home__card">
          <div class="home__card-top">
            <span> Продажи </span>
          </div>
          <div class="home__overcount">${{ totalSales }}</div>
          <div class="home__monthstats">
            <div
              class="home__stats"
              v-for="sales in formattedSales"
              :key="sales.date"
              :style="{ height: (sales.count / biggestSale) * 100 + '%' }"
            >
              <div class="home__dec">
                {{ sales.date }}
                <span> ${{ sales.count.toLocaleString("en-EN") }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="home__card">
          <div class="home__card-top">
            <span> Клиенты </span>
          </div>
          <div class="home__overcount">{{ totalClients }}</div>
          <div class="home__monthstats">
            <div
              class="home__stats"
              v-for="clients in formattedClients"
              :key="clients.date"
              :style="{
                height: (clients.count / biggestClientCount) * 100 + '%',
              }"
            >
              <div class="home__dec">
                {{ clients.date }}
                <span> {{ clients.count }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home__block">
      <Title title="Лидеры продаж" />
      <Bestsellers />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Title from "@/components/ui/Title.vue";
import Bestsellers from "./BestSellers.vue";
import { Data } from "./index";

@Component({
  components: {
    Title,
    Bestsellers,
  },
})
export default class Home extends Vue {
  orders: Data = {};
  mounted() {
    this.fetchOrders();
    this.fetchSales();
    this.fetchClients();
  }

  async fetchOrders() {
    try {
      const response = await axios.get<Data>(
        "https://course-js.javascript.ru/api/dashboard/orders?from=2024-07-27T05%3A59%3A53.100Z&to=2024-08-26T05%3A59%3A53.101Z"
      );
      this.orders = response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  get formattedOrders() {
    return Object.entries(this.orders).map(([date, count]) => {
      const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return { date: formattedDate, count };
    });
  }

  get biggestCount() {
    return Math.max(...Object.values(this.orders));
  }
  get totalCount() {
    return Object.values(this.orders).reduce(
      (total, count) => total + count,
      0
    );
  }

  sales: Data = {};
  async fetchSales() {
    try {
      const response = await axios.get<Data>(
        "https://course-js.javascript.ru/api/dashboard/sales?from=2024-07-27T06%3A44%3A34.659Z&to=2024-08-26T06%3A44%3A34.659Z"
      );
      this.sales = response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  get formattedSales() {
    return Object.entries(this.sales).map(([date, count]) => {
      const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return { date: formattedDate, count };
    });
  }
  get biggestSale() {
    return Math.max(...Object.values(this.sales));
  }
  get totalSales() {
    return Object.values(this.sales)
      .reduce((sales, count) => sales + count, 0)
      .toLocaleString("en-EN");
  }

  clients: Data = {};
  async fetchClients() {
    try {
      const response = await axios.get<Data>(
        "https://course-js.javascript.ru/api/dashboard/customers?from=2024-07-27T06%3A44%3A34.659Z&to=2024-08-26T06%3A44%3A34.659Z"
      );
      this.clients = response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  get formattedClients() {
    return Object.entries(this.clients).map(([date, count]) => {
      const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return { date: formattedDate, count };
    });
  }
  get biggestClientCount() {
    return Math.max(...Object.values(this.clients));
  }
  get totalClients() {
    return Object.values(this.clients).reduce(
      (clients, count) => clients + count,
      0
    );
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/pages/Home/home.sass"
</style>
