// REFERENCIAS DE LA BARAJA
let deck = [];
const tipos = ['C','D','H','S'];
const figuras = ['A','J','Q','K'];

// REFERENCIAS DE LOS PUNTOS DE LOS JUGADORES
let puntosJugador = 0;
let puntosComputadora = 0;

/*
btnNuevoJuego
btnPedirCarta
btnPararJuego
*/

// REFERENCIAS DEL HTML
const btnPedirCarta = document.querySelector('#btnPedirCarta');
const btnDetener = document.querySelector('#btnDetener');
const puntosJ = document.querySelector('#puntosJ');
const barajaJ = document.querySelector('#barajaJ');
const puntosC = document.querySelector('#puntosC');
const barajaC = document.querySelector('#barajaC');

//<img src="./assets/cartas/grey_back.png" alt="Trasera de carta Gris">

// FUNCION PARA CREAR UNA NUEVA BARAJA
const crearDeck = () => {

    // Tipo de carta
    for( let i = 2; i<=10; i++){  
        for (let tipo of tipos) {
            deck.push( i + tipo );
        }
    }

    // Cartas con figura
    for (let tipo of tipos){
        for (let figura of figuras){
            deck.push( figura + tipo );
        }
    }

    // _.shuffle para que la baraja sea aleatoria. Metodo de Underscore JS
    deck = _.shuffle(deck);

    return deck;
}
crearDeck();

// FUNCION DE SOLICITUD DE CARTA
const pedirCarta = () =>{

    if( deck.length === 0 ){
        throw 'No hay más cartas en la baraja';
    }

    const carta = deck.pop();
    return carta;
} 
pedirCarta();

// VALOR DE LAS CARTAS RECIBIDAS
const valorCarta = (carta) => {
    
    // Oviamos la última letra del string
    const valor = carta.substring(0, carta.length - 1);

    /**
     * Calculamos el valor de la carta si contiene una letra
     * 
     * - isNaN Evalua si es un numero o no
     */
    return ( isNaN( valor )) 
            ? ( valor === 'A' ) ? 11 : 10
           // Si es un numero lo multiplicamos por 1 para que deje de comportarse como un string
            : valor * 1;

}

// TURNO DE LA COMPUTADORA
const turnoComputadora = ( puntosMinimos ) => {
    do{
        const carta = pedirCarta();

        // Puntos jugador
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosC.innerText = puntosComputadora;
        
        // Baraja jugador
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        //imgCarta.classList.add('carta');
        barajaC.append( imgCarta );

        if( puntosMinimos > 21 ){
            break;
        }

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) ){

    }
}

// EVENTOS
btnPedirCarta.addEventListener('click', ()=>{

    const carta = pedirCarta();

    // Puntos jugador
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosJ.innerText = puntosJugador;
    
    // Baraja jugador
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${carta}.png`;
    //imgCarta.classList.add('carta');
    barajaJ.append( imgCarta );

    // Resultado jugador
    if( puntosJugador > 21 ){

        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if ( puntosJugador === 21 ) {

        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    }
    
});

// EVENTOS
btnDetener.addEventListener('click', ()=>{
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    
    turnoComputadora( puntosJugador );

});