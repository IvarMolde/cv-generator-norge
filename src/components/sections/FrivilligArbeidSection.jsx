import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import { Heart, Plus, Trash2, Edit2 } from 'lucide-react'

const FrivilligArbeidSection = () => {
  const { cvData, addSection, updateSection, removeSection } = useCV()
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    organisasjon: '',
    rolle: '',
    beskrivelse: '',
    startdato: '',
    sluttdato: '',
    pågående: false,
  })

  const handleAdd = () => {
    if (formData.organisasjon && formData.rolle) {
      addSection('frivilligArbeid', { ...formData, id: Date.now() })
      setFormData({
        organisasjon: '',
        rolle: '',
        beskrivelse: '',
        startdato: '',
        sluttdato: '',
        pågående: false,
      })
    }
  }

  const handleEdit = (index) => {
    setFormData(cvData.frivilligArbeid[index])
    setEditingIndex(index)
  }

  const handleUpdate = () => {
    if (editingIndex !== null) {
      updateSection('frivilligArbeid', editingIndex, formData)
      setEditingIndex(null)
      setFormData({
        organisasjon: '',
        rolle: '',
        beskrivelse: '',
        startdato: '',
        sluttdato: '',
        pågående: false,
      })
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setFormData({
      organisasjon: '',
      rolle: '',
      beskrivelse: '',
      startdato: '',
      sluttdato: '',
      pågående: false,
    })
  }

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Frivillig arbeid</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Legg til frivillig arbeid og engasjement som viser dine interesser og verdier.
      </p>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organisasjon *
            </label>
            <input
              type="text"
              value={formData.organisasjon}
              onChange={(e) => setFormData({ ...formData, organisasjon: e.target.value })}
              className="input-field"
              placeholder="F.eks. Røde Kors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rolle *
            </label>
            <input
              type="text"
              value={formData.rolle}
              onChange={(e) => setFormData({ ...formData, rolle: e.target.value })}
              className="input-field"
              placeholder="F.eks. Frivillig koordinator"
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
              id="pågående-frivillig"
              checked={formData.pågående}
              onChange={(e) => setFormData({ ...formData, pågående: e.target.checked, sluttdato: '' })}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="pågående-frivillig" className="ml-2 text-sm text-gray-700">
              Pågående engasjement
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
            placeholder="Beskriv ditt engasjement..."
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
        {cvData.frivilligArbeid.map((arbeid, index) => (
          <div key={arbeid.id || index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{arbeid.rolle}</h4>
                <p className="text-sm text-gray-600">{arbeid.organisasjon}</p>
                <p className="text-sm text-gray-500">
                  {arbeid.startdato} - {arbeid.pågående ? 'Nåværende' : arbeid.sluttdato || 'N/A'}
                </p>
                {arbeid.beskrivelse && (
                  <p className="text-sm text-gray-700 mt-2">{arbeid.beskrivelse}</p>
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
                  onClick={() => removeSection('frivilligArbeid', index)}
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

export default FrivilligArbeidSection

