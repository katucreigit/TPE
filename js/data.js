document.addEventListener('DOMContentLoaded', () => {
  const dataForm = document.getElementById('data-form');
  const itemBurgerInput = document.getElementById('item-burger');
  const itemValueInput = document.getElementById('item-value');
  const itemSideInput = document.getElementById('item-side');
  const itemDrinkInput = document.getElementById('item-drink');
  const tableBody = document.getElementById('table-body');
  const addItemBtn = document.getElementById('add-item-btn');
  const updateItemBtn = document.getElementById('update-item-btn');
  const statusMessage = document.getElementById('status-message');

  // Modal de confirmación
  const confirmationModal = document.getElementById('confirmation-modal');
  const confirmDeleteBtn = confirmationModal.querySelector('.confirm-btn');
  const cancelDeleteBtn = confirmationModal.querySelector('.cancel-btn');
  let itemToDeleteId = null;
    // Para almacenar el ID del elemento a eliminar

  let editingItemId = null;
    // Para almacenar el ID del elemento que se está editando

  const items = [] ;

  // Función para mostrar mensajes de estado (error/éxito)
  function showMessage(element, message, type = 'error') {
    element.textContent = message;
    element.classList.remove('hidden', 'error', 'success');
    element.classList.add(type); // Añadir la clase de tipo
    setTimeout(() => {
      element.classList.add('hidden');
    }, 5000); // Ocultar mensaje después de 5 segundos
  }

  function setEditingItem( id ) {
    itemToDeleteId = null;
    editingItemId = id;
    addItemBtn.style.display = 'none';
    updateItemBtn.style.display = 'inline-block';
  }

  function resetEditingItem() {
    editingItemId = null;
    addItemBtn.style.display = 'inline-block';
    updateItemBtn.style.display = 'none';
  }

  // Función para renderizar la tabla con los datos
  function renderTable(data) {
    tableBody.innerHTML = ''; // Limpiar tabla
    if (data.length === 0) {
      const row = document.createElement( 'tr' ) ;
      const empty = document.createElement( 'td' ) ;
      empty.setAttribute( 'colspan' , 6 ) ;
      empty.classList.add( 'empty' ) ;
      empty.textContent = 'No hay ningun pedido hecho.' ;
      row.appendChild( empty ) ;
      tableBody.appendChild( row ) ;
      return;
    }
    data.forEach( ( item , index ) => {
      const row = document.createElement('tr') ;
      item.id = index + 1 ;
      [ 'id', 'burger' , 'side', 'drink', 'value'].forEach( attr => {
        const td = document.createElement('td') ;
        td.textContent=item[attr] ;
        row.appendChild( td ) ;
      } ) ;

      const actions = document.createElement('td') ;
      actions.classList.add( 'table-actions' ) ;
      const edit = document.createElement('button') ;
      edit.classList.add( 'edit-btn' ) ;
      edit.textContent = 'Editar' ;
      edit.addEventListener( 'click' , (e) => {
        setEditingItem( item.id ) ;
        itemBurgerInput.value = item.burger;
        itemValueInput.value = item.value;
        itemSideInput.value = item.side;
        itemDrinkInput.value = item.drink;
      } ) ;
      actions.appendChild( edit ) ;

      const del = document.createElement('button') ;
      del.classList.add( 'delete-btn' ) ;
      del.textContent = 'Eliminar' ;
      del.addEventListener( 'click' , (e) => {
        itemToDeleteId = item.id;
        resetEditingItem();
        dataForm.reset();
        confirmationModal.style.display = 'flex'; // Muestra el modal
      } ) ;
      actions.appendChild( del ) ;
      row.appendChild( actions ) ;
      tableBody.appendChild(row);
    });
  }

  // Función para cargar datos al DOM desde el arreglo de items.
  function loadData() {
    renderTable( items ) ;
  }

  // Manejar el envío del formulario (Agregar/Actualizar)
  dataForm.addEventListener( 'submit', (event) => {
    event.preventDefault() ;
    const burger = itemBurgerInput.value.trim() ;
    const value = parseFloat( itemValueInput.value ) ;
    const side = itemSideInput.value.trim() ;
    const drink = itemDrinkInput.value.trim() ;


    if( !burger || isNaN( value ) || !side || !drink) {
      showMessage( statusMessage,
        'Por favor,  completa todos los campos correctamente.', 'error' ) ;
      return;
    }

    const itemData = { burger , side, drink, value } ;

    if( editingItemId ) {
      items[editingItemId-1] = itemData ;
      showMessage( statusMessage,
        'Pedido actualizado con éxito.', 'success' ) ;
    } else {
      items.push( itemData ) ;
      showMessage( statusMessage, 'Pedido agregado con éxito.', 'success' ) ;
    }
    resetEditingItem() ;
    dataForm.reset() ;
    loadData() ; // Recargar datos después de la operación
  } ) ;

  dataForm.addEventListener( 'reset' , resetEditingItem ) ;

  // Lógica del modal de confirmación
  confirmDeleteBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none'; // Oculta el modal

    if(itemToDeleteId) {
      items.splice( itemToDeleteId - 1 , 1 ) ; // Elimina el elemento de items
      showMessage( statusMessage,
        'Pedido eliminado con éxito.', 'success' ) ;
      loadData() ; // Recargar datos después de eliminar
      itemToDeleteId = null; // Limpiar el ID después de la operación
    }
  } ) ;

  cancelDeleteBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none'; // Oculta el modal
    itemToDeleteId = null; // Limpiar el ID
  } ) ;

  // Cargar los datos iniciales al cargar la página
  loadData() ;
} ) ;