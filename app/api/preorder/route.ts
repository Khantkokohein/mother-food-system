import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, food, qty, time, allergy, remove, note } = body;

    if (!name || !phone || !food || !qty || !time) {
      return Response.json(
        { error: "လိုအပ်သော အချက်အလက်များ မပြည့်စုံသေးပါ။" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: name,
        phone,
        food_item: food,
        quantity: qty,
        pickup_time: time,
        allergy,
        remove_ingredients: remove,
        note,
        status: "new",
      },
    ]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}