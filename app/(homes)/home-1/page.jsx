import HomeMain from "@/components/home";
import { getPropertyFeatureData } from "@/api/frontend/property";
import { countPropertiesByCity, getCityWithPropertyPage } from "@/api/frontend/city";
import { getTestimonialTableData } from "@/api/frontend/testimonial";

export const metadata = {
  title: "Home || WeGrow",
  description: "WeGrow",
};

export default async function HomePage() {
  try {
    // Run requests in parallel to reduce wait time
    const [propertyRes, cityCountRes, testimonialRes, cityPageRes] = await Promise.all([
      getPropertyFeatureData(),
      countPropertiesByCity(),
      getTestimonialTableData(),
      getCityWithPropertyPage(),
    ]);

    const properties = propertyRes || [];
    const findcities = cityCountRes?.data || [];
    const testimonials = testimonialRes || [];
    const cities = cityPageRes?.data || [];

    return (
      <HomeMain
        properties={properties}
        findcities={findcities}
        testimonials={testimonials}
        cities={cities}
      />
    );
  } catch (error) {
    console.error("HomePage fetch error:", error);
    // Optionally: return an error fallback component here
    return <div className="text-center py-10">Failed to load homepage content.</div>;
  }
}

// const index = () => {
//   // const { showToast } = useToast();
//   return (
//     <>
//     {/* <button onClick={() => showToast("This is a custom toast!", "success")}>
//       Show Toast
//     </button> */}
//       <HomeMain />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });
