import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect } from 'react';


const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function MechanicHome() {
  useEffect(() => {
    // Parse the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    // Get the value of the 'email' query parameter
    const email = urlParams.get('email');
    // Use the email value as needed
  }, []);
   

  return (
    <>
      <Title page='Mechanic Dashboard'></Title>
      <MechanicLayout>
      
        <section id="mechanichome" >
            <h1 align='center'>Mechanic Dash Board</h1>
            <form>
                <table>
                    <tr>
                        <td width={550}>
                            
                        </td>
                        <td>
                            
                            
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