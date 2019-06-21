<template lang="pug">
  #app
    h1 OTHELLO (REVERSI)
    table
      tr(v-for="(row, i) in mundo")
        td.green(v-for="(col, j) in row" @click="tirarFicha(i, j)")
          div(v-if="col !== 0")
            svg(viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg")
              circle.svg(cx="60" cy="60" r="50" :class="{white: col === 2, lightgreen: col === 3}")
    h4
      span Jugador 1 : [ {{puntaje.jugador1}} ] 
        small (Negras) 
      span -- SCORE -- 
      span Jugador 2 : [ {{puntaje.jugador2}} ] 
        small (Blancas)
</template>

<script>
import {Tablero} from './classes/tablero';
var tablero = new Tablero();

export default {
  name: 'app',
  data() {
    return {
      mundo: []
    }
  },
  computed: {
    puntaje(){
      var j1 = 0, j2 = 0;
      this.mundo.forEach(x => {
        x.forEach(y => {
          if(y === 1) j1++;
          if(y === 2) j2++;
        });
      });
      return {"jugador1": j1, "jugador2": j2};
    }
  },
  methods: {
    tirarFicha (i, j) {
      tablero.tirarFicha(i, j);
      this.mundo = [];
      this.mundo = tablero.mundo;
    },
  },
  mounted() {
    this.mundo = tablero.mundo;
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {background-color: #252b36;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #efefef;
  margin-top: 60px;
  table {
    background-color: white;
    margin: 0 auto;
    border: 4px solid white;
    border-collapse: collapse;
    box-shadow: 2px 3px 20px black;
    line-height: 1rem;
    vertical-align: middle;
    text-align: center;
    td.green {
      width: 60px;
      height: 60px;
      padding: 6px;
      background-color: green;
      border: 1px dotted white;
      .svg {
        transition: all .5s ease;
        &:hover {
          cursor: pointer;
        }
        &.white {
          fill: white;
        }
        &.lightgreen {
          fill: lightgreen;
          fill-opacity: 0.2;
        }
      }
    }
  }
}
</style>
