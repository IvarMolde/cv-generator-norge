# Rask startguide

## Installasjon

1. **Installer Node.js** (versjon 18 eller nyere) hvis du ikke allerede har det
   - Last ned fra: https://nodejs.org/

2. **Installer avhengigheter**
   ```bash
   npm install
   ```

3. **Start utviklingsserveren**
   ```bash
   npm run dev
   ```

4. **Åpne i nettleseren**
   - Programmet åpnes automatisk på http://localhost:3000
   - Hvis ikke, åpne nettleseren manuelt og gå til denne adressen

## Hvordan bruke programmet

### 1. Fyll ut personlig informasjon
- Start med å fylle ut navn, kontaktinformasjon og andre personlige detaljer
- Alle felt med * er påkrevd

### 2. Legg til arbeidserfaring
- Klikk på "Legg til" for å legge til en ny stilling
- Fyll ut stilling, arbeidsgiver, datoer og beskrivelse
- Du kan redigere eller slette eksisterende erfaringer

### 3. Legg til utdanning
- Legg til din utdanning fra høyeste til laveste nivå
- Inkluder skole, linje/studieprogram og karakterer hvis relevant

### 4. Legg til ferdigheter
- Skriv inn ferdigheter og velg kategori
- Trykk Enter eller klikk "Legg til" for å legge dem til

### 5. Legg til andre seksjoner
- Språk, sertifikater, prosjekter og frivillig arbeid kan legges til etter behov

### 6. Forhåndsvisning
- Gå til "Forhåndsvisning"-fanen for å se hvordan CV-en ser ut
- Sjekk at alt ser bra ut før du genererer PDF

### 7. Generer PDF
- Klikk på "Generer PDF" eller "Last ned PDF"
- PDF-en lastes ned automatisk til din nedlastningsmappe

## Last opp eksisterende CV

1. Klikk på "Last opp CV"-knappen
2. Velg en PDF-fil fra din datamaskin
3. Programmet prøver å fylle ut feltene automatisk
4. Gå gjennom og verifiser at informasjonen er korrekt
5. Rediger eller legg til informasjon som mangler

## Tips

- **Bruk forhåndsvisning**: Sjekk alltid forhåndsvisningen før du genererer PDF
- **Fyll ut alle relevante felt**: Jo mer informasjon, jo bedre CV
- **Hold det oppdatert**: Oppdater CV-en din regelmessig
- **Tilpass til stillingen**: Du kan enkelt redigere CV-en for å tilpasse den til spesifikke stillinger

## Feilsøking

### Programmet starter ikke
- Sjekk at du har installert alle avhengigheter: `npm install`
- Sjekk at port 3000 ikke er opptatt
- Prøv å kjøre `npm run dev` igjen

### PDF-generering fungerer ikke
- Sjekk at du har fylt ut minst personlig informasjon
- Prøv å oppdatere nettleseren
- Sjekk konsollen for feilmeldinger (F12 i nettleseren)

### PDF-opplasting fungerer ikke
- Sørg for at filen er en gyldig PDF
- Prøv med en annen PDF-fil
- Noen PDF-er kan være vanskelige å parse automatisk - du kan alltid fylle ut manuelt

## Støtte

Hvis du opplever problemer eller har spørsmål, sjekk README.md for mer informasjon.

