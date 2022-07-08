import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

export function MarketChart({ marketPrices }) {
    return (
        <section className="chart-container">
            <h2>Market Price (USD) </h2>
            <Sparklines width={350} height={80} data={marketPrices} limit={31}>
                <SparklinesLine style={{ fill: 'blue' }} color="blue" />
                <SparklinesReferenceLine style={{ stroke: '#fe2b91', strokeOpacity: 0.75, strokeDasharray: '2, 2' }} />
            </Sparklines>
        </section>
    )
}
