
// rentarScript.js
// Supabase client
document.addEventListener('DOMContentLoaded', () => {
  window.supabaseClient = supabase.createClient(
    'https://pyevuwdwubtepetyltnu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZXZ1d2R3dWJ0ZXBldHlsdG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NzY2MTYsImV4cCI6MjA2NjA1MjYxNn0.LstnF5yWE9cPH4bs_y-9ojaFru7R69Yo1o5y58mdnFc'
  );

  // Inicializar catálogo y eventos
  renderCatalogo();
  document.getElementById('generarBoletaBtn')
    .addEventListener('click', generarBoleta);
});

let bicicletasGlobal = [];
let carrito = [];

async function renderCatalogo() {
  const { data: bicicletas, error } = await window.supabaseClient
    .from('bodega_bicicletas')
    .select('*');

  if (error) {
    console.error('❌ Error al cargar bicicletas:', error);
    return;
  }

  bicicletasGlobal = bicicletas;
  const catalogo = document.querySelector('.catalogo');
  catalogo.innerHTML = '';

  bicicletas.forEach(bici => {
    const card = document.createElement('article');
    card.className = 'bicicleta-card';
    card.innerHTML = `
      <img src="${bici.url_imagen}" alt="${bici.nombre}" class="bicicleta-img">
      <div class="bicicleta-info">
        <h3 class="bicicleta-nombre">${bici.nombre}</h3>
        <p class="bicicleta-desc">${bici.descrip}</p>
        <div class="bicicleta-precio">$${bici.valor.toLocaleString('es-CL')}</div>
        <button class="btn-agregar" onclick="agregarAlCarrito(${bici.id})">Agregar</button>
      </div>
    `;
    catalogo.appendChild(card);
  });
}

function agregarAlCarrito(id) {
  const bici = bicicletasGlobal.find(b => b.id === id);
  if (!bici) return;

  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id: bici.id,
      nombre: bici.nombre,
      precio: Number(bici.valor),
      cantidad: 1
    });
  }
  renderCarrito();
}

function quitarDelCarrito(id) {
  const idx = carrito.findIndex(item => item.id === id);
  if (idx === -1) return;

  if (carrito[idx].cantidad > 1) {
    carrito[idx].cantidad--;
  } else {
    carrito.splice(idx, 1);
  }
  renderCarrito();
}

function renderCarrito() {
  const lista = document.getElementById('carritoLista');
  const totalEl = document.getElementById('carritoTotal');
  lista.innerHTML = '';

  if (carrito.length === 0) {
    lista.innerHTML = '<p>Agrega bicicletas para rentar</p>';
    totalEl.textContent = 'Total: $0';
    return;
  }

  carrito.forEach(item => {
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <div class="carrito-item-info">
        <div class="carrito-item-nombre">${item.nombre}</div>
        <div class="carrito-item-cantidad">Cantidad: ${item.cantidad}</div>
      </div>
      <div class="carrito-item-precio">$${(item.precio * item.cantidad).toLocaleString('es-CL')}</div>
      <button class="btn-eliminar" onclick="quitarDelCarrito(${item.id})">Eliminar</button>
    `;
    lista.appendChild(div);
  });

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  totalEl.textContent = `Total: $${total.toLocaleString('es-CL')}`;
}

function generarBoleta() {
  const boletaEl = document.getElementById('boleta');
  const listaBoleta = document.getElementById('boletaLista');
  const totalBoleta = document.querySelector('.boleta-total');
  if (carrito.length === 0) {
    alert('El carrito está vacío. Agrega bicicletas antes de generar la boleta.');
    return;
  }
  // Limpiar
  listaBoleta.innerHTML = '';
  // Agregar items
  carrito.forEach(item => {
    const div = document.createElement('div');
    div.className = 'boleta-item';
    div.innerHTML = `
      <span>${item.nombre} (x${item.cantidad})</span>
      <span>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
    `;
    listaBoleta.appendChild(div);
  });
  // Total sin IVA
  const totalSinIVA = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  
  // Calcular IVA
  const iva = totalSinIVA * 0.19; // 19%
  const totalConIVA = totalSinIVA + iva;
  // Mostrar total
  totalBoleta.textContent = `Total a pagar (incluye IVA 19%): $${totalConIVA.toLocaleString('es-CL')}`;
  // Mostrar boleta
  boletaEl.style.display = 'flex';
  boletaEl.scrollIntoView({ behavior: 'smooth' });
}
