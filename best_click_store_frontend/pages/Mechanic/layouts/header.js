import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <header className="navbar bg-teal-500 ">
                <div className="flex-1 ml-14">
                    <Link href='/'><Image src="/images/logo.png" alt="logo.png" width={150} height={80} /></Link>
                </div>
                <div className="flex-1">
                    <form >
                        <div className='relative'>
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <button class="bg-sky-500 hover:bg-sky-700 ..."><Image src="/images/search.jpg" alt="search.jpg" width={20} height={20} /></button>
                            </div>
                            <input type="text" placeholder="Search here" className="input input-bordered max-w-xs pl-10" name='search' />
                        </div>
                    </form>
                </div>
                <div className="flex-none pr-14">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href='../../Mechanic/pages/login'>Login</Link></li><a className='text-2xl'> | </a>
                        <li><Link href='../../Mechanic/pages/registration'>Registration</Link></li>
                    </ul>
                </div>
            </header>
        </>
    )
}