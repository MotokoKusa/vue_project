<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <section>
        <div class="flex">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm font-medium text-gray-700">{{ label }}</label>
            <input
                type="text"
                name="wallet"
                id="wallet"
                class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                :placeholder="inputName"
                v-model.trim="inputValue"
                @keydown.enter="addCard()"
            />
            <ACryptoList v-show="listCards.length" :list="listCards"/>
            <div v-show="includeCards" class="text-sm text-red-600">{{ error }}</div>
          </div>
        </div>
        <ACryptoBtn @click="addCard()" :txt="txt"/>
      </section>

      <ACryptoLine v-show="listCards.length"/>

      <MCryptoCards @deleteCard="deleteCard" :listCards="updateList"/>


      <ACryptoLine v-show="listCards.length"/>
      <!--      <SCryptoGraph/>-->
    </div>
  </div>
</template>

<script>
import ACryptoBtn from "@/components/atoms/a_crypto_btn/a_crypto_btn";
import ACryptoList from "@/components/atoms/a_crypto_list/a_crypto_list";
import MCryptoCards from "@/components/molecule/m_crypto_cards/m_crypto_cards";
import ACryptoLine from "@/components/atoms/a_crypto_line/a_crypto_line";
import getCryptoData from './api/getCryptoData'
// import MCryptoGraph from "@/components/m_crypto_graph/m_crypto_graph";

export default {
  name: 'App',
  components: {
    MCryptoCards,
    ACryptoLine,
    ACryptoBtn,
    ACryptoList,
    // MCryptoGraph,
  },
  data() {
    return {
      label: 'Тикер',
      txt: 'Добавить',
      error: 'Такой тикер уже добавлен',
      inputName: 'Например BTC',
      inputValue: '',
      cryptoData: null,
      listInput: [],
      listCards: [],
    }
  },
  methods: {
    addCard() {
      let card = {
        coin: this.transformValue,
        money: 'USD',
        cost: 'loading'
      };

      if (card.coin.length && !this.listCards.find(el => el.coin === card.coin)) {
        this.listCards.push(card)
        this.inputValue = ''
      }
    },
    deleteCard(name) {
      this.listCards = this.listCards.filter(el => el.coin !== name)
    },


  },
  computed: {
    transformValue() {
      return this.inputValue.toUpperCase().trim()
    },
    includeCards() {
      return this.listCards.find(el => el.coin === this.transformValue)
    },
    stringCoins() {
      return this.listCards.map(el => el.coin).join(',')
    },
    updateList() {

      return this.listCards.map(el => {
        if (this.cryptoData !== null && this.cryptoData[el.coin]) {
          el.cost = this.cryptoData[el.coin].USD
          return el
        } else {
          el.cost = '-'
          return el
        }
      })

    },

  },
  mounted() {
    setInterval(async () => this.cryptoData = await getCryptoData(this.stringCoins), 3000)
  }
}
</script>


