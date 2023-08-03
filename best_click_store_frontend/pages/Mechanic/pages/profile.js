import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function Profile() {
  return (
    <>
      <Title page='Profile'></Title>
      <MechanicLayout>
        <section id="profile" >
            <h1 align='center'>Profile</h1>
                <table>
                    <tr>
                        <td>
                            Name: 
                        </td>
                        <td>
                            Hasibur Rahaman
                        </td>
                        <td rowSpan={7}>........</td>
                        <td rowSpan={7}>
                            <Link href='/'><Image src="/images/profile.jpg" alt="profile.jpg" width={400} height={300}></Image></Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email: 
                        </td>
                        <td>
                            hasiburrahaman81098@gmail.com
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Phone: 
                        </td>
                        <td>
                            01314353560
                        </td>
                    </tr>
                    <tr>
                        <td>
                            NID: 
                        </td>
                        <td>
                            8714231793
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Gender: 
                        </td>
                        <td>
                            Male
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Address: 
                        </td>
                        <td>
                            Bashundhara, Dhaka
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Services: 
                        </td>
                        <td>
                            <ol>
                                <li>AC Repairing</li>
                                <li>Fridge Repairing</li>
                            </ol>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Link href='./editprofile'>Edit Profile</Link> 
                        </td>
                        <td>
                        <Link href='./changeprofilepic'>Change Profile Picture</Link>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <br/>
                            <Link href='./changepass'>Change Password</Link> 
                        </td>
                    </tr>
                </table>
                <p align='right'><Link href='./mechanichome'>Back</Link></p>
                
            
        </section>
      </MechanicLayout>
    </>
  )
}