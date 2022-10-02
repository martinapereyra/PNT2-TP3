new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida: function () {
            this.turnos=[];
            this.hayUnaPartidaEnJuego=true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
        },
        atacar: function () {
            let bajaPuntos = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -= bajaPuntos;
            this.turnos.unshift({
                esJugador:true,
                text:"El jugador golpea al monstruo por " + bajaPuntos
            });
            
            if(this.verificarGanador()){
                return;
            }

            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let bajaPuntos = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= bajaPuntos;
            this.turnos.unshift({
                esJugador:true,
                text:"El Jugador golpea al monstruo por " + bajaPuntos
            });

            if(this.verificarGanador()){
                return;
            }

            this.ataqueDelMonstruo(); 
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador +=10;
                this.turnos.unshift({
                    esJugador:true,
                    text:"El Jugador incrementar su energía por 10 puntos"
                });
            }else{
                this.saludJugador = 100;
                this.turnos.unshift({
                    esJugador:true,
                    text:"El Jugador recuperea su salud"
                });
            }

            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego=false;
        },

        ataqueDelMonstruo: function () {
            let bajaPuntos = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= bajaPuntos;
            this.turnos.unshift({
                esJugador:false,
                text:"El monstruo lastima al jugador por " + bajaPuntos
            });
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random()* rango[1]) + 1, rango[0]);
        },
        verificarGanador: function () {
            if(this.saludMonstruo <=0){
                if(confirm("Ganaste! Jugar de nuevo?")){
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }else if ( this.playerHealth <= 0){
                if(confirm("Perdiste! Jugar de nuevo?")){
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});