import dynamic from "next/dynamic";
import Link from "next/link";

const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function ChangePassword() {
  return (
    <>
      <Title page='Change Password'></Title>
      <MechanicLayout>
        <section id="changepass" >
            <h1 align='center'>Change Password</h1>
            <form>
            <table>
                    <tr>
                        <td width={250}>
                            
                        </td>
                        <td>
                            <label for='oldpass'>Old Password</label><br/>
                            <input type='text' name='oldpass' id='oldpass'></input><br/><br/>
                            <label for='newpass'>New Password</label><br/>
                            <input type='text' name='newpass' id='newpass'></input><br/><br/>
                            <label for='cpass'>Confirm Password</label><br/>
                            <input type='text' name='cpass' id='cpass'></input><br/><br/>

                            <p align='center'><input type="submit" name="registration" value='Submit'></input></p>
                        </td>
                        <td >
                            
                        </td>
                    </tr>
                </table>
            </form>
                
            <p align='right'><Link href='./mechanichome'>Back</Link></p>  
        </section>
      </MechanicLayout>
    </>
  )
}