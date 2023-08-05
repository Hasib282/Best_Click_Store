import Image from 'next/image'
import Link from 'next/link'

export default function MechanicHeader() {
    return (
      <>
        <header>
            <table width={1300} align='center'>
                <tr>
                    <td>
                        <Link href='../../Mechanic/pages/mechanichome'><Image src="/images/logo.png" alt="logo.png" width={200} height={100} priority={true}></Image></Link>
                    </td>
                    <td>
                        <form>
                            <input type='text'></input>
                            <button><Image src="/images/search.jpg" alt="search.jpg" width={20} height={10} priority={false}></Image></button>
                        </form>
                    </td>
                    <td>
                        <Link href='../../Mechanic/pages/profile'>Profile</Link>&nbsp;|&nbsp;
                        <Link href='/'>Logout</Link>
                    </td>
                </tr>
            </table>
            <hr></hr>
        </header>
      </>
    )
  }