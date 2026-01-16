import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import { FolderKanban, Plus, Trash2, Edit2 } from 'lucide-react'

const ProsjekterSection = () => {
  const { cvData, addSection, updateSection, removeSection } = useCV()
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    navn: '',
    beskrivelse: '',
    teknologi: '',
    link: '',
    dato: '',
  })

  const handleAdd = () => {
    if (formData.navn) {
      addSection('prosjekter', { ...formData, id: Date.now() })
      setFormData({ navn: '', beskrivelse: '', teknologi: '', link: '', dato: '' })
    }
  }

  const handleEdit = (index) => {
    setFormData(cvData.prosjekter[index])
    setEditingIndex(index)
  }

  const handleUpdate = () => {
    if (editingIndex !== null) {
      updateSection('prosjekter', editingIndex, formData)
      setEditingIndex(null)
      setFormData({ navn: '', beskrivelse: '', teknologi: '', link: '', dato: '' })
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setFormData({ navn: '', beskrivelse: '', teknologi: '', link: '', dato: '' })
  }

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FolderKanban className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Prosjekter</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Legg til relevante prosjekter som viser dine ferdigheter og erfaring.
      </p>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prosjektnavn *
            </label>
            <input
              type="text"
              value={formData.navn}
              onChange={(e) => setFormData({ ...formData, navn: e.target.value })}
              className="input-field"
              placeholder="F.eks. E-handelsplattform"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dato
            </label>
            <input
              type="month"
              value={formData.dato}
              onChange={(e) => setFormData({ ...formData, dato: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teknologi
            </label>
            <input
              type="text"
              value={formData.teknologi}
              onChange={(e) => setFormData({ ...formData, teknologi: e.target.value })}
              className="input-field"
              placeholder="F.eks. React, Node.js, MongoDB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link (valgfritt)
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="input-field"
              placeholder="https://github.com/..."
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beskrivelse
          </label>
          <textarea
            value={formData.beskrivelse}
            onChange={(e) => setFormData({ ...formData, beskrivelse: e.target.value })}
            className="input-field"
            rows="3"
            placeholder="Beskriv prosjektet og din rolle..."
          />
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

      <div className="space-y-3">
        {cvData.prosjekter.map((prosjekt, index) => (
          <div key={prosjekt.id || index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{prosjekt.navn}</h4>
                {prosjekt.dato && <p className="text-sm text-gray-500">{prosjekt.dato}</p>}
                {prosjekt.teknologi && <p className="text-sm text-gray-600 mt-1">Teknologi: {prosjekt.teknologi}</p>}
                {prosjekt.beskrivelse && <p className="text-sm text-gray-700 mt-2">{prosjekt.beskrivelse}</p>}
                {prosjekt.link && (
                  <a
                    href={prosjekt.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:underline mt-1 inline-block"
                  >
                    Se prosjekt →
                  </a>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSection('prosjekter', index)}
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

export default ProsjekterSection

