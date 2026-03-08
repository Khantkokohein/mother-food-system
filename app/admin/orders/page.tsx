import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type OrderRow = {
  id: string;
  customer_name: string | null;
  phone: string | null;
  food_item: string | null;
  quantity: string | null;
  pickup_time: string | null;
  allergy: string | null;
  remove_ingredients: string | null;
  note: string | null;
  status: string | null;
};

async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data as OrderRow[]) || [];
}

function groupOrders(orders: OrderRow[]) {
  return {
    newOrders: orders.filter((o) => (o.status || "new") === "new"),
    cookingOrders: orders.filter((o) => o.status === "cooking"),
    doneOrders: orders.filter((o) => o.status === "done"),
  };
}

function OrderCard({
  order,
  actionLabel,
  actionStatus,
}: {
  order: OrderRow;
  actionLabel?: string;
  actionStatus?: string;
}) {
  return (
    <article className="simpleOrderCard">
      <div className="simpleOrderCard__top">
        <div>
          <h3>{order.customer_name || "No Name"}</h3>
          <p>{order.food_item || "-"}</p>
        </div>

        <a href={`tel:${order.phone || ""}`} className="callMiniBtn">
          Call
        </a>
      </div>

      <div className="simpleOrderMeta">
        <span>Qty: {order.quantity || "-"}</span>
        <span>Time: {order.pickup_time || "-"}</span>
      </div>

      {order.remove_ingredients ? (
        <p className="simpleOrderNote">
          မထည့်ရန်: {order.remove_ingredients}
        </p>
      ) : null}

      {order.allergy ? (
        <p className="simpleOrderNote">Allergy: {order.allergy}</p>
      ) : null}

      {order.note ? (
        <p className="simpleOrderNote">Note: {order.note}</p>
      ) : null}

      {actionLabel && actionStatus ? (
        <form action="/api/order-status" method="POST" className="simpleOrderForm">
          <input type="hidden" name="id" value={order.id} />
          <input type="hidden" name="status" value={actionStatus} />
          <button type="submit" className="simpleStatusBtn">
            {actionLabel}
          </button>
        </form>
      ) : null}
    </article>
  );
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  const { newOrders, cookingOrders, doneOrders } = groupOrders(orders);

  return (
    <main className="simpleAdminPage">
      <header className="simpleAdminHeader">
        <div>
          <p className="simpleAdminHeader__eyebrow">Phone Admin</p>
          <h1>Orders</h1>
        </div>

        <form action="/api/auth/logout" method="POST">
          <input type="hidden" name="role" value="admin" />
          <button type="submit" className="simpleBackBtn">
            Logout
          </button>
        </form>
      </header>

      <section className="simpleAdminSection">
        <div className="simpleAdminSection__head">
          <h2>New Orders</h2>
          <span>{newOrders.length}</span>
        </div>

        <div className="simpleOrderList">
          {newOrders.length === 0 ? (
            <div className="emptyState">No new orders</div>
          ) : (
            newOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                actionLabel="Cooking"
                actionStatus="cooking"
              />
            ))
          )}
        </div>
      </section>

      <section className="simpleAdminSection">
        <div className="simpleAdminSection__head">
          <h2>Cooking</h2>
          <span>{cookingOrders.length}</span>
        </div>

        <div className="simpleOrderList">
          {cookingOrders.length === 0 ? (
            <div className="emptyState">No cooking orders</div>
          ) : (
            cookingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                actionLabel="Done"
                actionStatus="done"
              />
            ))
          )}
        </div>
      </section>

      <section className="simpleAdminSection">
        <div className="simpleAdminSection__head">
          <h2>Done</h2>
          <span>{doneOrders.length}</span>
        </div>

        <div className="simpleOrderList">
          {doneOrders.length === 0 ? (
            <div className="emptyState">No done orders</div>
          ) : (
            doneOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </section>
    </main>
  );
}