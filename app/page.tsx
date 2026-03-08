"use client";

import { useEffect, useMemo, useState } from "react";

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

export default function HomePage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

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

  const visibleMenu = useMemo(() => {
    return menu.filter((item) => item.active);
  }, [menu]);

  function callNow() {
    window.location.href = `tel:${settings.phone.replace(/\s+/g, "")}`;
  }

  function preorderNow() {
    window.location.href = `tel:${settings.phone.replace(/\s+/g, "")}`;
  }

  return (
    <main className="mother-page">
      <section className="mother-shell">
        <div className="mother-card">
          <div className="mother-logo-box">
            <img src="/logo.png" alt="Home Cooked by Mother" className="mother-logo" />
          </div>

          <div className="mother-badge">{settings.heroBadge}</div>

          <h1 className="mother-title">{settings.heroTitle}</h1>

          <p className="mother-subtitle">{settings.heroSubtitle}</p>

          <div className="mother-actions">
            <button className="mother-btn mother-btn-call" onClick={callNow}>
              📞 Call to Order
            </button>

            <button className="mother-btn mother-btn-preorder" onClick={preorderNow}>
              📝 Preorder Now
            </button>
          </div>

          <section className="today-box">
            <h2 className="today-title">ယနေ့အစားအစာ</h2>

            {visibleMenu.length === 0 ? (
              <div className="empty-box">ယနေ့အစားအစာ မတင်ရသေးပါ</div>
            ) : (
              <div className="menu-list">
                {visibleMenu.map((item) => (
                  <div key={item.id} className="menu-item">
                    <div className="menu-left">
                      <h3 className="menu-name">{item.name}</h3>
                      <p className="menu-note">{item.note}</p>
                    </div>

                    <div className="menu-right">
                      <div className="menu-price">{item.price}</div>
                      {item.soldOut && <div className="sold-out-badge">Sold Out</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="bottom-call-wrap">
            <button className="bottom-call-btn" onClick={callNow}>
              📞 Call Now
            </button>
          </div>

          <div className="contact-box">
            <h3>ဆက်သွယ်ရန်</h3>
            <p>{settings.preorderText}</p>
            <p className="contact-phone">{settings.phone}</p>
          </div>
        </div>
      </section>
    </main>
  );
}