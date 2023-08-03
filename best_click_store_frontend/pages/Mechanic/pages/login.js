import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Layout = dynamic(()=>import('../layouts/layout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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
        const res = await doLogin(email,password);
        console.log(res);

        if(res==true){

            router.push({
                pathname: './mechanichome',
                query: {
                    email: email
                },
            });
        }
        else{
            setError('Email or Password is incorrect');
        }
    }
};
    

    async function doLogin(email,password){
        try{
            const response = await axios.post('http://localhost:3000/mechanic/login',{
                email,
                password
            });
            console.log(response.status)
            return response.data;
        }
        catch(error){
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
        <section id="login" >
            <h1 align='center'>Login</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td width={550}>
                            
                        </td>
                        <td>
                            <label for='email'>Email</label><br/>
                            <input type='text' name='email' id='email' onChange={handleChangeEmail}/><br/><br/>
                            
                            <label for='password'>Password</label><br/>
                            <input type='text' name='password' id='password' onChange={handleChangePassword}/><br/><br/>
                            <Link href='./forgetpass'>Forget Password?</Link><br/>
                            {error && <p>{error}</p>}
                            <p align='center'><input type="submit" name="login" value='Login'/></p>
                            <p align='center'>Don't have an account?</p>
                            <p align='center'><Link href='./registration'>Register now!</Link></p>
                            
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