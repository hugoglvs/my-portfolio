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
  Star,
  Sparkles
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section with Split Background */}
      <div className="relative -mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-blue-600/10 to-transparent h-[120vh]" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block"
            >
              <h1 className="text-7xl font-bold mb-6 font-display bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight py-2">
                Hugo Gonçalves
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-4xl font-medium text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-6 font-display">
                Data Analyst & Développeur
              </p>
              <p className="text-xl text-[var(--neutral-500)] dark:text-[var(--neutral-300)] max-w-2xl">
                Transformant les données en insights stratégiques
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Introduction */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-8 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bienvenue dans mon Univers
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <p className="text-xl text-[var(--neutral-600)] dark:text-[var(--neutral-400)] leading-relaxed">
                Ce portfolio interactif, créé dans le cadre de mon Master ICE-LD, vous invite à explorer mon parcours unique. 
                À travers une expérience immersive, découvrez comment je combine expertise technique et créativité pour 
                transformer les données en solutions innovantes.
              </p>
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
                >
                  <Sparkles className="w-16 h-16 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
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
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-[var(--card)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-xl">
                  <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--foreground)]">Mon CV</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-6 text-lg">
                Découvrez mon parcours académique et professionnel, mes expériences et mes réalisations.
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <span className="text-sm font-medium">Explorer</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Compétences Section */}
          <Link href="/about#skills" className="group">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-[var(--card)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-xl">
                  <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--foreground)]">Compétences</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-6 text-lg">
                Explorez mes compétences techniques en Data Science, Développement Web, et plus encore.
              </p>
              <div className="flex items-center text-purple-600 dark:text-purple-400">
                <span className="text-sm font-medium">Découvrir</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Personnalité Section */}
          <Link href="/explore" className="group">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-[var(--card)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-xl">
                  <User className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--foreground)]">Traits de Personnalité</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-6 text-lg">
                Découvrez qui je suis à travers une expérience interactive et ludique.
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="text-sm font-medium">Explorer</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Attentes Section */}
          <Link href="/explore" className="group">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-[var(--card)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                  <Target className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--foreground)]">Mes Attentes</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-6 text-lg">
                Découvrez mes aspirations professionnelles et mes objectifs de carrière.
              </p>
              <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                <span className="text-sm font-medium">En savoir plus</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Centres d'Intérêt Section */}
          <Link href="/explore" className="group">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-[var(--card)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-red-100 dark:bg-red-900 rounded-xl">
                  <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--foreground)]">Centres d&apos;Intérêt</h3>
              </div>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-6 text-lg">
                Explorez mes passions pour l&apos;astronomie, l&apos;aéronautique, le rugby, et plus encore.
              </p>
              <div className="flex items-center text-red-600 dark:text-red-400">
                <span className="text-sm font-medium">Découvrir</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Originalité Section */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-[var(--card)] rounded-xl shadow-lg h-full border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
                <Star className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-semibold text-[var(--foreground)]">Originalité</h3>
            </div>
            <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] text-lg">
              Ce portfolio se démarque par son approche interactive et ludique, transformant la découverte de mon profil en une expérience engageante.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}