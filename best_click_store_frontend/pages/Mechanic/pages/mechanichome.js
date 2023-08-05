import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function MechanicHome() {
  const [email,setEmail] = useState('');
  const router = useRouter();
  useEffect(() => {
    // Parse the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    const email = urlParams.get('email');

    setEmail(email);
  }, []);

  
  const handleProfileClick = () => {
    router.push({
      pathname: './profile',
      query: {
        email: email,
      },
    });
  };

   

  return (
    <>
      <Title page='Mechanic Dashboard'></Title>
      <MechanicLayout>
      
        <section id="mechanichome" >

          <h1 align='center'>Mechanic Dash Board</h1>
          <button onClick={handleProfileClick}>Profile</button>
          <form>
                <table>
                    <tr>
                      <td width={550}>
                        
                      </td>
                      <td>
                            
                            
                      </td>
                    </tr>
                </table>
          </form>
            
        </section>
      </MechanicLayout>
    </>
  )
}