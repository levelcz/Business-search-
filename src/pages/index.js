export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Business Search</h1>
      <p>Zadej obor a město, a najdi firmy.</p>
      <input type="text" placeholder="Např. Stavebnictví" /><br />
      <input type="text" placeholder="Např. Praha" /><br />
      <button>Hledat</button>
    </div>
  );
}