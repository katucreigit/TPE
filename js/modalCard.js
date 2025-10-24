document.addEventListener( 'DOMContentLoaded' , () => {
    const modal = document.getElementById('modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const cerrar = document.getElementById('cerrar');

    function abrirModal(titulo, descripcion) {
        modalTitulo.textContent = titulo;
        modalDescripcion.textContent = descripcion;
        modal.style.display = 'flex';
    }
    function cerrarModal() {
        modal.style.display = 'none';
    }
    function initModal(){
        const botones = document.querySelectorAll('.ver-mas');
        for (let i = 0; i < botones.length; i++) {
            const boton = botones[i];
            boton.addEventListener('click', (event) => {
            const card = boton.closest('.card');
            const titulo = card.querySelector('h3').textContent;
            const descripcion = boton.getAttribute('data-descripcion');
            abrirModal(titulo, descripcion)
            });
        }
    }

    if(cerrar){
        cerrar.addEventListener('click',  cerrarModal);
    }
    initModal();
} ) ;