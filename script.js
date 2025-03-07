let btn = document.querySelector('#submit');
let main = document.getElementById('result');
let select = document.querySelectorAll('.select');
let search = document.getElementById('search');
let selects = document.querySelector('#select');
let city;
let code;
let img = document.querySelector('#flagimg');
let src;
let windSpeed;
let temp;
let humidity;
let weatherDescription;

for (sele of select){
    for (code in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText= code;
        newOpt.value= code;
        sele.append(newOpt);
    }
}

async function getWeather(){
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=2546cf0c11124cd07abbe246ad4a9b4b`);
    let weather = await response.json();

    if (city !== '' && code !== 'Country Code'){
        temp = weather['main']['temp'];
        windSpeed = weather['wind']['speed'];
        humidity = weather['main']['humidity'];

        main.classList.remove('hide');
        main.innerHTML = `
        <div class="city">${city}</div>
        <div class="temp">Temperature: ${(temp-273).toFixed(1)}°C</div>
        <div class="wind">Wind Speed: ${windSpeed}m/s</div>
        <div class="humidity">Humidity: ${humidity}%</div>
        <div class="weather">Weather: ${weather['weather'][0]['description']}</div>
        `;
        console.log(weather);
    }
}
  
function flagimg(){
    src = `https://flagsapi.com/${code}/flat/64.png`;
    img.src = src;
}

function update(){

    city = document.getElementById("search").value;
    if (city !== '' && code !== 'Country Code'){
        getWeather();
    }
    
}
btn.addEventListener("click", function(){

    if (city !== ''){
        update();
    }
});

function weather(){
    main.classList.remove('hide');
    main.innerHTML = `
    <div class="city">${city},${code}</div>
    <div class="temp">Temperature: ${temp}°C</div>
    <div class="wind">Wind Speed: ${windSpeed}m/s</div>
    <div class="humidity">Humidity: ${humidity}%</div>
    `;
}
selects.addEventListener("change", function(){
    code = document.getElementById("select").value;
    flagimg();
});
