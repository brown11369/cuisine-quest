const slides = [
  {
    title: (
      <>
        Get <span className="text-primary">25%</span> Discount
      </>
    ),
    text: "Subscribe to the Martfury mailing list to receive updates on new arrivals, special offers and promotions.",
    image: "/media/img/rvslider1.png",
  },
  {
    title: <span className="text-primary">Maharaja Bhog</span>,
    text: "Subscribe to Shokumofry || Maharaja Bhog at your fingertips.",
    image: "/media/img/rvslider4.png",
  },
  {
    title: "Got a Joy?",
    text: "Combo super discount",
    image: "/media/img/rvslider2.png",
    lightText: true,
  },
  {
    title: (
      <>
        Get <span className="text-primary">25%</span> Discount
      </>
    ),
    text: "Subscribe to the Martfury mailing list to receive updates on new arrivals, special offers and promotions.",
    image: "/media/img/rvslider3.png",
  },
  {
    title: (
      <>
        Get <span className="text-primary">25%</span> Discount
      </>
    ),
    text: "Subscribe to the Martfury mailing list to receive updates on new arrivals, special offers and promotions.",
    image: "/media/img/rvslider1.png",
  },
];

const Banner = () => {
  return (
    <section className="relative h-[360px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 animate-fade-slide"
          style={{
            animationDelay: `${index * 6}s`,
            backgroundImage: `url(${slide.image})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center px-8 md:px-20">
            <div className="max-w-md space-y-4">
              <h1 className="text-3xl font-bold md:text-5xl">{slide.title}</h1>
              <p
                className={`text-sm md:text-base ${
                  slide.lightText ? "text-white" : "text-muted-foreground"
                }`}
              >
                {slide.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Banner;
