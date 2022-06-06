export default async function getCryptoCoins() {
    const API_URL = 'https://min-api.cryptocompare.com/data/all/coinlist?summary=true'
    const response = await fetch(API_URL);
    const dataCoins = await response.json()
    return dataCoins.Data

}
