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
      let table = new Table();
      for (const partido of partidos) {
        const esAcademy = partido.equipo.nombre === "Academy";
        const esCSGO = partido.torneo.juego.nombre === "CS:GO";
        table.push([
          partido.fecha,
          partido.hora,
          partido.vs,
          partido.torneo.nombre,
          partido.torneo.juego.nombre,
          esAcademy ? "Academy" : "",
          esCSGO,
        ]);
      }
	  console.log(table.toString());
    });
  });
};

export default nueveZeta;
