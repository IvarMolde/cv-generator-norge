import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import { Skills, Plus, Trash2, X } from 'lucide-react'

const FerdigheterSection = () => {
  const { cvData, addSection, removeSection } = useCV()
  const [skillInput, setSkillInput] = useState('')
  const [category, setCategory] = useState('Teknisk')

  const handleAdd = () => {
    if (skillInput.trim()) {
      addSection('ferdigheter', {
        navn: skillInput.trim(),
        kategori: category,
        id: Date.now(),
      })
      setSkillInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  const categories = ['Teknisk', 'Språk', 'Programvare', 'Ledelse', 'Annet']

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Skills className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Ferdigheter</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Legg til dine ferdigheter og kompetanseområder. Organiser dem i kategorier for bedre oversikt.
      </p>

      <div className="space-y-4 mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ferdighet
            </label>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
              placeholder="F.eks. JavaScript, Python, Prosjektledelse..."
            />
          </div>
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleAdd} className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Legg til</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => {
          const skillsInCategory = cvData.ferdigheter.filter((s) => s.kategori === cat)
          if (skillsInCategory.length === 0) return null

          return (
            <div key={cat} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">{cat}</h4>
              <div className="flex flex-wrap gap-2">
                {skillsInCategory.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-gray-300 text-sm"
                  >
                    <span>{skill.navn}</span>
                    <button
                      onClick={() => removeSection('ferdigheter', cvData.ferdigheter.indexOf(skill))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FerdigheterSection

