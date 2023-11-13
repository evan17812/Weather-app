var apikey = 'eac53fefe5c9409fe90455d1d867849b'
var button = document.getElementById("searchbutton");
var day = dayjs().format('MM/DD/YYYY');

function getcityinfo(){
    var city = $("#searchbar").val();
    var cityapiurl = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid='+apikey
   
    fetch(cityapiurl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error!`);
        }
        return response.json();
    })
    .then(data => {
        var locations =  {
                city: data[0].name,
                lat: data[0].lat,
                lon: data[0].lon
            };
            console.log(locations);
            getweather(locations);
           // getfutureweather(locations)
        })
        
    }



function getweather(locations){
    var weatherapiurl = 'https://api.openweathermap.org/data/2.5/weather?lat='+locations.lat+'&lon='+locations.lon+'&appid='+apikey
    console.log(weatherapiurl);

    fetch(weatherapiurl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error!`);
        }
        return response.json();
    })
    .then(data => {
        var weather =  {
            temp: data['main']['temp'],
            wind: data['wind']['speed'],
            humidity:data['main']['humidity']
        };
        console.log(weather);
        boxweather(weather);
        createcards(weather)
    })

}

// function getfutureweather(locations){
//     var weatherfutureapiurl = 'api.openweathermap.org/data/2.5/forecast?lat='+locations.lat+'&lon='+locations.lon+'&appid='+apikey


//     fetch(weatherfutureapiurl)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error!`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         var weatherfuture =  {
//             temp: data['main']['temp'],
//             wind: data['wind']['speed'],
//             humidity:data['main']['humidity']
//         };
//         console.log(weatherfuture);
//         createcards(weatherfuture);
//     })


// }

var uppercontainer = document.getElementById("uppercontainer");


function boxweather(weather){
    var box = document.createElement('div');
    var citydate = document.getElementById("searchbar").value + ' ('+day+')';
    var tempplaceholder = document.createElement('p');
    var windplaceholder = document.createElement('p');
    var humidityplaceholder = document.createElement('p');
    var tempconvert = (weather.temp-273.15)*(9/5)+32
    tempplaceholder.textContent = 'Temp: '+Math.round(tempconvert * 100) / 100+' F';
    windplaceholder.textContent = 'Wind: '+weather.wind+' MPH';
    humidityplaceholder.textContent = 'Humidity: '+weather.humidity+' %';
    
    box.classList.add("box");
    uppercontainer.append(box);
    box.append(citydate);
    box.append(tempplaceholder);
    box.append(windplaceholder);
    box.append(humidityplaceholder);
    
}
var cardcontainer = document.getElementById("cardcontainer");
var rightmiddlecontent = document.getElementById("rightmiddlecontent");

function createcards(weather){
    var h3 = document.createElement('h3');
    h3.textContent = '5-Day Forecast: ';
    rightmiddlecontent.append(h3);
    for (var i = 1; i < 6; i++){
        var today = dayjs();
        var dates = today.add(i,'day').format('MM/DD/YYYY');
        var card = document.createElement('div');
        var cardcontent = document.createElement('div');
        var dateplaceholder = document.createElement('p');
       // var weatherplaceholder = $('<img>').attr('src','image');
       var tempplaceholder = document.createElement('p');
       var windplaceholder = document.createElement('p');
       var humidityplaceholder = document.createElement('p');
       var tempconvert = (weather.temp-273.15)*(9/5)+32
       tempplaceholder.textContent = 'Temp: '+Math.round(tempconvert * 100) / 100+' F';
       windplaceholder.textContent = 'Wind: '+weather.wind+' MPH';
       humidityplaceholder.textContent = 'Humidity: '+weather.humidity+' %';

        card.classList.add("card");
        cardcontent.classList.add('card-content');
        cardcontent.setAttribute('id', 'card'+i);
        dateplaceholder.textContent = dates;

        cardcontainer.append(card);
        card.append(cardcontent);
        cardcontent.append(dateplaceholder);
       // cardcontent.append(weatherplaceholder);
        cardcontent.append(tempplaceholder);
        cardcontent.append(windplaceholder);
        cardcontent.append(humidityplaceholder);

    }
}


button.addEventListener("click", function () {
    getcityinfo();
});

