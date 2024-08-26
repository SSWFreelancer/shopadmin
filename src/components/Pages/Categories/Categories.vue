<template>
  <div class="categories">
    <Title title="Категории товаров" />
    <Subtitle
      subtitle="Подкатегории можно перетаскивать, меняя их порядок внутри своей категории."
    />
    <div class="categories__cards">
      <div
        class="categories__card"
        v-for="category in categories"
        :key="category.id"
        :class="{ open: category.isOpen }"
      >
        <div class="categories__top" @click="toggleCategory(category.id)">
          <p>{{ category.title }}</p>
          <span>{{ category.count }} продуктов</span>
        </div>
        <div class="categories__items">
          <draggable v-model="category.subcategories" class="draggable-list">
            <div
              class="categories__item"
              v-for="subcategory in category.subcategories"
              :key="subcategory.id"
            >
              <p>{{ subcategory.title }}</p>
              <span>{{ subcategory.count }} продуктов</span>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Title from "@/components/ui/Title.vue";
import Subtitle from "@/components/ui/Subtitle.vue";
import axios from "axios";
import draggable from "vuedraggable";
interface Subcategory {
  id: string;
  title: string;
  count: number;
}
interface Category {
  id: string;
  title: string;
  subcategory: Subcategory[];
  count: number;
  isOpen?: boolean;
}

@Component({
  components: {
    Title,
    Subtitle,
    draggable,
  },
})
export default class Categories extends Vue {
  loading: boolean = true;
  categories: Category[] = [];
  async mounted() {
    await this.fetchCategories();
  }

  async fetchCategories() {
    try {
      const response = await axios.get<Category[]>(
        "https://course-js.javascript.ru/api/rest/categories?_sort=weight&_refs=subcategory"
      );
      this.categories = response.data.map((category) => ({
        ...category,
        isOpen: true,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      this.loading = false;
    }
  }
  toggleCategory(categoryId: string) {
    const category = this.categories.find((c) => c.id === categoryId);
    if (category) {
      category.isOpen = !category.isOpen;
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/pages/Categories/categories.sass"
</style>
