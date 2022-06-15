export default async function getCryptoData(coin,key) {

    if (coin !== undefined) {
        const response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=USD&extraParams=${key}`)
        return await response.json()
    } else {
        return []
    }
}
