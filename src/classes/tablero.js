export class Tablero {
    turno;
    mundo;
    jugadasValidas;
    
    constructor () {
        this.turno = 1;
        this.mundo = [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,3,0,0,0],
                    [0,0,0,1,2,3,0,0],
                    [0,0,3,2,1,0,0,0],
                    [0,0,0,3,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
        this.jugadasValidas = [
            [{x: 4, y: 2}, ['Right']],
            [{x: 5, y: 3} , ['Top']],
            [{x: 2, y: 4}, ['Bottom']],
            [{x: 3, y: 5}, ['Left']]
        ];
    }
    
    cambiarTurno  () {
        this.turno = this.turno === 1 ? 2 : 1;
    }

    esJugadaValida(i, j) {
        return this.mundo[i][j] === 3;
    }
    
    calcularJugadasValidas() {
        this.mundo.forEach((x, i) => {
            x.forEach((y, j) => {
                if(y === 0) this.validarJugada(i, j);
            });
        });
    }

    validarJugada(i, j) {
        let jugada = [];
        let direccion = ['Left','Right','Top','Bottom','LeftTop','LeftBottom','RightTop','RightBottom'];
        direccion.forEach(direccion => {
            let linea = this.validarLinea(direccion, i, j);
            if(linea !== null) {
                this.mundo[i][j] = 3; jugada.push(linea);
            }
        });
        if(jugada.length > 0) this.jugadasValidas.push([{'x': i, 'y': j},jugada]);
    }
            
    validarLinea(direccion, i, j){
        let turnoContrario = this.turno === 2 ? 1 : 2;
        switch(direccion) {
            case 'Left':
                if(j-1 <= 1) return null;
                if(this.mundo[i][j-1] === turnoContrario) {
                    j--;
                    while(this.mundo[i][j] === turnoContrario) {
                        j--; if(j === 0) break;
                    }
                } else return null;
            break;
            case 'Right':
                if(j+1 >= 6) return null;
                if(this.mundo[i][j+1] === turnoContrario) {
                    j++;
                    while(this.mundo[i][j] === turnoContrario) {
                        j++; if(j === 7) break;
                    }
                } else return null;
            break;
            case 'Top':
                if(i-1 <= 1) return null;
                if(this.mundo[i-1][j] === turnoContrario) {
                    i--;
                    while(this.mundo[i][j] === turnoContrario) {
                        i--; if(i === 0) break;
                    }
                } else return null;
            break;
            case 'Bottom':
                if(i+1 >= 6) return null;
                if(this.mundo[i+1][j] === turnoContrario) {
                    i++;
                    while(this.mundo[i][j] === turnoContrario) {
                        i++; if(i === 7) break;
                    }
                } else return null;
            break;
            case 'LeftTop':
                if(i <= 1 || j <= 1) return null;
                if(this.mundo[i-1][j-1] === turnoContrario) {
                    i--;j--;
                    while(this.mundo[i][j] === turnoContrario) {
                        i--;j--; if(i === 0 || j === 0) break;
                    }
                } else return null;
            break;
            case 'LeftBottom':
                if(i >= 6 || j <= 1) return null;
                if(this.mundo[i+1][j-1] === turnoContrario) {
                    i++;j--;
                    while(this.mundo[i][j] === turnoContrario) {
                        i++;j--; if(i === 7 || j === 0) break;
                    }
                } else return null;
            break;
            case 'RightTop':
                if(i <= 1 || j >= 6) return null;
                if(this.mundo[i-1][j+1] === turnoContrario) {
                    i--;j++;
                    while(this.mundo[i][j] === turnoContrario) {
                        i--;j++; if(i === 0 || j === 7) break;
                    }
                } else return null;
            break;
            case 'RightBottom':
                if(i >= 6 || j >= 6) return null;
                if(this.mundo[i+1][j+1] === turnoContrario) {
                    i++;j++;
                    while(this.mundo[i][j] === turnoContrario) {
                        i++;j++; if(i === 7 || j === 7) break;
                    }
                } else return null;
            break;
            default: break;
        } return this.mundo[i][j] === this.turno  ? direccion : null;
    }

    tirarFicha(i, j) {
        if(!this.esJugadaValida(i, j)) return;
        this.mundo[i][j] = this.turno;
        this.mundo = this.mundo.map(x => {
            return x.map(y => {return y === 3 ? 0 : y});
        });
        this.voltearFichas(i,j);
        this.jugadasValidas = [];
        this.cambiarTurno();
        this.calcularJugadasValidas();
    }

    voltearFichas(i, j) {
        let jugada = this.jugadasValidas.filter(elem => {
            if(i === elem[0].x && j === elem[0].y) return elem;
        })[0];
        jugada[1].forEach(direccion => {
            this.voltear(i, j, direccion)
        });
    }

    voltear(i, j, direccion) {
        let turnoContrario = this.turno === 1 ? 2 : 1;
        switch(direccion) {
            case 'Left':
                while(this.mundo[i][j-1] === turnoContrario) {
                    this.mundo[i][j-1] = this.turno;
                    j--;
                }
            break;
            case 'Right':
                while(this.mundo[i][j+1] === turnoContrario) {
                    this.mundo[i][j+1] = this.turno;
                    j++;
                }
            break;
            case 'Top':
                while(this.mundo[i-1][j] === turnoContrario) {
                    this.mundo[i-1][j] = this.turno;
                    i--;
                }
            break;
            case 'Bottom':
                while(this.mundo[i+1][j] === turnoContrario) {
                    this.mundo[i+1][j] = this.turno;
                    i++;
                }
            break;
            case 'LeftTop':
                while(this.mundo[i-1][j-1] === turnoContrario) {
                    this.mundo[i-1][j-1] = this.turno;
                    i--;j--;
                }
            break;
            case 'LeftBottom':
                while(this.mundo[i+1][j-1] === turnoContrario) {
                    this.mundo[i+1][j-1] = this.turno;
                    i++;j--;
                }
            break;
            case 'RightTop':
                while(this.mundo[i-1][j+1] === turnoContrario) {
                    this.mundo[i-1][j+1] = this.turno;
                    i--;j++;
                }
            break;
            case 'RightBottom':
                while(this.mundo[i+1][j+1] === turnoContrario) {
                    this.mundo[i+1][j+1] = this.turno;
                    i++;j++;
                }
            break;
            default: break;
        }
    }
}


