<template>
  <tr>
    <td>
      <div class="table__image">
        <img :src="imgsrc" :alt="title" />
      </div>
    </td>
    <td>{{ title }}</td>
    <td>{{ subcategoryTitle }}</td>
    <td>{{ quantity }}</td>
    <td>${{ price }}</td>
    <td>{{ sales }}</td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class ProductCard extends Vue {
  @Prop() imgsrc!: string;
  @Prop() title!: string;
  @Prop() subcategoryTitle!: string;
  @Prop() quantity!: number;
  @Prop() price!: number;
  @Prop() sales!: number;
}
</script>

<style lang="sass">
@import "@/assets/sass/pages/Products/product.sass"
</style>
