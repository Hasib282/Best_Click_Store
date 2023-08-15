import dynamic from "next/dynamic";
import Link from "next/link";
import { useAuth } from '../authentication/sessionAuthentication';

const Layout = dynamic(() => import('../layouts/layout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function UpdatePassword() {
    return (
        <>
            <Title page='Update Password'></Title>
            <Layout>
                <section id="updatepass" >
                    <h1 align='center'>Update Password</h1>
                    <form>
                        <table>
                            <tr>
                                <td>
                                    <label htmlFor='pin'>Pin</label><br />
                                    <input type='text' name='email' id='email'></input><br /><br />
                                    <label htmlFor='newpass'>New Password</label><br />
                                    <input type='text' name='newpass' id='newpass'></input><br /><br />
                                    <label htmlFor='cpass'>Confirm Password</label><br />
                                    <input type='text' name='cpass' id='cpass'></input><br /><br />

                                    <p align='center'><Link href='./login'><input type="submit" name="forgetpass" value='Update'></input></Link></p>
                                </td>
                            </tr>
                        </table>
                    </form>

                </section>
            </Layout>
        </>
    )
}