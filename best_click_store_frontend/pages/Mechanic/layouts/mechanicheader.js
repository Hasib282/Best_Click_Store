import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../authentication/sessionAuthentication';
export default function MechanicHeader() {
    const [jsonData, setJsonData] = useState(null);
    const { user, logout, checkUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        checkSession();
    }, []);



    function checkSession() {
        if (user != null) {
            getProfile();
        }
        else {
            router.push('./login')
        }
    }



    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = () => {
        logout();
        router.push('./login');
    };



    return (
        <>
            <header className="navbar bg-cyan-400 ">
                <div className="flex-1 ml-14">
                    <Link href={`./mechanichome`}><Image src="/images/logo.png" alt="logo.png" width={150} height={80} /></Link>
                </div>
                {/* <div className="flex-1">
                    <form >
                        <div className='relative'>
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <button ><Image src="/images/search.jpg" alt="search.jpg" width={20} height={20} /></button>
                            </div>
                            <input type="text" placeholder="Search here" className="input input-bordered max-w-xs pl-10" name='search' />
                        </div>
                    </form>
                </div> */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-20 w-40 hover:bg-transparent">
                        <div className="w-20 rounded-full">
                            {jsonData !== null && (
                                <img src={process.env.NEXT_PUBLIC_BACKEND_URL + 'profilepic/' + jsonData.profile.mechanic_profilepic} />
                            )}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-cyan-300 rounded-box w-52">
                        <li>
                            <Link href={`../../Mechanic/pages/profile`}>Profile</Link>
                        </li>
                        <li>
                            <Link href={`../../Mechanic/pages/changepass`}>Change Password</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )

}