import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
      <>
        <header>
            <table width={1300} align='center'>
                <tr>
                    <td>
                        <Link href='/'><Image src="/images/logo.png" alt="logo.png" width={200} height={100}></Image></Link>
                        
                    </td>
                    <td>
                        <form>
                            <input type='text'></input>
                            <button><Image src="/images/search.jpg" alt="search.jpg" width={20} height={10}></Image></button>
                        </form>
                    </td>
                    <td>
                        <Link href='../../Mechanic/pages/login'>Login</Link>&nbsp;|&nbsp;
                        <Link href='../../Mechanic/pages/registration'>Registration</Link>
                    </td>
                </tr>
            </table>
            <hr></hr>
        </header>
      </>
    )
  }