import { FileText, Settings } from 'lucide-react'

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              CV Generator Norge
            </h1>
          </div>
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'builder'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Bygg CV</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'preview'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Forhåndsvisning</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

