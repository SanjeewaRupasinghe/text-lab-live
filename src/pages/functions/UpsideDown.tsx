import { TextEditor } from "@/components/TextEditor";

const UpsideDown = () => {
  // Unicode characters for upside-down text
  const upsideDownMap: Record<string, string> = {
    'A': '∀', 'B': 'ᗺ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ᖴ', 'G': 'פ', 'H': 'H', 'I': 'I',
    'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ᴿ',
    'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ',
    'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
    's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
    '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
    '.': '˙', ',': "'", '?': '¿', '!': '¡', '"': '„', "'": '‛', '(': ')', ')': '(',
    '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋'
  };

  const upsideDownText = (text: string): string => {
    if (!text) return "";
    
    return text
      .split('')
      .map(char => upsideDownMap[char] || char)
      .reverse()
      .join('');
  };

  return (
    <TextEditor
      title="Upside Down Text"
      description="Convert text to upside-down Unicode characters. Perfect for social media posts and fun messages."
      example="Hello World → plɹoM ollǝH"
      transform={upsideDownText}
      storageKey="upside-down"
    />
  );
};

export default UpsideDown;