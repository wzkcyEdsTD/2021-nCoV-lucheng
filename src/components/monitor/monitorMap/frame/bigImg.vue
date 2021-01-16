<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div class="img-view" @click="bigImg">
      <!-- 遮罩层 -->
      <div id="box">
        <img id="img" :src="imgSrc" @click="stop" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["imgSrc"], //接受图片地址
  mounted() {
    // this.moveImg();
  },
  methods: {
    bigImg() {
      // 发送事件
      this.$emit("clickit");
      this.$parent.bigImgShow = false;
    },
    errorImg() {
      let img = event.srcElement;
      img.src = this.noneImg;
      img.onerror = null;
    },
    stop(e) {
      e.stopPropagation();
    }
  }
};
</script>

<style lang="less" scoped>
.img-view {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  margin: auto;
  z-index: 2;

  #box {
    overflow: hidden;
    position: relative;
    border: 1px solid #000;
    // transform: translate(-50%, -50%);
    width: 50%;
    height: 100%;
    left: 25%;
    // top: 50%;
    img {
      // transform: translate(-50%, -50%);
      // width: 50%;
      position: absolute;
      height: 100%;
      width: auto;
      cursor: move;
      // left: 50%;
      // top: 50%;
    }
  }
}

/*不限制图片大小，实现居中*/
</style>