import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function EditProfile() {
  return (
    <>
      <Title page='Edit Profile'></Title>
      <MechanicLayout>
        <section id="editprofile" >
            <h1 align='center'>Edit Profile</h1>
            <form>
            <table>
                    <tr>
                        <td width={250}>
                            
                        </td>
                        <td>
                            <label for='name'>Name</label><br/>
                            <input type='text' name='name' id='name'></input><br/><br/>
                            <label for='nid'>NID</label><br/>
                            <input type='text' name='nid' id='nid'></input><br/><br/>
                            <label for='phone'>Phone</label><br/>
                            <input type='text' name='phone' id='phone'></input><br/><br/>
                            <label>
                                Gender<br/>
                                <input type="radio" name='gender' value='Male'></input>Male
                            </label>
                            <label>
                                <input type="radio" name='gender' value='Female'></input>Female
                            </label>
                            <label>
                                <input type="radio" name='gender' value='Others'></input>Others
                            </label>
                            <br/>
                            <br/>
                            <label for='address'>Address</label><br/>
                            <input type='text' name='address' id='address'></input><br/><br/>

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