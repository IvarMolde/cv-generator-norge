# CV Generator Norge

Et intuitivt og moderne program for å generere profesjonelle CV-er etter norsk standard.

## Funksjoner

- ✨ **Moderne design** - Ren og profesjonell UI med fokus på brukervennlighet
- 📝 **Komplett CV-bygger** - Alle nødvendige seksjoner for en norsk CV
- 📄 **PDF-generering** - Eksporter CV-en din som høy-kvalitets PDF
- 📤 **Last opp eksisterende CV** - Last opp din gamle CV for å fylle ut feltene automatisk
- ➕ **Legg til/fjern seksjoner** - Tilpass CV-en din med fleksible seksjoner
- 👁️ **Sanntidsforhåndsvisning** - Se hvordan CV-en ser ut mens du redigerer
- 🇳🇴 **Norsk standard** - Følger norske CV-konvensjoner og best practices

## Seksjoner

Programmet støtter følgende seksjoner:

- Personlig informasjon
- Arbeidserfaring
- Utdanning
- Ferdigheter
- Språk
- Sertifikater
- Prosjekter
- Frivillig arbeid

## Installasjon

1. Installer avhengigheter:
```bash
npm install
```

2. Start utviklingsserveren:
```bash
npm run dev
```

3. Åpne nettleseren og gå til `http://localhost:3000`

## Bygge for produksjon

```bash
npm run build
```

## Bruk

1. **Fyll ut informasjon**: Gå gjennom hver seksjon og fyll ut din informasjon
2. **Forhåndsvisning**: Bruk "Forhåndsvisning"-fanen for å se hvordan CV-en ser ut
3. **Last opp CV (valgfritt)**: Hvis du har en eksisterende CV, kan du laste den opp for å fylle ut feltene automatisk
4. **Generer PDF**: Klikk på "Generer PDF" for å laste ned CV-en din som PDF

## Teknologi

- **React** - Frontend-rammeverk
- **Vite** - Build-verktøy
- **Tailwind CSS** - Styling
- **jsPDF** - PDF-generering
- **html2canvas** - Konvertering til bilde for PDF
- **pdf.js** - PDF-parsing for opplasting av eksisterende CV-er

## Lisens

MIT

