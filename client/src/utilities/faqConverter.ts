import { FAQ } from "@/types/blog";

// Convert string to FAQ array
export function stringToFAQs(jsonString: string | null | undefined): FAQ[] {
  try {
    if (!jsonString || typeof jsonString !== "string") {
      return [];
    }

    const trimmed = jsonString.trim();
    if (!trimmed) {
      return [];
    }

    const parsed = JSON.parse(trimmed);

    // Handle single object
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      if (parsed.id && parsed.question && parsed.answer) {
        return [parsed as FAQ];
      }
    }

    // Handle array of objects
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          item.id &&
          item.question &&
          item.answer
      ) as FAQ[];
    }

    return [];
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}

// Convert FAQ array to string
export function faqsToString(faqs: FAQ[]): string {
  try {
    if (!Array.isArray(faqs) || faqs.length === 0) {
      return "";
    }

    // Return single object if only one FAQ, otherwise return array
    if (faqs.length === 1) {
      return JSON.stringify(faqs[0]);
    }

    return JSON.stringify(faqs);
  } catch (error) {
    console.error("Error converting FAQs to string:", error);
    return "";
  }
}
