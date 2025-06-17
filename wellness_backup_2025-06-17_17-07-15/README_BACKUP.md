# 🌿 WELLNESS APP - KOMPLETNY BACKUP
**Data Backup:** 17.06.2025 17:07:15
**Wersja:** 2.0 Premium Edition

## 📁 Zawartość Backup'a

### Pliki Główne:
- `index.html` - Główna aplikacja wellness (392,646 bytes)
- `settings.html` - Panel ustawień aplikacji (53,489 bytes)  
- `index_backup.html` - Poprzedni backup (253,167 bytes)
- `README_BACKUP.md` - Ten plik dokumentacji

## 🎯 Opis Aplikacji

**SezonoweDobro** - Tradycyjna Medycyna Chińska dla Współczesnego Życia • 2025

### 🔧 Główne Funkcje:

#### 1. **System Logowania i Użytkowników**
- Logowanie z weryfikacją (demo@example.com / demo123)
- Panel administratora (admin@example.com / admin123)  
- Zarządzanie profilami użytkowników
- System ról (user/admin)

#### 2. **Główne Zakładki:**
- **🏠 Główna** - Przegląd sezonowy, metryki wellness
- **📅 Kalendarz** - Wydarzenia zdrowotne, przypomnienia
- **🍽️ Przepisy** - Sezonowe przepisy TCM z właściwościami leczniczymi
- **🧘 Zdrowie** - Praktyki wellness (Akupresura, Qigong, Medytacja, Oddychanie)
- **🤖 AI Asystent** - Inteligentny asystent TCM z systemem Premium
- **👤 Profil** - Zarządzanie kontem, Premium, ustawienia
- **🛡️ Admin** - Panel administratora (tylko dla adminów)

#### 3. **System Premium z Integracją Stripe**
- ✅ **Użytkownicy standardowi**: 10 zapytań AI dziennie
- ✅ **Premium**: Nielimitowany dostęp AI za 29.99 PLN/miesiąc
- ✅ **Administratorzy**: Nielimitowany dostęp bez opłat
- ✅ Integracja z Stripe JavaScript SDK
- ✅ Bezpieczne przetwarzanie płatności
- ✅ Automatyczny reset limitów o północy

#### 4. **AI Asystent TCM**
- Inteligentny asystent oparty na medycynie chińskiej
- Rozpoznawanie głosu (Polski - webkitSpeechRecognition)
- Generowanie przepisów sezonowych
- Porady zdrowotne TCM
- Listy zakupów z właściwościami TCM
- Ćwiczenia dostosowane do sezonu
- System limitów dla użytkowników podstawowych

#### 5. **Praktyki Wellness**
- **🌸 Akupresura** - 5-minutowe sesje z punktami akupresury
- **🧘 Qigong** - 10-minutowe ćwiczenia energii
- **🕯️ Medytacja** - 15-minutowe sesje medytacyjne
- **🌬️ Oddychanie** - 15-minutowe techniki oddechowe
- Timery i instrukcje krok po kroku
- Integracja z tygodniowym postępem

#### 6. **System Postępu Tygodniowego**
- Śledzenie dni praktyk (IDs: weeklyPracticeDays)
- Minuty ćwiczeń (IDs: weeklyMinutes)  
- Ilość przepisów (IDs: weeklyRecipes)
- Automatyczny reset w poniedziałki
- Animacje i aktualizacje w czasie rzeczywistym

#### 7. **Przepisy Sezonowe**
- Automatyczna adaptacja do aktualnego sezonu
- Szczegółowe właściwości TCM
- Instrukcje krok po kroku
- Listy składników z poradami zakupowymi
- Funkcja drukowania i udostępniania
- Dodatkowe informacje TCM dla administratorów

#### 8. **Panel Administratora** 
- 💾 **Backup** - Eksport danych aplikacji (JSON)
- 📋 **Logi** - System logowania wszystkich akcji
- 📤 **Przywróć** - Import danych z backup'a
- ⚙️ **Ustawienia** - Konfiguracja systemu
- 🌐 **Tryb Offline** - Zarządzanie trybem offline
- Brak funkcji Premium (administratorzy mają pełny dostęp)

#### 9. **Metryki Zdrowia**
- **Poziom Qi** - Energia życiowa (85/100)
- **Równowaga** - Harmonia elementów (92/100)  
- **Energia** - Poziom energii (78/100)
- Codzienne fluktuacje i aktualizacje
- Śledzenie w localStorage

#### 10. **System Sezonowy TCM**
- **Wiosna** - Element Drewna (Wątroba) 🌱
- **Lato** - Element Ognia (Serce) 🔥
- **Późne Lato** - Element Ziemi (Śledziona) 🌾
- **Jesień** - Element Metalu (Płuca) 🍂
- **Zima** - Element Wody (Nerki) ❄️
- Automatyczne dostosowanie do daty
- Paski postępu sezonowego

## 🔒 Bezpieczeństwo i Dane

### Przechowywanie Danych (localStorage):
- `isLoggedIn` - Status logowania
- `userName` / `userEmail` - Dane użytkownika
- `userRole` - Rola użytkownika (user/admin)
- `premiumStatus` - Status Premium
- `dailyAIUsage` - Dzienne użycie AI
- `lastAIReset` - Data ostatniego resetu limitów
- `healthMetrics` - Metryki zdrowia
- `weeklyProgress` - Postęp tygodniowy
- `systemLogs` - Logi systemowe
- `offlineMode` - Status trybu offline

### System Logowania:
- Wszystkie akcje użytkowników logowane
- Kategorie: INFO, SUCCESS, ERROR, WARNING
- Moduły: AUTH, AI, BACKUP, PREMIUM, SYSTEM
- Przechowywanie w localStorage z rotacją

## 🎨 Interfejs Użytkownika

### Stylizacja:
- **Motyw**: Glassmorphism z gradientami
- **Kolory**: Zielone odcienie (#4CAF50, #66BB6A)
- **Premium**: Złote akcenty (#FFD700, #FFC107)
- **Animacje**: Płynne przejścia, efekty cząsteczek
- **Responsywność**: Adaptacja do wszystkich urządzeń

### Animacje Specjalne:
- Pływające elementy tła (🌸🍃❄️)
- Efekty sparkle przy interakcjach
- Animacje Premium (👑✨💎🌟💰)
- Wskaźniki ładowania i postępu
- Powiadomienia z animowanymi pojawieniami

## 🚀 Technologie

### Frontend:
- **HTML5** - Struktura aplikacji
- **CSS3** - Stylizacja z animacjami
- **JavaScript ES6+** - Logika aplikacji
- **Font Awesome** - Ikony
- **Web Speech API** - Rozpoznawanie mowy

### Integracje:
- **Stripe JavaScript SDK** - Płatności Premium
- **LocalStorage API** - Przechowywanie danych
- **Responsive Design** - Kompatybilność urządzeń

## 📱 Uruchamianie Aplikacji

### Serwer Lokalny:
```bash
cd D:\wellness
python -m http.server 8080
```

### Dostęp:
- **URL**: http://localhost:8080
- **Demo User**: demo@example.com / demo123
- **Administrator**: admin@example.com / admin123

## 🔄 Wersje i Historia

### Aktualna Wersja (2.0 Premium):
- ✅ System Premium z Stripe
- ✅ Ograniczenia AI dla użytkowników
- ✅ Nieograniczony dostęp dla adminów
- ✅ Kompletne praktyki wellness
- ✅ System postępu tygodniowego
- ✅ Przepisy sezonowe z TCM
- ✅ Panel administracyjny
- ✅ Responsive design

### Poprzednie Wersje:
- `index_backup.html` - Wersja przed systemem Premium

## 📞 Wsparcie

### Funkcje Testowe:
1. **Logowanie**: Używaj kont demo lub admin
2. **AI Asystent**: Zadawaj pytania po polsku
3. **Premium**: Symuluj zakup (95% sukcesu)
4. **Wellness**: Testuj wszystkie praktyki
5. **Admin Panel**: Sprawdź funkcje administracyjne

### Znane Ograniczenia:
- Stripe używa klucza testowego
- AI odpowiedzi są pre-generowane
- Dane przechowywane lokalnie w przeglądarce

---

**© 2025 SezonoweDobro - Tradycyjna Medycyna Chińska dla Współczesnego Życia** 