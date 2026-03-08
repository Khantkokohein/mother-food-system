"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    food: "",
    qty: "",
    time: "",
    allergy: "",
    remove: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Submit failed");
      }

      setMessage("မှာယူမှုအတွက် ကျေးဇူးတင်ပါသည်။ Order တင်ပြီးပါပြီ။");

      setForm({
        name: "",
        phone: "",
        food: "",
        qty: "",
        time: "",
        allergy: "",
        remove: "",
        note: "",
      });
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "တစ်ခုခုမှားနေပါတယ်။";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="hero__card">
          <div className="hero__logoWrap">
            <img
              src="/logo.png"
              alt="Home Cooked by Mother"
              className="hero__logo"
            />
          </div>

          <div className="hero__badge">Fresh Homemade Meals</div>

          <h1 className="hero__title">Home Cooked by Mother</h1>

          <p className="hero__text">
            နေ့စဉ်အိမ်ချက်ဟင်းလျာများကို ဖုန်းဆက်၍ဖြစ်စေ၊ ကြိုတင်မှာယူ၍ဖြစ်စေ
            လွယ်ကူစွာမှာယူနိုင်ပါသည်။
          </p>

          <div className="hero__actions">
            <a href="tel:09269666651" className="btn btn--primary">
              📞 Call to Order
            </a>
            <a href="#preorder" className="btn btn--secondary">
              📝 Preorder Now
            </a>
          </div>

          <div className="hero__meta">
            <div className="metaCard">
              <div className="metaCard__icon">📍</div>
              <div>
                <h3>Mawlamyine</h3>
                <p>ရပ်ကွက်အတွင်း ပို့ဆောင်နိုင်</p>
              </div>
            </div>

            <div className="metaCard">
              <div className="metaCard__icon">⏰</div>
              <div>
                <h3>Open Daily</h3>
                <p>7:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <span className="sectionHead__eyebrow">Today&apos;s Selection</span>
          <h2 className="sectionHead__title">Today&apos;s Homemade Menu</h2>
          <p className="sectionHead__text">
            ဒီနေ့ရရှိနိုင်သော အိမ်ချက်ဟင်းလျာများ
          </p>
        </div>

        <div className="menuGrid">
          <article className="menuCard">
            <div className="menuCard__emoji menuCard__emoji--one">🍜</div>
            <div className="menuCard__content">
              <h3>ကြာဇံဟင်းခါး</h3>
              <p>ပူပူနွေးနွေး အိမ်ချက်အရသာ</p>
              <div className="menuCard__bottom">
                <span className="priceTag">2000 Ks</span>
                <a href="tel:09269666651" className="smallBtn">
                  Order
                </a>
              </div>
            </div>
          </article>

          <article className="menuCard">
            <div className="menuCard__emoji menuCard__emoji--two">🥗</div>
            <div className="menuCard__content">
              <h3>အသုတ်</h3>
              <p>သန့်ရှင်းပြီး စားချင်စဖွယ်</p>
              <div className="menuCard__bottom">
                <span className="priceTag">1500 Ks</span>
                <a href="tel:09269666651" className="smallBtn">
                  Order
                </a>
              </div>
            </div>
          </article>

          <article className="menuCard">
            <div className="menuCard__emoji menuCard__emoji--three">🍛</div>
            <div className="menuCard__content">
              <h3>ထမင်းဟင်း</h3>
              <p>နေ့လယ်စာ / ညစာအတွက် အဆင်ပြေ</p>
              <div className="menuCard__bottom">
                <span className="priceTag">2500 Ks</span>
                <a href="tel:09269666651" className="smallBtn">
                  Order
                </a>
              </div>
            </div>
          </article>

          <article className="menuCard">
            <div className="menuCard__emoji menuCard__emoji--four">🥤</div>
            <div className="menuCard__content">
              <h3>အချိုရေ</h3>
              <p>အေးအေးဆေးဆေး သောက်လို့ကောင်း</p>
              <div className="menuCard__bottom">
                <span className="priceTag">1000 Ks</span>
                <a href="tel:09269666651" className="smallBtn">
                  Order
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <span className="sectionHead__eyebrow">Always Available</span>
          <h2 className="sectionHead__title">Preorder Favorites</h2>
          <p className="sectionHead__text">
            အမြဲကြိုတင်မှာယူနိုင်သော items များ
          </p>
        </div>

        <div className="favoriteList">
          <div className="favoritePill">ကြာဇံဟင်းခါး</div>
          <div className="favoritePill">အသုတ်</div>
          <div className="favoritePill">ထမင်းဟင်း</div>
          <div className="favoritePill">အချိုရေ</div>
          <div className="favoritePill">Combo Set</div>
        </div>
      </section>

      <section className="section">
        <div className="specialBanner">
          <div>
            <span className="sectionHead__eyebrow">Today Special</span>
            <h2 className="specialBanner__title">Combo Promotion</h2>
            <p className="specialBanner__text">
              ကြာဇံဟင်းခါး + အသုတ် ကို တစ်တွဲတည်းမှာယူသူများအတွက် အထူးစျေးနှုန်း
            </p>
          </div>

          <div className="specialBanner__side">
            <div className="specialBanner__price">3000 Ks</div>
            <a href="tel:09269666651" className="btn btn--secondary">
              Order Combo
            </a>
          </div>
        </div>
      </section>

      <section id="preorder" className="section">
        <div className="sectionHead">
          <span className="sectionHead__eyebrow">Preorder Form</span>
          <h2 className="sectionHead__title">Make a Preorder</h2>
          <p className="sectionHead__text">
            ကြိုတင်မှာယူလိုသော အချက်အလက်များ ဖြည့်ပါ
          </p>
        </div>

        <div className="formCard">
          <form className="form" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="name">နာမည်</label>
              <input
                id="name"
                type="text"
                placeholder="ဥပမာ - Ko Aung"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="phone">ဖုန်းနံပါတ်</label>
              <input
                id="phone"
                type="tel"
                placeholder="09xxxxxxxxx"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="food">မှာယူလိုသော အစားအစာ</label>
              <input
                id="food"
                type="text"
                placeholder="ဥပမာ - ကြာဇံဟင်းခါး"
                value={form.food}
                onChange={(e) => setForm({ ...form, food: e.target.value })}
                required
              />
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="qty">အရေအတွက်</label>
                <input
                  id="qty"
                  type="text"
                  placeholder="ဥပမာ - ၂ ပွဲ"
                  value={form.qty}
                  onChange={(e) => setForm({ ...form, qty: e.target.value })}
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="time">ယူလိုသော အချိန်</label>
                <input
                  id="time"
                  type="text"
                  placeholder="ဥပမာ - မနက် ၈ နာရီ"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="allergy">ဓာတ်မတည့်သော အရာများ</label>
              <input
                id="allergy"
                type="text"
                placeholder="ဥပမာ - ပုဇွန် / ငါးငံပြာရည်"
                value={form.allergy}
                onChange={(e) => setForm({ ...form, allergy: e.target.value })}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="remove">မထည့်စေချင်သော ပစ္စည်းများ</label>
              <input
                id="remove"
                type="text"
                placeholder="ဥပမာ - ကြက်သွန်နီ မထည့်ပါ"
                value={form.remove}
                onChange={(e) => setForm({ ...form, remove: e.target.value })}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="note">အခြားမှတ်ချက်</label>
              <textarea
                id="note"
                rows={4}
                placeholder="ဥပမာ - ပိုချိုချင်တယ် / ပိုစပ်ချင်တယ်"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Preorder"}
            </button>

            {message ? <p className="submitMessage">{message}</p> : null}

            <p className="formNote">
              ဖောင်ဖြည့်ပြီး Submit နှိပ်လိုက်ပါက order ကို database ထဲသို့
              သိမ်းပါမည်။
            </p>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="contactGrid">
          <div className="contactCard">
            <div className="contactCard__icon">📞</div>
            <h3>Call</h3>
            <p>09269666651</p>
          </div>

          <div className="contactCard">
            <div className="contactCard__icon">📍</div>
            <h3>Location</h3>
            <p>Mawlamyine</p>
          </div>

          <div className="contactCard">
            <div className="contactCard__icon">🚚</div>
            <h3>Delivery</h3>
            <p>ရပ်ကွက်အတွင်း ပို့ဆောင်နိုင်</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__brand">
          <img
            src="/logo.png"
            alt="Home Cooked by Mother"
            className="footer__logo"
          />
          <div>
            <h3>Home Cooked by Mother</h3>
            <p>Homemade Food, Made with Care</p>
          </div>
        </div>

        <div className="footer__links">
          <a href="tel:09269666651">Call Now</a>
          <a href="#preorder">Preorder</a>
        </div>
      </footer>

      <a href="tel:09269666651" className="floatingCall">
        📞 Call Now
      </a>
    </main>
  );
}