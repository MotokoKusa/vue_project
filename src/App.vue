<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <div v-if="!api.key.length" class="pt-6 pb-6">
        <a :href="api.link" class="block text-sm mb-2 font-medium text-gray-700">{{ api.title }}</a>
        <p class="block text-sm pb-2 font-medium text-gray-700"> {{ api.example}}</p>
        <div class="max-w-xs">
          <input
              v-model="api.value"
              type="text"
              name="wallet"
              class="block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          />
        </div>
        <ACryptoBtn @click="api.key = api.value" :txt="api.btn"/>
      </div>

      <div v-if="api.key.length">
        <div class="flex">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm pb-2 font-medium text-gray-700">{{ label.title }}</label>
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
        <ACryptoBtn @click="addCard(this.transformValue)" :disabled="!this.transformValue" :txt="txt"/>
      </div>


      <div v-if="api.key.length" class=" pt-6 pb-6 ">
        <label for="wallet" class="block text-sm pb-2 font-medium text-gray-700">{{ label.title }}</label>
        <div class="max-w-xs">
          <input
              type="text"
              name="wallet"
              v-model.trim="filterValue"

              class="block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          />
        </div>
        <div v-show="this.listCards.length && !this.filterValue.length">
          <label for="wallet" class="block mt-6 text-sm font-medium text-gray-700">{{ label.page }}
            {{ page.count }}</label>
          <div class="max-w-xs flex ">
            <ACryptoBtn v-show="page.count - 1 " @click="page.count--" :txt="page.down"/>
            <ACryptoBtn v-show="page.count * 3 < this.listCards.length && this.listCards.length" @click="page.count++"
                        :txt="page.up"/>
          </div>
        </div>
      </div>


      <ACryptoLine v-show="listCards.length"/>
      <MCryptoCards @deleteCard="deleteCard" :listCards="filterListPages"/>
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
        title: 'Write Crypto-coin',
        page: 'Page',
      },
      api: {
        title: 'Add API_KEY from https://min-api.cryptocompare.com/',
        example:'For example - 3e36cfcc18536f2ccf8b8e66e4cd8b8db649a09338c7bbba4b3b33bf390be6c2',
        link: 'https://min-api.cryptocompare.com/',
        btn: 'add API',
        key: '',
        value: ''
      },
      txt: 'add',
      error: 'This ticker has already been added',
      inputName: 'For example BTC',
      inputValue: '',
      filterValue: '',
      cryptoData: null,
      listInput: [],
      listCards: [],
      page: {
        up: 'next',
        down: 'prev',
        count: 1
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
      if (this.listCards) {
        return this.listCards.map(el => el.coin).join(',')
      } else {
        return null
      }
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
        return this.listInput.filter(el => el.substr(0,this.transformValue.length) === this.transformValue).slice(0, 30)
      } else {
        return []
      }
    },


    filterListPages() {
      if (this.filterValue) {
        return this.updateList.filter(el => el.coin.includes(this.filterValue.toUpperCase().trim()))
      } else {
        return this.updateList.slice((this.page.count - 1) * 3, this.page.count * 3)
      }

    }

  },
  mounted() {
    setInterval(async () => this.cryptoData = await getCryptoData(this.stringCoins,this.api.key), 5000);
    this.listCoins()
  }
}
</script>


