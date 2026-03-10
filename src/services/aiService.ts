import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function evaluatePronunciation(audioBase64: string, targetWord: string): Promise<{ score: number; feedback: string; isCorrect: boolean }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "audio/webm",
                data: audioBase64,
              },
            },
            {
              text: `L'utilisateur essaie de prononcer le mot allemand suivant : "${targetWord}". 
              Évaluez sa prononciation. 
              Répondez UNIQUEMENT au format JSON suivant :
              {
                "score": (un nombre entre 0 et 100),
                "feedback": "un court message d'encouragement ou de correction en français",
                "isCorrect": (true si le score est >= 70, sinon false)
              }`
            },
          ],
        },
      ],
    });

    const text = response.text;
    if (!text) throw new Error("Pas de réponse de l'IA");

    // Clean JSON response if necessary
    const jsonMatch = text.match(/\{.*\}/s);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erreur lors de l'évaluation de la prononciation :", error);
    return {
      score: 0,
      feedback: "Désolé, je n'ai pas pu analyser votre voix. Réessayez !",
      isCorrect: false
    };
  }
}
