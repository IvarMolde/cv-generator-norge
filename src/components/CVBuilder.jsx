import { useState } from 'react'
import { Upload, Download, Info } from 'lucide-react'
import { useCV } from '../context/CVContext'
import PersonalInfoSection from './sections/PersonalInfoSection'
import ArbeidserfaringSection from './sections/ArbeidserfaringSection'
import UtdanningSection from './sections/UtdanningSection'
import FerdigheterSection from './sections/FerdigheterSection'
import SpråkSection from './sections/SpråkSection'
import SertifikaterSection from './sections/SertifikaterSection'
import ProsjekterSection from './sections/ProsjekterSection'
import FrivilligArbeidSection from './sections/FrivilligArbeidSection'
import { generatePDF } from '../utils/pdfGenerator'
import { parsePDF } from '../utils/pdfParser'

const CVBuilder = () => {
  const { cvData, loadCVData } = useCV()
  const [uploadStatus, setUploadStatus] = useState('')

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setUploadStatus('Kun PDF-filer er støttet')
      setTimeout(() => setUploadStatus(''), 3000)
      return
    }

    try {
      setUploadStatus('Laster opp og analyserer CV...')
      const parsedData = await parsePDF(file)
      loadCVData(parsedData)
      setUploadStatus('CV lastet opp og analysert!')
      setTimeout(() => setUploadStatus(''), 3000)
    } catch (error) {
      console.error('Feil ved opplasting:', error)
      setUploadStatus('Kunne ikke laste opp CV. Prøv igjen.')
      setTimeout(() => setUploadStatus(''), 3000)
    }
  }

  const handleGeneratePDF = () => {
    generatePDF(cvData)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Bygg din CV
          </h2>
          <div className="flex items-center space-x-4">
            <label className="btn-secondary cursor-pointer flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Last opp CV</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={handleGeneratePDF}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Generer PDF</span>
            </button>
          </div>
        </div>
        {uploadStatus && (
          <div
            className={`p-3 rounded-lg mb-4 ${
              uploadStatus.includes('feil') || uploadStatus.includes('Kunne ikke')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {uploadStatus}
          </div>
        )}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Tips for å lage en god CV:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Fyll ut alle relevante felt for din situasjon</li>
                <li>Hold informasjonen oppdatert og nøyaktig</li>
                <li>Du kan laste opp en eksisterende CV for å fylle ut feltene automatisk</li>
                <li>Bruk "Forhåndsvisning"-fanen for å se hvordan CV-en ser ut</li>
                <li>Du kan legge til eller fjerne seksjoner etter behov</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PersonalInfoSection />
      <ArbeidserfaringSection />
      <UtdanningSection />
      <FerdigheterSection />
      <SpråkSection />
      <SertifikaterSection />
      <ProsjekterSection />
      <FrivilligArbeidSection />
    </div>
  )
}

export default CVBuilder

