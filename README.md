# 🌿 SezonoweDobro - Aplikacja TCM Wellness

⚠️ **UWAGA BEZPIECZEŃSTWA**: Ten kod zawiera DEMO dane! Zobacz [SECURITY.md](SECURITY.md) przed użyciem produkcyjnym.

![SezonoweDobro](https://img.shields.io/badge/Status-Production_Ready-green)
![PWA](https://img.shields.io/badge/PWA-Enabled-blue)
![Stripe](https://img.shields.io/badge/Payments-Stripe-purple)

**Nowoczesna aplikacja wellness z tradycyjną medycyną chińską (TCM), AI asystentem i systemem premium.**

## 🔗 **Live Demo**
**[🌐 Otwórz aplikację](https://twoja-nazwa.github.io/sezonowe-dobro/)**

---

## ✨ **Funkcje**

### 🔐 **System Logowania**
- **Admin:** `admin@sezonoweDobro.pl / admin123`
- **Demo User:** `demo@example.com / demo123`
- Role-based access control

### 🤖 **AI Asystent Premium**
- 10 bezpłatnych zapytań dziennie
- Premium: nielimitowany dostęp (29.99 PLN/miesiąc)
- Integracja z Stripe
- Polski rozpoznawanie mowy

### 🧘 **Praktyki Wellness**
- **Akupresura** (5 min) - Punkty energetyczne
- **Qigong** (10 min) - Ruch energii Qi
- **Medytacja** (15 min) - Spokój umysłu
- **Oddychanie** (15 min) - Kontrola oddechu

### 🍽️ **Przepisy Sezonowe TCM**
- Automatyczna adaptacja do sezonu
- Właściwości lecznicze składników
- Generowanie list zakupów
- 5 elementów: Drewno, Ogień, Ziemia, Metal, Woda

### 📊 **Tracking Zdrowia**
- Metryki: Qi, Równowaga, Energia
- Tygodniowy postęp z resetem w poniedziałek
- System logowania aktywności

### 👑 **Panel Administratora**
- Backup i przywracanie systemu
- Monitoring logów systemowych
- Zarządzanie ustawieniami
- Tryb offline

---

## 🛠️ **Technologie**

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Design:** Glassmorphism, Mobile-first
- **PWA:** Service Worker, Manifest
- **Payments:** Stripe JavaScript SDK
- **Storage:** localStorage (przejście na backend)
- **Icons:** Font Awesome 6
- **Voice:** Web Speech API (Polski)

---

## 🚀 **Szybki Start**

### 1. **Lokalnie**
```bash
git clone https://github.com/twoja-nazwa/sezonowe-dobro.git
cd sezonowe-dobro
python -m http.server 8080
# Otwórz http://localhost:8080
```

### 2. **GitHub Pages**
1. Fork tego repository
2. Idź do Settings → Pages
3. Wybierz source: Deploy from branch `main`
4. Aplikacja będzie dostępna na: `https://twoja-nazwa.github.io/sezonowe-dobro/`

---

## ⚙️ **Konfiguracja**

### **Stripe Integration**
Zamień demo klucz w `index.html` na prawdziwy:
```javascript
const stripe = Stripe('pk_live_TWÓJ_PRAWDZIWY_KLUCZ');
```

### **Domeny i SSL**
Dla własnej domeny:
1. Dodaj CNAME file z domeną
2. Skonfiguruj DNS u providera
3. Włącz "Enforce HTTPS" w GitHub Pages

---

## 📱 **PWA Installation**

Aplikacja jest Progressive Web App:
- **Mobile:** "Add to Home Screen"
- **Desktop:** Ikona instalacji w pasku adresu
- **Offline:** Działa bez internetu

---

## 🔧 **Development**

### **Struktura plików:**
```
sezonowe-dobro/
├── index.html              # Główna aplikacja
├── settings.html           # Panel konfiguracji  
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── .htaccess              # Apache config
├── README.md              # Dokumentacja
└── wellness_backup_*/     # Backup systemu
```

### **Główne funkcje:**
- `showWellnessPractice()` - Praktyki wellness
- `showNotificationCenter()` - System powiadomień
- `showPremiumModal()` - Premium płatności
- `performBackup()` - Backup systemu

---

## 🌍 **Deployment Options**

### **GitHub Pages (Darmowe)**
- ✅ HTTPS automatyczne
- ✅ CDN globalny
- ✅ Custom domeny
- ❌ Backend limitations

### **Vercel/Netlify (Darmowe tier)**
- ✅ Serverless functions
- ✅ Continuous deployment
- ✅ Edge computing

### **Własny serwer**
- ✅ Pełna kontrola
- ✅ Backend PHP/Node.js
- ✅ Baza danych
- ✅ Email notifications

---

## 🔐 **Bezpieczeństwo**

- **HTTPS:** Wymuszenie szyfrowania
- **CSP:** Content Security Policy
- **XSS Protection:** Sanityzacja inputów
- **Stripe:** PCI DSS compliance
- **CORS:** Cross-origin restrictions

---

## 📈 **Roadmap**

### **V2.0 - Backend Integration**
- [ ] Node.js/Express API
- [ ] PostgreSQL database
- [ ] JWT authentication
- [ ] Email notifications
- [ ] Push notifications
- [ ] Advanced analytics

### **V3.0 - Mobile Apps**
- [ ] React Native iOS/Android
- [ ] App Store publikacja
- [ ] Native notifications
- [ ] Offline sync

---

## 👥 **Zespół**

- **Henio** - Full-stack Developer
- **AI Assistant** - Development Support

---

## 📄 **Licencja**

MIT License - Zobacz [LICENSE](LICENSE) file.

---

## 🤝 **Wsparcie**

- **Email:** admin@sezonoweDobro.pl
- **Issues:** [GitHub Issues](https://github.com/twoja-nazwa/sezonowe-dobro/issues)
- **Dokumentacja:** [Deployment Guide](DEPLOYMENT.md)

---

**🌟 Jeśli aplikacja Ci pomaga, zostaw ⭐ na GitHub!** 