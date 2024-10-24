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

// Função para alterar a imagem com base na hora atual
function alterarBackgroundPorHorario(){

    //Obtém a hora atual da máquina
    const now = new Date();
    const hora = now.getHours();

    //Seleciona o elemento da imagem pelo ID
    const body = document.body;

    //Verifica o intervalo de tempo e altera a imagem
    if(hora >= 6 && hora < 12){
        body.style.backgroundImage = "url('/assets/manha.jpg')"; //colocar entre '' o caminho para a imagem da manhã
        
    }else if(hora >= 12 && hora < 18){
        body.style.backgroundImage = "url('/assets/tarde.jpg')"; //colocar entre '' o caminho para a imagem da tarde
        
    }else{
        body.style.backgroundImage = "url('/assets/noite.jpg')"; //colocar entre '' o caminho para a imagem da noite
        
    }
}
 // Define outras prioridades do background
 body.style.backgroundSize = "cover";
 body.style.backgroundPosition = "center";

 // Chama a função ao carregar a página
 window.onload = alterarBackgroundPorHorario;
