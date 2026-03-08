import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const formData = await req.formData();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  if (!id || !status) {
    redirect("/admin/orders");
  }

  await supabase.from("orders").update({ status }).eq("id", id);

  redirect("/admin/orders");
}