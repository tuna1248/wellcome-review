
import { GoogleGenAI, Type } from "@google/genai";

export const generateAIResponse = async (userPrompt: string, role: string, currentView: string): Promise<string> => {
  // Create a new GoogleGenAI instance right before making an API call to ensure it uses the latest API key from process.env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // Update to gemini-3-flash-preview for basic text tasks
    const model = 'gemini-3-flash-preview';
    
    const systemInstruction = `
      You are 'Wellcome AI', an intelligent assistant integrated into the Wellcome Clinic Platform.
      Your users are clinic staff (Doctors, Receptionists, Managers) who are often non-technical.
      
      Current Context:
      - User Role: ${role}
      - Current Screen: ${currentView}
      
      Platform Capabilities:
      - Appointment Management (Calendar, Booking)
      - CXM (Patient records, History)
      - Operations (Travel logistics for medical tourism)
      - Analytics (Business Intelligence)
      - Reputation (Reviews)
      
      Your Goal:
      - Be concise, professional, and extremely helpful.
      - If asked how to do something, provide simple step-by-step instructions.
      - Focus on simplicity and speed.
      - Keep responses under 100 words unless detailed explanation is requested.
      - Do not hallucinate features not mentioned.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    // Access .text property directly as per GenAI SDK guidelines
    return response.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server. Please try again later.";
  }
};

export const extractFlightDetailsFromImage = async (base64Image: string, mimeType: string = "image/jpeg"): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    // Use gemini-3-flash-preview which supports multimodal input and JSON mode
    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: "Extract flight and trip details from this ticket image. Return a JSON object with the following fields: tripName (e.g., 'London to Istanbul Trip'), flightCode, flightDate (YYYY-MM-DD), flightTime (HH:mm), hotelName (if present), checkInDate (if present), checkOutDate (if present). If a field is not found, leave it empty.",
          },
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tripName: { type: Type.STRING },
            flightCode: { type: Type.STRING },
            flightDate: { type: Type.STRING },
            flightTime: { type: Type.STRING },
            hotelName: { type: Type.STRING },
            checkInDate: { type: Type.STRING },
            checkOutDate: { type: Type.STRING },
          }
        }
      },
    });

    const text = response.text;
    if (!text) return null;
    
    // Clean up potential markdown code blocks
    const jsonStr = text.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Image Extraction Error:", error);
    return null;
  }
};
