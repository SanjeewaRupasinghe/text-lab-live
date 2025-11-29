import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Type, 
  FileText, 
  BarChart3, 
  Zap, 
  Shield, 
  Download,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Client-side processing means instant results with no server delays."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your text never leaves your browser. Complete privacy guaranteed."
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Copy to clipboard or download as files. No registration required."
    }
  ];

  const popularFunctions = [
    {
      title: "Case Conversion",
      description: "Transform text between different cases",
      functions: ["Uppercase", "Lowercase", "Title Case", "Camel Case"],
      path: "/uppercase",
      icon: Type
    },
    {
      title: "Text Formatting",
      description: "Clean and format your text content",
      functions: ["Trim Whitespace", "Remove Extra Spaces", "Remove Blank Lines"],
      path: "/trim",
      icon: FileText
    },
    {
      title: "Text Analysis",
      description: "Get detailed statistics about your text",
      functions: ["Word Count", "Character Count", "Reading Time"],
      path: "/statistics",
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-subtle border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-card-border rounded-full px-4 py-2 mb-6">
            <Badge variant="secondary" className="text-xs">New</Badge>
            <span className="text-sm text-muted-foreground">20+ text transformation tools</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Transform Text
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Instantly</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Quick, easy, and powerful text transformation tools. No registration required. 
            Your privacy is guaranteed with client-side processing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/uppercase">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-lg">
                Start Transforming
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/statistics">
              <Button variant="outline" size="lg">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze Text
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose TextTransformer?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for speed, privacy, and ease of use. Professional text transformation tools in your browser.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-card-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Functions */}
      <section className="py-16 px-6 bg-background-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Popular Text Tools
            </h2>
            <p className="text-muted-foreground">
              Get started with our most used text transformation functions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {popularFunctions.map((category, index) => (
              <Card key={index} className="border-card-border hover:shadow-lg transition-all hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {category.functions.map((func, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {func}
                      </Badge>
                    ))}
                  </div>
                  <Link to={category.path}>
                    <Button className="w-full" variant="outline">
                      Try Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Text?
            </h2>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Join thousands of users who trust TextTransformer for their text processing needs.
              Start transforming your text today - no sign up required.
            </p>
            <Link to="/uppercase">
              <Button size="lg" variant="secondary" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}