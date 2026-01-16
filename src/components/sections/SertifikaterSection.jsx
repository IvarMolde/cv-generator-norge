import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import { Award, Plus, Trash2, Edit2 } from 'lucide-react'

const SertifikaterSection = () => {
  const { cvData, addSection, updateSection, removeSection } = useCV()
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    navn: '',
    utsteder: '',
    dato: '',
    utløper: '',
  })

  const handleAdd = () => {
    if (formData.navn) {
      addSection('sertifikater', { ...formData, id: Date.now() })
      setFormData({ navn: '', utsteder: '', dato: '', utløper: '' })
    }
  }

  const handleEdit = (index) => {
    setFormData(cvData.sertifikater[index])
    setEditingIndex(index)
  }

  const handleUpdate = () => {
    if (editingIndex !== null) {
      updateSection('sertifikater', editingIndex, formData)
      setEditingIndex(null)
      setFormData({ navn: '', utsteder: '', dato: '', utløper: '' })
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setFormData({ navn: '', utsteder: '', dato: '', utløper: '' })
  }

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">Sertifikater</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Legg til relevante sertifikater, kurs og kursbevis.
      </p>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Navn på sertifikat *
            </label>
            <input
              type="text"
              value={formData.navn}
              onChange={(e) => setFormData({ ...formData, navn: e.target.value })}
              className="input-field"
              placeholder="F.eks. AWS Certified Solutions Architect"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Utsteder
            </label>
            <input
              type="text"
              value={formData.utsteder}
              onChange={(e) => setFormData({ ...formData, utsteder: e.target.value })}
              className="input-field"
              placeholder="F.eks. Amazon Web Services"
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
              Utløper (valgfritt)
            </label>
            <input
              type="month"
              value={formData.utløper}
              onChange={(e) => setFormData({ ...formData, utløper: e.target.value })}
              className="input-field"
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
        {cvData.sertifikater.map((sertifikat, index) => (
          <div key={sertifikat.id || index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{sertifikat.navn}</h4>
                {sertifikat.utsteder && <p className="text-sm text-gray-600">{sertifikat.utsteder}</p>}
                <p className="text-sm text-gray-500">
                  {sertifikat.dato}
                  {sertifikat.utløper && ` - Utløper: ${sertifikat.utløper}`}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSection('sertifikater', index)}
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

export default SertifikaterSection

