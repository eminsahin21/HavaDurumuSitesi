const url = "https://api.openweathermap.org/data/2.5/"
const key = "21d71510a813a3ec8993537f4e461e53"


const setQuery = (e) => {
    if(e.keyCode == '13'){
        getResult(searchBar.value)
    }
}

const getResult = (city_name) => {
    let query = `${url}weather?q=${city_name}&appid=${key}&units=metric&lang=tr`
    
    fetch(query)
    .then(weather =>{
        return weather.json()
    })
    .then(displayResult)
}



const displayResult = (result) => {
    console.log(result)
    
    let city =  document.querySelector(".city")
    city.innerText = `${result.name},${result.sys.country}`

    let temp = document.querySelector(".temp")
    temp.innerText = `${Math.round(result.main.temp)}°C`    

    let desc = document.querySelector(".desc")
    let desc_gelen_deger = result.weather[0].description
    const sonuc = desc_gelen_deger.split(" ").map(kelime => kelime[0].toUpperCase() + kelime.slice(1,)).join(" ");
    desc.innerText = sonuc 

    let min_max = document.querySelector(".min-max")
    min_max.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`
    
    changeBackground(Math.round(result.main.temp))
}


function inputTemizle() {
    var input = document.getElementById("searchBar")
    input.value = ""
}


function changeBackground(sicaklik) {

    const images = [
    "cloudy.jpg",
    "sunny.jpg",
    "main.jpg"
    ];


    if(sicaklik < 15) {
        document.body.style.backgroundImage =  `url('images/${images[0]}')`;
    }
    else{
        document.body.style.backgroundImage =  `url('images/${images[1]}')`;
    }

    // Input textin değerini 30 saniye sonra temizleyin.
    setTimeout(function() {
        inputTemizle();
    }, 5000);
}
const searchBar = document.getElementById('searchBar')
searchBar.addEventListener('keypress',setQuery)


var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementsByClassName('clock')[0];


//aşağıda sitede göstermek için saat kodları var

function gizleSaat() {
    var searchBar = document.getElementById('searchBar').value;

    // Eğer input değeri boş değilse, saati'i gizle
    if (searchBar.trim() !== '') {
        document.getElementById('myclock').style.display = 'none';
        document.getElementById('icerik').style.display = "block";
        
    } else {
        // Eğer input değeri boşsa, saati'i görünür yap
        document.getElementById('myclock').style.display = 'block';
        document.getElementById('icerik').style.display = "none";
     
        
    }
}

for (var i = 1; i < 60; i++) {
  clockEl.innerHTML += "<div class='diallines'></div>";
  dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function clock() {
    gizleSaat()
    var weekday = [
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi"
      ],
      d = new Date(),
      h = d.getHours(),
      m = d.getMinutes(),
      s = d.getSeconds(),
      date = d.getDate(),
      month = d.getMonth() + 1,
      year = d.getFullYear(),
           
      hDeg = h * 30 + m * (360/720),
      mDeg = m * 6 + s * (360/3600),
      sDeg = s * 6,
      
      hEl = document.querySelector('.hour-hand'),
      mEl = document.querySelector('.minute-hand'),
      sEl = document.querySelector('.second-hand'),
      dateEl = document.querySelector('.date'),
      dayEl = document.querySelector('.day');
  
      var day = weekday[d.getDay()];
  
  if(month < 9) {
    month = "0" + month;
  }
  if(date < 9) {
    date = "0" + date
  }
  
  hEl.style.transform = "rotate("+hDeg+"deg)";
  mEl.style.transform = "rotate("+mDeg+"deg)";
  sEl.style.transform = "rotate("+sDeg+"deg)";
  dateEl.innerHTML = date+"/"+month+"/"+year;
  dayEl.innerHTML = day;
}

setInterval("clock()", 100);
