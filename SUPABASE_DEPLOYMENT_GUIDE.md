# 🚀 KOMPLETNY PRZEWODNIK WDROŻENIA SUPABASE + RAILWAY

## 🎯 PLAN WDROŻENIA (Opcja Hybrid - Rekomendowane)

```
Backend API (Railway) ←→ Database (Supabase) ←→ Frontend (GitHub Pages)
    ↓                        ↓                      ↓
  Stripe + OpenAI          PostgreSQL + Auth       React/HTML
```

---

## 📋 KROK 1: STWÓRZ PROJEKT SUPABASE (5 minut)

### 1.1 Załóż konto Supabase
1. Idź na: https://supabase.com
2. Kliknij **"Start your project"**
3. Zaloguj się przez GitHub
4. Kliknij **"New project"**

### 1.2 Skonfiguruj projekt
```
Organization: Twoja organizacja
Project name: sezonowe-dobro-wellness
Database password: [WYGENERUJ SILNE HASŁO]
Region: Europe (eu-central-1)
```

### 1.3 Zaczekaj na utworzenie projektu (2-3 minuty)

---

## 📋 KROK 2: SKONFIGURUJ BAZĘ DANYCH (10 minut)

### 2.1 Otwórz SQL Editor w Supabase
1. W dashboard Supabase kliknij **"SQL Editor"**
2. Kliknij **"New query"**

### 2.2 Uruchom schema SQL
```sql
-- SKOPIUJ CAŁY KOD z pliku: supabase-setup.sql
-- I wklej w SQL Editor, następnie kliknij RUN
```

### 2.3 Sprawdź czy tabele zostały utworzone
- Idź do **"Table Editor"**
- Powinieneś zobaczyć: `user_profiles`, `wellness_practices`, `payment_history`, `ai_conversations`, `wellness_goals`

---

## 📋 KROK 3: POBIERZ SUPABASE CREDENTIALS (2 minuty)

### 3.1 Idź do Settings > API
1. W Supabase dashboard kliknij **"Settings"** (koło zębate)
2. Kliknij **"API"**

### 3.2 Skopiuj kluczowe wartości
```bash
# SKOPIUJ TE WARTOŚCI:
SUPABASE_URL = https://xxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... [!] Service Role (secret)
```

⚠️ **UWAGA**: Service Key trzymaj w tajemnicy!

---

## 📋 KROK 4: DODAJ GITHUB SECRETS (15 minut)

### 4.1 Uruchom generator haseł
```bash
cd D:\wellness
node generate-secrets.js
```

### 4.2 Idź do GitHub Secrets
👆 **KLIKNIJ**: https://github.com/daw21wq/sezonowe-dobro/settings/secrets/actions

### 4.3 Dodaj WSZYSTKIE 16 secrets

#### ✅ Z generatora (gotowe):
```
JWT_SECRET = [wygenerowane]
ADMIN_PASSWORD = [wygenerowane]
DEMO_USER_EMAIL = demo@sezonoweDobro.pl
DEMO_USER_PASSWORD = wellness123
ADMIN_EMAIL = admin@sezonoweDobro.pl
OPENAI_MODEL = gpt-4-turbo-preview
APP_URL = https://twoja-domena.com (zaktualizuj później)
```

#### 🔑 Z Supabase (skopiuj z kroku 3):
```
SUPABASE_URL = [z Supabase Dashboard]
SUPABASE_ANON_KEY = [z Supabase Dashboard]
SUPABASE_SERVICE_KEY = [z Supabase Dashboard]
```

#### 💳 Ze Stripe (pobierz z https://dashboard.stripe.com/apikeys):
```
STRIPE_PUBLISHABLE_KEY = pk_live_...
STRIPE_SECRET_KEY = sk_live_...
STRIPE_WEBHOOK_SECRET = whsec_...
STRIPE_MONTHLY_PRICE_ID = price_... (stwórz product)
STRIPE_YEARLY_PRICE_ID = price_... (stwórz product)
```

#### 🤖 Z OpenAI (pobierz z https://platform.openai.com/api-keys):
```
OPENAI_API_KEY = sk-proj_...
```

### 4.4 Weryfikacja ✅
**Sprawdź czy masz WSZYSTKIE 16 secrets w GitHub!**

---

## 📋 KROK 5: STWÓRZ STRIPE PRODUCTS (10 minut)

### 5.1 Idź do Stripe Dashboard
👆 **KLIKNIJ**: https://dashboard.stripe.com/products

### 5.2 Stwórz produkt subskrypcji
```
Product name: SezonoweDobro Premium
Description: Dostęp do AI asystenta TCM i funkcji premium
```

### 5.3 Dodaj ceny
```
MONTHLY:
- Price: 29.99 PLN
- Billing: Monthly
- Copy Price ID → dodaj do STRIPE_MONTHLY_PRICE_ID

YEARLY:
- Price: 299.99 PLN  
- Billing: Yearly
- Copy Price ID → dodaj do STRIPE_YEARLY_PRICE_ID
```

### 5.4 Skonfiguruj webhook
1. Idź do: https://dashboard.stripe.com/webhooks
2. Kliknij **"Add endpoint"**
3. URL: `https://twoja-domena.com/api/payments/stripe-webhook`
4. Events: `checkout.session.completed`, `customer.subscription.deleted`
5. Copy **Signing secret** → dodaj do `STRIPE_WEBHOOK_SECRET`

---

## 📋 KROK 6: WDRÓŻ NA RAILWAY (15 minut)

### 6.1 Załóż konto Railway
1. Idź na: https://railway.app
2. Zaloguj się przez GitHub
3. Kliknij **"New Project"**

### 6.2 Connect GitHub Repository
1. Wybierz **"Deploy from GitHub repo"**
2. Znajdź `daw21wq/sezonowe-dobro`
3. Kliknij **"Deploy"**

### 6.3 Skonfiguruj Environment Variables
1. W Railway dashboard kliknij **"Variables"**
2. Dodaj **WSZYSTKIE 16 zmiennych** z GitHub Secrets
3. Kliknij **"Deploy"**

### 6.4 Ustaw domenę
1. Kliknij **"Settings"** → **"Domains"**
2. Kliknij **"Generate Domain"**
3. Skopiuj domenę (np. `wellness-production-abc123.up.railway.app`)
4. Zaktualizuj `APP_URL` w GitHub Secrets

---

## 📋 KROK 7: AKTUALIZUJ BACKEND (5 minut)

### 7.1 Zainstaluj dependency
```bash
npm install @supabase/supabase-js
```

### 7.2 Zintegruj Supabase kod
- Skopiuj kod z `supabase-integration.js`
- Zastąp odpowiednie części w `api/index.js`
- Commit i push zmiany

---

## 📋 KROK 8: TEST DEPLOYMENT (10 minut)

### 8.1 Sprawdź status
```bash
# Health check
curl https://twoja-railway-domena.com/api/health

# Powinno zwrócić:
{
  "status": "OK",
  "stripe": "configured",
  "openai": "configured"
}
```

### 8.2 Test rejestracji
```bash
curl -X POST https://twoja-domena.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.pl","password":"Test123!","displayName":"Test User"}'
```

### 8.3 Test AI
```bash
curl -X POST https://twoja-domena.com/api/ai/query \
  -H "Authorization: Bearer TWOJ_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message":"Jak medytować?"}'
```

---

## 📋 KROK 9: KONFIGURACJA FRONTENDU (15 minut)

### 9.1 Zaktualizuj API endpoints w frontend
```javascript
// W pliku index.html lub frontend config
const API_BASE = 'https://twoja-railway-domena.com/api';
const SUPABASE_URL = 'https://twoja-supabase-domena.supabase.co';
const SUPABASE_ANON_KEY = 'twoj-anon-key';
```

### 9.2 Test integracji
- Otwórz swoją stronę
- Sprawdź czy rejestracja działa
- Sprawdź czy płatności działają
- Sprawdź czy AI odpowiada

---

## 🎉 GOTOWE! DEPLOYMENT COMPLETE

### ✅ CO MASZ TERAZ:
- 🗄️ **Supabase**: PostgreSQL database + Authentication
- 🚀 **Railway**: Backend API z Stripe + OpenAI
- 🌐 **GitHub Pages**: Frontend aplikacji
- 🔒 **GitHub Secrets**: Bezpieczne przechowywanie kluczy
- 🔄 **GitHub Actions**: Auto-deployment

### 💰 KOSZTY MIESIĘCZNE:
- **Supabase Free**: $0 (do 500MB + 50k users)
- **Railway Hobby**: $5 (darmowy credit)
- **Stripe**: 2.9% + 0.30 PLN za transakcję
- **OpenAI**: ~$10-50 (zależnie od użycia)

**TOTAL**: ~$15-60/miesiąc

### 🔄 NASTĘPNE KROKI:
1. **Monitor**: Sprawdzaj logi w Railway/Supabase
2. **Scale**: Upgradeuj plany gdy rośnie traffic
3. **Backup**: Supabase robi automatyczne backupy
4. **Analytics**: Dodaj Google Analytics/Stripe Dashboard

### 🆘 TROUBLESHOOTING:
- **500 Error**: Sprawdź logi w Railway
- **Auth Error**: Sprawdź Supabase RLS policies
- **Payment Error**: Sprawdź Stripe webhook
- **AI Error**: Sprawdź OpenAI quota

---

## 🔥 CONGRATULATIONS! 
**Twoja aplikacja SezonoweDobro jest teraz LIVE na produkcji!** 🎉

**URL**: https://twoja-railway-domena.com
**Admin**: admin@sezonoweDobro.pl
**Demo**: demo@sezonoweDobro.pl

**Potrzebujesz pomocy?** Prześlij logi błędów! 📧 