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
  Briefcase,
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
  languages: ["Français", "Portugais", "Anglais", "Espagnol", "Italien"],
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
  }
};

export default function AboutPage() {
  const tableOfContentsLinks = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#experience', label: 'Expérience Professionnelle' },
    { href: '#education', label: 'Formation' },
    { href: '#skills', label: 'Compétences Techniques' },
  ];

  return (
    <div className="flex">
      {/* Table of Contents */}
    <aside className="hidden md:block w-64 shrink-0 sticky top-6 h-[calc(100vh-12rem)]">
      <TableOfContents links={tableOfContentsLinks} />
    </aside>
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-8">          
          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <div id="introduction" className="flex flex-col items-center md:flex-row md:items-start gap-8 scroll-mt-30">
              {/* Profile Image and Languages */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[var(--neutral-400)]/10">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
                {/* Language Spoken */}
                <div className="flex flex-wrap gap-2 justify-center w-[calc(2*100px+8px)]">
                  {user.languages.map((language, index) => (
                    <button key={index} className="px-4 py-1 rounded-full border border-[var(--neutral-500)]/20 hover:bg-[var(--neutral-300)]/10 transition w-[100px]">
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold mb-1.5">{user.name}</h1>
                <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                  <h2 className="text-3xl text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">{user.title}</h2>
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
                <section className="rounded-lg py-6">
                  {user.introduction.map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </section>
              </div>
            </div>

            <div className="space-y-8">
              {/* Expérience professionnelle */}
              <section id="experience" className="bg-[var(--card)] rounded-lg shadow-md p-6 scroll-mt-20">
                <h2 className="text-2xl font-semibold mb-4">Expérience Professionnelle</h2>
                <div className="space-y-4">
                  {user.experience.map((exp, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-medium">{exp.title} - {exp.company}</h3>
                      <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">{exp.period}</p>
                      <ul className="list-disc ml-4 mt-2">
                        {exp.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Études */}
              <section id="education" className="bg-[var(--card)] rounded-lg shadow-md p-6 scroll-mt-20">
                <h2 className="text-2xl font-semibold mb-4">Formation</h2>
                <div className="space-y-4">
                  {user.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-medium">{edu.degree}</h3>
                      <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">{edu.school} {edu.school && '('}{edu.period}{edu.school && ')'}</p>
                      <p>{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Compétences techniques */}
              <section id="skills" className="bg-[var(--card)] rounded-lg shadow-md p-6 scroll-mt-20">
                <h2 className="text-2xl font-semibold mb-4">Compétences Techniques</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(user.skills).map(([category, skills], index) => (
                    <div key={index} className="bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        {category === "Data Science" && <Database className="w-5 h-5" />}
                        {category === "Développement Web" && <Code2 className="w-5 h-5" />}
                        {category === "Outils & DevOps" && <Wrench className="w-5 h-5" />}
                        {category === "Visualisation & Design" && <Palette className="w-5 h-5" />}
                        <h3 className="font-bold">{category}</h3>
                      </div>
                      <ul className="list-none ml-0 space-y-2.5">
                        {skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-center gap-2.5 pl-1">
                            {skill === "PySpark" && <Box className="w-4 h-4" />}
                            {skill === "pandas" && <FileSpreadsheet className="w-4 h-4" />}
                            {skill === "numpy" && <Box className="w-4 h-4" />}
                            {skill === "Scikit-learn" && <Beaker className="w-4 h-4" />}
                            {skill === "PyTorch" && <Box className="w-4 h-4" />}
                            {skill === "TypeScript" && <Type className="w-4 h-4" />}
                            {skill === "Next.js" && <Globe className="w-4 h-4" />}
                            {skill === "Tailwind CSS" && <Paintbrush className="w-4 h-4" />}
                            {skill === "Django" && <Code2 className="w-4 h-4" />}
                            {skill === "Flask" && <Beaker className="w-4 h-4" />}
                            {skill === "Docker" && <Container className="w-4 h-4" />}
                            {skill === "Git" && <GitBranch className="w-4 h-4" />}
                            {skill === "GitHub Actions" && <Github className="w-4 h-4" />}
                            {skill === "Jenkins" && <Server className="w-4 h-4" />}
                            {skill === "Power BI" && <Layout className="w-4 h-4" />}
                            {skill === "Figma" && <Paintbrush className="w-4 h-4" />}
                            {skill === "Suite Microsoft Office" && <Briefcase className="w-4 h-4" />}
                            {skill === "Google Workspace" && <Briefcase className="w-4 h-4" />}
                            {skill === "Google Apps Script" && <Terminal className="w-4 h-4" />}
                            <span className="text-gray-700">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
} 