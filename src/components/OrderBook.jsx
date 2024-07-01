import React, { useEffect, useState } from "react";
import { useAppProvider } from "../providers/AppProvider";
import IncrementSelector from "./IncrementSelector";

const OrderBook = () => {
  const [bidsItems, setBidsItems] = useState([]);
  const [asksItems, setAsksItems] = useState([]);

  const { bids, setBestBid, asks, setBestAsk, currencyPairs, increment } =
    useAppProvider();

  const sortPriceLevels = (levels, orderType, increment) => {
    if (!increment || increment === "No Aggregation") {
      return levels;
    }

    const incrementValue = parseFloat(increment);

    const sortedLevelsByPrice = [...levels].sort((currentLevel, nextLevel) => {
      let result = 0;
      if (orderType === "bids") {
        result = nextLevel[0] - currentLevel[0];
      } else {
        result = currentLevel[0] - nextLevel[0];
      }
      return result;
    });

    const aggregatedMap = new Map();

    sortedLevelsByPrice.forEach(([price, quantity]) => {
      const roundedPrice = (
        Math.floor(price / incrementValue) * incrementValue
      ).toFixed(2);
      const quantityNum = parseFloat(quantity);

      if (!aggregatedMap.has(roundedPrice)) {
        aggregatedMap.set(roundedPrice, [
          parseFloat(roundedPrice),
          quantityNum,
        ]);
      } else {
        const existingQuantity = parseFloat(aggregatedMap.get(roundedPrice)[1]);
        aggregatedMap.set(roundedPrice, [
          parseFloat(roundedPrice),
          (existingQuantity + quantityNum).toFixed(8),
        ]);
      }
    });

    return Array.from(aggregatedMap.values());
  };

  useEffect(() => {
    if (bids.length > 0) {
      setBidsItems(sortPriceLevels(bids, "bids", increment));
    }
    if (asks.length > 0) {
      setAsksItems(sortPriceLevels(asks, "asks", increment));
    }
  }, [bids, asks, increment]);

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
      <IncrementSelector />
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
              <div>{(+bid[1]).toFixed(8)}</div>
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
              <div>{(+ask[1]).toFixed(8)}</div>
              <div>-</div>
            </div>
          ))}
        </div>{" "}
      </div>
    </div>
  );
};

export default OrderBook;
