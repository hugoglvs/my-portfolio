export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Hobbies</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Hobby 1: Photography */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Photography</h3>
              <p className="text-gray-600">
                I love capturing moments and exploring new perspectives through my camera lens. Landscape and street photography are my favorite genres.
              </p>
            </div>
          </div>
          
          {/* Hobby 2: Hiking */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Hiking</h3>
              <p className="text-gray-600">
                Exploring trails and connecting with nature helps me clear my mind and stay active. I try to discover new hiking spots whenever I travel.
              </p>
            </div>
          </div>
          
          {/* Hobby 3: Cooking */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Cooking</h3>
              <p className="text-gray-600">
                I enjoy experimenting with recipes from different cultures. The process of creating delicious meals is both relaxing and rewarding.
              </p>
            </div>
          </div>
          
          {/* Hobby 4: Reading */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Reading</h3>
              <p className="text-gray-600">
                Books are my escape and a source of continuous learning. I particularly enjoy science fiction, popular science, and biographies.
              </p>
            </div>
          </div>
          
          {/* Hobby 5: Coding Side Projects */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Coding Side Projects</h3>
              <p className="text-gray-600">
                Beyond my professional work, I enjoy building personal projects that help me learn new technologies and solve interesting problems.
              </p>
            </div>
          </div>
          
          {/* Hobby 6: Board Games */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")' }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Board Games</h3>
              <p className="text-gray-600">
                I love gathering with friends for game nights. Strategy and cooperative games are my favorites for the problem-solving and teamwork they involve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 