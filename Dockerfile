# Wybór obrazu bazowego z Node.js
FROM node:16

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie plików projektu
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty plików projektu
COPY . .

# Budowanie aplikacji
RUN npm run build

# Ustawienie portu, na którym będzie dostępna aplikacja
EXPOSE 3000

# Uruchomienie serwera produkcyjnego (npx serve do serwowania plików z /build)
CMD ["npx", "serve", "-s", "build", "-l", "3000"]