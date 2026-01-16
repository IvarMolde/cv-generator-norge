import { useCV } from '../context/CVContext'
import { Download } from 'lucide-react'
import { generatePDF } from '../utils/pdfGenerator'

const CVPreview = () => {
  const { cvData } = useCV()

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString + '-01')
    return date.toLocaleDateString('no-NO', { year: 'numeric', month: 'long' })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Forhåndsvisning av CV</h2>
          <button
            onClick={() => generatePDF(cvData)}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Last ned PDF</span>
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Dette er en forhåndsvisning av hvordan CV-en din vil se ut. Bruk "Last ned PDF" for å generere den endelige versjonen.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8" id="cv-preview">
        {/* Header */}
        <div className="border-b-2 border-primary-600 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {cvData.personalInfo.fornavn} {cvData.personalInfo.etternavn}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {cvData.personalInfo.telefon && <span>📞 {cvData.personalInfo.telefon}</span>}
            {cvData.personalInfo.epost && <span>✉️ {cvData.personalInfo.epost}</span>}
            {cvData.personalInfo.adresse && (
              <span>
                📍 {cvData.personalInfo.adresse}
                {cvData.personalInfo.postnummer && `, ${cvData.personalInfo.postnummer}`}
                {cvData.personalInfo.sted && ` ${cvData.personalInfo.sted}`}
              </span>
            )}
            {cvData.personalInfo.linkedin && (
              <a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                LinkedIn
              </a>
            )}
            {cvData.personalInfo.github && (
              <a href={cvData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Arbeidserfaring */}
        {cvData.arbeidserfaring.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Arbeidserfaring
            </h2>
            {cvData.arbeidserfaring.map((erfaring, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{erfaring.stilling}</h3>
                    <p className="text-gray-700">{erfaring.arbeidsgiver}</p>
                    {erfaring.sted && <p className="text-sm text-gray-600">{erfaring.sted}</p>}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(erfaring.startdato)} - {erfaring.pågående ? 'Nåværende' : formatDate(erfaring.sluttdato) || 'N/A'}
                  </span>
                </div>
                {erfaring.beskrivelse && (
                  <p className="text-sm text-gray-700 mt-2">{erfaring.beskrivelse}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Utdanning */}
        {cvData.utdanning.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Utdanning
            </h2>
            {cvData.utdanning.map((utd, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{utd.utdanningsnivå}</h3>
                    {utd.linje && <p className="text-gray-700">{utd.linje}</p>}
                    <p className="text-gray-700">{utd.skole}</p>
                    {utd.sted && <p className="text-sm text-gray-600">{utd.sted}</p>}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(utd.startdato)} - {utd.pågående ? 'Nåværende' : formatDate(utd.sluttdato) || 'N/A'}
                  </span>
                </div>
                {utd.karakter && (
                  <p className="text-sm text-gray-700 mt-1">Karakter: {utd.karakter}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Ferdigheter */}
        {cvData.ferdigheter.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Ferdigheter
            </h2>
            <div className="space-y-3">
              {['Teknisk', 'Språk', 'Programvare', 'Ledelse', 'Annet'].map((kategori) => {
                const skills = cvData.ferdigheter.filter((s) => s.kategori === kategori)
                if (skills.length === 0) return null
                return (
                  <div key={kategori}>
                    <h3 className="font-semibold text-gray-800 mb-1">{kategori}</h3>
                    <p className="text-sm text-gray-700">
                      {skills.map((s) => s.navn).join(', ')}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Språk */}
        {cvData.språk.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Språk
            </h2>
            <div className="space-y-1">
              {cvData.språk.map((språk, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium text-gray-800">{språk.språk}</span>
                  <span className="text-sm text-gray-600">{språk.nivå}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sertifikater */}
        {cvData.sertifikater.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Sertifikater
            </h2>
            {cvData.sertifikater.map((sertifikat, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-gray-900">{sertifikat.navn}</h3>
                {sertifikat.utsteder && <p className="text-sm text-gray-700">{sertifikat.utsteder}</p>}
                <p className="text-sm text-gray-600">
                  {formatDate(sertifikat.dato)}
                  {sertifikat.utløper && ` - Utløper: ${formatDate(sertifikat.utløper)}`}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Prosjekter */}
        {cvData.prosjekter.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Prosjekter
            </h2>
            {cvData.prosjekter.map((prosjekt, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{prosjekt.navn}</h3>
                    {prosjekt.teknologi && (
                      <p className="text-sm text-gray-600">Teknologi: {prosjekt.teknologi}</p>
                    )}
                  </div>
                  {prosjekt.dato && (
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {formatDate(prosjekt.dato)}
                    </span>
                  )}
                </div>
                {prosjekt.beskrivelse && (
                  <p className="text-sm text-gray-700 mt-2">{prosjekt.beskrivelse}</p>
                )}
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
            ))}
          </section>
        )}

        {/* Frivillig arbeid */}
        {cvData.frivilligArbeid.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Frivillig arbeid
            </h2>
            {cvData.frivilligArbeid.map((arbeid, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{arbeid.rolle}</h3>
                    <p className="text-gray-700">{arbeid.organisasjon}</p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(arbeid.startdato)} - {arbeid.pågående ? 'Nåværende' : formatDate(arbeid.sluttdato) || 'N/A'}
                  </span>
                </div>
                {arbeid.beskrivelse && (
                  <p className="text-sm text-gray-700 mt-2">{arbeid.beskrivelse}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default CVPreview

