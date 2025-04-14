
async function search() {
  const query = document.getElementById('search').value.toLowerCase();
  const { data, error } = await supabase
    .from('firmy')
    .select('*')
    .ilike('obor', `%${query}%`);

  const list = document.getElementById('results');
  list.innerHTML = '';
  if (data) {
    data.forEach(firma => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${firma.obchodni_jmeno}</strong><br>${firma.ulice} ${firma.cp}, ${firma.mesto}<br>${firma.email || ''} ${firma.telefon || ''}`;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = '<li>Chyba při načítání dat.</li>';
  }
}
