import dynamic from "next/dynamic";
import Link from "next/link";

const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function ChangeProfile() {
  return (
    <>
      <Title page='Change Profile'></Title>
      <MechanicLayout>
        <section id="changeprofile" >
            <h1 align='center'>Change Profile Picture</h1>
            <form>
            <table>
                    <tr>
                        <td width={250}>
                            
                        </td>
                        <td>
                            <label for='profile'>Change Profile Picture</label><br/>
                            <input type='file' name='profile' id='profile'></input><br/><br/>
                        
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