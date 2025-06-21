import Image from "next/image";
const PropertyFeatures = ({property}) => {
  // const propertyFeatures = [
  //   {
  //     id: 1,
  //     list: ["Air Conditioning", "Barbeque", "Dryer", "Gym", "Laundry"],
  //   },
  //   {
  //     id: 2,
  //     list: ["Lawn", "Microwave", "Outdoor Shower", "Refrigerator", "Sauna"],
  //   },
  //   {
  //     id: 3,
  //     list: ["Swimming Pool", "TV Cable", "Washer", "WiFi", "Window Coverings"],
  //   },
  // ];
  return (
    <>
      {/* {property.amenityid?.map((item) => ( */}
        <div className="" >
          <ul className="order_list list-inline-item row">
            {property.amenityid?.map((val, i) => (
              <li className="col-sm-6 col-md-6 col-lg-4" key={i}>
                {/* <span className="flaticon-tick"></span> */}
                 <div className="thumb">
                  <Image
                    // src="/assets/images/property/gym.svg"
                    // alt="pc1.jpg"
                    src={
                      val.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}${val.image}`
                        : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/property/thumbnail.svg`
                    }
                    alt={val.title}
                    unoptimized
                    fill
                    className="amenity-icon"
                    />
                </div>
                {val?.title}
              </li>
            ))}
          </ul>
        </div>
      {/* ))} */}
    </>
  );
};

export default PropertyFeatures;
