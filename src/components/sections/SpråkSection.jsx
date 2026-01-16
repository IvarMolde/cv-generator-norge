import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import { Languages, Plus, Trash2, Edit2 } from 'lucide-react'

const SpråkSection = () => {
  const { cvData, addSection, updateSection, removeSection } = useCV()
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    språk: '',
    nivå: 'Morsmål',
  })

  const nivåer = ['Morsmål', 'Flytende', 'Svært godt', 'Godt', 'Grunnleggende']

  const handleAdd = () => {
    if (formData.språk) {
      addSection('språk', { ...formData, id: Date.now() })
      setFormData({ språk: '', nivå: 'Morsmål' })
    }
  }

  const handleEdit = (index) => {
    setFormData(cvData.språk[index])
    setEditingIndex(index)
  }

  const handleUpdate = () => {
    if (editingIndex !== null) {
      updateSection('språk', editingIndex, formData)
      setEditingIndex(null)
      setFormData({ språk: '', nivå: 'Morsmål' })
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setFormData({ språk: '', nivå: 'Morsmål' })
  }

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Languages className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Språk</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Legg til språk du behersker og ditt nivå i hvert språk.
      </p>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Språk *
            </label>
            <input
              type="text"
              value={formData.språk}
              onChange={(e) => setFormData({ ...formData, språk: e.target.value })}
              className="input-field"
              placeholder="F.eks. Norsk, Engelsk, Tysk..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nivå *
            </label>
            <select
              value={formData.nivå}
              onChange={(e) => setFormData({ ...formData, nivå: e.target.value })}
              className="input-field"
            >
              {nivåer.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          {editingIndex === null ? (
            <button onClick={handleAdd} className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Legg til</span>
            </button>
          ) : (
            <>
              <button onClick={handleUpdate} className="btn-primary">
                Oppdater
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Avbryt
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {cvData.språk.map((språk, index) => (
          <div key={språk.id || index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900">{språk.språk}</span>
                <span className="text-sm text-gray-600 ml-2">- {språk.nivå}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSection('språk', index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpråkSection

