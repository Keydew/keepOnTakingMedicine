<template>
  <div v-if="isShow" class="drug-wrap" :style="{ left: left, top: top }">
    <div :class="['drug', { disappear: disappear }]">
      <div
        class="drug-color"
        :style="{ backgroundColor: drugtype && drugtype.color }"
      ></div>
    </div>
    <div
      v-if="disappear"
      class="score"
      :style="{ color: drugtype && drugtype.color }"
    >
      +10
    </div>
  </div>
</template>

<script>
import DrugInfo from "../assets/drugs";
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      timer: null,

      drugtype: null,

      isShow: true,
      disappear: false,

      posX: null,
      posY: null,
    };
  },
  computed: {
    left() {
      return this.posX ? this.posX - 10 + "px" : "";
    },
    top() {
      return this.posY ? this.posY - 5 + "px" : "";
    },
    ballX() {
      return this.$store.state.x;
    },
    ballY() {
      return this.$store.state.y;
    },
    ballRadius() {
      return this.$store.state.radius;
    },
  },
  created() {
    this.posX = 100;
    this.posY = 100;

    this.drugtype = DrugInfo[this.type];

    let _self = this;

    this.timer = setInterval(() => {
      if (
        (_self.posX - _self.ballX) ** 2 + (_self.posY - _self.ballY) ** 2 <=
        (_self.ballRadius + 10) ** 2
      ) {
        clearInterval(_self.timer);
        _self.disappear = true;
        this.$emit("meet", {
          score: _self.drugtype.score,
          radius: _self.drugtype.radius,
          quit: _self.drugtype.quit,
        });
        // this.$store.commit("addScore", _self.drugtype.score);
        // this.$store.commit("addRadius", _self.drugtype.radius);

        setTimeout(() => {
          _self.isShow = false;
        }, 1000);
      }
    }, 30);
  },
  methods: {},
};
</script>

<style lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fadeOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes textFade {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  20% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(0, -10px);
    opacity: 0;
  }
}

.drug-wrap {
  position: absolute;
  top: 20px;
  left: 20px;
  .drug {
    width: 20px;
    height: 10px;
    border-radius: 5px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.5);
    animation: rotate 3s linear infinite;
    &.disappear {
      animation: fadeOut 1s linear both;
    }
    .drug-color {
      width: 50%;
      height: 100%;
      background: #da2505;
    }
  }
  .score {
    position: absolute;
    top: -12px;
    left: 0;
    color: #f7a46e;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 2px 2px 2px #0a4e0a;
    z-index: 3;
    animation: textFade 1s ease both;
  }
}
</style>