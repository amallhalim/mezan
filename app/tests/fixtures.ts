/**
 * 📦 TEST FIXTURES
 * 
 * Why use this file?
 * 1. Single Source of Truth: If your data structure changes, you only fix it here.
 * 2. Reusability: Share the same mock data between multiple test files.
 * 3. Readability: Keeps your test files clean and focused on logic.
 */

export const mockFoodData = {
  name: 'Chicken Breast',
  nameAr: 'صدر دجاج',
  caloriesPer100: 165,
  proteinPer100: 31,
  carbsPer100: 4,
  fatPer100: 3.6,
  icon: '🐔',
};

export const mockPlateData = [
  { ...mockFoodData, id: '1', amount: 100 },
  { name: 'White Rice', caloriesPer100: 130, id: '2', amount: 150 }
];
