import axios from "axios";

export const getModels = (req, res) => {
  res.json({ message: "List of AI models" });
};

export const useGemini25Flash = (req, res) => {
  const { artista, titulo } = req.body;
  let text = `Escribí una biografía del artista ${artista} (obra: ${titulo}).
    REGLAS OBLIGATORIAS:
    - Maximo 5 renglones de texto, sin importar el largo de cada renglón
    - No exceder bajo ninguna circunstancia
    - Sin introducciones ni explicaciones
    - Solo texto plano listo para guardar
    - Comenzar directamente con la biografía, sin encabezados ni saludos; con el nombre del aritsta

    Si no podés cumplir el límite, resumí más.`;
  const API_KEY = process.env.GEMINI_25_API_KEY;
  const MODEL = "gemini-2.5-flash";
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": API_KEY,
  };

  const body = {
    contents: [{ parts: [{ text }] }],
  };
  axios
    .post(ENDPOINT, body, { headers })
    .then((response) => {
      res.json({
        message: "Gemini 2.5 Flash response",
        final: response.data.candidates[0].content.parts[0].text,
        data: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error occurred while using Gemini 2.5 Flash model" });
    });
};
