const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if(city === ""){
    alert("Please enter a city name");
    return;
  }

  getWeather(city);
});

async function getWeather(city){

  try{

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if(!response.ok){
      throw new Error("City not found");
    }

    const data = await response.json();

    temperature.innerHTML = `${Math.round(data.main.temp)}°C`;

    cityName.innerHTML = data.name;

    humidity.innerHTML = `${data.main.humidity}%`;

    wind.innerHTML = `${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;

    weatherIcon.src =
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  }catch(error){

    alert(error.message);
  }
}