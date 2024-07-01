'use client';

import { createContext, useContext, useState } from 'react';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [currencyPairs, setCurrencyPairs] = useState(['btcusdt']);
	const [bids, setBids] = useState([]);
	const [asks, setAsks] = useState([]);
	const [bestBid, setBestBid] = useState(null);
	const [bestAsk, setBestAsk] = useState(null);
	const [increment, setIncrement] = useState("");

	return (
		<AppContext.Provider
			value={{
				currencyPairs,
				setCurrencyPairs,
				bids,
				setBids,
				asks,
				setAsks,
				bestBid,
				setBestBid,
				bestAsk,
				setBestAsk,
				increment,
				setIncrement
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppProvider = () => useContext(AppContext);
