import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, BookOpen, Car, FileText, Clock, CheckCircle, HelpCircle } from "lucide-react";

interface TestStartPageProps {
  onStartTest: (variant: number) => void;
}

const languages = [
  { id: "uz" as const, label: "Ўзбекча", flag: "🇺🇿" },
  { id: "ru" as const, label: "Русский", flag: "🇷🇺" },
];

// Available variants (1-10 for now, based on uploaded JSON files)
const variants = Array.from({ length: 10 }, (_, i) => i + 1);

export const TestStartPage = ({ onStartTest }: TestStartPageProps) => {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const categories = [
    { id: "theory", label: t("categories.theory"), icon: BookOpen, color: "bg-blue-500" },
    { id: "signs", label: t("categories.signs"), icon: FileText, color: "bg-green-500" },
    { id: "driving", label: t("categories.driving"), icon: Car, color: "bg-orange-500" },
    { id: "rules", label: t("categories.rules"), icon: Globe, color: "bg-purple-500" },
  ];

  const handleStartTest = () => {
    if (selectedVariant !== null) {
      onStartTest(selectedVariant);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">{t("app.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("app.subtitle")}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center px-3 py-4 gap-3">
          {/* Variant Selection */}
          <Card className="w-full p-3 bg-card/50 backdrop-blur-sm border-border">
            <h2 className="text-xs font-medium text-muted-foreground mb-2 text-center">{t("test.selectVariant")}</h2>
            <div className="grid grid-cols-5 gap-2">
              {variants.map((v) => (
                <Button
                  key={v}
                  variant={selectedVariant === v ? "default" : "outline"}
                  className={`h-10 text-sm font-medium ${
                    selectedVariant === v 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/10 hover:border-primary"
                  }`}
                  onClick={() => setSelectedVariant(v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </Card>

          {/* Start Button */}
          <Button
            size="lg"
            className="w-full max-w-xs h-12 text-base font-semibold shadow-lg bg-primary hover:bg-primary/90"
            onClick={handleStartTest}
            disabled={selectedVariant === null}
          >
            {selectedVariant ? `${t("test.variant")} ${selectedVariant} - ${t("test.start")}` : t("test.selectVariantFirst")}
          </Button>

          {/* Language Selection */}
          <Card className="w-full p-3 bg-card/50 backdrop-blur-sm border-border">
            <h2 className="text-xs font-medium text-muted-foreground mb-2 text-center">{t("test.selectLanguage")}</h2>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.id}
                  variant={language === lang.id ? "default" : "outline"}
                  className={`flex flex-col items-center gap-0.5 h-auto py-2 text-xs ${
                    language === lang.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/10 hover:border-primary"
                  }`}
                  onClick={() => setLanguage(lang.id)}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-[10px] font-medium">{lang.label}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Category Options */}
          <Card className="w-full p-3 bg-card/50 backdrop-blur-sm border-border">
            <h2 className="text-xs font-medium text-muted-foreground mb-2 text-center">{t("test.selectCategory")}</h2>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant="outline"
                  className="flex flex-col items-center gap-1 h-auto py-2 hover:bg-primary/10 hover:border-primary"
                >
                  <div className={`w-8 h-8 rounded-full ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-medium">{cat.label}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="w-full grid grid-cols-3 gap-2">
            <Card className="p-2 text-center bg-card/50 backdrop-blur-sm border-border">
              <div className="text-lg font-bold text-primary">20</div>
              <div className="text-[10px] text-muted-foreground">{t("test.questions")}</div>
            </Card>
            <Card className="p-2 text-center bg-card/50 backdrop-blur-sm border-border">
              <div className="text-lg font-bold text-primary">30</div>
              <div className="text-[10px] text-muted-foreground">{t("test.minutes")}</div>
            </Card>
            <Card className="p-2 text-center bg-card/50 backdrop-blur-sm border-border">
              <div className="text-lg font-bold text-primary">80%</div>
              <div className="text-[10px] text-muted-foreground">{t("test.passingScore")}</div>
            </Card>
          </div>

          {/* Instructions */}
          <Card className="w-full p-3 bg-card/50 backdrop-blur-sm border-border">
            <h3 className="text-xs font-semibold text-foreground mb-1">{t("test.instructions")}:</h3>
            <ul className="text-[10px] text-muted-foreground space-y-0.5">
              <li>• {t("test.instruction1")}</li>
              <li>• {t("test.instruction2")}</li>
              <li>• {t("test.instruction3")}</li>
            </ul>
          </Card>
        </main>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Sidebar */}
        <aside className="w-80 bg-card border-r border-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("app.title")}</h1>
              <p className="text-sm text-muted-foreground mt-1">{t("app.subtitle")}</p>
            </div>
          </div>

          {/* Variant Selection */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">{t("test.selectVariant")}</h2>
            <div className="grid grid-cols-5 gap-2">
              {variants.map((v) => (
                <Button
                  key={v}
                  variant={selectedVariant === v ? "default" : "outline"}
                  size="sm"
                  className={`h-9 text-sm font-medium ${
                    selectedVariant === v 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/10 hover:border-primary"
                  }`}
                  onClick={() => setSelectedVariant(v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">{t("test.selectLanguage")}</h2>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.id}
                  variant={language === lang.id ? "default" : "outline"}
                  className={`flex-1 flex flex-col items-center gap-1 h-auto py-3 ${
                    language === lang.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/10 hover:border-primary"
                  }`}
                  onClick={() => setLanguage(lang.id)}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-xs font-medium">{lang.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Category Options */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">{t("test.selectCategory")}</h2>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-primary/10 hover:border-primary"
                >
                  <div className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{cat.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <Card className="p-4 bg-muted/30 border-border mt-auto">
            <h3 className="text-sm font-semibold text-foreground mb-2">{t("test.instructions")}:</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• {t("test.instruction1")}</li>
              <li>• {t("test.instruction2")}</li>
              <li>• {t("test.instruction3")}</li>
            </ul>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background to-primary/5">
          <div className="max-w-md w-full text-center">
            {/* Hero Section */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Car className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{t("test.ready")}</h2>
              <p className="text-muted-foreground">{t("test.readyDescription")}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card className="p-4 bg-card border-border">
                <HelpCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">20</div>
                <div className="text-xs text-muted-foreground">{t("test.questions")}</div>
              </Card>
              <Card className="p-4 bg-card border-border">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">30</div>
                <div className="text-xs text-muted-foreground">{t("test.minutes")}</div>
              </Card>
              <Card className="p-4 bg-card border-border">
                <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">80%</div>
                <div className="text-xs text-muted-foreground">{t("test.passingScore")}</div>
              </Card>
            </div>

            {/* Selected Variant Display */}
            {selectedVariant && (
              <div className="mb-4 text-lg font-semibold text-primary">
                {t("test.selected")}: {t("test.variant")} {selectedVariant}
              </div>
            )}

            {/* Start Button */}
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90"
              onClick={handleStartTest}
              disabled={selectedVariant === null}
            >
              {selectedVariant ? `${t("test.variant")} ${selectedVariant} - ${t("test.startTest")}` : t("test.selectVariantFirst")}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};
