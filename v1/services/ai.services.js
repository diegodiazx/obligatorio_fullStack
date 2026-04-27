import axios from "axios";

export const generarBiografiaService = async (artista, titulo) => {
  const API_KEY = process.env.GEMINI_25_API_KEY;
  const MODEL = "gemini-2.5-flash";
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const text = `Generame una biografia corta para el artista ${artista} de la obra ${titulo}`;

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
