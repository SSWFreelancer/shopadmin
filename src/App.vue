<template>
  <div id="app">
    <div class="wrapper">
      <Aside />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Aside from "./components/Aside.vue";
@Component({
  components: {
    Aside,
  },
})
export default class App extends Vue {}
</script>
