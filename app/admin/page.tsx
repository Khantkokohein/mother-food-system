export default function AdminPage() {
  return (
    <main className="adminPage">
      <aside className="adminSidebar">
        <div className="adminBrand">
          <img src="/logo.png" alt="Home Cooked by Mother" className="adminBrand__logo" />
          <div>
            <h2>Mother Admin</h2>
            <p>Restaurant System</p>
          </div>
        </div>

        <nav className="adminNav">
          <a href="/admin" className="adminNav__item adminNav__item--active">
            Dashboard
          </a>
          <a href="/admin/orders" className="adminNav__item">
            Orders
          </a>
          <a href="/admin/preorders" className="adminNav__item">
            Preorders
          </a>
          <a href="/admin/menu" className="adminNav__item">
            Menu
          </a>
          <a href="/admin/customers" className="adminNav__item">
            Customers
          </a>
          <a href="/admin/ai-orders" className="adminNav__item">
            AI Orders
          </a>
          <a href="/" className="adminNav__item">
            View Website
          </a>
        </nav>
      </aside>

      <section className="adminContent">
        <div className="adminTopbar">
          <div>
            <p className="adminTopbar__eyebrow">Overview</p>
            <h1>Restaurant Admin Dashboard</h1>
          </div>

          <a href="tel:09269666651" className="btn btn--primary">
            📞 Call Shop
          </a>
        </div>

        <section className="adminStats">
          <article className="adminStatCard">
            <span className="adminStatCard__label">Today Orders</span>
            <h3>24</h3>
            <p>+6 from yesterday</p>
          </article>

          <article className="adminStatCard">
            <span className="adminStatCard__label">Pending</span>
            <h3>8</h3>
            <p>Need confirmation</p>
          </article>

          <article className="adminStatCard">
            <span className="adminStatCard__label">Completed</span>
            <h3>16</h3>
            <p>Delivered today</p>
          </article>

          <article className="adminStatCard">
            <span className="adminStatCard__label">Revenue</span>
            <h3>54,000 Ks</h3>
            <p>Demo data</p>
          </article>
        </section>

        <section className="adminGrid">
          <div className="adminPanel">
            <div className="adminPanel__head">
              <div>
                <p className="adminPanel__eyebrow">Orders</p>
                <h2>Recent Orders</h2>
              </div>
              <a href="/admin/orders" className="adminTextLink">
                View All
              </a>
            </div>

            <div className="adminTableWrap">
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Food</th>
                    <th>Qty</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ko Aung</td>
                    <td>ကြာဇံဟင်းခါး</td>
                    <td>2</td>
                    <td>8:00 AM</td>
                    <td>
                      <span className="statusBadge statusBadge--new">New</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ma Su</td>
                    <td>အသုတ်</td>
                    <td>3</td>
                    <td>10:30 AM</td>
                    <td>
                      <span className="statusBadge statusBadge--confirmed">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ko Min</td>
                    <td>ထမင်းဟင်း</td>
                    <td>1</td>
                    <td>12:00 PM</td>
                    <td>
                      <span className="statusBadge statusBadge--preparing">
                        Preparing
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ma Thiri</td>
                    <td>အချိုရေ</td>
                    <td>4</td>
                    <td>2:00 PM</td>
                    <td>
                      <span className="statusBadge statusBadge--ready">Ready</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="adminSideStack">
            <div className="adminPanel">
              <div className="adminPanel__head">
                <div>
                  <p className="adminPanel__eyebrow">Menu</p>
                  <h2>Today Menu Status</h2>
                </div>
              </div>

              <div className="menuStatusList">
                <div className="menuStatusItem">
                  <div>
                    <h3>ကြာဇံဟင်းခါး</h3>
                    <p>2000 Ks</p>
                  </div>
                  <span className="availability availability--on">Available</span>
                </div>

                <div className="menuStatusItem">
                  <div>
                    <h3>အသုတ်</h3>
                    <p>1500 Ks</p>
                  </div>
                  <span className="availability availability--on">Available</span>
                </div>

                <div className="menuStatusItem">
                  <div>
                    <h3>ထမင်းဟင်း</h3>
                    <p>2500 Ks</p>
                  </div>
                  <span className="availability availability--off">Sold Out</span>
                </div>

                <div className="menuStatusItem">
                  <div>
                    <h3>အချိုရေ</h3>
                    <p>1000 Ks</p>
                  </div>
                  <span className="availability availability--on">Available</span>
                </div>
              </div>
            </div>

            <div className="adminPanel">
              <div className="adminPanel__head">
                <div>
                  <p className="adminPanel__eyebrow">AI Orders</p>
                  <h2>Quick Summary</h2>
                </div>
              </div>

              <div className="aiSummaryCard">
                <p>
                  AI preorder system ထည့်ပြီးနောက် customer order များကို
                  auto-structured format နဲ့ review လုပ်နိုင်ပါမယ်။
                </p>

                <div className="aiSummaryTags">
                  <span>Name</span>
                  <span>Food</span>
                  <span>Qty</span>
                  <span>Time</span>
                  <span>Allergy</span>
                  <span>Note</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}