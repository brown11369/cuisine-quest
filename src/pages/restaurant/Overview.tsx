export default function Overview() {
  const data = [
    { title: "Publish Item", value: 340 },
    { title: "Purchased Item", value: "1,60740Rs." },
    { title: "Pending Orders", value: 40 },
    { title: "Sell Item", value: 760 },
  ];
  return (
    <>
      <div className="layout">
        <div className="layout-container">
          <div className="dashboard-card">
            <h2>Publish Item</h2>
            <p>340</p>
          </div>
          <div className="dashboard-card">
            <h2>Purchased Item</h2>
            <p>1,60740Rs.</p>
          </div>
          <div className="dashboard-card">
            <h2>Pending Orders</h2>
            <p>40</p>
          </div>
          <div className="dashboard-card">
            <h2>Sell Item</h2>
            <p>760</p>
          </div>
        </div>
      </div>
    </>
  );
}
