import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Type, 
  FileText, 
  RotateCcw, 
  BarChart3,
  Search,
  Star,
  StarOff,
  Moon,
  Sun,
  Shield,
  Sparkles,
  Smile,
  Clock,
  LogOut,
  Key,
  User,
  BookOpen
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchCommand } from "@/components/SearchCommand";
import { useAuthStore } from "@/stores/authStore";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<Array<{ path: string; timestamp: number; name: string }>>([]);
  const { isAuthenticated, username, logout } = useAuthStore();

  const collapsed = state === "collapsed";

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('text-transformer-bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Load and update recent tools
  useEffect(() => {
    const loadRecentTools = () => {
      const recent = JSON.parse(localStorage.getItem('text-transformer-recent') || '[]');
      setRecentTools(recent.slice(0, 5)); // Show top 5
    };

    loadRecentTools();
    window.addEventListener('recentToolsUpdated', loadRecentTools);
    
    return () => {
      window.removeEventListener('recentToolsUpdated', loadRecentTools);
    };
  }, []);

  // Track current route as recent tool
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/home') return;

    const toolName = getToolNameFromPath(location.pathname);
    if (!toolName) return;

    const recent = JSON.parse(localStorage.getItem('text-transformer-recent') || '[]');
    const existingIndex = recent.findIndex((item: any) => item.path === location.pathname);
    
    // Remove if exists and add to front
    if (existingIndex !== -1) {
      recent.splice(existingIndex, 1);
    }
    
    recent.unshift({
      path: location.pathname,
      timestamp: Date.now(),
      name: toolName
    });

    // Keep only last 10
    const updatedRecent = recent.slice(0, 10);
    localStorage.setItem('text-transformer-recent', JSON.stringify(updatedRecent));
    setRecentTools(updatedRecent.slice(0, 5));
    
    window.dispatchEvent(new Event('recentToolsUpdated'));
  }, [location.pathname]);

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

  const toggleBookmark = (path: string, name: string) => {
    const newBookmarks = bookmarks.includes(path)
      ? bookmarks.filter(b => b !== path)
      : [...bookmarks, path];
    
    setBookmarks(newBookmarks);
    localStorage.setItem('text-transformer-bookmarks', JSON.stringify(newBookmarks));
  };

  const getToolNameFromPath = (path: string): string | null => {
    for (const category of functionCategories) {
      const tool = category.functions.find(f => f.path === path);
      if (tool) return tool.name;
    }
    return null;
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
        { name: "Markdown Editor", path: "/markdown-editor" },
        { name: "JSON Formatter", path: "/json-formatter" },
        { name: "XML Formatter", path: "/xml-formatter" },
        { name: "HTML Entities", path: "/html-entities" },
        { name: "Tabs ↔ Spaces", path: "/tabs-spaces" },
        { name: "Newline Converter", path: "/newline-converter" },
        { name: "CSV ↔ JSON", path: "/csv-json-converter" },
        { name: "Diff Checker", path: "/diff-checker" },
        { name: "Regex Tester", path: "/regex-tester" },
      ]
    },
    {
      title: "Encoding & Encryption",
      icon: Shield,
      functions: [
        { name: "Base64", path: "/base64" },
        { name: "URL Encoder", path: "/url-encoder" },
        { name: "Caesar Cipher", path: "/caesar-cipher" },
        { name: "ROT13 / ROT47", path: "/rot13" },
        { name: "Morse Code", path: "/morse-code" },
      ]
    },
    {
      title: "Statistics",
      icon: BarChart3,
      functions: [
        { name: "Text Statistics", path: "/statistics" },
      ]
    },
    {
      title: "Generators",
      icon: Sparkles,
      functions: [
        { name: "Lorem Ipsum", path: "/lorem-generator" },
        { name: "Password Generator", path: "/password-generator" },
        { name: "ASCII Art", path: "/ascii-generator" },
        { name: "QR Code", path: "/qr-generator" },
        { name: "Sample Data Generator", path: "/sample-data-generator" },
        { name: "Word Cloud", path: "/word-cloud-generator" },
      ]
    },
      {
        title: "Text Transformations",
        icon: RotateCcw,
        functions: [
          { name: "Reverse Text", path: "/reverse-text" },
          { name: "Mirror Text", path: "/mirror-text" },
          { name: "Upside Down", path: "/upside-down" },
          { name: "Leet Speak", path: "/leet-speak" },
          { name: "Slugify", path: "/slugify" },
          { name: "Unicode Normalizer", path: "/unicode-normalizer" },
        ]
      },
      {
        title: "Fun & Creative",
        icon: Smile,
        functions: [
          { name: "Emoji Picker", path: "/emoji-picker" },
        ]
      },
      {
        title: "Blog",
        icon: BookOpen,
        functions: [
          { name: "Public Blog List", path: "/blogs" },
        ]
      },
      {
        title: "Admin",
        icon: Shield,
        functions: [
          { name: "Blog Dashboard", path: "/admin/blogs" },
          { name: "Sitemap Generator", path: "/admin/sitemap" },
          { name: "Robots.txt", path: "/admin/robots" },
        ]
      }
    ];

  const isActive = (path: string) => location.pathname === path;
  const getNavCls = (path: string) => 
    isActive(path) ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  return (
    <>
      <SearchCommand open={searchOpen} setOpen={setSearchOpen} />
      <Sidebar className={collapsed ? "w-14" : "w-72"} collapsible="icon">
        <SidebarContent>
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Type className="w-4 h-4 text-primary-foreground" />
                </div>
                {!collapsed && <span className="font-semibold text-lg">TextTransformer</span>}
              </div>
              {!collapsed && (
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>

          {/* Search Button */}
          {!collapsed && (
            <div className="p-4">
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
          )}

          {/* Recent Tools */}
          {recentTools.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel>
                <Clock className="w-4 h-4 mr-1" />
                {!collapsed && "Recent"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentTools.map((tool) => (
                    <SidebarMenuItem key={tool.path}>
                      <SidebarMenuButton asChild>
                        <NavLink to={tool.path} className={getNavCls(tool.path)}>
                          <Clock className="w-4 h-4 mr-2" />
                          {!collapsed && <span>{tool.name}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Bookmarks */}
          {bookmarks.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel>
                <Star className="w-4 h-4 mr-1" />
                {!collapsed && "Bookmarks"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {bookmarks.map((path) => {
                    const func = functionCategories
                      .flatMap(cat => cat.functions)
                      .find(f => f.path === path);
                    if (!func) return null;
                    
                    return (
                      <SidebarMenuItem key={path}>
                        <SidebarMenuButton asChild>
                          <NavLink to={path} className={getNavCls(path)}>
                            <Star className="w-4 h-4 mr-2 fill-current" />
                            {!collapsed && <span>{func.name}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Function Categories */}
          {functionCategories
            .filter((category) => category.title !== "Admin" || isAuthenticated)
            .map((category) => {
            const hasActiveItem = category.functions.some(func => isActive(func.path));
            
            return (
            <SidebarGroup key={category.title}>
              <SidebarGroupLabel>
                <category.icon className="w-4 h-4 mr-1" />
                {!collapsed && category.title}
              </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {category.functions.map((func) => (
                      <SidebarMenuItem key={func.path}>
                        <SidebarMenuButton asChild>
                          <div className="flex items-center w-full">
                            <NavLink 
                              to={func.path} 
                              className={`flex-1 flex items-center ${getNavCls(func.path)} px-2 py-1.5 rounded-md text-sm`}
                            >
                              <category.icon className="w-4 h-4 mr-2" />
                              {!collapsed && <span>{func.name}</span>}
                            </NavLink>
                            {!collapsed && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6 ml-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleBookmark(func.path, func.name);
                                }}
                              >
                                {bookmarks.includes(func.path) ? (
                                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                                ) : (
                                  <StarOff className="w-3 h-3" />
                                )}
                              </Button>
                            )}
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}

          {/* User Section */}
          {isAuthenticated && (
            <>
              <Separator className="my-4" />
              <div className="p-4">
                {collapsed ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-full">
                        <User className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{username}</p>
                          <p className="text-xs text-muted-foreground">Admin</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate("/auth/change-password")}>
                        <Key className="w-4 h-4 mr-2" />
                        Change Password
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-2 py-2 rounded-md bg-muted/50">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{username}</p>
                        <p className="text-xs text-muted-foreground">Admin</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate("/auth/change-password")}
                      >
                        <Key className="w-3 h-3 mr-1" />
                        Password
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-3 h-3 mr-1" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SidebarContent>
      </Sidebar>
    </>
  );
}