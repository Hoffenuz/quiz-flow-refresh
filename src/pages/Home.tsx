import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { 
  Play, 
  Car, 
  FileText, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award,
  ChevronDown,
  Smartphone,
  Shield,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Smartphone,
    title: "Qulay interfeys",
    description: "Telefon, planshet yoki kompyuterda ishlash imkoniyati",
  },
  {
    icon: Shield,
    title: "Rasmiy savollar",
    description: "O'zbekiston YHQ ga asoslangan test savollari",
  },
  {
    icon: TrendingUp,
    title: "Statistika",
    description: "O'z natijalaringizni kuzatib boring",
  },
  {
    icon: Clock,
    title: "24/7 kirish",
    description: "Istalgan vaqtda test ishlash imkoniyati",
  },
];

const stats = [
  { value: "20+", label: "Variantlar" },
  { value: "1000+", label: "Savollar" },
  { value: "200+", label: "Yo'l belgilari" },
  { value: "24/7", label: "Qo'llab-quvvat" },
];

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-hover to-primary overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Avtoexclusive <br className="md:hidden" />O'quv Markazi!
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Professional haydovchilik guvohnomasini olish uchun zamonaviy platforma
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/variant">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 text-lg px-8 py-6 rounded-xl shadow-xl">
                  <Play className="w-5 h-5" />
                  Test ishlash
                </Button>
              </Link>
              <Link to="/belgilar">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 text-lg px-8 py-6 rounded-xl">
                  <Car className="w-5 h-5" />
                  Yo'l belgilari
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg bg-card">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nima uchun bizni tanlash kerak?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Platformamiz sizga eng yaxshi tayyorgarlik imkoniyatini beradi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none bg-card">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tez boshlash
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/variant" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">
                    Variantlar
                  </h3>
                  <p className="text-muted-foreground">
                    20 ta savoldan iborat test variantlari
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/belgilar" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-success bg-gradient-to-br from-success/5 to-success/10">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-success rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Car className="w-10 h-10 text-success-foreground" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">
                    Yo'l belgilari
                  </h3>
                  <p className="text-muted-foreground">
                    Barcha yo'l belgilarini o'rganing
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/darslik" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-warning bg-gradient-to-br from-warning/5 to-warning/10">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-warning rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-10 h-10 text-warning-foreground" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">
                    Darslik
                  </h3>
                  <p className="text-muted-foreground">
                    Yo'l harakati qoidalari darsligi
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-none shadow-lg overflow-hidden">
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="w-full p-6 flex items-center justify-between text-left bg-card hover:bg-secondary/50 transition-colors"
            >
              <span className="font-bold text-lg text-foreground">
                AvtoTest haqida qisqacha
              </span>
              <ChevronDown 
                className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${
                  aboutOpen ? "rotate-180" : ""
                }`} 
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ${
                aboutOpen ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="p-6 pt-0 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AvtoTest — bu haydovchilik guvohnomasi olishni xohlovchilar uchun yaratilgan zamonaviy onlayn platforma bo'lib, foydalanuvchilarga Yo'l harakati qoidalari (YHQ) bo'yicha test savollarini interaktiv tarzda yechish imkonini beradi.
                </p>
                <p>
                  Platformadagi barcha testlar O'zbekiston Respublikasi Yo'l harakati qoidalariga asoslangan bo'lib, har bir savolga yagona to'g'ri javob keltirilgan. Savollar muntazam yangilanib boriladi.
                </p>
                <p>
                  AvtoTest nafaqat test topshirish imkonini beradi, balki foydalanuvchilar o'z xatolarini ko'rib chiqib, to'g'ri javobni o'rganishlari mumkin. Har bir test yakunida tizim sizga umumiy natijangizni ko'rsatadi.
                </p>
                <p>
                  Agar siz ham YHQ imtihoniga tayyorlanayotgan bo'lsangiz, AvtoTest siz uchun eng to'g'ri tanlov!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
