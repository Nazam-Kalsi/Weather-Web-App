import { imagechange } from "./conditiontext.js";
import { weather } from "./fetch.js";
let newpage;

function f1() {
  let heading = document.querySelector("header p");
  let text = heading.innerText.split("");
  heading.innerText = "";

  text.forEach((element) => {
    const span = document.createElement("span");
    span.classList.add("tilt");
    span.innerText = element;
    heading.append(span);
  });
}
f1();

// -------------------------------------------------select elements in html file---------------------------------
let d1 = document.querySelector("#today");
let d2 = document.querySelector("#hourly");
let d3 = document.querySelector("#info");
let d4 = document.querySelector("#forcast");
let input = document.getElementById("search");
// for applying animation classes to elements
let animation = document.querySelector("header>p");
let inputanimation = document.querySelector("header div");
//add event to start the process of fetching data from api and call weather function from fetch.js file
input.addEventListener("keyup", (k) => {
  if (k.key == "Enter") {
    console.log("Enter pressed");
    // adding classes for animation
    d1.classList.add("loading");
    d2.classList.add("loading");
    d3.classList.add("loading");
    d4.classList.add("loading");
    animation.classList.add("animation");
    inputanimation.classList.add("animation");
    d4.classList.add("fade-in");
    d1.classList.add("fade-in");
    d2.classList.add("fade-in");
    d3.classList.add("fade-in");
    setInterval(() => {
      document.querySelector("body > div").classList.add("none");
    }, 1000);
    setTimeout(() => {
      // to make functioning proper removing classes as no needed
      animation.classList.remove("animation");
      inputanimation.classList.remove("animation");
      animation.classList.remove("heading-animation");
      inputanimation.classList.remove("input-animation");
    }, 2510);
    weather();  //calling function to fetch data.
   
  }
});

let today = document.querySelector("#today div");
let image = document.querySelector("#today > img");
let errorbtn=document.getElementById('error');



let raw = async (j) => {
if(j.error){  errorbtn.style.display='block'
}
    //remove skelton loading.
  d1.classList.remove("loading");
  d2.classList.remove("loading");
  d3.classList.remove("loading");
  d4.classList.remove("loading");
  console.log(j);
  let name = today.querySelectorAll("p")[0];
  let rain = today.querySelectorAll("p")[1];
  let temp = today.querySelectorAll("p")[2];
  let T=new Date(j.location.localtime).getHours();
  // calling imagechange function from condition.js file

  let code=j.forecast.forecastday[0].day.condition.code;
  // let t = new Date(time).getHours();
  let src = imagechange(code,T);
  image.src = src; //giving src to image of today's div
  name.innerHTML = `${j.location.name} <span>(${j.location.country})</span>`; //city name
  rain.innerHTML = //raining percentage
    "Chances of rain : <span>" +
    j.forecast.forecastday[0].day.daily_chance_of_rain +
    "%</span>";
  temp.innerHTML = j.forecast.forecastday[0].day.avgtemp_c + "°"; //temperature in celcius

  // ---------------------hourly based weather fetching--------------------------
  let hourly = document.getElementById("hourly");
  hourly.innerHTML = "";
  let timely = j.forecast.forecastday[0].hour; //hourly time interval of 1 hour
  for (const key in timely) {
    //geting object having 0,1,2,3....23 as keys
    let time = timely[key].time; //selecting time (format is 2023-11-09 00:00) --string
    let t = new Date(time).getHours(); //convert into date and get Hours from it.
    let nd = new Date().getHours(); // get current time's hour.
    if (t > nd) {
      //to only get hour greater then current time's hour,so to create div dynamically.
      let cards = document.createElement("div");
      cards.classList.add("card");
      let time = document.createElement("p");
      let image = document.createElement("img");
      let code=j.forecast.forecastday[0].hour[`${t}`].condition.code;
      let src = imagechange(code,t); //calling imagechange() function from condition.js file
      image.src = src;
      let temp = document.createElement("p");

      temp.innerHTML = `${timely[key].temp_c}` + "°";
      time.innerHTML =
        `${t}` > 12 ? `${t}` - 12 + ":00 P.M" : `${t}` + ":00 A.M"; //to print time in 12 hour format instead of 24 hour format.

      cards.appendChild(time);
      cards.appendChild(image);
      cards.appendChild(temp);
      hourly.appendChild(cards);
    }
  }
  moreinfo(j); 
};
// -----------------more-info field-----------------------------
let moreinfo = async (j) => {
  let wind = j.forecast.forecastday[0].day.maxwind_kph;
  let winddata = document.querySelector(
    "#info :nth-child(1) :nth-child(2) span"
  );
  winddata.innerHTML = `${wind}`;
  let humidity = j.forecast.forecastday[0].day.avghumidity;
  let humiditydata = document.querySelector("#info >:nth-child(2) span");
  humiditydata.innerHTML = `${humidity}%`;
  let uv = j.forecast.forecastday[0].day.uv;
  let uvdata = document.querySelector("#info >:nth-child(3) span");
  uvdata.innerHTML = `${uv}`;
  let visibility = j.forecast.forecastday[0].day.avgvis_km;
  let visibilitydata = document.querySelector("#info >:nth-child(4) span");
  visibilitydata.innerHTML = `${visibility}`;
  let airc = j.forecast.forecastday[0].day.air_quality["us-epa-index"];
  let aircdata = document.querySelector("#info >:nth-child(5) span");
  aircdata.innerHTML = `${airc}`;
  forecast(j);
};
// ------------------------forcast weather------------------------------------
let forecastdiv = document.getElementById("forcast");      //To get day name in forecast cards
let dayname = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let forecast = (j) => {
  let date=new Date(j.location.localtime).getHours();
  for (let i = 1; i <= 4; i++) {
    let image = document.querySelector(`#forcast >:nth-child(${i}) img`);
    let day = document.querySelector(`#forcast >:nth-child(${i}) >p`);
    let temp = document.querySelector(`#forcast >:nth-child(${i}) div+p`);
    let condition=document.querySelector(`#forcast >:nth-child(${i})>div p`);
    let d = new Date(j.forecast.forecastday[`${i}`].date);
    let code=j.forecast.forecastday[`${i}`].day.condition.code;
    let T=12;  //to get image of sun instead of moon in forecast card. 
    let src = imagechange(code,T);
    condition.innerHTML= (`${date}`>19 && j.forecast.forecastday[`${i}`].day.condition.text=='Sunny')?"Clear":(j.forecast.forecastday[`${i}`].day.condition.text); 
    image.src = src;
    if (i == 1) {
      day.innerHTML = "Tomorrow";
    } else {
      day.innerHTML = dayname[d.getDay()];
    }
    temp.innerHTML = `${j.forecast.forecastday[`${i}`].day.avgtemp_c}°`;
  }

};
let button = document.querySelector("#info button").addEventListener("click", () => {
  window.open("./todaydetails.html", "_blank");
});
document.getElementById('error').addEventListener('click',()=>{
  errorbtn.style.display='none'
})




export {input, raw};
