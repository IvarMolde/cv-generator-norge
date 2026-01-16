import { createContext, useContext, useState } from 'react'

const CVContext = createContext()

export const useCV = () => {
  const context = useContext(CVContext)
  if (!context) {
    throw new Error('useCV must be used within CVProvider')
  }
  return context
}

export const CVProvider = ({ children }) => {
  const [cvData, setCvData] = useState({
    personalInfo: {
      fornavn: '',
      etternavn: '',
      telefon: '',
      epost: '',
      adresse: '',
      postnummer: '',
      sted: '',
      fodselsdato: '',
      nasjonalitet: 'Norsk',
      linkedin: '',
      github: '',
      nettsted: '',
    },
    arbeidserfaring: [],
    utdanning: [],
    ferdigheter: [],
    språk: [],
    sertifikater: [],
    prosjekter: [],
    frivilligArbeid: [],
    andreErfaringer: [],
    aktivSections: [
      'personalInfo',
      'arbeidserfaring',
      'utdanning',
      'ferdigheter',
      'språk',
    ],
  })

  const updatePersonalInfo = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const addSection = (sectionType, data) => {
    setCvData((prev) => ({
      ...prev,
      [sectionType]: [...prev[sectionType], data],
    }))
  }

  const updateSection = (sectionType, index, data) => {
    setCvData((prev) => ({
      ...prev,
      [sectionType]: prev[sectionType].map((item, i) =>
        i === index ? { ...item, ...data } : item
      ),
    }))
  }

  const removeSection = (sectionType, index) => {
    setCvData((prev) => ({
      ...prev,
      [sectionType]: prev[sectionType].filter((_, i) => i !== index),
    }))
  }

  const toggleSection = (sectionType) => {
    setCvData((prev) => ({
      ...prev,
      aktivSections: prev.aktivSections.includes(sectionType)
        ? prev.aktivSections.filter((s) => s !== sectionType)
        : [...prev.aktivSections, sectionType],
    }))
  }

  const loadCVData = (data) => {
    setCvData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <CVContext.Provider
      value={{
        cvData,
        updatePersonalInfo,
        addSection,
        updateSection,
        removeSection,
        toggleSection,
        loadCVData,
      }}
    >
      {children}
    </CVContext.Provider>
  )
}

