'use client';
import React, { useEffect } from 'react';
import {
	connectToWebSocket,
	subscribeToChannel,
	disconnectWebSocket,
} from '../lib/socket';
import CurrencyPairsSelector from './CurrencyPairsSelector';
import { useAppProvider } from '../providers/AppProvider';
import BestAskBid from './BestAskBid';
import TradingViewChart from './TradingViewChart';
import OrderBook from './OrderBook';

const HomeView = () => {
	const { currencyPairs, bestBid, bestAsk, setBids, setAsks } =
		useAppProvider();

	useEffect(() => {
		connectToWebSocket();

		const interval = setInterval(() => {
			setBids([]);
			setAsks([]);
			subscribeToChannel('@depth5', '@100ms', currencyPairs, (message) => {
				if (message?.bids?.length > 0) {
					setBids((prev) => [...prev, ...message?.bids]);
				}
				if (message?.asks?.length > 0) {
					setAsks((prev) => [...prev, ...message?.asks]);
				}
			});
			clearInterval(interval);
		}, 1500);

		return () => {
			disconnectWebSocket();
		};
	}, [currencyPairs]);

	return (
		<div className="container mx-auto">
			{/* TITLE + PAIRS SELECTOR */}
			<div className="flex items-center justify-around py-10 border-b border-gray-300 border-solid">
				<p className="text-2xl font-semibold text-gray-600">
					Coins Routes Charts
				</p>
				<CurrencyPairsSelector />
			</div>
			{/* BEST BID & BEST ASK */}
			<div className="flex items-center justify-evenly">
				<BestAskBid data={bestBid} title="Best Bid" type="bid" />

				<BestAskBid data={bestAsk} title="Best Ask" type="ask" />
			</div>
			<div className="flex space-x-8">
				<div>
					<div className="text-lg font-semibold text-gray-600">
						Current Price for {currencyPairs[0]}
					</div>
					<TradingViewChart />
				</div>
			</div>

			<OrderBook />
		</div>
	);
};

export default HomeView;
