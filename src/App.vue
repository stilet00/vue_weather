<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input
                type="text"
                class="search-bar"
                placeholder="Search..."
                v-model="query"
                @keypress="fetchWeather"
        >
      </div>
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

export default {
  name: 'App',
  data () {
    return {
      api: 'e50ec27dac6fac01c3d6889743f8b9d5',
      url: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      date: '',
      weather: {}
    }
  },
  methods: {
    fetchWeather(e) {
      if (e.key === "Enter") {
        fetch(`${this.url}weather?q=${this.query}&appid=${this.api}`)
        .then(res => {
          if (res.ok && res.status === 200) return res.json()
        })
        .then(res => {this.setResults(res); this.getDate()})
        .catch(err => alert(err))
      }
    },
    setResults(response) {
      this.weather = response
    },
    getDate() {
      let date = new Date();
      this.date = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    }
  },
  components: {

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
    background-image: url('./assets/warm.jpg');
    background-size: cover;
    background-position: center;
    transition: 0.4s;

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
</style>
