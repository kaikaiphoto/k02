import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to clean base64 string
const cleanBase64 = (b64: string) => b64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

export const generateHeadshot = async (imageBase64: string, promptModifier: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Transform the following selfie into ${promptModifier}. Maintain the facial features and identity of the person in the source image strictly, but change the clothing, background, and lighting to match the description. Ensure high realism and professional photography quality.`
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(imageBase64)
            }
          }
        ]
      }
    });

    // Extract image from response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Headshot generation failed:", error);
    throw error;
  }
};

export const editImage = async (imageBase64: string, editInstruction: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Edit the following image: ${editInstruction}. Maintain the high quality and resolution.`
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(imageBase64)
            }
          }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image generated from edit.");
  } catch (error) {
    console.error("Image edit failed:", error);
    throw error;
  }
};