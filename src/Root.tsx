import { useState, useEffect } from "react";
import { staticFile, interpolate, Audio } from "remotion";
import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = "PONÉ-AQUÍ-TU-ID";          // lo sacás de la URL del Sheet
const SHEET_NAME = "Sheet1";

export const RemotionVideo = () => {
  const [text, setText] = useState("Cargando…");

  useEffect(() => {
    // Leemos la última fila (gratis, no necesita key)
    fetch(
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?sheet=${SHEET_NAME}&tq=select%20A%20order%20by%20A%20desc%20limit%201`
    )
      .then((r) => r.text())
      .then((t) => {
        const json = JSON.parse(t.substr(47).slice(0, -2));
        setText(json.table.rows[0].c[0].v);
      });
  }, []);

  return (
    <div style={{ flex: 1, backgroundColor: "#111", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: "white", fontSize: 80, textAlign: "center" }}>{text}</h1>
      <Audio src="https://storage.googleapis.com/remotion-assets/tts.mp3" />
    </div>
  );
};
