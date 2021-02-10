<template>
  <div
    class="ball"
    :style="{
      width: 2 * radius + 'px',
      height: 2 * radius + 'px',
      left: left,
      top: top,
    }"
    @touchstart="startMove"
    @touchmove="moving"
    @touchend="endMove"
  >
    <div class="ball-mid"></div>
    <div class="ball-pop"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      //   x: null,
      //   y: null,
      isMoving: false,
    };
  },
  computed: {
    ...mapState(["x", "y", "radius", "clientWidth", "clientHeight", "score"]),
    left() {
      if (this.x) {
        return this.x - this.radius + "px";
      } else {
        return "";
      }
    },
    top() {
      if (this.y) {
        return this.y - this.radius + "px";
      } else {
        return "";
      }
    },
  },
  watch: {
    clientWidth(val, oldVal) {
      if (this.x + this.radius == oldVal) {
        this.setX(val - this.radius);
        // this.x = val - this.radius;
      }
    },
    clientHeight(val, oldVal) {
      if (this.y + this.radius == oldVal) {
        this.setY(val - this.radius);
        // this.y = val - this.radius;
      }
    },
  },
  created() {
    // this.clientWidth = document.documentElement.clientWidth;
    // this.clientHeight = document.documentElement.clientHeight;

    this.moveTo(this.clientWidth / 2, this.clientHeight / 2);

    // this.x = this.clientWidth / 2;
    // this.y = this.clientHeight / 2;
  },
  methods: {
    ...mapMutations(["setX", "setY", "addScore"]),
    startMove(e) {
      this.isMoving = true;
    },
    endMove() {
      this.isMoving = false;
    },
    moving(e) {
      if (this.isMoving) {
        let x = e.changedTouches[0].clientX,
          y = e.changedTouches[0].clientY;

        x < this.radius && (x = this.radius);
        x > this.clientWidth - this.radius &&
          (x = this.clientWidth - this.radius);

        y < this.radius && (y = this.radius);
        y > this.clientHeight - this.radius &&
          (y = this.clientHeight - this.radius);

        setTimeout(() => {
          this.moveTo(x, y);
        }, 50);
      }
    },
    moveTo(x, y) {
      this.setX(x);
      this.setY(y);
      //   this.x = x;
      //   this.y = y;
    },
  },
};
</script>

<style lang="scss">
@keyframes shining {
  0% {
    transform: scale(0.75);
  }
  10% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(0.95);
  }
  90% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(0.75);
  }
}

@keyframes shaking {
  0% {
    transform: translate(0, -5px);
  }
  8% {
    transform: translate(-2.5px, -4.3px);
  }
  17% {
    transform: translate(-4.3px, -2.5px);
  }
  25% {
    transform: translate(-5px, 0);
  }
  31% {
    transform: translate(-4.3px, 2.5px);
  }
  42% {
    transform: translate(-2.5px, 4.3px);
  }
  50% {
    transform: translate(0, 5px);
  }
  58% {
    transform: translate(2.5px, 4.3px);
  }
  67% {
    transform: translate(4.3px, 2.5px);
  }
  75% {
    transform: translate(5px, 0);
  }
  83% {
    transform: translate(4.3px, -2.5px);
  }
  92% {
    transform: translate(2.5px, -4.3px);
  }
  100% {
    transform: translate(0, -5px);
  }
}

.ball {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  animation: shaking 3s linear infinite;
  transition: width 0.5s ease, height 0.5s ease;
  .ball-mid {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
  }
  .ball-pop {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #ffffff;
    animation: shining 2s ease infinite;
  }
}
</style>