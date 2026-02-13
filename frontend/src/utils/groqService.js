const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

export const getGroqResponse = async (userMessage, context = "") => {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'gsk_yours_here') {
    return "Please configure your Groq API Key in the .env file!";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are CinemaMate AI, a helpful and enthusiastic cinema assistant. 
            Use this context about the cinema to answer questions: ${context}
            
            Guidelines:
            - Keep answers concise (under 50 words) unless asked for details.
            - Use emojis 🎬🍿.
            - If asked about movies not in context, say you only know about current screenings.
            - Be friendly and professional.
            `
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        model: "llama3-8b-8192", // Fast and efficient model
        temperature: 0.7,
        max_tokens: 150,
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Groq API Error:", errorData);
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Sorry, I couldn't process that.";
  } catch (error) {
    console.error("Groq Network Error:", error);
    return "Oops! My AI brain is having trouble connecting right now (Network Error).";
  }
};
