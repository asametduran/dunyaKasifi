import React, { useState } from 'react';
import { MapPin, Award, BookOpen, Brain, Users, Heart, Mail, Instagram, Youtube, Languages } from 'lucide-react';
import { translations } from './translations';

function App() {
  const [lang, setLang] = useState<'en' | 'tr'>('en');
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'tr' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-purple-100">
      {/* Language Switch */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Languages size={20} className="text-purple-600" />
          <span className="font-medium">{lang === 'en' ? 'TR' : 'EN'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-8 pb-16 text-center">
        <div className="mb-4 flex justify-center">
          <MapPin size={64} className="text-purple-600" strokeWidth={2.5} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-purple-600 mb-4">Minik Gezgin</h1>
        <p className="text-2xl md:text-3xl text-blue-600 font-semibold mb-8">{t.tagline}</p>
      </header>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">{t.about1}</p>
            <p className="text-lg text-gray-700">{t.about2}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-12">{t.features}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<MapPin className="text-blue-500" />}
              title={t.interactiveTitle}
              description={t.interactiveDesc}
            />
            <FeatureCard
              icon={<Award className="text-green-500" />}
              title={t.passportTitle}
              description={t.passportDesc}
            />
            <FeatureCard
              icon={<Brain className="text-purple-500" />}
              title={t.quizzesTitle}
              description={t.quizzesDesc}
            />
            <FeatureCard
              icon={<Heart className="text-pink-500" />}
              title={t.designTitle}
              description={t.designDesc}
            />
            <FeatureCard
              icon={<Users className="text-orange-500" />}
              title={t.parentTitle}
              description={t.parentDesc}
            />
            <FeatureCard
              icon={<BookOpen className="text-red-500" />}
              title={t.missionsTitle}
              description={t.missionsDesc}
            />
          </div>
        </div>
      </section>

      {/* Game Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-12">{t.preview}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1524500864919-e7010f0c3b13?auto=format&fit=crop&w=600&q=80"
              alt="World Map Interface"
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
              alt="Passport Collection"
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80"
              alt="Quiz Interface"
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-8">{t.comingSoon}</h2>
          <div className="flex justify-center gap-6">
            <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-300">
              App Store
            </button>
            <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-300">
              Google Play
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <Youtube size={24} />
              </a>
              <a href="mailto:contact@minikgezgin.com" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <Mail size={24} />
              </a>
            </div>
            <p className="text-gray-600">{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="w-12 h-12 mb-4 flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;