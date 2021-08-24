#!/usr/bin/env node

import https from 'https'
// TODO: Replace table for colors
import Table from 'cli-table3'

function esVisible(flags) {
  return function (partido) {
    const hasFlags = Object.values(flags).some(flag => flag !== false)
    if (!hasFlags) return true

    const juego = partido.torneo.juego.nombre
    if (flags.csgo && juego === 'CS:GO') return true
    if (flags.fortnite && juego === 'Fortnite') return true
    if (flags.valorant && juego === 'Valorant') return true
    return false
  }
}

const nueveZeta = (flags) => {
  const url = 'https://9z.games/api/partidos'
  // TODO: Refactor con await
  https.get(url, (res) => {
    let data = ''
    res.on('data', (chunk) => (data += chunk))
    res.on('end', () => {
      // TODO: Add 'Twitch', 'Faltan'
      const table = new Table({
        head: ['Fecha', 'Juego', 'Versus', 'Torneo']
      })

      const input = JSON.parse(data)
      const partidos = input.filter(esVisible(flags))
      // TODO: Refactor loop for map
      for (const partido of partidos) {
        const fecha = partido.fecha.split('-').slice(1, 3).reverse().join('/')
        const juego = partido.torneo.juego.nombre
        const esAcademy = partido.equipo.nombre === 'Academy'
        table.push([
          `${fecha} ${partido.hora}`,
          (esAcademy ? `${juego} (A)` : juego),
          partido.vs,
          partido.torneo.nombre
        ])
      }
      console.log(table.toString())
    })
  })
}

export default nueveZeta
