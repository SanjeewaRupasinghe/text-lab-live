import { FaqType } from "@/types/faq.type";

// Statistics FAQ
export const statisticsFaqs: FaqType[] = [
  {
    question: "What text statistics can I analyze?",
    answer: "Text statistics tools can count characters (with and without spaces), words, sentences, paragraphs, lines, syllables, and reading time estimates. Advanced tools also analyze average word length, sentence length, readability scores (Flesch-Kincaid, Gunning Fog), keyword density, unique word count, and character frequency distribution for comprehensive text analysis."
  },
  {
    question: "When should I use text statistics?",
    answer: "Use text statistics when checking word limits for essays or articles, optimizing content length for SEO, analyzing readability for target audiences, tracking writing progress, ensuring consistent document length, evaluating content complexity, comparing text versions, and meeting specific character or word count requirements for submissions or publications."
  },
  {
    question: "What's the difference between characters with and without spaces?",
    answer: "Characters with spaces count every character including spaces, punctuation, and line breaks. Characters without spaces (or non-whitespace characters) count only letters, numbers, and punctuation, excluding spaces and line breaks. Social media platforms and some writing tools use character limits that include or exclude spaces differently, so both metrics are useful."
  },
  {
    question: "How is word count calculated?",
    answer: "Word count typically splits text on whitespace (spaces, tabs, line breaks) and counts the resulting units. Hyphenated words may count as one word ('self-taught') or two depending on the tool. Contractions ('don't', 'it's') usually count as single words. Numbers and abbreviations are typically counted as words. Different tools may have slight variations in methodology."
  },
  {
    question: "What are readability scores and why do they matter?",
    answer: "Readability scores like Flesch-Kincaid Grade Level or Gunning Fog Index estimate how difficult text is to understand, often expressed as a grade level. Lower scores mean easier reading. These scores consider factors like sentence length and syllable count. They help ensure content matches your audience: technical documents may score higher, general content should be accessible."
  },
  {
    question: "How accurate are reading time estimates?",
    answer: "Reading time estimates assume average reading speeds, typically 200-250 words per minute for adults. Actual reading time varies based on text complexity, reader skill, purpose (skimming vs. careful reading), and language familiarity. Estimates work well for planning but should be considered approximate guidelines rather than precise predictions of individual reading times."
  },
  {
    question: "What is keyword density and why is it important?",
    answer: "Keyword density is the percentage of times a specific word or phrase appears compared to total word count. It's used in SEO to ensure appropriate keyword usage: too low and content may not rank, too high and it appears spammy. Modern SEO focuses less on exact density and more on natural, contextual keyword usage, but monitoring helps avoid over-optimization."
  },
  {
    question: "Can text statistics help improve my writing?",
    answer: "Yes, statistics reveal patterns: consistently long sentences may indicate complexity issues, low unique word count suggests repetition, high readability scores might mean your text is too complex for your audience. Tracking average word and sentence length helps maintain consistent style. Use statistics as diagnostic tools to identify areas for improvement and track progress over time."
  },
  {
    question: "How do statistics differ between languages?",
    answer: "Statistics work differently across languages: average word length varies (German words are longer than English), syllable counting differs, and readability formulas are language-specific. Some languages like Chinese count characters rather than words. When analyzing non-English text, use tools designed for that language or understand that standard metrics may not accurately reflect complexity or readability."
  },
  {
    question: "What's the difference between unique words and total words?",
    answer: "Total word count includes every word occurrence, while unique word count only counts distinct words once. For example, 'the cat and the dog' has 5 total words but 4 unique words (the appears twice). The ratio of unique to total words indicates vocabulary diversity: higher ratios suggest richer vocabulary, lower ratios might indicate repetitive writing."
  }
];