import MechanicHeader from "./mechanicheader";
import Footer from "./footer";
import MechanicNavigation from "./mechanicnavigation";
export default function MechanicLayout({children}) {
    return (
      <>
        <MechanicHeader></MechanicHeader>
        {/* <MechanicNavigation></MechanicNavigation> */}
        {children}
        <Footer></Footer>
      </>
    )
  }