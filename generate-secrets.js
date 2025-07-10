#!/usr/bin/env node

// 🔐 Secure Password Generator for GitHub Secrets
// Run: node generate-secrets.js

const crypto = require('crypto');

console.log('🔐 GITHUB SECRETS GENERATOR\n');

// Generate JWT_SECRET (64 characters)
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('📋 SKOPIUJ I WKLEJ W GITHUB SECRETS:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

console.log('\n🔑 JWT_SECRET:');
console.log(jwtSecret);

// Generate ADMIN_PASSWORD
const adminPassword = 'Wellness2024!' + crypto.randomBytes(8).toString('hex').toUpperCase() + '@';
console.log('\n👤 ADMIN_PASSWORD:');
console.log(adminPassword);

// Generate demo data
console.log('\n📧 DEMO_USER_EMAIL:');
console.log('demo@sezonoweDobro.pl');

console.log('\n🔒 DEMO_USER_PASSWORD:');
console.log('wellness123');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ GOTOWE! Skopiuj powyższe wartości do GitHub Secrets');
console.log('🌐 GitHub Secrets: https://github.com/daw21wq/sezonowe-dobro/settings/secrets/actions');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Lista wszystkich secrets do dodania
console.log('📝 KOMPLETNA LISTA SECRETS DO DODANIA:');
console.log('1. STRIPE_PUBLISHABLE_KEY (pobierz z Stripe Dashboard)');
console.log('2. STRIPE_SECRET_KEY (pobierz z Stripe Dashboard)');
console.log('3. STRIPE_WEBHOOK_SECRET (pobierz z Stripe Webhooks)');
console.log('4. STRIPE_MONTHLY_PRICE_ID (stwórz w Stripe Products)');
console.log('5. STRIPE_YEARLY_PRICE_ID (stwórz w Stripe Products)');
console.log('6. OPENAI_API_KEY (pobierz z OpenAI Platform)');
console.log('7. OPENAI_MODEL = gpt-4-turbo-preview');
console.log(`8. JWT_SECRET = ${jwtSecret}`);
console.log('9. APP_URL = https://twoja-domena.com');
console.log('10. DEMO_USER_EMAIL = demo@sezonoweDobro.pl');
console.log('11. DEMO_USER_PASSWORD = wellness123');
console.log('12. ADMIN_EMAIL = admin@sezonoweDobro.pl');
console.log(`13. ADMIN_PASSWORD = ${adminPassword}`);
console.log('14. SUPABASE_URL (pobierz z Supabase Dashboard)');
console.log('15. SUPABASE_ANON_KEY (pobierz z Supabase Dashboard)');
console.log('16. SUPABASE_SERVICE_KEY (pobierz z Supabase Dashboard)');

console.log('\n🎯 NASTĘPNE KROKI:');
console.log('1. Idź na GitHub Secrets (link powyżej)');
console.log('2. Kliknij "New repository secret"');
console.log('3. Dodaj każdy z 16 secrets powyżej');
console.log('4. Pobierz prawdziwe klucze Stripe, OpenAI i Supabase');
console.log('5. Uruchom: npm run deploy\n'); 