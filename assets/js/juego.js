let deck = [];
const tipos = ['C','D','H','S'];
const figuras = ['A','J','Q','K'];

// funcion para crear nueva baraja
const crearDeck = () => {

    // Tipo de carta
    for( let i = 2; i<=10 ; i++){  
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
    console.log(deck);

    return deck;
}

crearDeck();

// Funcion de solicitud de carta
const pedirCarta = () =>{

    if( deck.length === 0 ){
        throw 'No hay más cartas en el deck';
    }

    const carta = deck.pop();
}

pedirCarta();

// Valor de las cartas
const valorCarta = (carta) => {
    
    // Oviamos la última letra del string
    const valor = carta.substring(0, carta.length - 1);

    // Calculamos el valor de la carta si contiene una letra
    return (isNaN( valor )) ?
           ( valor === 'A' ) ? 11 : 10
           : valor * 1;

}