<template>
  <button
      type="button"
      class="my-4 mr-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
    <!-- Heroicon name: solid/mail -->
    {{ txt }}
  </button>
</template>

<script>
export default {
  name: "ACryptoBtn",
  props: {
    txt: {
      type: String
    },
    pic: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>