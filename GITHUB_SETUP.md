# Instruksjoner for å pushe til GitHub

## Steg 1: Opprett repository på GitHub
1. Gå til https://github.com og logg inn
2. Klikk på "+" (øverst til høyre) → "New repository"
3. Navn: `cv-generator-norge` (eller ditt valg)
4. Beskrivelse: "Profesjonell CV-generator etter norsk standard"
5. Velg Public eller Private
6. **Ikke** huk av for README, .gitignore eller lisens
7. Klikk "Create repository"

## Steg 2: Koble til GitHub

Etter at du har opprettet repositoryet, kjør disse kommandoene:

```bash
# Legg til remote (erstatt DITT-BRUKERNAVN med ditt faktiske GitHub-brukernavn)
git remote add origin https://github.com/DITT-BRUKERNAVN/cv-generator-norge.git

# Push til GitHub
git branch -M main
git push -u origin main
```

## Alternativ: Hvis du allerede har en remote

Hvis du allerede har en remote konfigurert, kan du bare pushe:

```bash
git push -u origin main
```

eller hvis du er på en annen branch:

```bash
git push -u origin norsk-cv-gen-8c1k9
```

## Hvis du får autentiseringsfeil

GitHub krever nå autentisering. Du kan bruke:

1. **Personal Access Token (anbefalt)**:
   - Gå til GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generer en ny token med `repo`-tilgang
   - Bruk tokenet som passord når du pusher

2. **GitHub CLI**:
   ```bash
   gh auth login
   ```

3. **SSH** (hvis du har SSH-nøkler satt opp):
   ```bash
   git remote set-url origin git@github.com:DITT-BRUKERNAVN/cv-generator-norge.git
   ```

