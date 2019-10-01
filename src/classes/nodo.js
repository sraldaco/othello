export class Nodo {
  tablero;
  padre;
  hijos;
  jugada;
  valor;

  constructor(tablero) {
    this.tablero = tablero;
    this.padre = null;
    this.hijos = [];
    this.jugada = [];
  }
}
