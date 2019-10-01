import { Arbol } from "../classes/arbol";
import { Nodo } from "../classes/nodo";
import { Tablero } from "../classes/tablero";

export class Agente {
  constructor() {}

  obtenerJugada(tablero) {
    this.generarArbol(tablero);
  }

  generarArbol(tablero) {
    let arbol = new Arbol();
    arbol.insertarRaiz(new Nodo(tablero));
    this.generarHijosArbol(arbol, arbol.raiz, 4);
    //console.log(arbol);
    arbol = null;
  }

  generarHijosArbol(arbol, padre, profundidad) {
    if (profundidad > 0) {
      if (padre.tablero.jugadasValidas.length > 0) {
        padre.tablero.jugadasValidas.forEach(jugada => {
          let tablero = new Tablero();
          this.clonarTablero(padre.tablero, tablero);
          tablero.tirarFicha(jugada[0].x, jugada[0].y);
          tablero.limpiarTablero();
          tablero.cambiarTurno();
          tablero.calcularJugadasValidas();
          let nodo = new Nodo(tablero);
          arbol.insertarNodo(padre, nodo);
          this.generarHijosArbol(arbol, nodo, profundidad - 1);
        });
      } else {
        let tablero = new Tablero();
        this.clonarTablero(padre.tablero, tablero);
        tablero.limpiarTablero();
        tablero.cambiarTurno();
        tablero.calcularJugadasValidas();
        if (tablero.jugadasValidas.length > 0) {
          let nodo = new Nodo(tablero);
          arbol.insertarNodo(padre, nodo);
          this.generarHijosArbol(arbol, nodo, profundidad - 1);
        }
      }
    }
  }

  clonarTablero(padre, hijo) {
    hijo.turno = padre.turno;
    padre.rejilla.forEach(rows => {
      let row = [];
      rows.forEach(value => {
        row.push(value);
      });
      hijo.rejilla.push(row);
    });
    padre.jugadasValidas.forEach(j => {
      let jugada = [];
      let xr = j[0].x,
        yr = j[0].y;
      jugada.push({ x: xr, y: yr });
      let direccion = [];
      j[1].forEach(d => {
        direccion.push(d);
      });
      jugada.push(direccion);
      hijo.jugadasValidas.push(jugada);
    });
  }
}
