<template>
  <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
    <span @click="addClickCoinEl(el)" v-for="(el, idx) in list" :key="idx"
          class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              {{ el }}
    </span>
  </div>
</template>

<script>


export default {
  name: "ACryptoList",
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    addClickCoinEl(coin) {
      this.$emit('addClickCoin', coin)
    },
  }
}
</script>

<style scoped>

</style>