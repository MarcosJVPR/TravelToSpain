import * as XLSX from "xlsx";

const ENDPOINTS = {
  turistas: "https://api.dataestur.es/FRONTUR_DL",
  gasto: "https://api.dataestur.es/EGATUR_DL",
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const { dataset = "turistas" } = req.query;
  const url = ENDPOINTS[dataset];

  if (!url) {
    return res.status(400).json({
      error: `Dataset no válido: "${dataset}". Opciones: ${Object.keys(ENDPOINTS).join(", ")}.`,
    });
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(502).json({ error: "Dataestur no respondió correctamente.", status: upstream.status });
    }

    const buffer = await upstream.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

    return res.status(200).json({
      dataset,
      source: "Dataestur — Instituto de Turismo de España",
      fetchedAt: new Date().toISOString(),
      columns: rows.length ? Object.keys(rows[0]) : [],
      rowCount: rows.length,
      rows,
    });
  } catch (err) {
    return res.status(500).json({ error: "No se pudieron procesar los datos de Dataestur.", detail: err.message });
  }
}
