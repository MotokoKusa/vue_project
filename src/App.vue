<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <div>
        <div class="flex">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm font-medium text-gray-700">{{ label.title }}</label>
            <input
                type="text"
                name="wallet"
                id="wallet"
                class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                :placeholder="inputName"
                v-model.trim="inputValue"
                @keydown.enter="addCard(this.transformValue)"
            />
            <ACryptoList v-show="this.filterListCoins.length" @addClickCoin="addClickCoin" :list="filterListCoins"/>
            <div v-show="includeCards" class="text-sm text-red-600">{{ error }}</div>
          </div>
        </div>
        <ACryptoBtn @click="addCard(this.transformValue)" :txt="txt" />
      </div>


      <div class=" pt-6 pb-6">
        <label for="wallet" class="block text-sm font-medium text-gray-700">{{ label.title }}</label>
        <div class="max-w-xs">
          <input
              type="text"
              name="wallet"

              class="block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          />
        </div>
        <label for="wallet" class="block mt-6 text-sm font-medium text-gray-700">{{ label.page }}</label>
        <div class="max-w-xs flex ">
          <ACryptoBtn :txt="page.down"/>
          <ACryptoBtn :txt="page.up"/>
        </div>
      </div>


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
import getCryptoCoins from "@/api/getCryptoCoins";
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
      label: {
        title:'Write Crypto-coin',
        page: 'Pages'
      } ,
      txt: 'add',
      error: 'This ticker has already been added',
      inputName: 'For example BTC',
      inputValue: '',
      cryptoData: null,
      listInput: [],
      listCards: [],
      page: {
        up:'next',
        down:'prev'
      }
    }
  },
  methods: {
    addCard(nameCoin) {
      let card = {
        coin: nameCoin,
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
    addClickCoin(coin) {
      this.addCard(coin)
    },
    async listCoins() {
      this.listInput = await getCryptoCoins(this.listInput)
      return this.listInput = Object.keys(this.listInput)
    }


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
    filterListCoins() {
      if (this.inputValue) {
        return this.listInput.filter(el => el.includes(this.transformValue)).slice(0, 10)
      } else {
        return []
      }

    }

  },
  mounted() {
    setInterval(async () => this.cryptoData = await getCryptoData(this.stringCoins), 5000);
    this.listCoins()
  }
}
</script>


