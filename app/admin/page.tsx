"use client";

import { useEffect, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  price: string;
  note: string;
  active: boolean;
  soldOut: boolean;
};

type SiteSettings = {
  phone: string;
  preorderText: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
};

const MENU_KEY = "mother_food_menu_v1";
const SETTINGS_KEY = "mother_food_settings_v1";
const ADMIN_PASSWORD = "mother2026";

const defaultMenu: MenuItem[] = [
  {
    id: "1",
    name: "ကြက်သားဟင်း",
    price: "6,000 Ks",
    note: "ပူပူနွေးနွေး",
    active: true,
    soldOut: false,
  },
  {
    id: "2",
    name: "ငါးဟင်း",
    price: "6,500 Ks",
    note: "အိမ်ချက်လက်ရာ",
    active: true,
    soldOut: false,
  },
  {
    id: "3",
    name: "အသီးအရွက်ကြော်",
    price: "3,500 Ks",
    note: "နေ့တိုင်းမတူ",
    active: true,
    soldOut: false,
  },
];

const defaultSettings: SiteSettings = {
  phone: "09 792 826 464",
  preorderText: "မှာယူရန် Messenger / ဖုန်းဖြင့် ဆက်သွယ်နိုင်ပါသည်",
  heroBadge: "Fresh Homemade Meals",
  heroTitle: "Home Cooked by Mother",
  heroSubtitle:
    "နေ့စဉ်အမေချက်ထားတဲ့လက်ရာများကို မိသားစုအရသာဖြင့်မှာယူစားသုံးနိုင်ပါသည်",
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  const [editingId, setEditingId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedMenu = localStorage.getItem(MENU_KEY);
    const savedSettings = localStorage.getItem(SETTINGS_KEY);

    if (savedMenu) {
      try {
        setMenu(JSON.parse(savedMenu));
      } catch {
        setMenu(defaultMenu);
      }
    } else {
      setMenu(defaultMenu);
    }

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch {
        setSettings(defaultSettings);
      }
    } else {
      setSettings(defaultSettings);
    }
  }, []);

  useEffect(() => {
    if (menu.length > 0) {
      localStorage.setItem(MENU_KEY, JSON.stringify(menu));
    }
  }, [menu]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setPassword("");
    } else {
      alert("Password မှားနေပါတယ်");
    }
  }

  function resetForm() {
    setEditingId("");
    setName("");
    setPrice("");
    setNote("");
  }

  function saveItem() {
    if (!name.trim() || !price.trim()) {
      alert("Item name နဲ့ price ဖြည့်ပါ");
      return;
    }

    if (editingId) {
      setMenu((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name,
                price,
                note,
              }
            : item
        )
      );
      resetForm();
      alert("Item updated");
      return;
    }

    const newItem: MenuItem = {
      id: createId(),
      name,
      price,
      note,
      active: true,
      soldOut: false,
    };

    setMenu((prev) => [newItem, ...prev]);
    resetForm();
    alert("Item added");
  }

  function editItem(item: MenuItem) {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setNote(item.note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteItem(id: string) {
    const ok = window.confirm("ဒီ item ကိုဖျက်မလား?");
    if (!ok) return;
    setMenu((prev) => prev.filter((item) => item.id !== id));
  }

  function toggleActive(id: string) {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  }

  function toggleSoldOut(id: string) {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, soldOut: !item.soldOut } : item
      )
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-shell">
        {!loggedIn ? (
          <div className="admin-login-card">
            <h1>Owner Login</h1>
            <p>ဒီနေရာက public မဟုတ်ပါ။ Password ဖြင့်ဝင်ပါ။</p>

            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
            />

            <button className="admin-primary-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        ) : (
          <div className="admin-panel">
            <div className="admin-topbar">
              <h1>Mother Food Admin</h1>
              <a href="/" className="admin-link-btn">
                Back Home
              </a>
            </div>

            <div className="admin-grid">
              <div className="admin-card">
                <h2>{editingId ? "Edit Today Item" : "Add Today Item"}</h2>

                <input
                  className="admin-input"
                  placeholder="အစားအစာအမည်"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="admin-input"
                  placeholder="စျေးနှုန်း"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <textarea
                  className="admin-textarea"
                  placeholder="မှတ်ချက်"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <div className="admin-actions-row">
                  <button className="admin-primary-btn" onClick={saveItem}>
                    {editingId ? "Update Item" : "Add Item"}
                  </button>

                  <button className="admin-secondary-btn" onClick={resetForm}>
                    Clear
                  </button>
                </div>
              </div>

              <div className="admin-card">
                <h2>Site Settings</h2>

                <input
                  className="admin-input"
                  placeholder="Hero badge"
                  value={settings.heroBadge}
                  onChange={(e) =>
                    setSettings({ ...settings, heroBadge: e.target.value })
                  }
                />

                <input
                  className="admin-input"
                  placeholder="Hero title"
                  value={settings.heroTitle}
                  onChange={(e) =>
                    setSettings({ ...settings, heroTitle: e.target.value })
                  }
                />

                <textarea
                  className="admin-textarea"
                  placeholder="Hero subtitle"
                  value={settings.heroSubtitle}
                  onChange={(e) =>
                    setSettings({ ...settings, heroSubtitle: e.target.value })
                  }
                />

                <input
                  className="admin-input"
                  placeholder="Phone number"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                />

                <textarea
                  className="admin-textarea"
                  placeholder="Preorder text"
                  value={settings.preorderText}
                  onChange={(e) =>
                    setSettings({ ...settings, preorderText: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="admin-card admin-list-card">
              <h2>Today Menu List</h2>

              {menu.length === 0 ? (
                <div className="admin-empty">Item မရှိသေးပါ</div>
              ) : (
                <div className="admin-list">
                  {menu.map((item) => (
                    <div key={item.id} className="admin-item-row">
                      <div className="admin-item-main">
                        <div className="admin-item-title">{item.name}</div>
                        <div className="admin-item-meta">
                          <span>{item.price}</span>
                          {item.note ? <span>• {item.note}</span> : null}
                        </div>
                        <div className="admin-item-flags">
                          <span className={item.active ? "flag-on" : "flag-off"}>
                            {item.active ? "Visible" : "Hidden"}
                          </span>
                          <span className={item.soldOut ? "flag-sold" : "flag-normal"}>
                            {item.soldOut ? "Sold Out" : "Available"}
                          </span>
                        </div>
                      </div>

                      <div className="admin-item-buttons">
                        <button onClick={() => editItem(item)}>Edit</button>
                        <button onClick={() => toggleActive(item.id)}>
                          {item.active ? "Hide" : "Show"}
                        </button>
                        <button onClick={() => toggleSoldOut(item.id)}>
                          {item.soldOut ? "Undo Sold" : "Sold Out"}
                        </button>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}