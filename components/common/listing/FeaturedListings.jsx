import Link from "next/link";
// import featureContent from "../../../data/properties";
import Image from "next/image";

const FeaturedListings = ({properties}) => {
  return (
    <>
      {properties?.slice(0, 3).map((item) => (
        <div className="media d-flex" key={item._id}>
          <Link href={`/property-detail/${item.slug}`}>
            <Image
              width={102}
              height={80}
              className="align-self-start me-3 w-100 h-100 cover"
              src={
                item.featuredimageurl
                  ? `${process.env.NEXT_PUBLIC_API_URL}${item.featuredimageurl}`
                  : "/default-placeholder.jpg"
              }
              alt= {`${item.title}`}
              unoptimized
            />
          </Link>

          <div className="media-body">
            <h5 className="mt-0 post_title">
              <Link href={`/property-detail/${item.slug}`}>{item.title}</Link>
            </h5>
            <Link href={`/property-detail/${item.slug}`}>
              {item.price}
              
            </Link>

            <ul className="mb0">
                <li key={1} className="list-inline-item">
                Beds: {item.bedrooms}
                </li>
                <li key={2} className="list-inline-item">
                Baths: {item.bathrooms}
                </li>
                <li key={3} className="list-inline-item">
                {item.sizeprefix}: {item.areasize}
                </li>
                
                
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
