import { input, raw } from "./w.js";
let forcastData="";
let weather = async () => {
  console.log("fetching start...")
  let city = input.value;

    const forcast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=afc2f784f1e6422a9fe161010232011&q=${city}&days=6&aqi=yes&alerts=yes`
    );
    forcastData = await forcast.json();
    raw(forcastData);      
    console.log("Fetching done...")

    localStorage.setItem("data",JSON.stringify(forcastData));
};
export { weather};
