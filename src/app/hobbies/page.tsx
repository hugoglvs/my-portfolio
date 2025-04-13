export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Centres d&apos;intérêt</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Passion 1: Rugby */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("/images/usap.jpg")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Rugby</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                Ancien joueur du SCAR-ESC BAC, le rugby est plus qu&apos;un sport pour moi, c&apos;est une véritable passion. Je suis un fervent supporter de l&apos;USAP et j&apos;apprécie particulièrement l&apos;esprit d&apos;équipe et les valeurs de respect qui caractérisent ce sport.
              </p>
            </div>
          </div>
          
          {/* Passion 2: Mangas */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("/images/manga.jpg")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Mangas</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                Grand fan de One Piece, Naruto et Jujutsu Kaisen, je m&apos;efforce de constituer une collection physique pour soutenir les mangakas tout en lisant en format numérique. J&apos;apprécie la diversité des univers et la profondeur des histoires.
              </p>
            </div>
          </div>
          
          {/* Passion 3: Informatique */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Informatique</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                Passionné par l&apos;intelligence artificielle, la data science et le développement web, j&apos;aime explorer les nouvelles technologies et développer des solutions innovantes. Ces domaines représentent à la fois ma passion et mon métier.
              </p>
            </div>
          </div>
          
          {/* Passion 4: Espace/Aéronautique */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Espace & Aéronautique</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                Fasciné par l&apos;exploration spatiale et l&apos;aéronautique, je suis toujours à l&apos;affût des dernières avancées technologiques. Cette passion m&apos;a conduit à postuler intensivement chez Airbus. Les mystères de l&apos;univers me captivent particulièrement.
              </p>
            </div>
          </div>
          
          {/* Passion 5: Cinéma */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Cinéma</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                Le cinéma est une passion qui me permet de découvrir de nouveaux univers et de m&apos;évader. Bien que j&apos;apprécie la plupart des genres, les films d&apos;horreur sont ceux qui m&apos;attirent le moins. J&apos;aime particulièrement les films qui mêlent innovation et narration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 