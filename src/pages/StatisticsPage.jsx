import { Component } from 'react';
import { bitcoinService } from '../services/bitcoinService';
import { MarketChart } from '../cmps/MarketChart'
import { TradeChart } from '../cmps/TradeChart'

export class StatisticsPage extends Component {
   state = {
      marketPrices: null,
      tradeVolume: null
   }

   componentDidMount() {
      this.loadMarketPrice();
      this.loadTradeVolume();
   }

   async loadMarketPrice() {
      const marketPrices = await bitcoinService.getMarketPrice();
      this.setState({ marketPrices })
   }

   async loadTradeVolume() {
      const tradeVolume = await bitcoinService.getConfirmedTransactions();
      this.setState({ tradeVolume })
   }

   render() {
      const { marketPrices, tradeVolume } = this.state
      if (!marketPrices || !tradeVolume) return <div>Loading...</div>
      return (
         <section className="contact-page">
            <MarketChart marketPrices={marketPrices} />
            <TradeChart tradeVolume={tradeVolume} />
         </section>
      )
   }
}