import React, { useEffect, useState } from 'react';
import { useAppProvider } from '../providers/AppProvider';

const OrderBook = () => {
	const [bidsItems, setBidsItems] = useState([]);
	const [asksItems, setAsksItems] = useState([]);

	const { bids, setBestBid, asks, setBestAsk, currencyPairs } =
		useAppProvider();
	const sortPriceLevels = (levels, orderType) => {
		const sortedLevelsByPrice = [...levels].sort((currentLevel, nextLevel) => {
			let result = 0;
			if (orderType === 'bids') {
				result = nextLevel[0] - currentLevel[0];
			} else {
				result = currentLevel[0] - nextLevel[0];
			}
			return result;
		});

		// Map to store the maximum value for each unique first element
		const maxMap = new Map();

		sortedLevelsByPrice.forEach(([first, second]) => {
			// Parse the second element as a number for proper comparison
			const secondNum = parseFloat(second);

			// Check if the first element is in the map
			if (!maxMap.has(first) || secondNum > parseFloat(maxMap.get(first)[1])) {
				maxMap.set(first, [first, second]);
			}
		});

		// Extract the values from the map
		return Array.from(maxMap.values());
	};

	useEffect(() => {
		if (bids.length > 0) {
			setBidsItems(sortPriceLevels(bids, 'bids'));
		}
		if (asks.length > 0) {
			setAsksItems(sortPriceLevels(asks, 'asks'));
		}
	}, [bids, asks]);

	useEffect(() => {
		if (bidsItems.length > 0) {
			setBestBid(bidsItems[0]);
		}

		if (asksItems.length > 0) {
			setBestAsk(asksItems[0]);
		}
	}, [bidsItems, asksItems]);

	return (
		<div className="my-20">
			<div className="bg-[#121723] p-5 text-xl font-semibold text-white border-b border-solid border-gray-300">
				{currencyPairs} Order Book
			</div>
			<div className="container mx-auto w-full flex bg-[#1F2937] divide-x divide-gray-300 text-white ">
				<div className="w-1/2 py-10">
					<div className="grid grid-cols-3 justify-items-center">
						<div>Bid Price</div>
						<div>Bid Quantity</div>
						<div>My Size</div>
					</div>
					{bidsItems.slice(0, 25).map((bid, index) => (
						<div className="grid grid-cols-3 justify-items-center" key={index}>
							<div className="text-red-500">{(+bid[0]).toFixed(2)}</div>
							<div>{+bid[1]}</div>
							<div>-</div>
						</div>
					))}
				</div>
				<div className="w-1/2 py-10">
					<div className="grid grid-cols-3 justify-items-center">
						<div>Ask Price</div>
						<div>Ask Quantity</div>
						<div>My Size</div>
					</div>
					{asksItems.slice(0, 25).map((ask, index) => (
						<div className="grid grid-cols-3 justify-items-center" key={index}>
							<div className="text-green-500">{(+ask[0]).toFixed(2)}</div>
							<div>{+ask[1]}</div>
							<div>-</div>
						</div>
					))}
				</div>{' '}
			</div>
		</div>
	);
};

export default OrderBook;
