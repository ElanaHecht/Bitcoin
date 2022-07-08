import { HomePage } from './HomePage';
import { ContactPage } from './ContactPage';
import { StatisticsPage } from './StatisticsPage';

export function BitcoinApp()  {
      return (
         <section className='bitcoin-app container'>
            <h1>Bitcoin App</h1>
            <HomePage/>
            <ContactPage/>
            <StatisticsPage/>
         </section>
      )
}