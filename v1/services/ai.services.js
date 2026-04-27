import axios from "axios";

export const generarBiografiaService = async (artista, titulo) => {
  const API_KEY = process.env.GEMINI_25_API_KEY;
  const MODEL = "gemini-2.5-flash";
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const text = `Escribí una biografía del artista ${artista} (obra: ${titulo}).
    REGLAS OBLIGATORIAS:
    - Maximo 100 palabras
    - No exceder bajo ninguna circunstancia
    - Sin introducciones ni explicaciones
    - Solo texto plano listo para guardar
    - Comenzar directamente con la biografía, sin encabezados ni saludos; con el nombre del aritsta

    Si no podés cumplir el límite, resumí más.`;

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
