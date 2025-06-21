'use client'

import Image from "next/image";
import Slider from "react-slick";

const Partners = () => {
  const partnersImages = ["adani", "aipl", "ambience", "conscient", "emaar", "godrej", "centralpark", "dlf", "elan", "m3m", "mahindra", "omaxe2", "shapoorji"];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5, // adjust based on your design
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {partnersImages.map((val, i) => (
        <div className="item" key={i}>
          <div className="our_partner text-center">
            <Image
              width={150}
              height={150}
              className="contain"
              src={`/assets/images/partners/${val}.webp`}
              alt={`${val} logo`}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Partners;








