document.addEventListener( 'DOMContentLoaded' , () => {
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    hamburgerButton.addEventListener( 'click' , () => {
    const isExpanded = hamburgerButton
    .getAttribute( 'aria-expanded' ) === 'true' ;
    hamburgerButton.setAttribute( 'aria-expanded' , !isExpanded ) ;
    mainNav.classList.toggle( 'nav-open' ) ; // Alterna la clase 'nav-open'
    } ) ;

  // Cierra el menú si se hace clic fuera de él en dispositivos móviles
    document.addEventListener( 'click' , (event) => {
    if( !mainNav.contains( event.target ) &&
        !hamburgerButton.contains( event.target ) &&
        mainNav.classList.contains( 'nav-open' ) ) {
        hamburgerButton.setAttribute( 'aria-expanded' , 'false' ) ;
        mainNav.classList.remove( 'nav-open' ) ;
    }
    } ) ;

    window.addEventListener( 'resize' , () => {
    if( window.innerWidth >= 768 ) {
      mainNav.classList.remove( 'nav-open' ) ;
      hamburgerButton.setAttribute('aria-expanded', 'false') ;
    }
    } ) ;

//menu modal card
  const modal = document.getElementById('modal');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalDescripcion = document.getElementById('modal-descripcion');
  const cerrar = document.getElementById('cerrar');

  const botones = document.querySelectorAll('.ver-mas');

  for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];
  
    boton.addEventListener('click', (event) => {
      const card = boton.closest('.card');
      const titulo = card.querySelector('h3').textContent;
      const descripcion = boton.getAttribute('data-descripcion');
    
      modalTitulo.textContent = titulo;
      modalDescripcion.textContent = descripcion;
      modal.style.display = 'flex';
    });
  }
  if(cerrar){
    cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
    });
  }

//cards inicio
  const cards = document.querySelectorAll('.cardMp');
  let currentIndex = 0;

  cards[0].classList.add('active');

  function mostrarNextCard() {
    const currentCard = cards[currentIndex];
    const nextIndex = (currentIndex + 1) % cards.length;
    const nextCard = cards[nextIndex];

    nextCard.classList.remove('exit');
  
    currentCard.classList.remove('active');
    currentCard.classList.add('exit');

    currentCard.addEventListener('transitionend', function handler() {
    currentCard.classList.remove('exit');
    
    nextCard.classList.add('active');
    currentCard.removeEventListener('transitionend', handler);
  });

  currentIndex = nextIndex;
  }

  setInterval(mostrarNextCard, 4000);
} ) ;


