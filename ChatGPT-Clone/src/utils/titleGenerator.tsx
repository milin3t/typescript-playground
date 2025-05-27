import { generateGeminiResponse } from "./gemini";

export const generateGeminiTitle = async (
  userMessage: string
): Promise<string> => {
  const prompt = `아래 문장을 보고 이 대화를 10자 이내의 짧은 제목으로 요약해줘:\n"${userMessage}"\n\n제목:`;

  try {
    const response = await generateGeminiResponse(prompt);
    return response.replace(/\n/g, "").trim().slice(0, 15);
  } catch (err) {
    console.warn("Gemini 제목 요약 실패, fallback 사용:", err);
    return userMessage.slice(0, 10);
  }
};
