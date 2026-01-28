const API_URL = 'http://localhost:3000/api';
let editingUserId = null; // Para saber si estamos editando

// Espera a que el HTML cargue
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();

  const form = document.getElementById('userForm');
  form.addEventListener('submit', submitUserForm);
});

// Crear o actualizar usuario
async function submitUserForm(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    let response;
    if (editingUserId) {
      // Actualizar usuario
      response = await fetch(`${API_URL}/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
    } else {
      // Crear usuario
      response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
    }

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    // Reset formulario
    document.getElementById('userForm').reset();
    const submitBtn = document.getElementById('userForm').querySelector('button[type="submit"]');
    submitBtn.textContent = 'Crear Usuario';
    editingUserId = null;

    loadUsers();
  } catch (error) {
    alert('Error al enviar datos');
  }
}

// Obtener usuarios
async function loadUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    const list = document.getElementById('usersList');
    list.innerHTML = '';

    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} - ${user.email}`;

      // Botón eliminar
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.classList.add('btn-small', 'delete-btn');
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.addEventListener('click', () => deleteUser(user.id));

      // Botón actualizar
      const updateBtn = document.createElement('button');
      updateBtn.textContent = 'Actualizar';
      updateBtn.classList.add('btn-small', 'update-btn');
      updateBtn.style.marginLeft = '10px';
      updateBtn.addEventListener('click', () => fillFormForUpdate(user));

      li.appendChild(deleteBtn);
      li.appendChild(updateBtn);
      list.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
}

// Eliminar usuario
async function deleteUser(id) {
  if (!confirm('¿Eliminar este usuario?')) return;

  try {
    await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE'
    });

    loadUsers();
  } catch (error) {
    alert('Error al eliminar usuario');
  }
}

// Llenar formulario para actualizar
function fillFormForUpdate(user) {
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('password').value = user.password;

  const form = document.getElementById('userForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Actualizar Usuario';

  editingUserId = user.id;
}

// Pedidos

document.addEventListener('DOMContentLoaded', () => {
  loadOrders();

  const orderForm = document.getElementById('orderForm');
  orderForm.addEventListener('submit', submitOrderForm);
});

let editingOrderId = null; 


async function submitOrderForm(event) {
  event.preventDefault();

  const id_usuario = document.getElementById('id_usuario').value;
  const description = document.getElementById('description').value;
  const total = document.getElementById('total').value;

  try {
    let response;
    if (editingOrderId) {
      // Actualizar pedido
      response = await fetch(`${API_URL}/orders/${editingOrderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario, description, total })
      });
    } else {
      // Crear pedido
      response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario, description, total })
      });
    }

    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }

    document.getElementById('orderForm').reset();
    editingOrderId = null;
    loadOrders(); // Recargar lista
  } catch (error) {
    alert('Error al enviar pedido');
    console.error(error);
  }
}

// Obtener pedidos
async function loadOrders() {
  try {
    const response = await fetch(`${API_URL}/orders`);
    const orders = await response.json();

    const list = document.getElementById('ordersList');
    list.innerHTML = '';

    orders.forEach(order => {
      const li = document.createElement('li');
      li.textContent = `Usuario: ${order.id_usuario} | ${order.description} | Total: $${order.total}`;

      // Botón eliminar
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.classList.add('btn-small', 'delete-btn');
      deleteBtn.addEventListener('click', () => deleteOrder(order.id));

      // Botón actualizar
      const updateBtn = document.createElement('button');
      updateBtn.textContent = 'Actualizar';
      updateBtn.classList.add('btn-small', 'update-btn');
      updateBtn.addEventListener('click', () => fillOrderFormForUpdate(order));

      li.appendChild(deleteBtn);
      li.appendChild(updateBtn);
      list.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
}

// Eliminar pedido
async function deleteOrder(id) {
  if (!confirm('¿Eliminar este pedido?')) return;

  try {
    await fetch(`${API_URL}/orders/${id}`, {
      method: 'DELETE'
    });

    loadOrders();
  } catch (error) {
    alert('Error al eliminar pedido');
  }
}

// Llenar formulario para actualizar pedido
function fillOrderFormForUpdate(order) {
  document.getElementById('id_usuario').value = order.id_usuario;
  document.getElementById('description').value = order.description;
  document.getElementById('total').value = order.total;

  editingOrderId = order.id;
}
