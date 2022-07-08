import axios from 'axios'
import { storageService } from "./storageService";

export const bitcoinService = {
   getRate,
   getMarketPrice,
    getConfirmedTransactions
}

async function getRate(currency, value) {
   const res = await axios.get(`https://blockchain.info/tobtc?currency=${currency}&value=${value}`)
   const rate = res.data
   return Promise.resolve(rate)
}

async function getMarketPrice() {
   let marketPlace = storageService.load('marketPriceDB') || null;
   if (!marketPlace) {
      const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`)
      marketPlace = res.data.values.map(v => v.y)
      storageService.store('marketPriceDB', marketPlace)
   }
   setTimeout(() => localStorage.removeItem('marketPriceDB'), 60000)
   return Promise.resolve(marketPlace)
}

async function getConfirmedTransactions() {
   let tradeVolume = storageService.load('tradeVolumeDB') || null;
   if (!tradeVolume) {
      const res = await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true`)
      tradeVolume = res.data.values.map(v => v.y)
      storageService.store('tradeVolumeDB', tradeVolume)
   }
   setTimeout(() => localStorage.removeItem('tradeVolumeDB'), 60000)
   return Promise.resolve(tradeVolume)
}