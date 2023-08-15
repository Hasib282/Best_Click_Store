import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

export default function ID() {
    const [profile, setProfile] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (id) {
            fetchData();
        }


    }, [id]);

    async function fetchData() {

        const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `mechanic/${id}`);
        console.log("RES", res.data);
        setProfile(res.data);
    }


    return (
        <>
            {profile !== null && (
                <div>
                    <h1>{profile.mechanic_id}</h1>
                    <p>{profile.mechanic_name}</p>
                </div>
            )}
        </>

    );
};




