import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

export function TradeChart({ tradeVolume }) {
    return (
        <section className="chart-container">
            <h2>Exchange Trade Volume (USD) </h2>
            <Sparklines width={350} height={80} data={tradeVolume} limit={31}>
                <SparklinesLine style={{ fill: 'blue' }} color="blue" />
                <SparklinesReferenceLine style={{ stroke: '#fe2b91', strokeOpacity: 0.75, strokeDasharray: '2, 2' }} />
            </Sparklines>
        </section>
    )
}
