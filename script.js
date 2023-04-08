const apiUrl = 'https://api.coincap.io/v2/assets?limit=10';
const coinList = document.getElementById('coin-list');

async function getCoinData() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error(error);
	}
}

function renderCoinData(coinData) {
	coinList.innerHTML = ''; // Clear previous data

	coinData.forEach((coin) => {
		const row = document.createElement('tr');

		const coinName = document.createElement('td');
		coinName.innerText = coin.name;

		const coinSymbol = document.createElement('td');
		coinSymbol.innerText = coin.symbol;

		const coinPrice = document.createElement('td');
		coinPrice.innerText = '$' + parseFloat(coin.priceUsd).toFixed(2) + ' k';

		row.appendChild(coinSymbol);
		row.appendChild(coinPrice);

		coinList.appendChild(row);
	});
}

async function updateCoinData() {
	const coinData = await getCoinData();
	renderCoinData(coinData);
}

function startUpdates() {
	updateCoinData(); // Initial update

	setInterval(() => {
		updateCoinData();
	}, 1000); // Repeat update every 1 second
}

startUpdates();
