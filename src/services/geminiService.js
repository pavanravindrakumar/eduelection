import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSy_MOCK_KEY_FOR_HACKATHON';

let genAI = null;
if (API_KEY !== 'AIzaSy_MOCK_KEY_FOR_HACKATHON') {
  genAI = new GoogleGenerativeAI(API_KEY);
}

// Simple in-memory cache to prevent duplicate API calls (Efficiency)
const responseCache = new Map();

/**
 * Gets a response from Gemini AI for general election queries.
 * @param {string} input - The user's query.
 * @param {string} language - The preferred language code (e.g. 'en-IN').
 * @returns {Promise<string>} The AI's response.
 */
export const getGeminiResponse = async (input, language = 'en-IN') => {
  const cacheKey = `chat_${language}_${input.trim().toLowerCase()}`;
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }

  if (!genAI) {
    // Mock response for hackathon if no key is provided
    await new Promise(resolve => setTimeout(resolve, 1000));
    const lowercaseInput = input.toLowerCase();
    let mockResponse = "That's a great question about the election process. Elections are fundamental to democracy. A typical election cycle involves registration, campaigning, polling day, counting, and the declaration of results. Do you have a specific question about one of these phases?";
    
    if (lowercaseInput.includes("register")) {
      mockResponse = "To register to vote, you need to be a citizen, 18 years or older, and fill out Form 6. You can do this online through the National Voters' Services Portal (NVSP) or offline by submitting it to your Electoral Registration Officer.";
    } else if (lowercaseInput.includes("document")) {
      mockResponse = "Valid documents for voter registration include: Aadhar Card, Passport, Driving License, PAN Card, or Bank Passbook with a photograph.";
    } else if (lowercaseInput.includes("when")) {
      mockResponse = "Election dates vary by state and constituency. Please provide your state or check the official Election Commission website for the exact schedule.";
    }
    
    responseCache.set(cacheKey, mockResponse);
    return mockResponse;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `You are VoteWise AI, an expert election assistant. Reply in language ${language}. Answer this user question clearly and accurately based on standard election procedures: ${input}`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    responseCache.set(cacheKey, responseText);
    return responseText;
  } catch (error) {
    console.error("Gemini API Error (getGeminiResponse):", error);
    throw new Error("Failed to get response from Gemini AI. Please try again later.");
  }
};

/**
 * Checks a claim for misinformation using Gemini AI.
 * @param {string} claim - The claim to check.
 * @returns {Promise<{verdict: string, explanation: string, confidenceScore: number, sources: string[]}>} The fact-check result.
 */
export const checkFact = async (claim) => {
  const cacheKey = `fact_${claim.trim().toLowerCase()}`;
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }

  if (!genAI) {
    // Mock response for hackathon if no key is provided
    await new Promise(resolve => setTimeout(resolve, 1000));
    const lowercaseClaim = claim.toLowerCase();
    let mockResponse = { verdict: "Misleading", explanation: "This claim lacks verifiable sources. Always trust official communications from the Election Commission for accurate information.", confidenceScore: 65, sources: ["Election Commission Public Guidelines"] };
    
    if (lowercaseClaim.includes("evm") && lowercaseClaim.includes("hack")) {
      mockResponse = { verdict: "False", explanation: "EVMs used in Indian elections are standalone machines without network connectivity, making them secure against remote hacking.", confidenceScore: 98, sources: ["ECI EVM Manual", "Technical Expert Committee Report"] };
    } else if (lowercaseClaim.includes("vote") && lowercaseClaim.includes("online")) {
      mockResponse = { verdict: "False", explanation: "Currently, there is no online voting system for general citizens in India. You must visit your designated polling booth.", confidenceScore: 99, sources: ["ECI FAQ on Voting process"] };
    }
    
    responseCache.set(cacheKey, mockResponse);
    return mockResponse;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `You are a strict fact-checker for election-related news. Analyze the following claim for misinformation. Respond strictly in this JSON format without markdown wrapping: {"verdict": "True" | "False" | "Misleading", "explanation": "A concise explanation of why.", "confidenceScore": 90, "sources": ["Source 1", "Source 2"]}. Claim: ${claim}`;
    
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const parsedData = JSON.parse(textResponse);
      responseCache.set(cacheKey, parsedData);
      return parsedData;
    } catch (parseError) {
      console.error("JSON Parse Error (checkFact):", parseError, textResponse);
      return { verdict: "Error", explanation: "Failed to parse the fact-checking result. Try rewording your claim." };
    }
  } catch (error) {
    console.error("Gemini API Error (checkFact):", error);
    throw new Error("Failed to fact-check the claim due to API error.");
  }
};
