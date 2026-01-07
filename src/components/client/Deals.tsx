const Deals = () => {
  return (
    <section className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between gap-4">
          {/* Recipe of the Day */}
          <div className="w-[72%] h-[500px] border-2 border-green-600 font-sans">
            <h2 className="text-xl font-bold p-4 border-b">
              Recipe Of The Day
            </h2>

            <div className="flex">
              <img
                src="/media/img/Rabri Jalebi.png"
                alt="Rabri Jalebi"
                className="w-1/2 object-cover"
              />

              <div className="p-6 space-y-2">
                <span className="text-sm text-gray-500">FRUITS</span>
                <h2 className="text-2xl font-bold">Rabri Jalebi</h2>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-green-600">
                    190 Rs.
                  </span>
                  <del className="text-gray-400">250 Rs.</del>
                </div>

                <p className="font-semibold">Status: In Stock</p>

                <p className="mt-4 font-semibold">Expires in</p>

                <div className="flex gap-2 mt-2">
                  {["02", "09", "32", "02"].map((t, i) => (
                    <span
                      key={i}
                      className="text-2xl font-bold text-red-600 border px-4 py-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seller Section */}
          <div className="w-[27%] h-[500px] border overflow-hidden text-center font-sans">
            <div className="flex w-[300%] animate-[slide_30s_infinite]">
              {/* Slide */}
              {[
                {
                  title: "Top 20 Best Seller",
                  items: [
                    {
                      img: "/media/img/6.png",
                      name: "Homesoy Milk",
                      price: "390 Rs.",
                    },
                    {
                      img: "/media/img/4.png",
                      name: "MariGold",
                      price: "240 Rs.",
                    },
                    {
                      img: "/media/img/2.png",
                      name: "Pineapple",
                      price: "130 Rs.",
                    },
                    {
                      img: "/media/img/1.png",
                      name: "Organic Oranges",
                      price: "420 Rs.",
                    },
                  ],
                },
                {
                  title: "Buy 1 Get 1 Free",
                  items: [
                    {
                      img: "/media/img/3.png",
                      name: "Strawberries",
                      price: "390 Rs.",
                    },
                    {
                      img: "/media/img/5.png",
                      name: "Avocadoes",
                      price: "390 Rs.",
                    },
                    {
                      img: "/media/img/6.png",
                      name: "Australia Banana",
                      price: "390 Rs.",
                    },
                    {
                      img: "/media/img/7.png",
                      name: "Vita Coco",
                      price: "390 Rs.",
                    },
                  ],
                },
                {
                  title: "Top 20 Best Seller",
                  items: [
                    {
                      img: "/media/img/8.png",
                      name: "Homesoy Milk",
                      price: "390 Rs.",
                    },
                    {
                      img: "/media/img/9.png",
                      name: "MariGold",
                      price: "240 Rs.",
                    },
                    {
                      img: "/media/img/10.png",
                      name: "Pineapple",
                      price: "130 Rs.",
                    },
                    {
                      img: "/media/img/11.png",
                      name: "Organic Oranges",
                      price: "420 Rs.",
                    },
                  ],
                },
              ].map((slide, idx) => (
                <div key={idx} className="w-1/3 h-[500px] px-4">
                  <h3 className="font-bold text-lg my-4">
                    {slide.title}
                    <hr className="mt-2" />
                  </h3>

                  {slide.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border-b py-3"
                    >
                      <img src={item.img} className="w-2/5" />
                      <div className="text-left">
                        <h4 className="font-semibold">{item.name}</h4>
                        <span className="text-sm text-gray-600">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deals;
