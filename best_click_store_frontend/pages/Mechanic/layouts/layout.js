import Header from "./header";
import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout({children}) {
    return (
      <>
      <body>
        <Header></Header>
        <Navigation></Navigation>
        {children}
        <Footer></Footer>
      </body>
        
      </>
    )
  }