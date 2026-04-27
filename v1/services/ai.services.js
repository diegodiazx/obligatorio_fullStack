import axios from "axios";

export const generarBiografiaService = async (artista, titulo) => {
  const API_KEY = process.env.GEMINI_25_API_KEY;
  const MODEL = "gemini-2.5-flash";
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const text = `Generame una biografia corta de maximo 400 caracteres para el artista ${artista} de la obra ${titulo}.
  Deberia incluir los detalles mas relevantes del artista, como su estilo, epoca, obras mas conocidas, y cualquier otro dato interesante.
  Retorname solo la biografia lista para ser guardada en la base de datos. `;

  try {
    const response = await axios.post(
      ENDPOINT,
      {
        contents: [{ parts: [{ text }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
      },
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Gemini error:", error.response?.data || error.message);
    return null;
  }
};
