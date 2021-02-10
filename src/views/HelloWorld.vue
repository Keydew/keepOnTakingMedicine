<template>
  <div class="hello">
    <template>
      <drug v-for="drug in drugList" :key="drug.id" :type="drug.type"></drug>
    </template>
    <ball></ball>
  </div>
</template>

<script>
import Ball from "@/components/Ball";
import Drug from "@/components/Drug";
export default {
  name: "HelloWorld",
  components: {
    Ball,
    Drug,
  },
  data() {
    return {
      // resizeTimer: null,
      drugList: [],
      drugNum: 0,

      ballRadius: 25,
    };
  },
  computed: {
    bgColor() {},
  },
  created() {
    this.setClientSize();

    window.onresize = this.setClientSize;

    setInterval(this.addDrug, 5000);
  },
  methods: {
    setClientSize() {
      this.$store.commit(
        "setClientWidth",
        document.documentElement.clientWidth
      );
      this.$store.commit(
        "setClientHeight",
        document.documentElement.clientHeight
      );

      // this.clientWidth = document.documentElement.clientWidth;
      // this.clientHeight = document.documentElement.clientHeight;
    },

    addDrug() {
      let type = Math.ceil(Math.random() * 3);
      this.drugNum++;

      this.drugList.push({
        id: this.drugNum,
        type: type,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hello {
  position: relative;
  background: #70ad98;
  height: 100%;
}
</style>
