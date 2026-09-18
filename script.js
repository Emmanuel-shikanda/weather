const searchbtn = document.getElementById('search');

let city =  document.getElementsByClassName('city')[0];

let weatherInfo = document.getElementsByClassName('weather-info')[0];
weatherInfo.classList.add('close');

let error = document.getElementsByClassName('weather-error')[0]
let errormessage =document.getElementsByClassName('error-content')[0];



searchbtn.addEventListener('click',function(){

async function search(){

let apikey = '530aeaa1e88b13a3f4f12b117f21d939';

let url =  "https://api.openweathermap.org/data/2.5/weather?q="+city.value+"&appid="+apikey+"&units=metric";

let request = await fetch(url);

if(request.status!==200){
    error.classList.remove('close')
    weatherInfo.classList.add('close');
    errormessage.textContent=city.value +'is not found search a new city please';

    throw new Error('city not found');
}


let data = await request.json();

console.log(data);

return data;

}

let temp =document.getElementsByClassName('temperature')[0];

let cityName = document.getElementsByClassName('city-name')[0];

let humidity = document.getElementsByClassName('humidity')[0];

let windspeed = document .getElementsByClassName('wind-speed')[0];



search().then(function(data){

function roundUp(number) {
    return Math.round(number);
}
weatherInfo.classList.remove('close');
error.classList.add('close')



cityName.textContent=city.value;

temp.textContent=roundUp(data.main.temp)+'°C';

humidity.textContent=roundUp(data.main.humidity)+'%';

windspeed.textContent=roundUp(data.wind.speed)+'km/h';

function getIcon(weatherId){
    if(weatherId >=200 && weatherId<300){
      return 'images/rain.png';
    }
    else if(weatherId >=300 && weatherId<600){
        return 'images/rain.png';
    }
    else if(weatherId >=600 && weatherId<700){
        return 'images/snow.png';
    }
    else if(weatherId >=700 && weatherId<800){
        return 'images/mist.png';

    }
    else if(weatherId >=800){
        return 'images/clear.png';

    }
  
}

let icon = getIcon(data.weather[0].id);
document.getElementsByClassName('weather-icon')[0].src=icon;

})

}).catch(function(err){
    err.message
})



