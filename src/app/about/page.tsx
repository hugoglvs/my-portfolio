'use client';

import { motion } from 'framer-motion';
import { SocialLinksGroup } from '@/components/SocialLinksGroup';
import { DownloadButton } from '@/components/DownloadButton';
import { TableOfContents } from '@/components/TableOfContents';
import { 
  ArrowDown, 
  MapPin, 
  Database, 
  Code2, 
  Wrench, 
  Palette,
  Box,
  GitBranch,
  Server,
  Type,
  Globe,
  Beaker,
  Container,
  Github,
  Layout,
  Paintbrush,
  FileSpreadsheet,
  Terminal
} from 'lucide-react';
import Image from 'next/image';

const user = {
  name: "Hugo Gonçalves",
  title: "Data Analyst",
  location: "Toulouse, France",
  email: "hugoglvs@icloud.com",
  image: "/images/profile.jpg",
  resume: "/resume.pdf",
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Portugais", level: "Natif" },
    { name: "Anglais", level: "C2" },
    { name: "Espagnol", level: "C2" },
    { name: "Italien", level: "B1" }
  ],
  social: {
    github: "https://github.com/hugoglvs",
    linkedin: "https://linkedin.com/in/hugo-gonçalves-4250031b0/",
  },
  introduction: [
    "Je suis actuellement en Master MIASHS (Mathématiques Informatique Appliquées aux Sciences Humaines et Sociales) mention ICE-LD (Ingénierie Continue en Écosystèmes Logiciels et Données) en alternance chez Airbus en tant que Data Analyst sur l'usine de Saint Eloi en Qualité Transverse.",
    "Passionné par l'astronomie, l'aéronautique, le rugby, les mangas et le cinéma, je m'efforce de combiner ma passion pour la technologie avec mes centres d'intérêt variés."
  ],
  experience: [
    {
      title: "Data Analyst",
      company: "Airbus",
      period: "2023 - Présent",
      tasks: [
        "Analyse de données pour la qualité transverse",
        "Développement de solutions d'analyse de données",
        "Optimisation des processus de qualité"
      ]
    },
    {
      title: "Ripeur",
      company: "Perpignan Méditerranée Métropole",
      period: "Saisons 2022 - 2023",
      tasks: ["Travail saisonnier en collecte des déchets"]
    },
    {
      title: "Manoeuvre",
      company: "JFG Bâtiment",
      period: "Saisons 2019 - 2021",
      tasks: ["Travail saisonnier dans le bâtiment"]
    }
  ],
  education: [
    {
      degree: "Master MIASHS mention ICE-LD",
      school: "Université Jean Jaurès, Toulouse",
      period: "2024 - Présent",
      description: "Ingénierie Continue en Écosystèmes Logiciels et Données"
    },
    {
      degree: "Licence MIASHS",
      school: "Université Paul Valéry, Montpellier",
      period: "2021 - 2024",
      description: "Mention Très Bien - Spécialisation en analyse de données, statistiques et informatique"
    },
    {
      degree: "Baccalauréat Scientifique",
      school: "Lycée Polyvalent Aristide Maillol, Perpignan",
      period: "2017 - 2020",
      description: "Mention Très Bien"
    }
  ],
  skills: {
    "Data Science": [
      "PySpark",
      "pandas",
      "numpy",
      "Scikit-learn",
      "PyTorch"
    ],
    "Développement Web": [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Django",
      "Flask"
    ],
    "Outils & DevOps": [
      "Docker",
      "Git",
      "GitHub Actions",
      "Jenkins"
    ],
    "Visualisation & Design": [
      "Power BI",
      "Figma",
      "Suite Microsoft Office",
      "Google Workspace",
      "Google Apps Script"
    ]
  },
  personality: [
    {
      trait: "Ambitieux",
      description: "Je me fixe des objectifs ambitieux et je m'efforce de les atteindre avec détermination."
    },
    {
      trait: "Impliqué",
      description: "Je m'investis pleinement dans mes projets et responsabilités, en accordant une attention particulière aux détails."
    },
    {
      trait: "Autonome",
      description: "Je sais trouver des solutions par moi-même et m'adapter aux situations nouvelles."
    },
    {
      trait: "Amusant",
      description: "J'aime apporter une touche d'humour et de légèreté dans mon environnement de travail."
    }
  ]
};

export default function AboutPage() {
  const tableOfContentsLinks = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#personality', label: 'Traits de Personnalité' },
    { href: '#experience', label: 'Expérience Professionnelle' },
    { href: '#education', label: 'Formation' },
    { href: '#skills', label: 'Compétences Techniques' },
  ];

  return (
    <div className="flex">
      {/* Table of Contents */}
      <aside className="hidden md:block w-64 shrink-0 sticky top-24 h-[calc(100vh-12rem)] ml-6">
        <TableOfContents links={tableOfContentsLinks} />
      </aside>
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex gap-8">          
            {/* Main Content */}
            <div className="flex-1">
              {/* Hero Section */}
              <motion.div 
                id="introduction"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center md:flex-row md:items-start gap-8 scroll-mt-30"
              >
                {/* Profile Image and Languages */}
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[var(--neutral-400)]/10">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={192}
                      height={192}
                      className="object-cover h-52"
                    />
                  </div>
                  {/* Language Spoken */}
                  <div className="flex flex-wrap gap-2 justify-center w-[calc(2*120px+8px)]">
                    {user.languages.map((language, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="group relative"
                      >
                        <button className="px-4 py-1 rounded-full border border-[var(--neutral-500)]/20 hover:bg-[var(--neutral-300)]/10 transition w-[120px] h-[32px] relative">
                          <div className="relative w-full h-full overflow-hidden">
                            <span className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 group-hover:translate-y-[-10px] transition-all duration-300">{language.name}</span>
                            <span className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{language.level}</span>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Profile Info */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex-1 text-center md:text-left"
                >
                  <h1 className="text-6xl font-bold mb-1.5 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight py-2">
                    {user.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                    <h2 className="text-4xl font-medium text-[var(--neutral-600)] dark:text-[var(--neutral-400)] font-display">
                      {user.title}
                    </h2>
                    <DownloadButton href={user.resume} icon={<ArrowDown />} variant="rounded" label="Télécharger mon CV" />
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-6 text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                    <MapPin /> <span>{user.location}</span>
                  </div>
                  {/* Social Links */}
                  <SocialLinksGroup
                    github={user.social.github}
                    linkedin={user.social.linkedin}
                    email={user.email}
                  />
                  <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="rounded-lg py-6"
                  >
                    {user.introduction.map((paragraph, index) => (
                      <p key={index} className="mb-4 text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </motion.section>
                </motion.div>
              </motion.div>

              <div className="space-y-8">
                {/* Traits de personnalité */}
                <motion.section 
                  id="personality"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-[var(--card)] rounded-lg shadow-md p-6 scroll-mt-20"
                >
                  <h2 className="text-3xl font-bold mb-6 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Traits de Personnalité
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.personality.map((trait, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] p-4 rounded-lg"
                      >
                        <h3 className="text-xl font-semibold mb-2">{trait.trait}</h3>
                        <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                          {trait.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Expérience professionnelle */}
                <motion.section 
                  id="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-[var(--card)] rounded-lg shadow-md p-6 scroll-mt-20"
                >
                  <h2 className="text-3xl font-bold mb-6 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Expérience Professionnelle
                  </h2>
                  <div className="space-y-6">
                    {user.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <h3 className="text-2xl font-semibold mb-2">{exp.title} - {exp.company}</h3>
                        <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-3">{exp.period}</p>
                        <ul className="list-disc ml-4 space-y-2">
                          {exp.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-lg">{task}</li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Études */}
                <motion.section 
                  id="education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="bg-[var(--card)] rounded-lg shadow-md p-6 scroll-mt-20"
                >
                  <h2 className="text-3xl font-bold mb-6 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Formation
                  </h2>
                  <div className="space-y-6">
                    {user.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <h3 className="text-2xl font-semibold mb-2">{edu.degree}</h3>
                        <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-2">
                          {edu.school} {edu.school && '('}{edu.period}{edu.school && ')'}
                        </p>
                        <p className="text-lg">{edu.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Compétences techniques */}
                <motion.section 
                  id="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="bg-[var(--card)] rounded-lg shadow-md p-6 scroll-mt-20"
                >
                  <h2 className="text-3xl font-bold mb-6 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Compétences Techniques
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(user.skills).map(([category, skills], index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] p-6 rounded-lg"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          {category === "Data Science" && <Database className="w-6 h-6" />}
                          {category === "Développement Web" && <Code2 className="w-6 h-6" />}
                          {category === "Outils & DevOps" && <Wrench className="w-6 h-6" />}
                          {category === "Visualisation & Design" && <Palette className="w-6 h-6" />}
                          <h3 className="text-xl font-semibold">{category}</h3>
                        </div>
                        <ul className="grid grid-cols-2 gap-3">
                          {skills.map((skill, skillIndex) => (
                            <motion.li
                              key={skillIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.05 * skillIndex }}
                              className="flex items-center gap-2 text-lg"
                            >
                              {skill === "PySpark" && <Box className="w-5 h-5" />}
                              {skill === "pandas" && <FileSpreadsheet className="w-5 h-5" />}
                              {skill === "numpy" && <Box className="w-5 h-5" />}
                              {skill === "Scikit-learn" && <Beaker className="w-5 h-5" />}
                              {skill === "PyTorch" && <Box className="w-5 h-5" />}
                              {skill === "TypeScript" && <Type className="w-5 h-5" />}
                              {skill === "Next.js" && <Globe className="w-5 h-5" />}
                              {skill === "Tailwind CSS" && <Paintbrush className="w-5 h-5" />}
                              {skill === "Django" && <Code2 className="w-5 h-5" />}
                              {skill === "Flask" && <Beaker className="w-5 h-5" />}
                              {skill === "Docker" && <Container className="w-5 h-5" />}
                              {skill === "Git" && <GitBranch className="w-5 h-5" />}
                              {skill === "GitHub Actions" && <Github className="w-5 h-5" />}
                              {skill === "Jenkins" && <Server className="w-5 h-5" />}
                              {skill === "Power BI" && <Layout className="w-5 h-5" />}
                              {skill === "Figma" && <Paintbrush className="w-5 h-5" />}
                              {skill === "Suite Microsoft Office" && <FileSpreadsheet className="w-5 h-5" />}
                              {skill === "Google Workspace" && <Globe className="w-5 h-5" />}
                              {skill === "Google Apps Script" && <Terminal className="w-5 h-5" />}
                              <span>{skill}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 