const apiKey = "136c8686a0578f428c43d86cad541e77";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cardContainer = document.querySelector(".card");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        // Display error message
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        // Display weather card
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}ºC`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;


        let weatherImage, gradientColors;

        switch (data.weather[0].main) {
            case "Clouds":
                weatherImage = "./images/clouds.png";
                gradientColors = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
                break;
            case "Snow":
                weatherImage = "./images/snow.png";
                gradientColors = "linear-gradient(135deg, #bdc3c7, #768b8e)";
                break;
            case "Drizzle":
                weatherImage = "./images/drizzle.png";
                gradientColors = "linear-gradient(135deg, #bdc3c7, #34495e)";
                break;
            case "Mist":
                weatherImage = "./images/mist.png";
                gradientColors = "linear-gradient(135deg, #bdc3c7, #95a5a6)";
                break;
            case "Rain":
                weatherImage = "./images/rain.png";
                gradientColors = "linear-gradient(135deg, #bdc3c7, #7f8c8d)";
                break;
            default:
                weatherImage = "./images/clear.png";
                gradientColors = "linear-gradient(135deg, #00feba, #5b548a)";
        }

        weatherIcon.src = weatherImage;
        cardContainer.style.background = gradientColors;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})