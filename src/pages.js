'use client'; // pokud používáš App Router v Next.js 13+

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Page() {
  const [firmy, setFirmy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase
        .from('firmy')
        .select('*')
        .limit(10);

      if (error) {
        console.error('Chyba při načítání:', error);
      } else {
        setFirmy(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Firmy z databáze</h1>
      <ul>
        {firmy.map((firma) => (
          <li key={firma.id}>{firma.nazev} - {firma.mesto}</li>
        ))}
      </ul>
    </div>
  );
}