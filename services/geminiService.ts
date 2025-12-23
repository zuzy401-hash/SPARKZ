import { GoogleGenAI } from "@google/genai";

export const generateProjectDescription = async (title: string, category: string, keywords: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. Returning placeholder text.");
    return "Descripción no disponible (API Key faltante). Por favor añade tu clave para usar la IA.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `
      Eres un experto en marketing digital para una plataforma de software y libros llamada SPARKZ.
      Escribe una descripción atractiva, profesional y emocionante (máximo 80 palabras) para un nuevo proyecto subido a la plataforma.
      
      Detalles del proyecto:
      - Título: ${title}
      - Categoría: ${category}
      - Palabras clave/Ideas: ${keywords}
      
      La respuesta debe ser solo el texto de la descripción en español. No añadas títulos ni introducciones.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    return "Hubo un error al generar la descripción con SPARKZ AI. Por favor intenta escribirla manualmente.";
  }
};