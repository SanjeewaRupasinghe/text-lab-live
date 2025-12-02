import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  RefreshCw,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  Star,
  StarOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { FAQ } from "@/components/FAQ";
import { passwordGeneratorFaqs } from "@/data/faq/generator-faq";
import { copyToClipboard, toggleBookmark } from "@/lib/textEditorUtils";
import { FaqType } from "@/types/faq.type";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const AMBIGUOUS = "0O1lI";

export default function PasswordGenerator() {
  // States
  const [passwords, setPasswords] = useState<string[]>([]);
  const [length, setLength] = useState([16]);
  const [quantity, setQuantity] = useState(5);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [minNumbers, setMinNumbers] = useState(1);
  const [minSymbols, setMinSymbols] = useState(1);
  const [showPasswords, setShowPasswords] = useState(false);
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // get char set
  const getCharacterSet = () => {
    let charset = "";

    if (includeLowercase) charset += LOWERCASE;
    if (includeUppercase) charset += UPPERCASE;
    if (includeNumbers) charset += NUMBERS;
    if (includeSymbols) charset += SYMBOLS;

    if (excludeAmbiguous) {
      charset = charset
        .split("")
        .filter((char) => !AMBIGUOUS.includes(char))
        .join("");
    }

    return charset;
  };

  // calculate strength
  const calculateStrength = () => {
    const charset = getCharacterSet();
    const entropy = Math.log2(Math.pow(charset.length, length[0]));

    if (entropy < 30) return { level: "Very Weak", color: "destructive" };
    if (entropy < 50) return { level: "Weak", color: "orange" };
    if (entropy < 70) return { level: "Good", color: "yellow" };
    if (entropy < 90) return { level: "Strong", color: "blue" };
    return { level: "Very Strong", color: "green" };
  };

  // meets requirements
  const meetsRequirements = (password: string) => {
    const numberCount = (password.match(/[0-9]/g) || []).length;
    const symbolCount = (
      password.match(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/g) || []
    ).length;

    return numberCount >= minNumbers && symbolCount >= minSymbols;
  };

  // generate password
  const generatePassword = () => {
    const charset = getCharacterSet();
    if (!charset) return "";

    let attempts = 0;
    let password = "";

    do {
      password = "";
      for (let i = 0; i < length[0]; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      attempts++;
    } while (!meetsRequirements(password) && attempts < 1000);

    return password;
  };

  // generate passwords
  const generatePasswords = () => {
    const newPasswords = [];
    for (let i = 0; i < quantity; i++) {
      const password = generatePassword();
      if (password) newPasswords.push(password);
    }
    setPasswords(newPasswords);
  };

  // copy password
  const copyPassword = async (password: string) => {
    await copyToClipboard(password);
    toast({
      title: "Password copied",
      description: "Password has been copied to your clipboard.",
    });
  };

  // copy all passwords
  const copyAllPasswords = async () => {
    await navigator.clipboard.writeText(passwords.join("\n"));
    toast({
      title: "All passwords copied",
      description: "All passwords have been copied to your clipboard.",
    });
  };

  // strength
  const strength = calculateStrength();
  const hasValidOptions =
    includeLowercase || includeUppercase || includeNumbers || includeSymbols;

  // Handle bookmark
  const handleBookmark = () => {
    const newState = toggleBookmark(window.location.pathname);
    setIsBookmarked(newState);
    toast({ title: newState ? "Bookmark added" : "Bookmark removed" });
  };

  // Check if current page is bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("text-transformer-bookmarks") || "[]"
    );
    const currentPath = window.location.pathname;
    setIsBookmarked(bookmarks.includes(currentPath));
  }, []);

  // Get Faqs
  const faqs: FaqType[]  = passwordGeneratorFaqs;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">Secure Password Generator</h1>
          </div>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className="flex-shrink-0"
            >
              {isBookmarked ? (
                <Star className="w-5 h-5 fill-current text-yellow-500" />
              ) : (
                <StarOff className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Generate cryptographically secure passwords with customizable options
          and strength analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Password Settings</CardTitle>
              <CardDescription>
                Customize your password generation options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Length */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Password Length: {length[0]}</Label>
                  <Badge variant={strength.color as any}>
                    {strength.level}
                  </Badge>
                </div>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  min={4}
                  max={128}
                  step={1}
                  className="w-full"
                />
              </div>
              {/* END Password Length */}

              {/* Number of Passwords */}
              <div>
                <Label htmlFor="quantity">Number of passwords</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Math.min(50, parseInt(e.target.value) || 1))
                    )
                  }
                  min="1"
                  max="50"
                />
              </div>
              {/* END Number of Passwords */}

              <Separator />

              {/* Character Types */}
              <div className="space-y-3">
                <h4 className="font-medium">Character Types</h4>

                {/* Lowercase */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={setIncludeLowercase}
                  />
                  <Label htmlFor="lowercase">Lowercase letters (a-z)</Label>
                </div>
                {/* END Lowercase */}

                {/* Uppercase */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={setIncludeUppercase}
                  />
                  <Label htmlFor="uppercase">Uppercase letters (A-Z)</Label>
                </div>
                {/* END Uppercase */}

                {/* Numbers */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={setIncludeNumbers}
                  />
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                </div>
                {/* END Numbers */}

                {/* Symbols */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={setIncludeSymbols}
                  />
                  <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                </div>
                {/* END Symbols */}
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Advanced Options</h4>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="excludeAmbiguous"
                    checked={excludeAmbiguous}
                    onCheckedChange={setExcludeAmbiguous}
                  />
                  <Label htmlFor="excludeAmbiguous">
                    Exclude ambiguous characters (0, O, 1, l, I)
                  </Label>
                </div>

                {/* Minimum Numbers */}
                {includeNumbers && (
                  <div>
                    <Label htmlFor="minNumbers">Minimum numbers required</Label>
                    <Input
                      id="minNumbers"
                      type="number"
                      value={minNumbers}
                      onChange={(e) =>
                        setMinNumbers(
                          Math.max(0, parseInt(e.target.value) || 0)
                        )
                      }
                      min="0"
                      max={Math.floor(length[0] / 2)}
                    />
                  </div>
                )}
                {/* END Minimum Numbers */}

                {/* Minimum Symbols */}
                {includeSymbols && (
                  <div>
                    <Label htmlFor="minSymbols">Minimum symbols required</Label>
                    <Input
                      id="minSymbols"
                      type="number"
                      value={minSymbols}
                      onChange={(e) =>
                        setMinSymbols(
                          Math.max(0, parseInt(e.target.value) || 0)
                        )
                      }
                      min="0"
                      max={Math.floor(length[0] / 2)}
                    />
                  </div>
                )}
              </div>
              {/* END Minimum Symbols */}

              {/* Error Message */}
              {!hasValidOptions && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">
                    Please select at least one character type
                  </span>
                </div>
              )}
              {/* END Error Message */}

              {/* Generate and Copy Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={generatePasswords}
                  className="flex-1"
                  disabled={!hasValidOptions}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPasswords(!showPasswords)}
                  disabled={passwords.length === 0}
                >
                  {showPasswords ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {/* END Generate and Copy Buttons */}
            </CardContent>
          </Card>
        </div>
        {/* END Controls */}

        {/* Generated Passwords */}
        <div>
          <Card>
            {/* Card Header */}
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Passwords</CardTitle>
                  <CardDescription>
                    Click any password to copy it to your clipboard
                  </CardDescription>
                </div>
                {passwords.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAllPasswords}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                )}
              </div>
            </CardHeader>
            {/* END Card Header */}

            {/* Card Content */}
            <CardContent>
              {passwords.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Generate passwords to see them here</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {passwords.map((password, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-muted/50 rounded-md hover:bg-muted cursor-pointer transition-colors group"
                      onClick={() => copyPassword(password)}
                    >
                      <code className="flex-1 font-mono text-sm">
                        {showPasswords ? password : "•".repeat(password.length)}
                      </code>
                      <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {/* END Card Content */}
          </Card>
        </div>
        {/* END Generated Passwords */}
      </div>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
}
