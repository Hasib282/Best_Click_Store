import dynamic from "next/dynamic";
import Image from "next/image";

const Layout = dynamic(()=>import('./Mechanic/layouts/layout'),{
  ssr:false,
})

const Title = dynamic(()=>import('./Mechanic/layouts/title'),{
  ssr:false,
})

export default function Home() {
  return (
    <>
      <Title page='Home'></Title>
      <Layout>
        <p align='center'><Image src="/images/logo.png" alt="logo.png" width={500} height={400}></Image></p>
        
      </Layout>
    </>
  )
}
