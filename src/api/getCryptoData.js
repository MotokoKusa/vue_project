export default async function getCryptoData(coin) {
    const API_KEY = '3e36cfcc18536f2ccf8b8e66e4cd8b8db649a09338c7bbba4b3b33bf390be6c2'
    if(coin !== undefined) {
        const response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=USD&extraParams=${API_KEY}`)
        return await response.json()
    }
    }



