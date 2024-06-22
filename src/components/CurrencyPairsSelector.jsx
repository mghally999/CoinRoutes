import React from 'react';
import { useAppProvider } from '../providers/AppProvider';

const CurrencyPairsSelector = () => {
	const { currencyPairs, setCurrencyPairs } = useAppProvider();

	const handleSelect = (e) => {
		setCurrencyPairs([e.target.value]);
	};

	return (
		<div className="shadow-2xl">
			<select
				name="sort by"
				id=""
				value={currencyPairs}
				onChange={handleSelect}
				className="w-full p-3 rounded-lg outline-none"
			>
				<option value="" className="my-5 capitalize" disabled={currencyPairs}>
					Select Currency Pairs
				</option>
				<option key="BTC-USD" value="btcusdt">
					BTC-USDT
				</option>
				<option key="ETH-USD" value="ethusdt">
					ETH-USDT
				</option>
				<option key="LTC-USD" value="ltcusdt">
					LTC-USDT
				</option>
				<option key="BCH-USD" value="bchusdt">
					BCH-USDT
				</option>
			</select>
		</div>
	);
};

export default CurrencyPairsSelector;
