const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temp');
const description = document.querySelector('.desc');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key = "788f93b0379761e4e815d8c1ce00a671";
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());
    
    // console.log(weather_data);
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML=`${Math.round(weather_data.main.temp)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML=`${weather_data.wind.speed}Km/H`;
    

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src="/assests/cloud.png";
            break;
        case 'Clear':
            weather_img.src="/assests/clear.png";
            break;
        case 'Rain':
            weather_img.src="/assests/rain.png";
            break;
        case 'Mist':
            weather_img.src="/assests/mist.png";
            break;
        case 'Snow':
            weather_img.src="/assests/snow.png";
            break;
    }
}
searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});