import { useState } from 'react';

export default function AresSearch() {
  const [ico, setIco] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/ares?ico=${ico}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
      setError(null);
    } catch (err) {
      setData(null);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Vyhledávání firmy podle IČO (ARES)</h1>
      <input
        type="text"
        placeholder="Zadej IČO"
        value={ico}
        onChange={(e) => setIco(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <button onClick={handleSearch}>Vyhledat</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{data.nazev}</h2>
          <p>IČO: {data.ico}</p>
          <p>Adresa: {data.adresa}</p>
          <p>Právní forma: {data.pravniForma}</p>
        </div>
      )}
    </div>
  );
}