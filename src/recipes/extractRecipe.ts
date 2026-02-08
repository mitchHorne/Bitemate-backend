import OpenAI from "openai";
import axios from "axios";
import * as cheerio from "cheerio";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface RecipeData {
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  cuisine?: string;
  category?: string;
  tags?: string[];
}

/**
 * Fetches HTML content from a URL and extracts the body text
 */
async function fetchHtmlBody(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Cache-Control": "max-age=0",
      },
      timeout: 15000,
    });

    console.log("Fetched HTML content");

    const $ = cheerio.load(response.data);

    // Remove script and style elements
    $("script").remove();
    $("style").remove();

    // Extract body text
    const bodyText = $("body").text().trim();

    return bodyText;
  } catch (error: any) {
    throw new Error(`Failed to fetch URL: ${error.message}`);
  }
}

/**
 * Uses OpenAI to extract recipe properties from HTML body text
 */
async function extractRecipeWithAI(
  bodyText: string,
  url: string,
): Promise<RecipeData | null> {
  const prompt = `
Extract recipe information from the following text and return it as a JSON object with these properties:
- foodName (string, required): The recipe title
- foodNativeName (string, required): The native name of the dish in its original language
- description (string, optional): A brief description of the recipe
- ingredients (array of objects, required): List of ingredients in object form
    - ingredients(object): 
        - name (string, required): Name of the ingredient
        - measurement (number as string, required): Quantity of the ingredient (e.g., "2", "1/2", "3", "" if no number) without unit type. Default to "?"
        - units (string, required): The unit of measurement (e.g., "g", "tbsp", "ml", "cups", "whole" if not specified). Default to "?" if no unit or a sentence is provided
- instructions (array of objects, required): Step-by-step cooking instructions
    - description (string, required): Description of the step
    - time (string, optional): Time required for the step
- difficulty (string, optional): Difficulty level (e.g., easy, medium, hard)
- suitedOccasion (string, optional): Suitable occasions for the recipe (e.g., "weeknight dinner", "holiday meal")
- isTraditional (boolean, optional): Whether the recipe is a traditional dish
- timeToCook (string, optional): Preparation time
- cookTime (string, optional): Cooking time
- servingSize (string, optional): Number of servings
- oneRecipeOnly (boolean, required): Whether the text contains just one recipe. If false, return false.

Text:
${bodyText.substring(0, 8000)} 
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that extracts recipe information from web pages. Always respond with valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content returned from OpenAI");

    const recipeData = JSON.parse(content);

    if (recipeData.oneRecipeOnly === false) return null;

    if (
      !recipeData.foodName ||
      !recipeData.ingredients?.length ||
      !recipeData.instructions?.length
    )
      return null;

    return { ...recipeData, recipeSource: url } as RecipeData;
  } catch (error: any) {
    throw new Error(`Failed to extract recipe with AI: ${error.message}`);
  }
}

/**
 * Main function that fetches a URL and extracts recipe data
 */
export async function extractRecipeFromUrl(
  url: string,
): Promise<RecipeData | null> {
  // Fetch HTML body
  const bodyText = await fetchHtmlBody(url);

  // Extract recipe using OpenAI
  const recipeData = await extractRecipeWithAI(bodyText, url);

  return recipeData;
}
