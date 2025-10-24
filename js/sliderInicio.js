document.addEventListener( 'DOMContentLoaded' , () => {
    const cards = document.querySelectorAll('.cardMp');
    let currentIndex = 0;

    cards[0].classList.add('active');

    function mostrarNextCard() {
        const currentCard = cards[currentIndex]; //agarra la tarjeta con ese indice
        const nextIndex = (currentIndex + 1) % cards.length; //calcula el indice de la sig card y vuelve al principio cuando llega al final
        const nextCard = cards[nextIndex];

        nextCard.classList.remove('exit'); //se fija que la card sig no este en exit
        currentCard.classList.remove('active');
        currentCard.classList.add('exit');

        currentCard.addEventListener('transitionend', function handler() {
            //cuando la transicion termina
        currentCard.classList.remove('exit');
        nextCard.classList.add('active');
        currentCard.removeEventListener('transitionend', handler); //limpia el evento para que no se duplique
        });

        currentIndex = nextIndex; //actualiza el indice
    }

    setInterval(mostrarNextCard, 4000);
} ) ;