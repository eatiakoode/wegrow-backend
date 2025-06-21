import dynamic from "next/dynamic";
import NewsandInsights from "@/components/news-and-insights";

export const metadata = {
  title: 'About Us || WeGrow',
  description:
    'WeGrow ',
}

const index = () => {
  return (
    <>
      <NewsandInsights />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
