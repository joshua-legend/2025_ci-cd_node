const ccxt = require("ccxt");

let current = 0;

const getCoin = async () => {
  const exchange = new ccxt.binance();
  const coin = await exchange.fetchTicker("BTC/USDT");
  console.log(coin);
  console.log(`현재 비트코인 가격:${coin.last}`);
  if (coin.last > current) {
    console.log("한강뷰 가즈아");
  } else {
    console.log("개떡락 돔황챠");
  }
  current = coin.last;
};
setInterval(() => {
  getCoin();
}, 3000);
