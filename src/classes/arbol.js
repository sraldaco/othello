
export class Arbol {
    raiz;

    constructor () {
        this.raiz = null;
    }

    insertarRaiz (nodo) {
        this.raiz = nodo;
    }

    insertarNodo (padre, hijo) {
        hijo.padre = padre;
        padre.hijos.push(hijo);
    }
    
}