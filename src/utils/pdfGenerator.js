import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const generatePDF = async (cvData) => {
  try {
    // Create a temporary preview element
    const previewElement = document.getElementById('cv-preview')
    
    if (!previewElement) {
      // If preview doesn't exist, create it temporarily
      const tempDiv = document.createElement('div')
      tempDiv.id = 'cv-preview-temp'
      tempDiv.style.width = '210mm'
      tempDiv.style.padding = '20mm'
      tempDiv.style.backgroundColor = 'white'
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      document.body.appendChild(tempDiv)
      
      // Generate HTML content
      const html = generateCVHTML(cvData)
      tempDiv.innerHTML = html
      
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Generate PDF
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      // Clean up
      document.body.removeChild(tempDiv)
      
      // Save PDF
      const fileName = `${cvData.personalInfo.fornavn || 'CV'}_${cvData.personalInfo.etternavn || 'CV'}_${new Date().getFullYear()}.pdf`
      pdf.save(fileName)
    } else {
      // Use existing preview
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      const fileName = `${cvData.personalInfo.fornavn || 'CV'}_${cvData.personalInfo.etternavn || 'CV'}_${new Date().getFullYear()}.pdf`
      pdf.save(fileName)
    }
  } catch (error) {
    console.error('Feil ved generering av PDF:', error)
    alert('Kunne ikke generere PDF. Prøv igjen.')
  }
}

const generateCVHTML = (cvData) => {
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString + '-01')
    return date.toLocaleDateString('no-NO', { year: 'numeric', month: 'long' })
  }

  return `
    <div style="font-family: Arial, sans-serif; color: #1f2937;">
      <!-- Header -->
      <div style="border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 8px; color: #111827;">
          ${cvData.personalInfo.fornavn || ''} ${cvData.personalInfo.etternavn || ''}
        </h1>
        <div style="font-size: 14px; color: #4b5563;">
          ${cvData.personalInfo.telefon ? `📞 ${cvData.personalInfo.telefon} | ` : ''}
          ${cvData.personalInfo.epost ? `✉️ ${cvData.personalInfo.epost} | ` : ''}
          ${cvData.personalInfo.adresse ? `📍 ${cvData.personalInfo.adresse}${cvData.personalInfo.postnummer ? `, ${cvData.personalInfo.postnummer}` : ''}${cvData.personalInfo.sted ? ` ${cvData.personalInfo.sted}` : ''}` : ''}
        </div>
      </div>

      ${cvData.arbeidserfaring.length > 0 ? `
        <section style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">
            Arbeidserfaring
          </h2>
          ${cvData.arbeidserfaring.map(erfaring => `
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <div>
                  <h3 style="font-weight: 600; color: #111827;">${erfaring.stilling}</h3>
                  <p style="color: #374151;">${erfaring.arbeidsgiver}</p>
                  ${erfaring.sted ? `<p style="font-size: 14px; color: #6b7280;">${erfaring.sted}</p>` : ''}
                </div>
                <span style="font-size: 14px; color: #6b7280; white-space: nowrap;">
                  ${formatDate(erfaring.startdato)} - ${erfaring.pågående ? 'Nåværende' : formatDate(erfaring.sluttdato) || 'N/A'}
                </span>
              </div>
              ${erfaring.beskrivelse ? `<p style="font-size: 14px; color: #374151; margin-top: 8px;">${erfaring.beskrivelse}</p>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${cvData.utdanning.length > 0 ? `
        <section style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">
            Utdanning
          </h2>
          ${cvData.utdanning.map(utd => `
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <div>
                  <h3 style="font-weight: 600; color: #111827;">${utd.utdanningsnivå}</h3>
                  ${utd.linje ? `<p style="color: #374151;">${utd.linje}</p>` : ''}
                  <p style="color: #374151;">${utd.skole}</p>
                  ${utd.sted ? `<p style="font-size: 14px; color: #6b7280;">${utd.sted}</p>` : ''}
                </div>
                <span style="font-size: 14px; color: #6b7280; white-space: nowrap;">
                  ${formatDate(utd.startdato)} - ${utd.pågående ? 'Nåværende' : formatDate(utd.sluttdato) || 'N/A'}
                </span>
              </div>
              ${utd.karakter ? `<p style="font-size: 14px; color: #374151; margin-top: 4px;">Karakter: ${utd.karakter}</p>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${cvData.ferdigheter.length > 0 ? `
        <section style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">
            Ferdigheter
          </h2>
          ${['Teknisk', 'Språk', 'Programvare', 'Ledelse', 'Annet'].map(kategori => {
            const skills = cvData.ferdigheter.filter(s => s.kategori === kategori)
            if (skills.length === 0) return ''
            return `
              <div style="margin-bottom: 12px;">
                <h3 style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${kategori}</h3>
                <p style="font-size: 14px; color: #374151;">${skills.map(s => s.navn).join(', ')}</p>
              </div>
            `
          }).join('')}
        </section>
      ` : ''}

      ${cvData.språk.length > 0 ? `
        <section style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">
            Språk
          </h2>
          ${cvData.språk.map(språk => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: 500; color: #1f2937;">${språk.språk}</span>
              <span style="font-size: 14px; color: #6b7280;">${språk.nivå}</span>
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${cvData.sertifikater.length > 0 ? `
        <section style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">
            Sertifikater
          </h2>
          ${cvData.sertifikater.map(sertifikat => `
            <div style="margin-bottom: 12px;">
              <h3 style="font-weight: 600; color: #111827;">${sertifikat.navn}</h3>
              ${sertifikat.utsteder ? `<p style="font-size: 14px; color: #374151;">${sertifikat.utsteder}</p>` : ''}
              <p style="font-size: 14px; color: #6b7280;">
                ${formatDate(sertifikat.dato)}
                ${sertifikat.utløper ? ` - Utløper: ${formatDate(sertifikat.utløper)}` : ''}
              </p>
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${cvData.prosjekter.length > 0 ? `
        <section style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">
            Prosjekter
          </h2>
          ${cvData.prosjekter.map(prosjekt => `
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <div>
                  <h3 style="font-weight: 600; color: #111827;">${prosjekt.navn}</h3>
                  ${prosjekt.teknologi ? `<p style="font-size: 14px; color: #6b7280;">Teknologi: ${prosjekt.teknologi}</p>` : ''}
                </div>
                ${prosjekt.dato ? `<span style="font-size: 14px; color: #6b7280; white-space: nowrap;">${formatDate(prosjekt.dato)}</span>` : ''}
              </div>
              ${prosjekt.beskrivelse ? `<p style="font-size: 14px; color: #374151; margin-top: 8px;">${prosjekt.beskrivelse}</p>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${cvData.frivilligArbeid.length > 0 ? `
        <section style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">
            Frivillig arbeid
          </h2>
          ${cvData.frivilligArbeid.map(arbeid => `
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <div>
                  <h3 style="font-weight: 600; color: #111827;">${arbeid.rolle}</h3>
                  <p style="color: #374151;">${arbeid.organisasjon}</p>
                </div>
                <span style="font-size: 14px; color: #6b7280; white-space: nowrap;">
                  ${formatDate(arbeid.startdato)} - ${arbeid.pågående ? 'Nåværende' : formatDate(arbeid.sluttdato) || 'N/A'}
                </span>
              </div>
              ${arbeid.beskrivelse ? `<p style="font-size: 14px; color: #374151; margin-top: 8px;">${arbeid.beskrivelse}</p>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}
    </div>
  `
}

