document.addEventListener("DOMContentLoaded", () => {
    // Получение элементов:
    const form = document.getElementById("converter-form");
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDisplay = document.getElementById('result');
    const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD'; // API с базовой USD

    let exchangeRates = {}; // <--- Создаем пустой объект для хранения курсов

    // 1. Запрос API и заполнение выпадающих списков
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            exchangeRates = data.rates; // <--- Сохраняем курсы в переменной exchangeRates
            const currencies = Object.keys(exchangeRates);
            
            currencies.forEach((currency) => {
                // Создание и добавление опций:
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrencySelect.appendChild(optionFrom);

                const optionTo = optionFrom.cloneNode(true); // <--- Использование cloneNode для краткости
                toCurrencySelect.appendChild(optionTo);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке курсов валют:', error);
            resultDisplay.textContent = 'Ошибка: не удалось загрузить курсы валют.';
        });

    // 2. Логика обработки формы для конвертации
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // **ЯВНОЕ** преобразование в число, чтобы избежать ошибок!
        const amount = parseFloat(amountInput.value); 
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        // Проверка, что сумма корректна и курсы загружены
        if (isNaN(amount) || amount <= 0 || Object.keys(exchangeRates).length === 0) {
            resultDisplay.textContent = 'Пожалуйста, введите корректную сумму.';
            return; 
        }

        // Получаем курсы из сохраненного объекта
        const rateFrom = exchangeRates[fromCurrency]; // Курс исходной валюты к USD
        const rateTo = exchangeRates[toCurrency];     // Курс целевой валюты к USD

        // Формула конвертации: (Сумма / Курс_Исходной_к_USD) * Курс_Целевой_к_USD
        const convertedAmount = (amount / rateFrom) * rateTo;
        
        // Отображение результата
        resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    });
});
