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
          {data &&
            data.map((item, index) => (
              <div className="dashboard-card" key={index}>
                <h2>{item.title}</h2>
                <p>{item.value}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
