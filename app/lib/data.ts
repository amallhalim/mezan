export interface SizePreset {
    id: string;
    label: string;
    amount: number;
    unit: 'g' | 'ml' | 'pc';
    icon: string;
}

export const SIZE_PRESETS: Record<string, SizePreset[]> = {
    FOOD: [
        { id: 'tiny', label: "Tiny", amount: 50, unit: "g", icon: "🤏" },
        { id: 'small', label: "Small", amount: 100, unit: "g", icon: "🥄" },
        { id: 'medium', label: "Medium", amount: 200, unit: "g", icon: "🍽️" },
        { id: 'large', label: "Large", amount: 300, unit: "g", icon: "🍲" },
        { id: 'xl', label: "XL", amount: 450, unit: "g", icon: "🍱" },
    ],
    DRINK: [
        { id: 'small', label: "Small", amount: 200, unit: "ml", icon: "☕" },
        { id: 'medium', label: "Medium", amount: 330, unit: "ml", icon: "🥤" },
        { id: 'large', label: "Large", amount: 500, unit: "ml", icon: "🥛" },
        { id: 'xl', label: "XL", amount: 1000, unit: "ml", icon: "🏺" },
    ],
    UNIT: [
        { id: 'half', label: "Half", amount: 0.5, unit: "pc", icon: "0.5" },
        { id: 'one', label: "1 Unit", amount: 1, unit: "pc", icon: "1" },
        { id: 'two', label: "2 Units", amount: 2, unit: "pc", icon: "2" },
        { id: 'three', label: "3 Units", amount: 3, unit: "pc", icon: "3" },
    ]
};

export interface Category {
    id: number;
    name: string;
    nameAr: string;
    icon: string;
}

export interface Food {
    id: string;
    categoryId: number; // Foreign Key to Category
    name: string;
    nameAr: string;
    icon: string;
    caloriesPer100: number;
    proteinPer100: number;
    carbsPer100: number;
    fatPer100: number;
    sizeType: 'FOOD' | 'DRINK' | 'UNIT';
    isRawCookedToggle?: boolean;
    weightPerUnit?: number; // Optional: grams per piece
}

export const CATEGORIES: Category[] = [
    { id: 1, name: "Proteins", nameAr: "بروتينات", icon: "🥩" },
    { id: 2, name: "Middle East Staples", nameAr: "أكلات شعبية", icon: "🥙" },
    { id: 3, name: "Carbs", nameAr: "نشويات", icon: "🍚" },
    { id: 4, name: "Veggies & Fruits", nameAr: "خضروات وفاكهة", icon: "🥦" },
    { id: 5, name: "Desserts", nameAr: "حلويات", icon: "🥐" },
    { id: 6, name: "Drinks", nameAr: "مشروبات", icon: "☕" }
];

export const FOODS: Food[] = [
    // --- Proteins (Category 1) ---
    { id: "p1", categoryId: 1, name: "Chicken Breast", nameAr: "صدور دجاج", icon: "🍗", caloriesPer100: 165, proteinPer100: 31, carbsPer100: 0, fatPer100: 3.6, sizeType: "FOOD", isRawCookedToggle: true },
    { id: "p2", categoryId: 1, name: "Egg", nameAr: "بيض", icon: "🥚", caloriesPer100: 155, proteinPer100: 13, carbsPer100: 1.1, fatPer100: 11, sizeType: "UNIT", weightPerUnit: 50 },
    { id: "p4", categoryId: 1, name: "Beef (Lean)", nameAr: "لحم بقري", icon: "🥩", caloriesPer100: 250, proteinPer100: 26, carbsPer100: 0, fatPer100: 15, sizeType: "FOOD", isRawCookedToggle: true },
    { id: "me1", categoryId: 1, name: "Chicken Shawarma", nameAr: "شاورما دجاج", icon: "🌯", caloriesPer100: 220, proteinPer100: 18, carbsPer100: 12, fatPer100: 10, sizeType: "FOOD" },
    { id: "me2", categoryId: 1, name: "Beef Kofta", nameAr: "كفتة مشوية", icon: "🍢", caloriesPer100: 280, proteinPer100: 16, carbsPer100: 4, fatPer100: 22, sizeType: "FOOD" },
    { id: "me3", categoryId: 1, name: "Grilled Fish", nameAr: "سمك مشوي", icon: "🐟", caloriesPer100: 150, proteinPer100: 22, carbsPer100: 0, fatPer100: 6, sizeType: "FOOD" },
    { id: "me4", categoryId: 1, name: "Lentil Soup", nameAr: "شوربة عدس", icon: "🥣", caloriesPer100: 85, proteinPer100: 6, carbsPer100: 14, fatPer100: 1, sizeType: "FOOD" },
    { id: "me5", categoryId: 1, name: "Liver (Alexandrian)", nameAr: "كبدة إسكندراني", icon: "🥘", caloriesPer100: 210, proteinPer100: 24, carbsPer100: 4, fatPer100: 10, sizeType: "FOOD" },

    // --- Middle East Staples (Category 2) ---
    { id: "me6", categoryId: 2, name: "Ful Medames", nameAr: "فول مدمس", icon: "🥣", caloriesPer100: 110, proteinPer100: 8, carbsPer100: 20, fatPer100: 0.5, sizeType: "FOOD" },
    { id: "me7", categoryId: 2, name: "Falafel (Ta'ameya)", nameAr: "طعمية", icon: "🧆", caloriesPer100: 330, proteinPer100: 13, carbsPer100: 30, fatPer100: 18, sizeType: "UNIT", weightPerUnit: 25 },
    { id: "me8", categoryId: 2, name: "Koshary", nameAr: "كشري مصري", icon: "🥣", caloriesPer100: 180, proteinPer100: 6, carbsPer100: 35, fatPer100: 2, sizeType: "FOOD" },
    { id: "me9", categoryId: 2, name: "Molokhia", nameAr: "ملوخية", icon: "🥣", caloriesPer100: 45, proteinPer100: 3, carbsPer100: 6, fatPer100: 1, sizeType: "FOOD" },
    { id: "me10", categoryId: 2, name: "Mahshi (Grape Leaves)", nameAr: "محشي ورق عنب", icon: "🥬", caloriesPer100: 170, proteinPer100: 4, carbsPer100: 28, fatPer100: 5, sizeType: "FOOD" },
    { id: "me11", categoryId: 2, name: "Macarona Bechamel", nameAr: "مكرونة بالبشاميل", icon: "🍝", caloriesPer100: 240, proteinPer100: 12, carbsPer100: 24, fatPer100: 11, sizeType: "FOOD" },
    { id: "me12", categoryId: 2, name: "Hawawshi", nameAr: "حواوشي", icon: "🥙", caloriesPer100: 300, proteinPer100: 14, carbsPer100: 22, fatPer100: 18, sizeType: "FOOD" },

    // --- Carbs (Category 3) ---
    { id: "c1", categoryId: 3, name: "White Rice", nameAr: "أرز أبيض", icon: "🍚", caloriesPer100: 130, proteinPer100: 2.7, carbsPer100: 28, fatPer100: 0.3, sizeType: "FOOD", isRawCookedToggle: true },
    { id: "c2", categoryId: 3, name: "Potato", nameAr: "بطاطس", icon: "🥔", caloriesPer100: 77, proteinPer100: 2, carbsPer100: 17, fatPer100: 0.1, sizeType: "FOOD" },
    { id: "me13", categoryId: 3, name: "Baladi Bread", nameAr: "عيش بلدي", icon: "🫓", caloriesPer100: 250, proteinPer100: 9, carbsPer100: 52, fatPer100: 1, sizeType: "UNIT", weightPerUnit: 90 },
    { id: "c4", categoryId: 3, name: "Oats", nameAr: "شوفان", icon: "🥣", caloriesPer100: 389, proteinPer100: 16.9, carbsPer100: 66, fatPer100: 6.9, sizeType: "FOOD" },
    { id: "c11", categoryId: 3, name: "Vermicelli Rice", nameAr: "أرز بالشعيرية", icon: "🍚", caloriesPer100: 150, proteinPer100: 3, carbsPer100: 30, fatPer100: 2, sizeType: "FOOD" },

    // --- Veggies & Fruits (Category 4) ---
    { id: "v1", categoryId: 4, name: "Broccoli", nameAr: "بروكلي", icon: "🥦", caloriesPer100: 34, proteinPer100: 2.8, carbsPer100: 7, fatPer100: 0.4, sizeType: "FOOD" },
    { id: "v2", categoryId: 4, name: "Spinach", nameAr: "سبانخ", icon: "🍃", caloriesPer100: 23, proteinPer100: 2.9, carbsPer100: 3.6, fatPer100: 0.4, sizeType: "FOOD" },
    { id: "fr1", categoryId: 4, name: "Apple", nameAr: "تفاح", icon: "🍎", caloriesPer100: 52, proteinPer100: 0.3, carbsPer100: 14, fatPer100: 0.2, sizeType: "UNIT", weightPerUnit: 180 },
    { id: "fr8", categoryId: 4, name: "Orange", nameAr: "برتقال", icon: "🍊", caloriesPer100: 47, proteinPer100: 0.9, carbsPer100: 12, fatPer100: 0.1, sizeType: "UNIT", weightPerUnit: 150 },
    { id: "me14", categoryId: 4, name: "Dates", nameAr: "بلح / تمر", icon: "🌴", caloriesPer100: 280, proteinPer100: 2, carbsPer100: 75, fatPer100: 0.4, sizeType: "UNIT", weightPerUnit: 10 },

    // --- Desserts (Category 5) ---
    { id: "me31", categoryId: 5, name: "Baklava", nameAr: "بقلاوة", icon: "🥮", caloriesPer100: 430, proteinPer100: 6, carbsPer100: 50, fatPer100: 25, sizeType: "FOOD" },




    { id: "me15", categoryId: 5, name: "Kunafa", nameAr: "كنافة", icon: "🍯", caloriesPer100: 450, proteinPer100: 5, carbsPer100: 60, fatPer100: 22, sizeType: "FOOD" },
    { id: "me16", categoryId: 5, name: "Basbousa", nameAr: "بسبوسة", icon: "🍰", caloriesPer100: 380, proteinPer100: 4, carbsPer100: 55, fatPer100: 18, sizeType: "FOOD" },
    { id: "me17", categoryId: 5, name: "Om Ali", nameAr: "أم علي", icon: "🥣", caloriesPer100: 320, proteinPer100: 8, carbsPer100: 35, fatPer100: 18, sizeType: "FOOD" },
    { id: "me18", categoryId: 5, name: "Rice Pudding", nameAr: "أرز باللبن", icon: "🥣", caloriesPer100: 140, proteinPer100: 4, carbsPer100: 22, fatPer100: 4, sizeType: "FOOD" },

    // --- Drinks (Category 6) ---
    { id: "me19", categoryId: 6, name: "Hibiscus (Karkadeh)", nameAr: "كركديه", icon: "🌺", caloriesPer100: 35, proteinPer100: 0, carbsPer100: 9, fatPer100: 0, sizeType: "DRINK" },
    { id: "me20", categoryId: 6, name: "Sahlab", nameAr: "سحلب", icon: "🥛", caloriesPer100: 120, proteinPer100: 3, carbsPer100: 20, fatPer100: 4, sizeType: "DRINK" },
    { id: "me21", categoryId: 6, name: "Turkish Coffee", nameAr: "قهوة تركي", icon: "☕", caloriesPer100: 5, proteinPer100: 0.5, carbsPer100: 0.5, fatPer100: 0, sizeType: "DRINK" },
    { id: "me22", categoryId: 6, name: "Mango Juice", nameAr: "عصير مانجو", icon: "🥭", caloriesPer100: 60, proteinPer100: 0.5, carbsPer100: 15, fatPer100: 0, sizeType: "DRINK" },
    { id: "d2", categoryId: 6, name: "Milk (Whole)", nameAr: "لبن كامل الدسم", icon: "🥛", caloriesPer100: 61, proteinPer100: 3.2, carbsPer100: 4.8, fatPer100: 3.3, sizeType: "DRINK" },
];

// Helper for backward compatibility (maps flat foods back into categories for UI)
export const category = CATEGORIES.map(cat => ({
    ...cat,
    name: `${cat.name} | ${cat.nameAr}`,
    foods: FOODS.filter(food => food.categoryId === cat.id)
}));
