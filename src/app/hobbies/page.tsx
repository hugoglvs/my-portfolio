'use client';

import { motion } from 'framer-motion';
import HobbyCard from '@/components/HobbyCard';

const hobbies = [
  {
    title: "Rugby",
    description: "Ancien joueur du SCAR-ESC BAC, le rugby est plus qu'un sport pour moi, c'est une véritable passion. Je suis un fervent supporter de l'USAP et j'apprécie particulièrement l'esprit d'équipe et les valeurs de respect qui caractérisent ce sport.",
    imageUrl: "/images/usap.jpg"
  },
  {
    title: "Informatique",
    description: "Passionné par l'intelligence artificielle, la data science et le développement web, j'aime explorer les nouvelles technologies et développer des solutions innovantes. Ces domaines représentent à la fois ma passion et mon métier.",
    imageUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Apprentissage des langues",
    description: "Passionné par l'apprentissage des langues, je m'efforce d'améliorer mes compétences linguistiques. Actuellement, je me concentre sur l'anglais et l'espagnol, tout en explorant d'autres langues. Cette passion me permet de mieux comprendre différentes cultures et de communiquer avec des personnes du monde entier.",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Espace & Aéronautique",
    description: "Fasciné par l'exploration spatiale et l'aéronautique, je suis toujours à l'affût des dernières avancées technologiques. Cette passion m'a conduit à postuler intensivement chez Airbus. Les mystères de l'univers me captivent particulièrement.",
    imageUrl: "https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Mangas",
    description: "Grand fan de One Piece, Naruto et Jujutsu Kaisen, je m'efforce de constituer une collection physique pour soutenir les mangakas tout en lisant en format numérique. J'apprécie la diversité des univers et la profondeur des histoires.",
    imageUrl: "/images/manga.jpg"
  },
  {
    title: "Cinéma",
    description: "Le cinéma est une passion qui me permet de découvrir de nouveaux univers et de m'évader. Bien que j'apprécie la plupart des genres, les films d'horreur sont ceux qui m'attirent le moins. J'aime particulièrement les films qui mêlent innovation et narration.",
    imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
];

export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="relative">
        <div className="absolute inset-0 -mt-24 bg-gradient-to-b from-blue-600/20 via-blue-600/10 to-transparent h-[120vh]" />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-6xl font-bold mb-6 font-display bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight py-2">
              Mes Passions
            </h1>
            <p className="text-2xl text-[var(--neutral-600)] dark:text-[var(--neutral-400)] max-w-3xl mb-12">
              Découvrez mes centres d&apos;intérêt qui façonnent ma personnalité et enrichissent mon quotidien.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HobbyCard
                    title={hobby.title}
                    description={hobby.description}
                    imageUrl={hobby.imageUrl}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 