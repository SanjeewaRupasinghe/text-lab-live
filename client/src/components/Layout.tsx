import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchCommand } from "@/components/SearchCommand";
import { 
  Type, 
  FileText, 
  RotateCcw, 
  Menu, 
  Moon, 
  Sun,
  Copy,
  Download,
  BarChart3,
  Search
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const functionCategories = [
    {
      title: "Case Conversion",
      icon: Type,
      functions: [
        { name: "Uppercase", path: "/uppercase" },
        { name: "Lowercase", path: "/lowercase" },
        { name: "Title Case", path: "/title-case" },
        { name: "Camel Case", path: "/camel-case" },
        { name: "Snake Case", path: "/snake-case" },
        { name: "Kebab Case", path: "/kebab-case" },
      ]
    },
    {
      title: "Text Formatting",
      icon: FileText,
      functions: [
        { name: "Trim Whitespace", path: "/trim" },
        { name: "Remove Extra Spaces", path: "/remove-spaces" },
        { name: "Remove Blank Lines", path: "/remove-blank-lines" },
        { name: "Sort Lines", path: "/sort-lines" },
        { name: "Number Lines", path: "/number-lines" },
        { name: "Find & Replace", path: "/find-replace" },
      ]
    },
    {
      title: "Conversion Tools",
      icon: RotateCcw,
      functions: [
        { name: "JSON Formatter", path: "/json-formatter" },
        { name: "XML Formatter", path: "/xml-formatter" },
        { name: "HTML Entities", path: "/html-entities" },
        { name: "Tabs ↔ Spaces", path: "/tabs-spaces" },
        { name: "Newline Converter", path: "/newline-converter" },
      ]
    },
    {
      title: "Statistics",
      icon: BarChart3,
      functions: [
        { name: "Text Statistics", path: "/statistics" },
      ]
    }
  ];

  const NavigationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-4">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Type className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-lg">TextTransformer</span>
      </div>
      
      {/* Search Button */}
      <div className="px-4">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground text-sm"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">Search tools...</span>
          <kbd className="ml-auto pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      
      {functionCategories.map((category) => (
        <div key={category.title} className="px-4">
          <div className="flex items-center gap-2 mb-3">
            <category.icon className="w-4 h-4 text-tertiary" />
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              {category.title}
            </h3>
          </div>
          <div className="space-y-1">
            {category.functions.map((func) => (
              <Link key={func.path} to={func.path}>
                <Button 
                  variant={location.pathname === func.path ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm h-9"
                >
                  {func.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SearchCommand open={searchOpen} setOpen={setSearchOpen} />
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 max-w-[85vw]">
            <div className="p-4 sm:p-6">
              <NavigationContent />
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-2 min-w-0">
          <Type className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
          <span className="font-semibold text-sm sm:text-base truncate">TextTransformer</span>
        </div>
        
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="flex-shrink-0">
          {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </Button>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 h-screen border-r border-border bg-card flex-shrink-0 sticky top-0">
          <div className="p-6 border-b border-border bg-card sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Type className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">TextTransformer</span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto h-[calc(100vh-88px)]">
            <NavigationContent />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};