# 🔒 Bezpieczeństwo - SezonoweDobro

## ⚠️ WAŻNE OSTRZEŻENIE BEZPIECZEŃSTWA

**Ten kod zawiera DEMO dane do celów pokazowych. NIE używaj w produkcji!**

## 🚨 Wrażliwe dane w kodzie

### Demo hasła (ZMIEŃ NATYCHMIAST):
- **Admin**: admin@sezonoweDobro.pl / `admin123`
- **User**: demo@example.com / `demo123`

### Klucze testowe:
- **Stripe**: `pk_test_51234567890...` (testowy)

## 🛡️ Przed uruchomieniem produkcyjnym:

### 1. Zmień wszystkie hasła
```javascript
// index.html - linha ~2994
if (email === 'admin@sezonoweDobro.pl' && password === 'NOWE_BEZPIECZNE_HASŁO') {
```

### 2. Skonfiguruj prawdziwe klucze Stripe
```javascript
// index.html - linha ~8448
const stripe = Stripe('pk_live_TWÓJ_PRAWDZIWY_KLUCZ');
```

### 3. Usuń dane demo z kodu
- Usuń hardkodowane hasła
- Usuń klucze testowe
- Implementuj backend z hashowaniem haseł

### 4. Implementuj proper authentication
- JWT tokens
- bcrypt do hashowania haseł
- Secure sessions
- Rate limiting

## 🔐 Zalecenia bezpieczeństwa

### Frontend:
- [ ] Usuń hardkodowane credentials
- [ ] Implementuj environment variables
- [ ] Dodaj input validation
- [ ] Dodaj HTTPS only

### Backend (TODO):
- [ ] Implementuj proper auth system
- [ ] Database z hashowanymi hasłami
- [ ] Session management
- [ ] API rate limiting
- [ ] Input sanitization

### Stripe:
- [ ] Użyj prawdziwych kluczy
- [ ] Implementuj webhooks
- [ ] Dodaj error handling
- [ ] PCI DSS compliance

## 🚨 Zgłaszanie problemów bezpieczeństwa

Jeśli znajdziesz problem bezpieczeństwa, skontaktuj się:
- Email: security@sezonoweDobro.pl
- Nie publikuj publicznie!

## 📋 Security Checklist

Przed produkcją sprawdź:
- [ ] Wszystkie hasła zmienione
- [ ] Klucze API w .env
- [ ] .env dodane do .gitignore
- [ ] HTTPS włączone
- [ ] Input validation działą
- [ ] Rate limiting aktywne
- [ ] Logi bezpieczeństwa działają
- [ ] Backup plan gotowy

---
⚠️ **PAMIĘTAJ: To jest DEMO aplikacja. Nie używaj w produkcji bez implementacji właściwego systemu bezpieczeństwa!** 