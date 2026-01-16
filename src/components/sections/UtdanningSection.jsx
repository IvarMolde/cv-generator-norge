import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import { GraduationCap, Plus, Trash2, Edit2 } from 'lucide-react'

const UtdanningSection = () => {
  const { cvData, addSection, updateSection, removeSection } = useCV()
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    utdanningsnivå: '',
    skole: '',
    linje: '',
    sted: '',
    startdato: '',
    sluttdato: '',
    pågående: false,
    karakter: '',
  })

  const handleAdd = () => {
    if (formData.utdanningsnivå && formData.skole) {
      addSection('utdanning', { ...formData, id: Date.now() })
      setFormData({
        utdanningsnivå: '',
        skole: '',
        linje: '',
        sted: '',
        startdato: '',
        sluttdato: '',
        pågående: false,
        karakter: '',
      })
    }
  }

  const handleEdit = (index) => {
    setFormData(cvData.utdanning[index])
    setEditingIndex(index)
  }

  const handleUpdate = () => {
    if (editingIndex !== null) {
      updateSection('utdanning', editingIndex, formData)
      setEditingIndex(null)
      setFormData({
        utdanningsnivå: '',
        skole: '',
        linje: '',
        sted: '',
        startdato: '',
        sluttdato: '',
        pågående: false,
        karakter: '',
      })
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setFormData({
      utdanningsnivå: '',
      skole: '',
      linje: '',
      sted: '',
      startdato: '',
      sluttdato: '',
      pågående: false,
      karakter: '',
    })
  }

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Utdanning</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Legg til din utdanning, fra høyeste til laveste nivå.
      </p>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Utdanningsnivå *
            </label>
            <select
              value={formData.utdanningsnivå}
              onChange={(e) => setFormData({ ...formData, utdanningsnivå: e.target.value })}
              className="input-field"
            >
              <option value="">Velg nivå</option>
              <option value="Grunnskole">Grunnskole</option>
              <option value="Videregående">Videregående</option>
              <option value="Fagskole">Fagskole</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="Doktorgrad">Doktorgrad</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skole/Universitet *
            </label>
            <input
              type="text"
              value={formData.skole}
              onChange={(e) => setFormData({ ...formData, skole: e.target.value })}
              className="input-field"
              placeholder="Universitetet i Oslo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Linje/Studieprogram
            </label>
            <input
              type="text"
              value={formData.linje}
              onChange={(e) => setFormData({ ...formData, linje: e.target.value })}
              className="input-field"
              placeholder="Informatikk"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sted
            </label>
            <input
              type="text"
              value={formData.sted}
              onChange={(e) => setFormData({ ...formData, sted: e.target.value })}
              className="input-field"
              placeholder="Oslo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Startdato
            </label>
            <input
              type="month"
              value={formData.startdato}
              onChange={(e) => setFormData({ ...formData, startdato: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sluttdato
            </label>
            <input
              type="month"
              value={formData.sluttdato}
              onChange={(e) => setFormData({ ...formData, sluttdato: e.target.value })}
              className="input-field"
              disabled={formData.pågående}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pågående-utdanning"
              checked={formData.pågående}
              onChange={(e) => setFormData({ ...formData, pågående: e.target.checked, sluttdato: '' })}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="pågående-utdanning" className="ml-2 text-sm text-gray-700">
              Pågående utdanning
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Karakter (valgfritt)
            </label>
            <input
              type="text"
              value={formData.karakter}
              onChange={(e) => setFormData({ ...formData, karakter: e.target.value })}
              className="input-field"
              placeholder="B eller 4.5"
            />
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

      <div className="space-y-3">
        {cvData.utdanning.map((utd, index) => (
          <div key={utd.id || index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{utd.utdanningsnivå}</h4>
                {utd.linje && <p className="text-sm text-gray-600">{utd.linje}</p>}
                <p className="text-sm text-gray-600">{utd.skole}</p>
                {utd.sted && <p className="text-sm text-gray-500">{utd.sted}</p>}
                <p className="text-sm text-gray-500">
                  {utd.startdato} - {utd.pågående ? 'Nåværende' : utd.sluttdato || 'N/A'}
                </p>
                {utd.karakter && <p className="text-sm text-gray-600 mt-1">Karakter: {utd.karakter}</p>}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSection('utdanning', index)}
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

export default UtdanningSection

