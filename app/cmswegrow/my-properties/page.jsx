import dynamic from "next/dynamic";
import MyProperties from "@/components/dashboard/my-properties";
import { getPropertyTableData } from "@/api/property";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

// const index = () => {
//   return (
//     <>
//       <MyProperties />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });
export default async function ListingPage({ searchParams }) {
  const filter = {
    limit: 10,
    page: parseInt(searchParams.page) || 1
  }
// console.log("test")
//   console.log(filter)
//    console.log("test2")
  const data = await getPropertyTableData(filter);
  
  const properties = data?.items || [];
  const totalCount = data?.totalCount || 0;

  return <MyProperties properties={properties} totalCount={totalCount} filter={filter}/>;
}
