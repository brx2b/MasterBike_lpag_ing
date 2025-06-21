const supabaseClient = supabase.createClient(
  'https://pyevuwdwubtepetyltnu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZXZ1d2R3dWJ0ZXBldHlsdG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NzY2MTYsImV4cCI6MjA2NjA1MjYxNn0.LstnF5yWE9cPH4bs_y-9ojaFru7R69Yo1o5y58mdnFc'
);

let carrito = [];

async function renderCatalogo() {
  const { data: bicicletas, error } = await supabaseClient
    .from('bodega_bicicletas')
    .select('*');

  if (error) {
    console.error('❌ Error al cargar bicicletas:', error);
    return;
  }

  const catalogo = document.querySelector(".catalogo");
  catalogo.innerHTML = "";

  bicicletas.forEach(bici => {
    const card = document.createElement("article");
    card.className = "bicicleta-card";
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
  console.log(`🚲 Bicicleta con ID ${id} agregada al carrito.`);
}

renderCatalogo();
