'use client';

export default function ProfilePage() {
  // Mock user data (in a real app, this would come from context/state)
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: 'January 2023',
    solvedPuzzles: 3,
    achievements: [
      { id: 'first_puzzle', title: 'First Discovery', date: 'Feb 10, 2023' },
      { id: 'all_childhood', title: 'Nostalgic Explorer', date: 'Mar 15, 2023' }
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
            <div className="flex items-center">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-blue-600 text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-blue-100">{user.email}</p>
                <p className="text-blue-100 mt-1">Member since {user.joinDate}</p>
              </div>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Stats panel */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Progress</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-gray-500 text-sm">Solved Puzzles</p>
                    <p className="text-2xl font-bold text-blue-600">{user.solvedPuzzles}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-gray-500 text-sm">Achievements</p>
                    <p className="text-2xl font-bold text-indigo-600">{user.achievements.length}</p>
                  </div>
                </div>
              </div>
              
              {/* Achievements panel */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Achievements</h3>
                <div className="space-y-4">
                  {user.achievements.map(achievement => (
                    <div key={achievement.id} className="bg-white p-4 rounded-md shadow-sm flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-gray-500">Unlocked on {achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Settings */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Account Settings</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-gray-500">Update your password for better security</p>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100">
                    Change
                  </button>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 