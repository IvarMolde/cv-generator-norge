import { useState } from 'react'
import CVBuilder from './components/CVBuilder'
import CVPreview from './components/CVPreview'
import Header from './components/Header'
import { CVProvider } from './context/CVContext'

function App() {
  const [activeTab, setActiveTab] = useState('builder')

  return (
    <CVProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="container mx-auto px-4 py-8">
          {activeTab === 'builder' ? <CVBuilder /> : <CVPreview />}
        </main>
      </div>
    </CVProvider>
  )
}

export default App

