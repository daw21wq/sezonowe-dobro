# 🔐 **PRZEWODNIK KROK PO KROKU: API + Stripe + GitHub**

## 📋 **PRZYGOTOWANIE**

### **1. Klonuj repozytorium lokalnie:**
```bash
git clone https://github.com/daw21wq/sezonowe-dobro.git
cd sezonowe-dobro
npm install
```

---

## 🔑 **KROK 1: STRIPE SETUP**

### **A. Załóż konto Stripe:**
1. Idź na: https://stripe.com
2. **Sign up** → Wypełnij dane firmy
3. **Verify business details** (może potrwać 1-2 dni)

### **B. Pobierz klucze API:**
1. Dashboard → **Developers** → **API Keys**
2. Skopiuj:
   - `Publishable key`: `pk_test_...` (można pokazać publicznie)
   - `Secret key`: `sk_test_...` (TAJNA! Nigdy nie commituj)

### **C. Stwórz produkty (subskrypcje):**
1. Dashboard → **Products** → **Add product**
2. **Monthly Premium**: 29.99 PLN/miesięcznie
3. **Yearly Premium**: 299.99 PLN/rocznie
4. Skopiuj `Price ID` dla każdego: `price_...`

### **D. Skonfiguruj webhook:**
1. Dashboard → **Developers** → **Webhooks**
2. **Add endpoint**: `https://twoja-domena.com/api/payments/stripe-webhook`
3. **Events**: `checkout.session.completed`, `customer.subscription.deleted`
4. Skopiuj `Webhook secret`: `whsec_...`

---

## 🤖 **KROK 2: OPENAI API SETUP**

### **A. Załóż konto OpenAI:**
1. Idź na: https://platform.openai.com
2. **Sign up** → Verify email
3. **Add payment method** (wymagane $5 minimum)

### **B. Pobierz API key:**
1. **API Keys** → **Create new secret key**
2. Skopiuj: `sk-proj_...`
3. **WAŻNE**: Ten klucz jest pokazany tylko raz!

---

## 🔒 **KROK 3: ZABEZPIECZENIE KLUCZY W GITHUB**

### **A. Dodaj Secrets do repozytorium:**
1. Idź do: `https://github.com/daw21wq/sezonowe-dobro`
2. **Settings** → **Secrets and Variables** → **Actions**
3. **New repository secret** i dodaj:

```bash
# Stripe keys
STRIPE_PUBLISHABLE_KEY = pk_test_TWÓJ_KLUCZ_TUTAJ
STRIPE_SECRET_KEY = sk_test_TWÓJ_KLUCZ_TUTAJ  
STRIPE_WEBHOOK_SECRET = whsec_TWÓJ_KLUCZ_TUTAJ
STRIPE_MONTHLY_PRICE_ID = price_TWÓJ_MONTHLY_ID
STRIPE_YEARLY_PRICE_ID = price_TWÓJ_YEARLY_ID

# OpenAI
OPENAI_API_KEY = sk-proj_TWÓJ_OPENAI_KLUCZ

# App config
APP_URL = https://twoja-domena.com
JWT_SECRET = super_tajne_haslo_min_32_znaki_abcd1234
DATABASE_URL = postgresql://user:pass@host:5432/db

# Demo users
DEMO_USER_EMAIL = demo@example.com
DEMO_USER_PASSWORD = demo123
ADMIN_EMAIL = admin@sezonoweDobro.pl
ADMIN_PASSWORD = secure_admin_2024!
```

---

## 🏗️ **KROK 4: KONFIGURACJA LOKALNA**

### **A. Stwórz plik .env:**
```bash
cp env.example .env
```

### **B. Wypełnij plik .env swoimi kluczami:**
```bash
# Otwórz .env i zastąp wszystkie "TWÓJ_KLUCZ_TUTAJ" prawdziwymi kluczami
NODE_ENV=development
APP_URL=http://localhost:3000
PORT=3000

STRIPE_PUBLISHABLE_KEY=pk_test_TWÓJ_PRAWDZIWY_KLUCZ
STRIPE_SECRET_KEY=sk_test_TWÓJ_PRAWDZIWY_KLUCZ
# ... reszta kluczy
```

### **C. Testuj lokalnie:**
```bash
npm install
npm run dev

# W drugim terminalu:
curl http://localhost:3000/api/health
```

---

## 🚀 **KROK 5: DEPLOYMENT**

### **A. GitHub Actions (automatyczny):**
1. Push do `main` branch → automatyczny deployment
2. Sprawdź: **Actions** tab w GitHub
3. Zobacz logi deployment

### **B. Ręczny deployment na serwer:**

#### **VPS/Dedicated Server:**
```bash
# Na serwerze:
git clone https://github.com/daw21wq/sezonowe-dobro.git
cd sezonowe-dobro
npm install --production

# Skopiuj .env z kluczami
npm start
```

#### **Vercel (najłatwiejszy):**
```bash
npm install -g vercel
vercel

# Podczas setup:
# - Framework: Other
# - Build command: npm run build  
# - Output directory: public
```

#### **Heroku:**
```bash
# Install Heroku CLI
heroku create sezonowe-dobro-app
heroku config:set STRIPE_SECRET_KEY=sk_test_...
heroku config:set OPENAI_API_KEY=sk-proj_...
# ... wszystkie inne zmienne

git push heroku main
```

---

## ✅ **KROK 6: WERYFIKACJA**

### **A. Sprawdź API:**
```bash
curl https://twoja-domena.com/api/health
```

### **B. Test Stripe:**
1. Otwórz aplikację
2. Idź do **Premium** 
3. Kliknij **Subscribe**
4. Użyj testowej karty: `4242 4242 4242 4242`

### **C. Test AI:**
1. Zaloguj się w aplikacji
2. Otwórz **AI Assistant**
3. Zadaj pytanie o TCM

---

## 🛡️ **BEZPIECZEŃSTWO**

### **✅ DOBRE PRAKTYKI:**
- ✅ Klucze w GitHub Secrets (nie w kodzie)
- ✅ HTTPS wszędzie  
- ✅ Rate limiting włączony
- ✅ Input validation
- ✅ JWT tokeny z ekspiracją

### **❌ NIGDY NIE ROB:**
- ❌ Nie commituj plików `.env`
- ❌ Nie umieszczaj kluczy w kodzie
- ❌ Nie używaj `sk_test_` w produkcji
- ❌ Nie udostępniaj webhook secrets

---

## 🔧 **MAINTENANCE**

### **Monitoring kluczy:**
```bash
# Sprawdź status API:
curl https://twoja-domena.com/api/health

# Sprawdź logi Stripe:
# Dashboard → Logs

# Sprawdź usage OpenAI:
# Platform → Usage
```

### **Rotacja kluczy (co 90 dni):**
1. Wygeneruj nowe klucze w Stripe/OpenAI
2. Zaktualizuj GitHub Secrets
3. Redeploy aplikację
4. Usuń stare klucze

---

## 📞 **POMOC**

### **Częste problemy:**

**1. "Stripe not configured"**
- Sprawdź czy `STRIPE_SECRET_KEY` jest ustawiony
- Sprawdź czy klucz zaczyna się od `sk_`

**2. "AI service unavailable"**  
- Sprawdź saldo OpenAI account
- Sprawdź czy `OPENAI_API_KEY` jest poprawny

**3. "Webhook verification failed"**
- Sprawdź `STRIPE_WEBHOOK_SECRET`
- Sprawdź endpoint URL w Stripe dashboard

### **Support:**
- 📧 Email: admin@sezonoweDobro.pl
- 💬 GitHub Issues: [Report bug](https://github.com/daw21wq/sezonowe-dobro/issues)

---

## 🎉 **GOTOWE!**

Jeśli wszystko przeszło pomyślnie, Twoja aplikacja ma teraz:
- ✅ Bezpieczne API z autentykacją
- ✅ Działające płatności Stripe
- ✅ AI asystenta z OpenAI
- ✅ Automatyczny deployment z GitHub
- ✅ Monitoring i logi

**Powodzenia z SezonoweDobro! 🌿** 