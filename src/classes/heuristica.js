import { Tablero } from "./tablero";

export class Heuristica {
  constructor() {}
  /*
   * Finalmente la función de utilidad para el tablero tab. Si es positivo favorece al j2.
   */
  utilidad(tablero){
    return (
      paridad(tablero.mundo) +
      esquinas(tablero.mundo) +
      movilidad(tablero) +
      estabilidad(tablero)
    );
  }

  /*
   * Este método saca una razón de la diferencia entre las casillas del jugador 2 y el jugador 1.
   */
  paridad(mundo) {
    let j1 = 0, j2 = 0;
    mundo.forEach(x => {
      x.forEach(y => {
        if (y === 1) j1++;
        if (y === 2) j2++;
      });
    });
    if (j2 + j1 > 0) return (100 * (j2 - j1)) / (j2 + j1);
    else return 0;
  }

  /*
   * calcula las fichas en las esquinas de cada jugador y saca una relación
   */
  esquinas(mundo) {
    let j1 =
      (mundo[0][0] === 1 ? 1 : 0) +
      (mundo[0][7] === 1 ? 1 : 0) +
      (mundo[7][0] === 1 ? 1 : 0) +
      (mundo[7][7] === 1 ? 1 : 0);
    let j2 =
      (mundo[0][0] === 2 ? 1 : 0) +
      (mundo[0][7] === 2 ? 1 : 0) +
      (mundo[7][0] === 2 ? 1 : 0) +
      (mundo[7][7] === 2 ? 1 : 0);
    if (j2 + j1 > 0) return (100 * (j2 - j1)) / (j2 + j1);
    else return 0;
  }

  /*
   * Este método verifica cuántas posibles jugadas tiene cada jugador en este estado del tablero.
   */
  movilidad(tablero){
    let tab = new Tablero();
    this.clonarTablero(tablero, tab);
    tab.limpiarTablero();
    tab.turno = 1;
    tab.calcularJugadasValidas();
    let j1 = tab.jugadasValidas.length;
    tab.limpiarTablero();
    tab.turno = 2;
    tab.calcularJugadasValidas();
    let j2 = tab.jugadasValidas.length;
    if (j1 + j2 > 0) return (100 * (j2 - j1)) / (j2 + j1);
    else return 0;
  }

  /*
   * Función que devuelve una suma de la estabilidad de las fichas.
   * (1) Estable: no se puede girar en ningún punto posterior del juego.
   * (0) Semi-estable: no se pueden girar en el próximo turno pero es posible girarlas 
   * en algún punto en el futuro.
   * (-1)Inestables: aquellas que se pueden girar en el siguiente turno.
  */
  estabilidad(tablero){
    let inestables1 = this.obtenerInestables(tablero, 1);
    let inestables2 = this.obtenerInestables(tablero, 2);
  }

  /*
   * Método que analiza la jugada siguiente para ver camvios en el tablero
   */
  obtenerInestables(tablero, turno) {
    let resultante = [8][8];
    let auxiliar = new Tablero();
    this.clonarTablero(tablero, auxiliar);
    auxiliar.limpiarTablero();
    auxiliar.turno = turno;
    auxiliar.calcularJugadasValidas();
    if (auxiliar.jugadasValidas.length > 0) {
      auxiliar.jugadasValidas.forEach(x => {
        x.forEach(y => {
          let tab = new Tablero();
          this.clonarTablero(tableroAuxiliar, tab);
          tab.tirarFicha(y[0].x, y[0].y);
          this.compararTableros(tab.mundo, auxiliar.mundo, resultante);
        });
      });
    }
    return auxiliar.filter(x => {
      x.filter(y => {
        return y === 4;
      });
    }).length;
  }

  /*
   * Compara los tableros y rellena el resultante con un 4 cuando difieren las fichas
   */  
  compararTableros(tablero, auxiliar, resultante) {
    tablero.forEach((x, i) => {
      x.forEach((y, j) => {
        if (auxiliar[i][j] != 0 && auxiliar[i][j] != 3) 
          if (auxiliar[i][j] != y) resultante[i][j] = 4;
      });
    });
  }


  /*
   * Clona los datos de un tablero a otro
   */
  clonarTablero(padre, hijo) {
    hijo.turno = padre.turno;
    padre.mundo.forEach(rows => {
      let row = [];
      rows.forEach(value => {
        row.push(value);
      });
      hijo.mundo.push(row);
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
