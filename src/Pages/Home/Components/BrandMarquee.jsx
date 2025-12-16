import Marquee from "react-fast-marquee";
import { Fade } from "react-awesome-reveal";

const brands = [
  {
    name: "Nike",
    logo: "/marquee/nike.png",
  },
  {
    name: "Apple",
    logo: "/marquee/apple.png",
  },
  {
    name: "Samsung",
    logo: "/marquee/samsung.png",
  },
  {
    name: "Adidas",
    logo: "/marquee/adidas.png",
  },
  {
    name: "Sony",
    logo: "/marquee/sony.png",
  },
  {
    name: "LG",
    logo: "/marquee/lg.png",
  },
];

const BrandMarquee = () => {
  return (
    <section className="py-20 bg-base-100 border-y border-secondary ">
      <div className="container mx-auto mb-8">
        <Fade direction="up" triggerOnce>
          <div className="text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Trusted Partners
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary mt-2">
              Shop From Top Brands
            </h2>
          </div>
        </Fade>
      </div>

      <Marquee
        gradient
        gradientColor="#EFECE3"
        gradientWidth={100}
        speed={40}
        pauseOnHover
        className="container mx-auto"
      >
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="mx-12 flex items-center justify-center h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-h-12 max-w-30 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandMarquee;