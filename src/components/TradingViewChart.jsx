import React, { useEffect, useRef } from 'react';
import { useAppProvider } from '../providers/AppProvider';

const TradingViewChart = ({}) => {
	const { currencyPairs } = useAppProvider();
	const container = useRef();

	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
        {
          "autosize": true,
          "width": "1525",
          "height": "800",
          "symbol": "BINANCE:${currencyPairs[0]}",
          "interval": "W",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
		// @ts-ignore
		if (!!container.current.lastChild) {
			// @ts-ignore
			container.current.removeChild(container.current.lastChild);
		}
		// @ts-ignore
		container.current.appendChild(script);
	}, [currencyPairs]);

	return (
		<>
			<div
				className="tradingview-widget-container"
				ref={container}
				style={{ height: '100%', width: '100%' }}
			></div>
		</>
	);
};

export default TradingViewChart;
