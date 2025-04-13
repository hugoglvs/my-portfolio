'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  User, 
  Heart, 
  ArrowRight,
  Briefcase,
  Brain,
  Target,
  Star
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] p-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4 text-[var(--foreground)]">Hugo Gonçalves</h1>
        <p className="text-xl text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
          Data Analyst &amp; Développeur Full Stack
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl w-full space-y-16">
        {/* Introduction */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold mb-6 text-[var(--foreground)]">Bienvenue sur mon Portfolio</h2>
          <p className="text-lg text-[var(--neutral-600)] dark:text-[var(--neutral-400)] max-w-3xl mx-auto">
            Ce portfolio interactif a été créé dans le cadre de mon Master ICE-LD (Ingénierie Continue en Écosystèmes Logiciels et Données)
            pour l&apos;unité d&apos;enseignement &quot;Expression et Communication&quot;. Découvrez mon parcours professionnel, mes compétences
            et ma personnalité à travers une expérience unique et interactive.
          </p>
        </motion.section>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* CV Section */}
          <Link href="/about" className="group">
            <div className="p-6 bg-[var(--card)] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Mon CV</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Découvrez mon parcours académique et professionnel, mes expériences et mes réalisations.
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <span className="text-sm font-medium">Explorer</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Compétences Section */}
          <Link href="/about#skills" className="group">
            <div className="p-6 bg-[var(--card)] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Compétences</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Explorez mes compétences techniques en Data Science, Développement Web, et plus encore.
              </p>
              <div className="flex items-center text-purple-600 dark:text-purple-400">
                <span className="text-sm font-medium">Découvrir</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Personnalité Section */}
          <Link href="/explore" className="group">
            <div className="p-6 bg-[var(--card)] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <User className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Traits de Personnalité</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Découvrez qui je suis à travers une expérience interactive et ludique.
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="text-sm font-medium">Explorer</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Attentes Section */}
          <Link href="/explore" className="group">
            <div className="p-6 bg-[var(--card)] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Target className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Mes Attentes</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Découvrez mes aspirations professionnelles et mes objectifs de carrière.
              </p>
              <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                <span className="text-sm font-medium">En savoir plus</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Centres d'Intérêt Section */}
          <Link href="/explore" className="group">
            <div className="p-6 bg-[var(--card)] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Centres d&apos;Intérêt</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Explorez mes passions pour l&apos;astronomie, l&apos;aéronautique, le rugby, et plus encore.
              </p>
              <div className="flex items-center text-red-600 dark:text-red-400">
                <span className="text-sm font-medium">Découvrir</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Originalité Section */}
          <div className="p-6 bg-[var(--card)] rounded-lg shadow-md h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <Star className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Originalité</h3>
            </div>
            <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
              Ce portfolio se démarque par son approche interactive et ludique, transformant la découverte de mon profil en une expérience engageante.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}