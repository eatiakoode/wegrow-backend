import Wrapper from "@/components/layout/Wrapper";
import HomeMain from './(homes)/home-1/page'

export const metadata = {
  title: 'Home || WeGrow',
  description:
    'WeGrow',
}

export default function Home() {
  return (
    <Wrapper>
      <HomeMain/>
    </Wrapper>
    
  )
}
