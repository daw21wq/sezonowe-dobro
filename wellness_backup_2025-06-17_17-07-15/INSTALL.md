# 🚀 INSTRUKCJE INSTALACJI - WELLNESS APP

## 📋 Wymagania Systemowe

### Minimalne Wymagania:
- **System**: Windows 10/11, macOS, Linux
- **Python**: 3.7+ (dla serwera lokalnego)
- **Przeglądarka**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **RAM**: 4 GB
- **Miejsce na dysku**: 100 MB

### Rekomendowane:
- **Python**: 3.9+
- **RAM**: 8 GB
- **Szybkie połączenie internetowe** (dla funkcji Stripe i rozpoznawania mowy)

## 🔧 Instalacja Krok po Kroku

### 1. Przygotowanie Środowiska

#### Windows:
```bash
# Sprawdź Python
python --version

# Jeśli nie masz Python, pobierz z https://python.org
```

#### macOS:
```bash
# Sprawdź Python
python3 --version

# Zainstaluj jeśli brak (przez Homebrew)
brew install python
```

#### Linux (Ubuntu/Debian):
```bash
# Sprawdź Python
python3 --version

# Zainstaluj jeśli brak
sudo apt update
sudo apt install python3 python3-pip
```

### 2. Konfiguracja Projektu

```bash
# Utwórz folder projektu
mkdir wellness-app
cd wellness-app

# Skopiuj pliki z backup'a
# Skopiuj: index.html, settings.html, README_BACKUP.md
```

### 3. Uruchomienie Serwera

#### Metoda 1 - Python HTTP Server (Rekomendowana):
```bash
# Windows
python -m http.server 8080

# macOS/Linux  
python3 -m http.server 8080
```

#### Metoda 2 - Node.js (Alternatywna):
```bash
# Zainstaluj Node.js (https://nodejs.org)
npx http-server -p 8080
```

#### Metoda 3 - PHP (Alternatywna):
```bash
# Jeśli masz PHP
php -S localhost:8080
```

### 4. Dostęp do Aplikacji

1. Otwórz przeglądarkę
2. Przejdź do: **http://localhost:8080**
3. Aplikacja powinna się załadować automatycznie

## 👥 Konta Testowe

### Użytkownik Standardowy:
- **Email**: demo@example.com
- **Hasło**: demo123
- **Dostęp**: Podstawowe funkcje + 10 zapytań AI dziennie

### Administrator:
- **Email**: admin@example.com  
- **Hasło**: admin123
- **Dostęp**: Pełne uprawnienia + nielimitowane AI

## ⚙️ Konfiguracja Stripe (Premium)

### Klucze Testowe (Domyślne):
```javascript
// W index.html, linia ~8243
const stripe = Stripe('pk_test_51234567890...'); // Klucz testowy
```

### Klucze Produkcyjne:
1. Załóż konto na [stripe.com](https://stripe.com)
2. Pobierz klucze API z Dashboard
3. Zamień klucz testowy w `index.html`:
   ```javascript
   const stripe = Stripe('pk_live_YOUR_REAL_KEY_HERE');
   ```

### Webhook'i Stripe:
```bash
# URL webhook (jeśli potrzebny)
https://twoja-domena.com/webhook/stripe

# Events do subskrypcji:
- invoice.payment_succeeded
- customer.subscription.deleted
- customer.subscription.created
```

## 🌐 Deployment Produkcyjny

### 1. Serwer WWW (Apache/Nginx):

#### Apache (.htaccess):
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]
```

#### Nginx:
```nginx
server {
    listen 80;
    server_name twoja-domena.com;
    root /path/to/wellness-app;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 2. CDN i Hosting:

#### Netlify:
```bash
# netlify.toml
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel:
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 🔒 Konfiguracja HTTPS

### Let's Encrypt (Certbot):
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d twoja-domena.com
```

### Cloudflare:
1. Dodaj domenę do Cloudflare
2. Włącz "Flexible SSL"
3. Ustaw DNS na Cloudflare

## 📊 Monitoring i Analytics

### Google Analytics:
```html
<!-- Dodaj przed </head> w index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry (Error Tracking):
```html
<!-- Dodaj przed </head> w index.html -->
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
</script>
```

## 🛠️ Rozwiązywanie Problemów

### Problem: Aplikacja nie ładuje się
```bash
# Sprawdź czy serwer działa
netstat -tulpn | grep :8080

# Sprawdź logi błędów w konsoli przeglądarki (F12)
```

### Problem: Stripe nie działa
```bash
# Sprawdź klucze API
# Sprawdź czy HTTPS jest włączone (wymagane dla produkcji)
# Sprawdź logi błędów w Stripe Dashboard
```

### Problem: Rozpoznawanie mowy nie działa
```bash
# Sprawdź czy przeglądarka obsługuje Web Speech API
# Sprawdź pozwolenia mikrofonu
# Sprawdź czy strona jest serwowana przez HTTPS (wymagane dla mic)
```

### Problem: localStorage nie działa
```bash
# Sprawdź czy localStorage jest włączone w przeglądarce
# Sprawdź tryb prywatny/incognito (może blokować localStorage)
# Wyczyść dane przeglądarki i spróbuj ponownie
```

## 🔄 Aktualizacje

### Backup przed aktualizacją:
```bash
# Zawsze rób backup przed zmianami
cp index.html index_backup_$(date +%Y%m%d).html
```

### Migracja danych:
```javascript
// Eksport danych użytkownika
const userData = {
    userProfile: localStorage.getItem('userName'),
    premium: localStorage.getItem('premiumStatus'),
    metrics: localStorage.getItem('healthMetrics')
};
console.log('Backup danych:', JSON.stringify(userData));
```

## 📞 Wsparcie Techniczne

### Logi błędów:
1. Otwórz konsolę przeglądarki (F12)
2. Sprawdź zakładkę "Console" 
3. Skopiuj błędy i wyślij do wsparcia

### System logi (w aplikacji):
1. Zaloguj jako admin
2. Panel Admin → Logi
3. Eksportuj logi systemowe

### Kontakt:
- **GitHub Issues**: [link do repo]
- **Email**: support@sezonowedobre.pl
- **Discord**: [link do serwera]

---

**🌿 Powodzenia z instalacją SezonoweDobro!** 