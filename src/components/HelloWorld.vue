<template>
  <div class="message-list" ref="messageList">
    <div class="message-wrapper" ref="messageWrapper">
      <div class="message-item" v-for="(message, index) in extendedMessages" :key="index">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      extendedMessages: [],
      scrollInterval: null
    };
  },

watch: {
  messages: {
    handler() {
      this.extendedMessages = [...this.messages, ...this.messages];
      this.stopScrolling();
      this.startScrolling();
    },
    deep: true
  }
},
  mounted() {
    this.extendedMessages = [...this.messages, ...this.messages];
    this.startScrolling();
  },
  beforeDestroy() {
    this.stopScrolling();
  },
  methods: {
    startScrolling() {
      const messageList = this.$refs.messageList;
    const messageWrapper = this.$refs.messageWrapper;
    let scrollAmount = 0;

    const scroll = () => {
      scrollAmount += 1;
      messageWrapper.style.transform = `translateY(-${scrollAmount}px)`;

      if (scrollAmount >= messageWrapper.clientHeight / 2) {
        scrollAmount = 0;
      }

      this.scrollInterval = requestAnimationFrame(scroll);
    };

    this.scrollInterval = requestAnimationFrame(scroll);
    },
    stopScrolling() {
      cancelAnimationFrame(this.scrollInterval);
    }
  }
};
</script>

<style>
.message-list {
  overflow: hidden;
  height: 200px; /* 根据需要调整高度 */
  position: relative;
}
.message-wrapper {
  transition: transform 0.1s linear;
}
.message-item {
  height: 50px; /* 根据需要调整每个消息项的高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
