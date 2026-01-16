import { useCV } from '../../context/CVContext'
import { User } from 'lucide-react'

const PersonalInfoSection = () => {
  const { cvData, updatePersonalInfo } = useCV()

  return (
    <div className="section-card">
      <div className="flex items-center space-x-2 mb-4">
        <User className="w-6 h-6 text-primary-600" />
        <h3 className="text-xl font-semibold text-gray-900">Personlig informasjon</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Fyll ut din personlige informasjon. Dette vil vises øverst på CV-en.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fornavn *
          </label>
          <input
            type="text"
            value={cvData.personalInfo.fornavn}
            onChange={(e) => updatePersonalInfo('fornavn', e.target.value)}
            className="input-field"
            placeholder="Ola"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Etternavn *
          </label>
          <input
            type="text"
            value={cvData.personalInfo.etternavn}
            onChange={(e) => updatePersonalInfo('etternavn', e.target.value)}
            className="input-field"
            placeholder="Nordmann"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon
          </label>
          <input
            type="tel"
            value={cvData.personalInfo.telefon}
            onChange={(e) => updatePersonalInfo('telefon', e.target.value)}
            className="input-field"
            placeholder="+47 123 45 678"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-post *
          </label>
          <input
            type="email"
            value={cvData.personalInfo.epost}
            onChange={(e) => updatePersonalInfo('epost', e.target.value)}
            className="input-field"
            placeholder="ola.nordmann@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <input
            type="text"
            value={cvData.personalInfo.adresse}
            onChange={(e) => updatePersonalInfo('adresse', e.target.value)}
            className="input-field"
            placeholder="Gateadresse 123"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postnummer
          </label>
          <input
            type="text"
            value={cvData.personalInfo.postnummer}
            onChange={(e) => updatePersonalInfo('postnummer', e.target.value)}
            className="input-field"
            placeholder="0001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sted
          </label>
          <input
            type="text"
            value={cvData.personalInfo.sted}
            onChange={(e) => updatePersonalInfo('sted', e.target.value)}
            className="input-field"
            placeholder="Oslo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fødselsdato
          </label>
          <input
            type="date"
            value={cvData.personalInfo.fodselsdato}
            onChange={(e) => updatePersonalInfo('fodselsdato', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            value={cvData.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="input-field"
            placeholder="https://linkedin.com/in/dittnavn"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub
          </label>
          <input
            type="url"
            value={cvData.personalInfo.github}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            className="input-field"
            placeholder="https://github.com/dittnavn"
          />
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoSection

