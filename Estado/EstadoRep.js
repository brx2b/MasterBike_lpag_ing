<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
window.supabaseClient = supabase.createClient(
    //url brx
    'https://pyevuwdwubtepetyltnu.supabase.co',
    //key
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZXZ1d2R3dWJ0ZXBldHlsdG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NzY2MTYsImV4cCI6MjA2NjA1MjYxNn0.LstnF5yWE9cPH4bs_y-9ojaFru7R69Yo1o5y58mdnFc'
);

  // Prueba simple: listar los datos de una tabla (por ejemplo, 'usuarios')
  async function testConnection() {
    const { data, error } = await supabase.from('bodega_bicicletas').select('*');

    if (error) {
      console.error('❌ Error al conectar o consultar:', error.message);
    } else {
      console.log('✅ Conexión exitosa. Datos:', data);
    }
  }

  // Ejecuta la función de prueba al cargar la página
  testConnection();

