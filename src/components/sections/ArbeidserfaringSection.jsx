import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import { Briefcase, Plus, Trash2, Edit2 } from 'lucide-react'

const ArbeidserfaringSection = () => {
  const { cvData, addSection, updateSection, removeSection } = useCV()
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    stilling: '',
    arbeidsgiver: '',
    sted: '',
    startdato: '',
    sluttdato: '',
    pågående: false,
    beskrivelse: '',
  })

  const handleAdd = () => {
    if (formData.stilling && formData.arbeidsgiver) {
      addSection('arbeidserfaring', { ...formData, id: Date.now() })
      setFormData({
        stilling: '',
        arbeidsgiver: '',
        sted: '',
        startdato: '',
        sluttdato: '',
        pågående: false,
        beskrivelse: '',
      })
    }
  }

  const handleEdit = (index) => {
    setFormData(cvData.arbeidserfaring[index])
    setEditingIndex(index)
  }

  const handleUpdate = () => {
    if (editingIndex !== null) {
      updateSection('arbeidserfaring', editingIndex, formData)
      setEditingIndex(null)
      setFormData({
        stilling: '',
        arbeidsgiver: '',
        sted: '',
        startdato: '',
        sluttdato: '',
        pågående: false,
        beskrivelse: '',
      })
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setFormData({
      stilling: '',
      arbeidsgiver: '',
      sted: '',
      startdato: '',
      sluttdato: '',
      pågående: false,
      beskrivelse: '',
    })
  }

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Arbeidserfaring</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Legg til din arbeidserfaring, fra nyeste til eldste. Inkluder relevante stillinger som viser din kompetanse.
      </p>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stilling *
            </label>
            <input
              type="text"
              value={formData.stilling}
              onChange={(e) => setFormData({ ...formData, stilling: e.target.value })}
              className="input-field"
              placeholder="Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arbeidsgiver *
            </label>
            <input
              type="text"
              value={formData.arbeidsgiver}
              onChange={(e) => setFormData({ ...formData, arbeidsgiver: e.target.value })}
              className="input-field"
              placeholder="Bedrift AS"
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
              id="pågående"
              checked={formData.pågående}
              onChange={(e) => setFormData({ ...formData, pågående: e.target.checked, sluttdato: '' })}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="pågående" className="ml-2 text-sm text-gray-700">
              Pågående stilling
            </label>
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
            placeholder="Beskriv dine oppgaver og ansvar..."
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
        {cvData.arbeidserfaring.map((erfaring, index) => (
          <div key={erfaring.id || index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{erfaring.stilling}</h4>
                <p className="text-sm text-gray-600">{erfaring.arbeidsgiver}</p>
                {erfaring.sted && <p className="text-sm text-gray-500">{erfaring.sted}</p>}
                <p className="text-sm text-gray-500">
                  {erfaring.startdato} - {erfaring.pågående ? 'Nåværende' : erfaring.sluttdato || 'N/A'}
                </p>
                {erfaring.beskrivelse && (
                  <p className="text-sm text-gray-700 mt-2">{erfaring.beskrivelse}</p>
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
                  onClick={() => removeSection('arbeidserfaring', index)}
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

export default ArbeidserfaringSection

