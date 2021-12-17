const axios = require("axios");

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];

  constructor() {
    //TODO: leer DB si existe
  }

  async locacion(lugar) {
    try {
      //petición http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: {
          access_token: process.env.MAPBOX_KEY,
          limit: 5,
          language: "es",
        },
      });

      const res = await instance.get();
      console.log(res.data);

      ///////////////
    } catch (error) {
      return [];
    }

    // //retornar las locaciones que coincidan con el lugar
    // return [];
  }
}

module.exports = Busquedas;
