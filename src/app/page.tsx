'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] p-8">
      <h1 className="text-4xl font-bold mb-8 text-[var(--foreground)]">Hugo Gonçalves</h1>
      
      <div className="max-w-2xl text-center space-y-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Bienvenue sur mon Portfolio</h2>
          <p className="text-lg text-[var(--foreground)]">
            Ce site est mon portfolio personnel, une vitrine de mes compétences, projets et expériences professionnelles.
            Explorez les différentes sections pour en apprendre davantage sur mon parcours et mes réalisations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Comment naviguer sur le site ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-[var(--card)] rounded-lg">
              <h3 className="text-xl font-medium mb-2 text-[var(--foreground)]">À propos</h3>
              <p className="text-[var(--foreground)]">
                Découvrez toutes les informations importantes sur mon parcours, mes compétences et mes centres d&apos;intérêt.
              </p>
            </div>
            <div className="p-4 bg-[var(--card)] rounded-lg">
              <h3 className="text-xl font-medium mb-2 text-[var(--foreground)]">Explorer</h3>
              <p className="text-[var(--foreground)]">
                Jouez à des jeux interactifs pour me découvrir de manière ludique et originale.
              </p>
            </div>
            <div className="p-4 bg-[var(--card)] rounded-lg">
              <h3 className="text-xl font-medium mb-2 text-[var(--foreground)]">Projets</h3>
              <p className="text-[var(--foreground)]">
                Explorez mes réalisations et projets personnels dans le domaine du développement.
              </p>
            </div>
            <div className="p-4 bg-[var(--card)] rounded-lg">
              <h3 className="text-xl font-medium mb-2 text-[var(--foreground)]">Contact</h3>
              <p className="text-[var(--foreground)]">
                N&apos;hésitez pas à me contacter pour toute opportunité ou collaboration.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Fonctionnalités</h2>
          <ul className="list-disc list-inside text-left text-[var(--foreground)] space-y-2">
            <li>Navigation intuitive entre les différentes sections</li>
            <li>Jeux interactifs pour une découverte ludique de mon profil</li>
            <li>Présentation détaillée de mes projets et compétences</li>
            <li>Interface moderne et responsive</li>
            <li>Possibilité de me contacter directement</li>
          </ul>
        </section>
      </div>
    </main>
  );
}