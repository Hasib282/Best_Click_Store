import Link from "next/link";

export default function MechanicNavigation({children}) {
    return (
      <>
        <table width={1100}>
            <tr>
                <td>
                    <ul>
                        <li><Link href='./profile?email={email}'>Profile</Link></li>
                        <li><Link href='./addservice'>Add Service</Link></li>
                        <li><Link href='./changepass'>Change Password</Link></li>
                        <li><Link href='./changeprofilepic'>Change Profile Pic</Link></li>
                        <li><Link href='./editprofile'>Edit Profile</Link></li>
                        <li><Link href='./chat'>Chat</Link></li>
                        <li><Link href='./showservice'>Show Service</Link></li>
                    </ul>
                </td>
                <td>
                    {children}
                </td>
            </tr>
        </table>
      </>
    )
  }