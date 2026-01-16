import * as pdfjsLib from 'pdfjs-dist'

// Set worker source - using CDN for reliability
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

export const parsePDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
    const pdf = await loadingTask.promise
    
    // Extract text from all pages
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      text += pageText + '\n'
    }
    
    // Parse the text and extract information
    const parsedData = {
      personalInfo: {},
      arbeidserfaring: [],
      utdanning: [],
      ferdigheter: [],
      språk: [],
      sertifikater: [],
      prosjekter: [],
      frivilligArbeid: [],
    }
    
    // Extract email
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
    if (emailMatch) {
      parsedData.personalInfo.epost = emailMatch[0]
    }
    
    // Extract phone number (Norwegian format)
    const phoneMatch = text.match(/(?:\+47|0047)?\s?\d{2,3}\s?\d{2,3}\s?\d{2,3}/)
    if (phoneMatch) {
      parsedData.personalInfo.telefon = phoneMatch[0].trim()
    }
    
    // Extract LinkedIn
    const linkedInMatch = text.match(/linkedin\.com\/in\/[\w-]+/i)
    if (linkedInMatch) {
      parsedData.personalInfo.linkedin = `https://www.${linkedInMatch[0]}`
    }
    
    // Extract GitHub
    const githubMatch = text.match(/github\.com\/[\w-]+/i)
    if (githubMatch) {
      parsedData.personalInfo.github = `https://www.${githubMatch[0]}`
    }
    
    // Try to extract name (first line or before email)
    const lines = text.split('\n').filter(line => line.trim().length > 0)
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      if (firstLine && !firstLine.includes('@') && firstLine.length < 50) {
        const nameParts = firstLine.split(/\s+/)
        if (nameParts.length >= 2) {
          parsedData.personalInfo.fornavn = nameParts[0]
          parsedData.personalInfo.etternavn = nameParts.slice(1).join(' ')
        } else {
          parsedData.personalInfo.fornavn = firstLine
        }
      }
    }
    
    // Extract work experience (look for common patterns)
    const workSection = extractSection(text, ['Arbeidserfaring', 'Erfaring', 'Yrkeserfaring', 'Work Experience'])
    if (workSection) {
      const experiences = parseWorkExperience(workSection)
      parsedData.arbeidserfaring = experiences
    }
    
    // Extract education
    const educationSection = extractSection(text, ['Utdanning', 'Education', 'Utdanning og kurs'])
    if (educationSection) {
      const educations = parseEducation(educationSection)
      parsedData.utdanning = educations
    }
    
    // Extract skills
    const skillsSection = extractSection(text, ['Ferdigheter', 'Kompetanse', 'Skills', 'Ferdigheter og kompetanse'])
    if (skillsSection) {
      const skills = parseSkills(skillsSection)
      parsedData.ferdigheter = skills
    }
    
    // Extract languages
    const languagesSection = extractSection(text, ['Språk', 'Languages', 'Språkkunnskap'])
    if (languagesSection) {
      const languages = parseLanguages(languagesSection)
      parsedData.språk = languages
    }
    
    return parsedData
  } catch (error) {
    console.error('Error parsing PDF:', error)
    throw new Error('Kunne ikke parse PDF-filen. Sørg for at filen er en gyldig PDF.')
  }
}

const extractSection = (text, keywords) => {
  for (const keyword of keywords) {
    const regex = new RegExp(`${keyword}[\\s\\S]*?(?=\\n\\n[A-ZÆØÅ]|$)`, 'i')
    const match = text.match(regex)
    if (match) {
      return match[0]
    }
  }
  return null
}

const parseWorkExperience = (section) => {
  const experiences = []
  const lines = section.split('\n').filter(line => line.trim().length > 0)
  
  let currentExp = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Look for job title patterns
    if (line.length > 0 && line.length < 100 && !line.match(/^\d{4}/)) {
      if (currentExp) {
        experiences.push(currentExp)
      }
      currentExp = {
        stilling: line,
        arbeidsgiver: '',
        sted: '',
        startdato: '',
        sluttdato: '',
        pågående: false,
        beskrivelse: '',
      }
    } else if (currentExp && line.match(/^\d{4}/)) {
      // Date line
      const dateMatch = line.match(/(\d{4})\s*[-–]\s*(\d{4}|Nå|Nåværende|Present)/i)
      if (dateMatch) {
        currentExp.startdato = dateMatch[1] + '-01'
        if (dateMatch[2].match(/Nå|Nåværende|Present/i)) {
          currentExp.pågående = true
        } else {
          currentExp.sluttdato = dateMatch[2] + '-12'
        }
      }
    } else if (currentExp && !currentExp.arbeidsgiver && line.length < 100) {
      currentExp.arbeidsgiver = line
    } else if (currentExp) {
      currentExp.beskrivelse += (currentExp.beskrivelse ? ' ' : '') + line
    }
  }
  
  if (currentExp) {
    experiences.push(currentExp)
  }
  
  return experiences
}

const parseEducation = (section) => {
  const educations = []
  const lines = section.split('\n').filter(line => line.trim().length > 0)
  
  let currentEdu = null
  for (const line of lines) {
    const trimmed = line.trim()
    
    if (trimmed.match(/Bachelor|Master|PhD|Doktorgrad|Videregående|Grunnskole/i)) {
      if (currentEdu) {
        educations.push(currentEdu)
      }
      currentEdu = {
        utdanningsnivå: trimmed,
        skole: '',
        linje: '',
        sted: '',
        startdato: '',
        sluttdato: '',
        pågående: false,
        karakter: '',
      }
    } else if (currentEdu && !currentEdu.skole && trimmed.length < 100) {
      currentEdu.skole = trimmed
    }
  }
  
  if (currentEdu) {
    educations.push(currentEdu)
  }
  
  return educations
}

const parseSkills = (section) => {
  const skills = []
  const lines = section.split('\n').filter(line => line.trim().length > 0)
  
  for (const line of lines) {
    // Remove common prefixes
    const cleaned = line.replace(/^[-•*]\s*/, '').trim()
    
    // Split by common delimiters
    const items = cleaned.split(/[,;|]/).map(item => item.trim()).filter(item => item.length > 0)
    
    for (const item of items) {
      if (item.length > 1 && item.length < 50) {
        skills.push({
          navn: item,
          kategori: 'Teknisk',
          id: Date.now() + Math.random(),
        })
      }
    }
  }
  
  return skills
}

const parseLanguages = (section) => {
  const languages = []
  const lines = section.split('\n').filter(line => line.trim().length > 0)
  
  for (const line of lines) {
    const cleaned = line.replace(/^[-•*]\s*/, '').trim()
    
    // Look for language: level pattern
    const match = cleaned.match(/([A-ZÆØÅa-zæøå\s]+)[:–-]\s*([A-ZÆØÅa-zæøå\s]+)/i)
    if (match) {
      languages.push({
        språk: match[1].trim(),
        nivå: match[2].trim(),
        id: Date.now() + Math.random(),
      })
    } else if (cleaned.length < 50) {
      languages.push({
        språk: cleaned,
        nivå: 'Godt',
        id: Date.now() + Math.random(),
      })
    }
  }
  
  return languages
}

