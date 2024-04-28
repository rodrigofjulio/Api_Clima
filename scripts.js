document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '06015364e0a6f782ebed237c1c7ae3e8' ; // Substitua 'YOUR_API_KEY' pela sua chave da API OpenWeatherMap
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    searchButton.addEventListener('click', function () {
        const cityName = searchInput.value.trim();
        if (cityName !== '') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === 200) {
                        const city = data.name;
                        const temperature = Math.round(data.main.temp);
                        const description = data.weather[0].description;

                        cityElement.textContent = city;
                        temperatureElement.textContent = `${temperature}°C`;
                        descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
                    } else {
                        cityElement.textContent = 'Cidade não encontrada';
                        temperatureElement.textContent = '';
                        descriptionElement.textContent = '';
                    }
                })
                .catch(error => console.log(error));
        } else {
            alert('Por favor, digite o nome da cidade.');
        }
    });
});
