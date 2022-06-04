<template>
  <section class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">

    <ACryptoCard @deleteCard="deleteCard" :coin="el.coin" :money="el.money" :cost="el.cost"
                 v-for="(el, idx) in listCards" :key="idx"/>
  </section>
</template>

<script>
import ACryptoCard from "@/components/atoms/a_crypto_card/a_crypto_card";

export default {
  name: "MCryptoCards",
  props: {
    listCards: {
      type: Array
    }
  },
  components: {
    ACryptoCard,
  },
  methods: {
    deleteCard(name){
      this.$emit('deleteCard',name)
    }
  }
}
</script>

<style scoped>

</style>