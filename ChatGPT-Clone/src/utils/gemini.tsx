import axios from "axios";

export const generateGeminiResponse = async (
  userMessage: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(
      endpoint,
      {
        contents: [
          {
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Gemini parsing failure";
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("api error : ", err.response?.data || err.message);
    } else {
      console.error("unkn0wn err0r :", err);
    }
    throw new Error("Gemini API 요청 실패");
  }
};
