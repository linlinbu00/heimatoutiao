<template>
  <i :class="['toutiao', `toutiao-${icon}`]"></i>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
    },
  },
  mounted() {
    // console.log(this.icon);
  },
};
</script>
<style></style>
