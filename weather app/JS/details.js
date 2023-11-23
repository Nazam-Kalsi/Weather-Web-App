// import {forcastData} from "../fetch.js";

let item=localStorage.getItem('data');
let data=JSON.parse(item)
console.log(data)

let details=(c)=>{
    document.querySelectorAll('header p')[0].innerHTML=c.location.name;
    // document.querySelectorAll('header p')[1].innerHTML=c.location.region;
    document.querySelectorAll('header p')[1].innerHTML=`(${c.location.country})`;
    document.querySelector("#main >:nth-child(1) p").innerHTML=`Max. Temperature : `;
    document.querySelector("#main >:nth-child(1) span").innerHTML=`${c.forecast.forecastday[0].day.maxtemp_c}ºC`;
    document.querySelector("#main >:nth-child(2) p").innerHTML=`Min. Temperature : `;
    document.querySelector("#main >:nth-child(2) span").innerHTML=`${c.forecast.forecastday[0].day.mintemp_c}ºC`;
    document.querySelector("#main >:nth-child(3) p").innerHTML=`Average. Temperature : `;
    document.querySelector("#main >:nth-child(3) span").innerHTML=`${c.forecast.forecastday[0].day.avgtemp_c}ºC`;
    
    document.querySelector("#main >:nth-child(4) p").innerHTML=`Condition : `;
    document.querySelector("#main >:nth-child(4) span").innerHTML=`${c.current.condition.text}`;
    
    document.querySelector("#main >:nth-child(5) p").innerHTML=`Average humidity : `;
    document.querySelector("#main >:nth-child(5) span").innerHTML=`${c.forecast.forecastday[0].day.avghumidity}%`; 
    document.querySelector("#main >:nth-child(6) p").innerHTML=`Average visibility : `;
    document.querySelector("#main >:nth-child(6) span").innerHTML=`${c.forecast.forecastday[0].day.avgvis_km}km`;
    document.querySelector("#main >:nth-child(7) p").innerHTML=`max wind speed : `;
    document.querySelector("#main >:nth-child(7) span").innerHTML=`${c.forecast.forecastday[0].day.maxwind_kph}kph`;
    document.querySelector("#main >:nth-child(8) p").innerHTML=`UV-Index : `;
    document.querySelector("#main >:nth-child(8) span").innerHTML=`${c.forecast.forecastday[0].day.uv}`;
    document.querySelector("#main >:nth-child(9) p").innerHTML=`chances of rain : `;
    document.querySelector("#main >:nth-child(9) span").innerHTML=`${c.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    document.querySelector("#main >:nth-child(10) p").innerHTML=`Sunrise : `;
    document.querySelector("#main >:nth-child(10) span").innerHTML=`${c.forecast.forecastday[0].astro.sunrise}`;
    document.querySelector("#main >:nth-child(11) p").innerHTML=`Sunset : `;
    document.querySelector("#main >:nth-child(11) span").innerHTML=`${c.forecast.forecastday[0].astro.sunset}`;
    document.querySelector("#main >:nth-child(12) p").innerHTML=`us-epa-index : `;
    document.querySelector("#main >:nth-child(12) span").innerHTML=`${c.forecast.forecastday[0].day.air_quality["us-epa-index"]}`;
    document.querySelector("#main >:nth-child(13) p").innerHTML=`CO Quantity : `;
    document.querySelector("#main >:nth-child(13) span").innerHTML=`${c.current.air_quality.co} μg/m3`;
    document.querySelector("#main >:nth-child(14) p").innerHTML=`No2 Quantity : `;
    document.querySelector("#main >:nth-child(14) span").innerHTML=`${c.current.air_quality.no2} μg/m3`;
    document.querySelector("#main >:nth-child(15) p").innerHTML=`o3 Quantity : `;
    document.querySelector("#main >:nth-child(15) span").innerHTML=`${c.current.air_quality.o3} μg/m3`;
    document.querySelector("#main >:nth-child(16) p").innerHTML=`so2 Quantity : `;
    document.querySelector("#main >:nth-child(16) span").innerHTML=`${c.current.air_quality.so2} μg/m3`;
    


}
details(data);
