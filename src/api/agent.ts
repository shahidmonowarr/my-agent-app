import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "@langchain/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userInput } = req.body;

  // Check if the input is a valid string and not empty
  if (!userInput || typeof userInput !== "string" || userInput.trim().length === 0) {
    return res.status(400).json({ error: "Input must be a non-empty string" });
  }

  const model = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is correctly passed
    temperature: 0.7,
  });

  try {
    // Clean the input to avoid any unwanted characters or formatting issues
    const cleanInput = userInput.trim();

    // Call the OpenAI model with the sanitized input
    const response = await model.invoke(cleanInput);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
