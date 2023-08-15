import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../authentication/sessionAuthentication';

const Layout = dynamic(() => import('../layouts/layout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form validation
        if (!email || !password) {
            setError('Email and password are required');
        } else if (!isValidEmail(email)) {
            setError('Invalid email address');
        }
        else {
            const res = await doLogin(email, password);
            console.log(res);
        }
    };


    async function doLogin(email, password) {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'login', {
                email,
                password
            }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true
            });
            if (response.data == true) {
                console.log("cookie: " + document.cookie);
                login(email, document.cookie);
                router.push('./mechanichome');
            }
            else {
                setError('Email or Password is incorrect');
            }

            console.log("response: " + response)

            console.log(response.data)
            return response.data;
        }
        catch (error) {
            console.error('Login Failed:', error)
        }
    }




    const isValidEmail = (email) => {
        const emailPattern = /^\S+@\S+\.\S+$/;
        return emailPattern.test(email);
    }


    return (

        <>
            <Title page='Login'></Title>
            <Layout>
                <section id="login" className="navigation w-full h-full float-left bg-teal-400 pb-20 justify-center align-items-center flex flex-row " >
                    <form onSubmit={handleSubmit}>
                        <div className="detaills w-full bg-teal-500 mt-10 px-20 py-10 rounded-xl">
                            <h1 align='center' className="text-4xl pb-4">Login</h1>
                            <label htmlFor='email'>Email</label><br />
                            <input type='text' name='email' id='email' onChange={handleChangeEmail} placeholder="Type your Email" className="input input-bordered input-sm w-full max-w-xs" /><br /><br />

                            <label htmlFor='password'>Password</label><br />
                            <input type='password' name='password' id='password' onChange={handleChangePassword} placeholder="Type Your Password" className="input input-bordered input-sm w-full max-w-xs" />
                            <br />{error && <p className="text-red-700">{error}</p>}<br />
                            <Link href='./forgetpass'>Forget Password?</Link><br />

                            <p align="center"><button type="submit" name="login" className="btn bg-teal-700 hover:bg-teal-600 m-5 border-none">Login</button></p>
                            <p align='center'>Don't have an account?</p>
                            <p align='center'><Link href='./registration'>Register now!</Link></p>

                        </div>


                    </form>

                </section>
            </Layout>
        </>
    )
}