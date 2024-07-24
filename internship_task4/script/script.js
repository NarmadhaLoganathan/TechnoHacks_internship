document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertBtn = document.getElementById('convert-btn');
    const convertedAmount = document.getElementById('converted-amount');

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            populateCurrencySelect(currencies);
        })
        .catch(error => console.error('Error fetching currency data:', error));

    function populateCurrencySelect(currencies) {
        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrency.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrency.appendChild(optionTo);
        });

        fromCurrency.value = 'USD';
        toCurrency.value = 'EUR';
    }

    convertBtn.addEventListener('click', () => {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amount = parseFloat(amountInput.value);

        const conversionApiUrl = `https://api.exchangerate-api.com/v4/latest/${fromValue}`;

        fetch(conversionApiUrl)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toValue];
                const result = (amount * rate).toFixed(2);
                convertedAmount.textContent = `${amount} ${fromValue} = ${result} ${toValue}`;
            })
            .catch(error => console.error('Error fetching conversion rate:', error));
    });
});
