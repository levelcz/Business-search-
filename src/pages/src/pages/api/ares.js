import xml2js from 'xml2js';

export default async function handler(req, res) {
  const { ico } = req.query;

  if (!ico) {
    return res.status(400).json({ error: 'Chybí IČO' });
  }

  const url = `https://wwwinfo.mfcr.cz/cgi-bin/ares/darv_bas.cgi?ico=${ico}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(text);

    const zaznam = result.ARES_odpovedi.Odpoved.Vypis_BASIC;

    if (!zaznam || !zaznam.Obchodni_firma) {
      return res.status(404).json({ error: 'Firma nenalezena' });
    }

    const firma = {
      nazev: zaznam.Obchodni_firma,
      ico: zaznam.IC,
      adresa: zaznam.Adresa_ARES?.TEXT_ADRESA,
      pravniForma: zaznam.Pravni_forma?.$?.nazev_pf,
    };

    res.status(200).json(firma);
  } catch (error) {
    res.status(500).json({ error: 'Chyba při komunikaci s ARES' });
  }
}