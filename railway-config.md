# 🚀 RAILWAY - KONFIGURACJA ZMIENNYCH ŚRODOWISKOWYCH

## ⚠️ APLIKACJA CRASHUJE - BRAKUJE ZMIENNYCH ŚRODOWISKOWYCH

Twoja aplikacja na Railway potrzebuje **16 zmiennych środowiskowych** aby działać.

## 📋 LISTA WSZYSTKICH WYMAGANYCH ZMIENNYCH:

### 🔐 WYGENEROWANE WCZORAJ (z generate-secrets.js):
```
JWT_SECRET = [64-znakowy hex wygenerowany wczoraj]
ADMIN_PASSWORD = [hasło wygenerowane wczoraj]
DEMO_USER_EMAIL = demo@sezonoweDobro.pl
DEMO_USER_PASSWORD = wellness123
ADMIN_EMAIL = admin@sezonoweDobro.pl
OPENAI_MODEL = gpt-4-turbo-preview
```

### 🌐 URL I ŚRODOWISKO:
```
NODE_ENV = production
APP_URL = https://twoja-railway-domena.up.railway.app
PORT = 3000
```

### 🤖 OPENAI API:
```
OPENAI_API_KEY = sk-proj_[TWÓJ_KLUCZ_Z_OPENAI]
```

### 💳 STRIPE (pobierz z https://dashboard.stripe.com/apikeys):
```
STRIPE_PUBLISHABLE_KEY = pk_live_[TWÓJ_KLUCZ]
STRIPE_SECRET_KEY = sk_live_[TWÓJ_KLUCZ]
STRIPE_WEBHOOK_SECRET = whsec_[WEBHOOK_SECRET]
STRIPE_MONTHLY_PRICE_ID = price_[MONTHLY_PRODUCT_ID]
STRIPE_YEARLY_PRICE_ID = price_[YEARLY_PRODUCT_ID]
```

### 🗄️ SUPABASE (pobierz z https://supabase.com/dashboard):
```
SUPABASE_URL = https://twój-projekt.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIs[ANON_KEY]
SUPABASE_SERVICE_KEY = eyJhbGciOiJIUzI1NiIs[SERVICE_KEY]
```

---

## 🔧 JAK DODAĆ ZMIENNE NA RAILWAY:

### KROK 1: Otwórz Railway Dashboard
1. Idź na: https://railway.app
2. Zaloguj się przez GitHub
3. Kliknij projekt **"sezonowe-dobro"**

### KROK 2: Dodaj zmienne
1. Kliknij **"Variables"** (po lewej stronie)
2. Kliknij **"New Variable"**
3. Dodaj **każdą z 16 zmiennych** powyżej
4. Kliknij **"Add"** po każdej

### KROK 3: Redeploy
1. Kliknij **"Deployments"**
2. Kliknij **"Redeploy"** lub zaczekaj na auto-deploy

---

## ❗ PILNE KROKI:

1. **SPRAWDŹ LOGI** - Zobacz co dokładnie crashuje
2. **DODAJ ZMIENNE** - Wszystkie 16 na Railway
3. **PRZETESTUJ** - Sprawdź /api/health endpoint
4. **AKTUALIZUJ FRONTEND** - URL Railway w frontend

---

## 🆘 CO ROBIMY TERAZ:

1. Pokaż mi logi z Railway (screenshotem)
2. Dodamy wszystkie zmienne środowiskowe
3. Naprawimy crash aplikacji
4. Przetestujemy deployment

**👀 POKAŻ MI LOGI Z RAILWAY ŻEBY ZOBACZYĆ DOKŁADNY BŁĄD!** 