import fetch from 'node-fetch';
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

function darFila(partido) {
  const fecha = partido.fecha.split('-').slice(1, 3).reverse().join('/')
  const juego = partido.torneo.juego.nombre
  const esAcademy = partido.equipo.nombre === 'Academy'
  const fila = [
    (esAcademy ? `${juego} (A)` : juego),
    `${fecha} ${partido.hora}`,
    partido.vs,
    partido.torneo.nombre
  ]
  return fila
}

const nueveZeta = async (flags) => {
  const response = await fetch('https://9z.games/api/partidos');
  const data = await response.json();
  const partidos = data.filter(esVisible(flags))

  const table = new Table({ head: ['Juego', 'Fecha', 'Versus', 'Torneo'] })
  const filas = partidos.map(darFila)
  filas.forEach(element => table.push(element))
  console.log(table.toString())
}

export default nueveZeta