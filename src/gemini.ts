import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getProductAdvice(query: string, products: any[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are a helpful shopping assistant for "Lumina Shop". 
      Based on the following products: ${JSON.stringify(products.map(p => ({ name: p.name, category: p.category, price: p.price })))}
      Answer the user's question: "${query}"
      Keep your answer concise and friendly. If they ask for recommendations, suggest 1-2 specific products from the list.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to my AI brain right now. How can I help you manually?";
  }
}
