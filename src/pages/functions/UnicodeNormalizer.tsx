import { TextEditor } from "@/components/TextEditor";

const UnicodeNormalizer = () => {
  const normalizeUnicode = (text: string): string => {
    if (!text) return "";
    
    return text
      // Normalize Unicode (NFD = Canonical Decomposition)
      .normalize('NFD')
      // Remove combining diacritical marks (accents)
      .replace(/[\u0300-\u036f]/g, '')
      // Additional cleanup for common characters
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[ÀÁÂÃÄÅ]/g, 'A')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ÈÉÊË]/g, 'E')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[ÌÍÎÏ]/g, 'I')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ÒÓÔÕÖ]/g, 'O')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ÙÚÛÜ]/g, 'U')
      .replace(/[ñ]/g, 'n')
      .replace(/[Ñ]/g, 'N')
      .replace(/[ç]/g, 'c')
      .replace(/[Ç]/g, 'C')
      .replace(/[ý]/g, 'y')
      .replace(/[Ý]/g, 'Y')
      .replace(/[ß]/g, 'ss')
      .replace(/[æ]/g, 'ae')
      .replace(/[Æ]/g, 'AE')
      .replace(/[œ]/g, 'oe')
      .replace(/[Œ]/g, 'OE');
  };

  return (
    <TextEditor
      title="Unicode Normalizer"
      description="Remove accents, diacritics, and normalize Unicode characters to their ASCII equivalents. Perfect for creating clean, searchable text."
      example="Café → Cafe, Naïve → Naive"
      transform={normalizeUnicode}
      storageKey="unicode-normalizer"
    />
  );
};

export default UnicodeNormalizer;