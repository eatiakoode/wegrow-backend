import dynamic from "next/dynamic";
import Contact from "@/components/contact";

export const metadata = {
  title: 'Contact || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
