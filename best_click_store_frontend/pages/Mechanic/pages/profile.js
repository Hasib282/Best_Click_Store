import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function Profile() {
    const [email,setEmail] = useState('');
    const [jsonData, setJsonData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchEmail();
    }, []);


    //Get email from url
    async function fetchEmail() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const emails = urlParams.get('email');
            setEmail(emails);
            getProfile(emails);
        } catch (error) {
            console.error(error);
        }
    }
    

    async function getProfile(email) {
        try {
            const response = await axios.get('http://localhost:3000/mechanic/profile?email='+email);
            const jsonData = response.data;
            setJsonData(jsonData);
            
            console.log(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }

    
    
    //edit profile route
    const handleEditProfile = () => {
        router.push({
            pathname: './editprofile',
            query: {
                email: email,
            },
        });
    };
    
    
        



  return (
    <>
      <Title page='Profile'></Title>
      <MechanicLayout>

        {jsonData !== null && (
                <div>
                    {Array.isArray(jsonData) ? (
                        <div>
                            <p>Response is an array:</p>
                            <ul>
                                {jsonData.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <section id="profile" >
                            <h1 align='center'>Profile</h1>
                                <table>
                                    <tr>
                                        <td>
                                            Name: 
                                        </td>
                                        <td>
                                            {jsonData.mechanic_name}
                                        </td>
                                        <td rowSpan={7}>
                                            {/* {jsonData.profile.mechanic_profilepic}
                                            <Image src='' alt="profilepic" width={400} height={300}></Image>  */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Email: 
                                        </td>
                                        <td>
                                            {jsonData.mechanic_email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Phone: 
                                        </td>
                                        <td>
                                            {jsonData.mechanic_phone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            NID: 
                                        </td>
                                        <td>
                                            {jsonData.mechanic_email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Gender: 
                                        </td>
                                        <td>
                                            {jsonData.mechanic_gender}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Address: 
                                        </td>
                                        <td>
                                            {jsonData.mechanic_address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Services: 
                                        </td>
                                        <td>
                                            <ul>
                                                {jsonData.services.map((service) => (
                                                    <li>
                                                        {service.service_name}
                                                    </li>
                                                ))} 
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            <button onClick={handleEditProfile}>Edit Profile</button> 
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
                            
                        </div>
                    )}
                </div>
            )
        }


        
        {/* <section id="profile" >
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
                            <button onClick={handleEditProfile}>Edit Profile</button> 
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
                
            
        </section> */}
      </MechanicLayout>
    </>
  )
}