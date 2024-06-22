import React from 'react';

const BestAskBid = ({ data, title, type }) => {
	return (
		<div className="border-2 border-solid border-gray-300 my-10 w-[400px]">
			<div
				className={`px-3 py-5 border-b-2 border-solid border-gray-300 text-white font-semibold text-xl ${
					type === 'bid' ? 'bg-sky-500' : 'bg-amber-500'
				}`}
			>
				{title}
			</div>
			<div className="flex text-center divide-x-2 divide-gray-300">
				<div className="flex flex-col items-center justify-center w-1/2 h-24 bg-white">
					<p>{data ? (+data[0]).toFixed(2) : null}</p>
					<p className="text-xs text-gray-400 capitalize">{type} Price</p>
				</div>
				<div className="flex flex-col items-center justify-center w-1/2 h-24 bg-white">
					<p>{data ? (+data[1]).toFixed(2) : null}</p>
					<p className="text-xs text-gray-400 capitalize">{type} Quantity</p>
				</div>
			</div>
		</div>
	);
};

export default BestAskBid;
