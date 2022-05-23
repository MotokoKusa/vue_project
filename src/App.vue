<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <section>
        <div class="flex">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm font-medium text-gray-700"
            >Тикер</label
            >
            <div class="mt-1 relative rounded-md shadow-md">
              <input
                  @keydown.enter="addCoin(inptname)"
                  v-model='inptname'
                  type="text"
                  name="wallet"
                  id="wallet"
                  class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  placeholder="Например DOGE"
              />
            </div>
            <div v-show="this.inptname.length" class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
            <span
                v-for="(el,idx) in filterArr"
                :key="idx"
                @click="addCoin(el)"
                class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              {{ el }}
            </span>
            </div>
            <div class="text-sm text-red-600">
              {{ this.inptnameError }}
            </div>
          </div>
        </div>
        <button
            @click="addCoin(inptname)"
            type="button"
            class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <!-- Heroicon name: solid/mail -->
          <svg
              class="-ml-0.5 mr-2 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#ffffff"
          >
            <path
                d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            ></path>
          </svg>
          Добавить
        </button>

        <div>
          <div class="mt-1 max-w-xs relative rounded-md shadow-md">
            <input
                v-model="inptFilt"
                class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="Например"
            />
          </div>
          <div>
            <button
                @click="visionFilterPrev()"
                v-show="this.page > 1"
                class="my-4  inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >page down
            </button>
            <button
                @click="visionFilterNext()"
                v-show="visionFilter.length > 2"
                class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >page up
            </button>
          </div>


        </div>
      </section>

      <hr v-show="this.listarr.length" class="w-full border-t border-gray-600 my-4"/>
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div v-for="(el,idx) in visionFilter"
             :key="idx"

             class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
        >
          <div class="px-4 py-5 sm:p-6 text-center">
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ el.coin }} - USD
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              {{ el.price }}
            </dd>
          </div>
          <div class="w-full border-t border-gray-200"></div>
          <button
              @click="deleteItem(idx)"
              class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
          >
            <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#718096"
                aria-hidden="true"
            >
              <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
              ></path>
            </svg>
            Удалить
          </button>
        </div>

      </dl>
      <hr v-show="this.listarr.length" class="w-full border-t border-gray-600 my-4"/>
      <!--      <section class="relative">-->
      <!--        <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">-->
      <!--          VUE - USD-->
      <!--        </h3>-->
      <!--        <div class="flex items-end border-gray-600 border-b border-l h-64">-->
      <!--          <div-->
      <!--              class="bg-purple-800 border w-10 h-24"-->
      <!--          ></div>-->
      <!--          <div-->
      <!--              class="bg-purple-800 border w-10 h-32"-->
      <!--          ></div>-->
      <!--          <div-->
      <!--              class="bg-purple-800 border w-10 h-48"-->
      <!--          ></div>-->
      <!--          <div-->
      <!--              class="bg-purple-800 border w-10 h-16"-->
      <!--          ></div>-->
      <!--        </div>-->
      <!--        <button-->
      <!--            type="button"-->
      <!--            class="absolute top-0 right-0"-->
      <!--        >-->
      <!--          <svg-->
      <!--              xmlns="http://www.w3.org/2000/svg"-->
      <!--              xmlns:xlink="http://www.w3.org/1999/xlink"-->
      <!--              xmlns:svgjs="http://svgjs.com/svgjs"-->
      <!--              version="1.1"-->
      <!--              width="30"-->
      <!--              height="30"-->
      <!--              x="0"-->
      <!--              y="0"-->
      <!--              viewBox="0 0 511.76 511.76"-->
      <!--              style="enable-background:new 0 0 512 512"-->
      <!--              xml:space="preserve"-->
      <!--          >-->
      <!--          <g>-->
      <!--            <path-->
      <!--                d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"-->
      <!--                fill="#718096"-->
      <!--                data-original="#000000"-->
      <!--            ></path>-->
      <!--          </g>-->
      <!--        </svg>-->
      <!--        </button>-->
      <!--      </section>-->
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      inptname: '',
      inptprice: null,
      listarr: [],
      inptarr: [],
      inptnameError: null,
      page: 1,
      startSlice:0,
      inptFilt: ''
    }
  },
  methods: {
    addCoin: function (elem) {

      let listobj = {
        coin: '',
        price: 'loading'
      };

      this.inptname = elem.toUpperCase().trim()
      let url = `https://min-api.cryptocompare.com/data/price?fsym=${this.inptname}&tsyms=USD&e=Coinbase&extraParams=3e36cfcc18536f2ccf8b8e66e4cd8b8db649a09338c7bbba4b3b33bf390be6c2`;

      if (this.inptname.length && !this.listarr.find(el => el.coin === this.inptname)) {

        listobj.coin = this.inptname
        this.listarr.push(listobj)


        setInterval(async () => {
          let prom = await fetch(url);
          let jsonProm = await prom.json();
          this.listarr.find(el => el.coin === listobj.coin).price = jsonProm.USD
        }, 3000)

        this.inptname = ""
        this.inptnameError = ""
      } else if (this.listarr.find(el => el.coin === this.inptname)) {
        this.inptnameError = "Такой тикер уже добавлен"
      } else {
        this.inptnameError = "Пустое поле"
      }
    },
    deleteItem: function (item) {
      this.listarr = this.listarr.filter((elem, idx) => idx != item)
    },
    visionFilterNext: function () {
      this.startSlice+=3
       return this.page++
    },
    visionFilterPrev: function () {
      this.startSlice-=3
      return this.page--
    }

  },
  computed: {
    filterArr: function () {
      let filterArr = this.inptarr;
      filterArr = filterArr.filter(el => el.includes(`${this.inptname.toUpperCase().trim()}`))
      return filterArr.slice(0, 10)
    },
    visionFilter: function () {
      let filtered = 3 * this.page;
      let visionFilterArr = this.listarr;
      if(this.inptFilt.length) {
        visionFilterArr = visionFilterArr.filter(el => el.coin.includes(`${this.inptFilt.toUpperCase().trim()}`))
        return visionFilterArr
      } else {
        return visionFilterArr.slice(this.startSlice, filtered)
      }


    }


  }
  ,
  created() {
    (async () => {
      let url = 'https://min-api.cryptocompare.com/data/all/coinlist?summary=true'
      let fetchCoins = await fetch(url);
      let jsonCoins = await fetchCoins.json();
      let objCoins = Object.keys(jsonCoins.Data)
      objCoins.join(',')
      this.inptarr = objCoins
    })()
  }
}
</script>


