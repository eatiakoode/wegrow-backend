// import dynamic from "next/dynamic";
import GridV1 from "@/components/listing-grid/grid-v1";
import { getPropertyFilterData } from "@/api/frontend/property";

export const metadata = {
  title: 'Simple Listing – Grid V1 || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

// const index = () => {
//   return (
//     <>
//       <GridV1 />
//     </>
//   );
// };

// // export default dynamic(() => Promise.resolve(index), { ssr: false });

// export default index;
export default async function ListingPage({ searchParams }) {
  const filter = {
    keyword: searchParams.keyword || "",
    city: searchParams.city || "",
    category: searchParams.cat || "",
    propertytype: searchParams.propertytype || "",
    limit: 4,
    page: searchParams.page || 1,
  };

  const data = await getPropertyFilterData(filter);
  const properties = data?.items || [];
  const totalCount = data?.totalCount || 0;

  return <GridV1 properties={properties} totalCount={totalCount} filter={filter}/>;
}

