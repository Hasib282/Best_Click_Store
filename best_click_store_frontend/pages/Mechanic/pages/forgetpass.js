import dynamic from "next/dynamic";
import Link from "next/link";

const Layout = dynamic(()=>import('../layouts/layout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function ForgetPassword() {
  return (
    <>
      <Title page='Forget Password'></Title>
      <Layout>
        <section id="forgetpass" >
            <h1 align='center'>Forget Password</h1>
            <form>
                <table>
                    <tr>
                        <td width={550}>
                            
                        </td>
                        <td>
                            <label for='email'>Email</label><br/>
                            <input type='text' name='email' id='email'></input><br/><br/>
                            

                            <p align='center'><Link href='./updatepass'><input type="submit" name="forgetpass" value='Submit'></input></Link></p>
                            
                            
                        </td>
                        <td>

                        </td>
                    </tr>
                </table>
            </form>
            
        </section>
      </Layout>
    </>
  )
}