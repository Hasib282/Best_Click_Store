import { useAuth } from '../authentication/sessionAuthentication';

export default function MechanicHeader() {
    const [jsonData, setJsonData] = useState(null);
    const { user, logout, checkUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        checkSession();
    }, []);


    function checkSession() {
        if (checkUser = false) {
            router.push('./login');
        }
    }



    return (
        <>

        </>
    )

}