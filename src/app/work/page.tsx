export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Work</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Project 1 */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-[var(--secondary)] font-bold text-xl">
              Data Visualization Platform
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Interactive Dashboard for Financial Analytics</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Developed a real-time dashboard that helps financial analysts track market trends and make informed decisions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-md">React</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-md">D3.js</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-md">Python</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-md">Firebase</span>
              </div>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-[var(--secondary)] font-bold text-xl">
              Machine Learning Model
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Predictive Analytics for E-commerce</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Built a recommendation system that increased customer engagement by 35% and boosted sales conversion rates.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-sm rounded-md">Python</span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-sm rounded-md">TensorFlow</span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-sm rounded-md">SQL</span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 text-sm rounded-md">AWS</span>
              </div>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-[var(--secondary)] font-bold text-xl">
              Data Pipeline Architecture
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Scalable ETL Pipeline for Big Data</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Designed and implemented a high-throughput data processing system capable of handling millions of records per hour.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm rounded-md">Apache Kafka</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm rounded-md">Spark</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm rounded-md">Airflow</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm rounded-md">Docker</span>
              </div>
            </div>
          </div>
          
          {/* Project 4 */}
          <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-[var(--secondary)] font-bold text-xl">
              Interactive Portfolio
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Gamified Personal Website</h3>
              <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                Created an innovative portfolio website that showcases my skills and experiences through interactive puzzles and challenges.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-sm rounded-md">Next.js</span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-sm rounded-md">React</span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-sm rounded-md">TypeScript</span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-sm rounded-md">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 