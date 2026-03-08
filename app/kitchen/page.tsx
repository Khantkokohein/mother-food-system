"use client";

import { useEffect, useRef, useState } from "react";

type OrderRow = {
  id: string;
  customer_name: string | null;
  food_item: string | null;
  quantity: string | null;
  pickup_time: string | null;
  allergy: string | null;
  remove_ingredients: string | null;
  note: string | null;
  status: string | null;
  created_at?: string | null;
};

function playBeep() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.38);
  } catch {}
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hasNewPulse, setHasNewPulse] = useState(false);

  const previousCountRef = useRef<number | null>(null);

  async function loadOrders(showLoading = false) {
    if (showLoading) setLoading(true);

    try {
      const res = await fetch("/api/kitchen-orders", {
        method: "GET",
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to load kitchen orders");
      }

      const nextOrders: OrderRow[] = result.orders || [];
      const nextCount = nextOrders.length;
      const prevCount = previousCountRef.current;

      if (prevCount !== null && nextCount > prevCount) {
        setHasNewPulse(true);

        if (soundEnabled) {
          playBeep();
        }

        setTimeout(() => {
          setHasNewPulse(false);
        }, 2200);
      }

      previousCountRef.current = nextCount;
      setOrders(nextOrders);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "kitchen" }),
    });

    window.location.href = "/kitchen-login";
  }

  useEffect(() => {
    loadOrders(true);

    const interval = setInterval(() => {
      loadOrders(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const activeCount = orders.length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fbf7ef 0%, #f7f0e3 100%)",
        padding: "16px",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#5b3517",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            background: "rgba(255,252,247,0.92)",
            border: "1px solid rgba(139,99,61,0.14)",
            borderRadius: "24px",
            padding: "18px",
            boxShadow: "0 20px 60px rgba(98,64,31,0.10)",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "14px",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 6px",
                  color: "#c86a2d",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Kitchen Mode
              </p>

              <h1
                style={{
                  margin: 0,
                  fontSize: "34px",
                  lineHeight: 1.1,
                  fontWeight: 800,
                }}
              >
                🍳 Kitchen Orders
              </h1>
            </div>

            <div
              style={{
                minWidth: "42px",
                height: "42px",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: hasNewPulse
                  ? "linear-gradient(180deg, #da7e3d, #c86a2d)"
                  : "rgba(240,196,87,0.18)",
                color: hasNewPulse ? "#fff" : "#5b3517",
                fontWeight: 800,
                fontSize: "16px",
                boxShadow: hasNewPulse
                  ? "0 0 0 8px rgba(218,126,61,0.12)"
                  : "none",
                transition: "all 0.25s ease",
              }}
            >
              {activeCount}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "10px",
            }}
          >
            <button
              onClick={() => setSoundEnabled((v) => !v)}
              style={{
                width: "100%",
                minHeight: "50px",
                border: 0,
                borderRadius: "16px",
                background: soundEnabled
                  ? "linear-gradient(180deg, #da7e3d, #c86a2d)"
                  : "linear-gradient(180deg, #f0c457, #e4b845)",
                color: soundEnabled ? "#fff" : "#603712",
                fontSize: "15px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {soundEnabled ? "🔔 Sound On" : "🔕 Tap to Enable Sound"}
            </button>

            <button
              onClick={() => loadOrders(false)}
              style={{
                width: "100%",
                minHeight: "46px",
                borderRadius: "14px",
                border: "1px solid rgba(139,99,61,0.14)",
                background: "rgba(255,255,255,0.84)",
                color: "#5b3517",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Refresh Now
            </button>

            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                minHeight: "46px",
                borderRadius: "14px",
                border: "1px solid rgba(139,99,61,0.14)",
                background: "rgba(255,255,255,0.84)",
                color: "#5b3517",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>

          <div
            style={{
              marginTop: "12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "34px",
                padding: "6px 12px",
                borderRadius: "999px",
                background: "rgba(142,164,90,0.14)",
                color: "#5f7135",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Auto refresh: 5s
            </span>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "34px",
                padding: "6px 12px",
                borderRadius: "999px",
                background: "rgba(240,196,87,0.18)",
                color: "#5b3517",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Last update: {lastUpdated || "-"}
            </span>
          </div>
        </section>

        {loading ? (
          <div
            style={{
              padding: "22px",
              borderRadius: "22px",
              border: "1px solid rgba(139,99,61,0.14)",
              background: "rgba(255,255,255,0.82)",
              textAlign: "center",
              fontWeight: 700,
              boxShadow: "0 20px 60px rgba(98,64,31,0.10)",
            }}
          >
            Loading kitchen orders...
          </div>
        ) : orders.length === 0 ? (
          <div
            style={{
              padding: "28px 18px",
              borderRadius: "22px",
              border: "1px dashed rgba(139,99,61,0.22)",
              background: "rgba(255,255,255,0.72)",
              textAlign: "center",
              fontWeight: 800,
              color: "#8b633d",
              boxShadow: "0 20px 60px rgba(98,64,31,0.08)",
            }}
          >
            No active kitchen orders
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            {orders.map((order, index) => (
              <article
                key={order.id}
                style={{
                  padding: "18px",
                  borderRadius: "24px",
                  border: "1px solid rgba(139,99,61,0.14)",
                  background: "rgba(255,255,255,0.88)",
                  boxShadow: "0 20px 60px rgba(98,64,31,0.10)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#c86a2d",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Order #{index + 1}
                    </div>

                    <h2
                      style={{
                        margin: 0,
                        fontSize: "24px",
                        lineHeight: 1.15,
                        fontWeight: 800,
                      }}
                    >
                      {order.food_item || "-"}
                    </h2>

                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#5b3517",
                      }}
                    >
                      {order.customer_name || "No Name"}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "64px",
                      minHeight: "42px",
                      padding: "0 12px",
                      borderRadius: "999px",
                      background:
                        order.status === "cooking"
                          ? "rgba(218,126,61,0.16)"
                          : "rgba(240,196,87,0.18)",
                      color:
                        order.status === "cooking" ? "#9b4e1b" : "#8b620f",
                      fontSize: "13px",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {(order.status || "new").toUpperCase()}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "14px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: "38px",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      background: "rgba(142,164,90,0.14)",
                      color: "#5f7135",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Qty: {order.quantity || "-"}
                  </span>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: "38px",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      background: "rgba(240,196,87,0.18)",
                      color: "#5b3517",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Time: {order.pickup_time || "-"}
                  </span>
                </div>

                {order.remove_ingredients ? (
                  <p
                    style={{
                      margin: "14px 0 0",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "#8b633d",
                      fontWeight: 700,
                    }}
                  >
                    မထည့်ရန်: {order.remove_ingredients}
                  </p>
                ) : null}

                {order.allergy ? (
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "#b2452f",
                      fontWeight: 700,
                    }}
                  >
                    Allergy: {order.allergy}
                  </p>
                ) : null}

                {order.note ? (
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "#8b633d",
                    }}
                  >
                    Note: {order.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}