import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.MIMO_API_BASE_URL || "http://100.91.112.121:8317/v1",
  apiKey: process.env.MIMO_API_KEY || "aa406b5cad694aea9772f883fe759eadb71b55ffc811db971863cc8d0804ceda",
});

export async function generateContentStream(prompt: string) {
  const stream = await client.chat.completions.create({
    model: process.env.MIMO_MODEL || "Mimo-V2.5-Pro",
    messages: [
      {
        role: "system",
        content:
          "You are an expert content writer. You create high-quality, engaging content based on user specifications. Always use proper markdown formatting. Be creative, professional, and thorough.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 4096,
  });

  return stream;
}
