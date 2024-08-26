<template>
  <Categories />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Categories from "@/components/Pages/Categories/Categories.vue";
@Component({
  components: {
    Categories,
  },
})
export default class CategoriesView extends Vue {}
</script>
