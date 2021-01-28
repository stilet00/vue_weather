<template>
  <div id="app"
  :class="typeof weather.main != 'undefined' && Math.round(weather.main.temp - 273.15) > 16 ?
  'warm':''"
  >
    <main>
      <div class="search-box">
        <input
                type="text"
                class="search-bar"
                placeholder="Search..."
                v-model="query"
                @keypress="fetchWeather"
        >
        <Error
                v-if="this.showAlert"
        />
      </div>
      <button class="border-button"
              id="search"
      @click="fetchWeather"
      >Search weather</button>
      <div class="weather-wrap"
      v-if="typeof weather.main != 'undefined'"
      >
        <div class="location-box">
          <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
          <div class="date">{{date}}</div>
        </div>
        <div class="weather-box">
          <div class="tempreture">
            {{Math.round(weather.main.temp - 273.15)}}° C
          </div>
          <div class="weather">{{weather.weather[0].main}}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

import Error from "@/components/Error";
export default {
  name: 'App',
  data () {
    return {
      api: 'e50ec27dac6fac01c3d6889743f8b9d5',
      url: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      date: '',
      weather: {},
      showAlert: false
    }
  },
  methods: {
    fetchWeather(e) {

      if (e.key === "Enter" || e.target.id === 'search') {
       if (!this.query.trim()) {
          this.showAlert = true;
          setTimeout(()=>{this.showAlert=false}, 1000);
        } else {
         this.hideWeatherWrap();
         fetch(`${this.url}weather?q=${this.query.trim()}&appid=${this.api}`)
                 .then((res) => {
                   if (res.ok && res.status === 200) {
                     return res.json();
                   } else {
                     return Promise.reject(res.status);
                   }
                 })
                 .then(res => {this.setResults(res); this.getDate(), this.clearBar(), setTimeout(this.animate, 500)})
                 .catch(() => {this.clearBar(); this.showAlert = true;
                   setTimeout(()=>{this.showAlert=false}, 1000);})
       }

      }
    },
    hideWeatherWrap() {
      if (document.querySelector('.weather-wrap')) {
        document.querySelector('.weather-wrap').style.opacity = 0;
      }

    },
    setResults(response) {
      this.weather = response
    },
    getDate() {
      let date = new Date();
      let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
      this.date = `${date.getDate()}.${month}.${date.getFullYear()}`
    },
    clearBar() {
      this.query = '';
    },
    animate() {
      let div = document.querySelector('.weather-wrap');
      let start = Date.now();
      let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        if (timePassed >= 2000) {
          clearInterval(timer);
          return;
        }
        appear(timePassed);

      }, 10);
      function appear(timePassed) {
        div.style.opacity = timePassed / 2000;
      }
    }
  },
  components: {
    Error

  }
}
</script>

<style>
  body {
    font-family: 'montserrat', sans-serif;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    /*opacity: 0;*/
    background-image: url('./assets/cold.jpg');
    background-size: cover;
    background-position: center;
    transition: 0.4s;

  }
  #app.warm {
    background-image: url('./assets/warm.jpg');
  }
  .border-button {
    outline:none;
    width: 50%;
    margin-top: -20px;
    border-radius: 0 10px 0 10px;
    text-decoration: none;
    display: inline-block;
    padding: 20px 30px;
    position: relative;
    color: #313131;
    border: 1px solid rgba(255, 255, 255, .4);
    background: rgba(255, 255, 255, 0.5);
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .border-button:before, .border-button:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    box-sizing: border-box;
  }
  .border-button:before {
    bottom: 0;
    left: 0;
    border-radius: 0 10px 0 10px;
    border-left: 1px solid white;
    border-top: 1px solid white;
    transition: .2s ease height .6s;
  }
  .border-button:after {
    top: 0;
    right: 0;
    border-radius: 0 10px 0 10px;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    transition: .2s ease height .2s;
  }
  .border-button:hover:before,
  .border-button:hover:after {
    height: 100%;
    width: 100%;
    opacity: 1;
  }
  .border-button:hover:before {
    transition: .2s ease width .2s;
  }
  .border-button:hover:after {
    transition: .2s ease width .6s;
  }
  .border-button:hover {
    background: rgba(255, 255, 255, .2);
  }
  main {
    min-height: 100vh;
    padding: 25px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
  }
  .search-box {
    width: 100%;
    margin-bottom: 30px;
  }
  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;
    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: 5px 5px 0px 2px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.5s;
  }
  .search-box .search-bar:focus {
    box-shadow: 5px 5px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px 16px 0px;

  }
  .location-box .location {
    color: white;
    font-size: 42px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0 0.25);
  }
  .location-box .date {
    color: white;
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    font-style: italic;
  }
  .weather-box {
    text-align: center;
  }
  .weather-box .tempreture {
    display: inline-block;
    padding: 10px 25px;
    color: #FFFFFF;
    font-size: 100px;
    font-weight: 900;
    text-shadow: 1px 3px rgba(0, 0, 0 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    margin: 30px 0;
    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);

  }
  .weather-box .weather {
    color: rgb(255, 255, 255);
    font-size: 40px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
  .weather-wrap {
    opacity: 0;
    margin-top: 20px;
  }

</style>
