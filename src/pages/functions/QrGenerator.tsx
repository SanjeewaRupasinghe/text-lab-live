import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, QrCode, RefreshCw, Wifi, Mail, Phone, Link, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCodeLib from "qrcode";

interface QRPreset {
  name: string;
  icon: any;
  template: string;
  fields: Array<{
    name: string;
    label: string;
    placeholder: string;
    type?: "text" | "email" | "tel" | "url";
  }>;
}

const QR_PRESETS: QRPreset[] = [
  {
    name: "URL/Website",
    icon: Link,
    template: "{url}",
    fields: [
      { name: "url", label: "Website URL", placeholder: "https://example.com", type: "url" }
    ]
  },
  {
    name: "WiFi Network",
    icon: Wifi,
    template: "WIFI:T:{security};S:{ssid};P:{password};H:{hidden};;",
    fields: [
      { name: "ssid", label: "Network Name (SSID)", placeholder: "MyWiFiNetwork" },
      { name: "password", label: "Password", placeholder: "password123" },
      { name: "security", label: "Security Type", placeholder: "WPA" },
      { name: "hidden", label: "Hidden Network", placeholder: "false" }
    ]
  },
  {
    name: "Email",
    icon: Mail,
    template: "mailto:{email}?subject={subject}&body={body}",
    fields: [
      { name: "email", label: "Email Address", placeholder: "example@email.com", type: "email" },
      { name: "subject", label: "Subject", placeholder: "Hello!" },
      { name: "body", label: "Message", placeholder: "Enter your message here..." }
    ]
  },
  {
    name: "Phone Number",
    icon: Phone,
    template: "tel:{phone}",
    fields: [
      { name: "phone", label: "Phone Number", placeholder: "+1234567890", type: "tel" }
    ]
  },
  {
    name: "SMS/Text",
    icon: Phone,
    template: "sms:{phone}?body={message}",
    fields: [
      { name: "phone", label: "Phone Number", placeholder: "+1234567890", type: "tel" },
      { name: "message", label: "Message", placeholder: "Hello from QR code!" }
    ]
  },
  {
    name: "Location",
    icon: MapPin,
    template: "geo:{lat},{lng}?q={lat},{lng}({name})",
    fields: [
      { name: "lat", label: "Latitude", placeholder: "40.7128" },
      { name: "lng", label: "Longitude", placeholder: "-74.0060" },
      { name: "name", label: "Location Name", placeholder: "New York City" }
    ]
  }
];

export default function QrGenerator() {
  const [mode, setMode] = useState("text");
  const [text, setText] = useState("");
  const [preset, setPreset] = useState("URL/Website");
  const [presetFields, setPresetFields] = useState<Record<string, string>>({});
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [size, setSize] = useState([256]);
  const [errorLevel, setErrorLevel] = useState("M");
  const [margin, setMargin] = useState([4]);
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#ffffff");
  const { toast } = useToast();

  const currentPreset = QR_PRESETS.find(p => p.name === preset)!;

  const generateQRData = () => {
    if (mode === "text") {
      return text;
    } else {
      // Generate from preset template
      let result = currentPreset.template;
      for (const field of currentPreset.fields) {
        const value = presetFields[field.name] || "";
        result = result.replace(`{${field.name}}`, encodeURIComponent(value));
      }
      return result;
    }
  };

  const generateQR = async () => {
    const data = generateQRData();
    if (!data) {
      toast({
        title: "Error",
        description: "Please enter some text or fill in the required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const options = {
        width: size[0],
        margin: margin[0],
        color: {
          dark: darkColor,
          light: lightColor
        },
        errorCorrectionLevel: errorLevel as 'L' | 'M' | 'Q' | 'H'
      };

      const dataUrl = await QRCodeLib.toDataURL(data, options);
      setQrDataUrl(dataUrl);
    } catch (error) {
      toast({
        title: "Error generating QR code",
        description: "Please check your input and try again.",
        variant: "destructive"
      });
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
  };

  const copyQRData = async () => {
    const data = generateQRData();
    await navigator.clipboard.writeText(data);
    toast({
      title: "Copied to clipboard",
      description: "QR code data has been copied to your clipboard.",
    });
  };

  useEffect(() => {
    if ((mode === "text" && text) || (mode === "preset" && Object.keys(presetFields).length > 0)) {
      generateQR();
    }
  }, [mode, text, preset, presetFields, size, errorLevel, margin, darkColor, lightColor]);

  const updatePresetField = (fieldName: string, value: string) => {
    setPresetFields(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <QrCode className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">QR Code Generator</h1>
        </div>
        <p className="text-muted-foreground">
          Generate QR codes for text, URLs, WiFi, email, phone numbers, and more with customizable styling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>
                Choose what type of content to encode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={mode} onValueChange={setMode}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Custom Text</TabsTrigger>
                  <TabsTrigger value="preset">Quick Presets</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <div>
                    <Label htmlFor="text">Text Content</Label>
                    <Textarea
                      id="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter any text, URL, or data to encode..."
                      className="min-h-[100px]"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="preset" className="space-y-4">
                  <div>
                    <Label>Preset Type</Label>
                    <Select value={preset} onValueChange={(value) => {
                      setPreset(value);
                      setPresetFields({});
                    }}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {QR_PRESETS.map((p) => (
                          <SelectItem key={p.name} value={p.name}>
                            <div className="flex items-center gap-2">
                              <p.icon className="w-4 h-4" />
                              {p.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {currentPreset.fields.map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Input
                        id={field.name}
                        type={field.type || "text"}
                        value={presetFields[field.name] || ""}
                        onChange={(e) => updatePresetField(field.name, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  {mode === "preset" && (
                    <div className="p-3 bg-muted/50 rounded text-sm">
                      <Label className="text-xs text-muted-foreground">Generated Data:</Label>
                      <code className="block mt-1 text-xs break-all">
                        {generateQRData() || "Fill in the fields above..."}
                      </code>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the QR code appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Size: {size[0]}px</Label>
                <Slider
                  value={size}
                  onValueChange={setSize}
                  min={128}
                  max={512}
                  step={32}
                  className="w-full"
                />
              </div>

              <div>
                <Label>Error Correction Level</Label>
                <Select value={errorLevel} onValueChange={setErrorLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (~7%)</SelectItem>
                    <SelectItem value="M">Medium (~15%)</SelectItem>
                    <SelectItem value="Q">Quartile (~25%)</SelectItem>
                    <SelectItem value="H">High (~30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Margin: {margin[0]}px</Label>
                <Slider
                  value={margin}
                  onValueChange={setMargin}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="darkColor">Dark Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="darkColor"
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lightColor">Light Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="lightColor"
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={generateQR} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button variant="outline" onClick={copyQRData}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Generated QR Code</CardTitle>
              <CardDescription>
                Your QR code will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {qrDataUrl ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={qrDataUrl}
                      alt="Generated QR Code"
                      className="border rounded-lg shadow-sm"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={downloadQR} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Size: {size[0]} × {size[0]} pixels</div>
                    <div>Error Correction: {errorLevel}</div>
                    <div>Data Length: {generateQRData().length} characters</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <QrCode className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Enter content above to generate a QR code
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}