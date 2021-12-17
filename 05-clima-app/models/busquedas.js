const fs = require("fs");
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    //TODO: leer DB si existe
    this.leerDB();
  }

  async locacion(lugar) {
    try {
      //petición http de mapbox
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: {
          access_token: process.env.MAPBOX_KEY,
          limit: 5,
          language: "es",
        },
      });

      const res = await instance.get();

      return res.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        longitud: lugar.center[0],
        latitud: lugar.center[1],
      }));

      ///////////////
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      //crear instancia de axios
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
        params: {
          lat,
          lon,
          appid: process.env.OPEN_WEATHER_KEY,
          units: "metric",
          lang: "es",
        },
      });
      //response
      const res = await instance.get();
      const { weather, main } = res.data;
      //return data
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
      ///////////////
    } catch (error) {
      console.log(error);
    }
  }
  p;

  agregarHistorial(lugar) {
    //prevenir lugares duplicados
    if (this.historial.includes(lugar)) return;
    this.historial.unshift(lugar);
    //grabar en db
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    //verificar si la db existe
    if (!fs.existsSync(this.dbPath)) return;
    //parsear información
    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const { historial } = JSON.parse(info);
    //actualizar historial de instancia con la información de la bd
    this.historial = historial;
  }
}

module.exports = Busquedas;
