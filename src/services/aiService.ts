import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  // In AI Studio, GEMINI_API_KEY is usually provided via process.env
  // We check both process.env and import.meta.env for compatibility
  const key = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
  return key || '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export async function evaluatePronunciation(audioBase64: string, targetWord: string): Promise<{ score: number; feedback: string; isCorrect: boolean }> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      score: 0,
      feedback: "Clé API manquante. Veuillez configurer GEMINI_API_KEY dans les paramètres.",
      isCorrect: false
    };
  }
  
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
              Évaluez sa prononciation à partir de l'audio fourni. 
              Soyez indulgent : si le mot est reconnaissable malgré un accent ou un léger bruit de fond, accordez un score de passage (>= 70).
              Si l'audio est totalement inaudible ou si le mot est incorrect, donnez un score plus bas.
              Répondez UNIQUEMENT au format JSON suivant :
              {
                "score": (un nombre entre 0 et 100),
                "feedback": "un court message d'encouragement ou de correction constructive en français (max 15 mots)",
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
  } catch (error: any) {
    console.error("Erreur lors de l'évaluation de la prononciation :", error);
    
    // Check for specific API errors (quota, key, etc.)
    const errorMessage = error?.message || "";
    const isServiceDown = errorMessage.includes("API_KEY") || 
                         errorMessage.includes("quota") || 
                         errorMessage.includes("429") || 
                         errorMessage.includes("503");

    return {
      score: 0,
      feedback: isServiceDown 
        ? "Le service vocal est temporairement indisponible. Vous pouvez passer cet exercice." 
        : "Désolé, je n'ai pas pu analyser votre voix. Réessayez !",
      isCorrect: false
    };
  }
}
