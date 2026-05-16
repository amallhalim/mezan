// 🛡️ PRODUCTION-SAFE HUSKY INSTALLER
// Why: This script prevents Husky from trying to install in production or CI environments,
// which avoids errors when devDependencies (like Husky) are missing.

if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  console.log('🚀 Skipping Husky install (Production/CI)');
  process.exit(0);
}

try {
  const husky = (await import('husky')).default;
  console.log('🐕 Initializing Husky...');
  console.log(husky());
} catch (error) {
  console.error('⚠️ Could not initialize Husky:', error.message);
}
