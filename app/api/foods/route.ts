import { NextRequest, NextResponse } from "next/server";
import { FOODS, CATEGORIES } from "@/app/lib/data";

/**
 * GET /api/foods
 *
 * Query params:
 *  - search: filter foods by name (English or Arabic)
 *  - category: filter by category ID
 *
 * Examples:
 *  GET /api/foods                    → all foods
 *  GET /api/foods?search=chicken     → foods matching "chicken"
 *  GET /api/foods?category=1         → protein foods only
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const categoryId = searchParams.get("category");

  let results = [...FOODS];

  // Filter by category
  if (categoryId) {
    const catId = parseInt(categoryId, 10);
    const categoryExists = CATEGORIES.some((c) => c.id === catId);
    if (!categoryExists) {
      return NextResponse.json(
        { error: `Category ${categoryId} not found` },
        { status: 404 }
      );
    }
    results = results.filter((f) => f.categoryId === catId);
  }

  // Filter by search query
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (f) => f.name.toLowerCase().includes(q) || f.nameAr.includes(q)
    );
  }

  return NextResponse.json({
    foods: results,
    totalCount: results.length,
  });
}

/**
 * POST /api/foods
 *
 * Add a custom food item.
 * Body: { name, nameAr, caloriesPer100, proteinPer100, carbsPer100, fatPer100 }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.name || !body.caloriesPer100) {
      return NextResponse.json(
        { error: "Missing required fields: name, caloriesPer100" },
        { status: 400 }
      );
    }

    if (body.caloriesPer100 < 0) {
      return NextResponse.json(
        { error: "Calories cannot be negative" },
        { status: 400 }
      );
    }

    // Build the new food (in a real app you'd save to DB)
    const newFood = {
      id: `custom_${Date.now()}`,
      categoryId: body.categoryId || 1,
      name: body.name,
      nameAr: body.nameAr || "",
      icon: body.icon || "🍽️",
      caloriesPer100: body.caloriesPer100,
      proteinPer100: body.proteinPer100 || 0,
      carbsPer100: body.carbsPer100 || 0,
      fatPer100: body.fatPer100 || 0,
      sizeType: body.sizeType || ("FOOD" as const),
    };

    return NextResponse.json(newFood, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
