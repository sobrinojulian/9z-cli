#!/usr/bin/env node

import https from "https";
import Table from "cli-table3";

const nueveZeta = (csgo) => {
  const url = "https://9z.games/api/partidos";
  https.get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      const partidos = JSON.parse(data);
      let table = new Table({
        head: ["Fecha", "Versus", "Torneo", "Juego", "CS:GO?", "Fortnite?", "Academy?"],
      });
      for (const partido of partidos) {
        const esAcademy = partido.equipo.nombre === "Academy";
        const esCSGO = partido.torneo.juego.nombre === "CS:GO";
		const esFortnite = partido.torneo.juego.nombre === "Fortnite";
		const fecha = partido.fecha.split('-').slice(1,3).reverse().join('/')
        table.push([
          `${fecha} ${partido.hora}`,
          partido.vs,
          partido.torneo.nombre,
          partido.torneo.juego.nombre,
          esCSGO,
		  esFortnite,
          esAcademy,
        ]);
      }
      console.log(table.toString());
    });
  });
};

export default nueveZeta;
