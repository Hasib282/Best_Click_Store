import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../authentication/sessionAuthentication';
const MechanicLayout = dynamic(() => import('../layouts/mechaniclayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function ChangeProfile() {
    //input variables
    const [profile, setProfile] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const { user } = useAuth();

    //error variables
    const [profileError, setProfileError] = useState('');
    const [error, setError] = useState('');

    //handle inpute field changes start here

    const handleChangeProfile = (e) => {
        setProfile(e.target.files[0]);
    };
    const [email, setEmail] = useState('');
    const [jsonData, setJsonData] = useState(null);

    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        fetchEmail();
    }, [email]);

    useEffect(() => {
        if (profile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(profile);
        } else {
            setPreviewImage('');
        }
    }, [profile]);


    //Get email from url
    async function fetchEmail() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const emails = urlParams.get('email');
            setEmail(emails);
            getProfile(emails);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }


    async function getProfile(email) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile' ,{
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let formIsValid = true;

        // name validation
        if (!profile) {
            setProfileError('Upload picture please.');
            formIsValid = false;
        }
        else if (!isValidFile(profile.name)) {
            setProfileError('Only take jpg/png/webp/jpeg files');
            formIsValid = false;
        }
        else {
            setProfileError('');
        }

        if (formIsValid) {
            try {
                const res = await changeprofilepic();

                // router.push({
                //     pathname: './mechanichome',
                //     query: {
                //         email: email
                //     },
                // });
                setSuccess('Update successfull');
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            setSuccess("");
        }
    };



    async function changeprofilepic() {
        try {
            const formData = new FormData();
            formData.append('profile', document.querySelector('#profile').files[0]);
            const response = await axios.put(process.env.NEXT_PUBLIC_BACKEND_URL + `changeprofile?email=` + email, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
        }
        catch (error) {
            console.error(error);
        }
    }

    const isValidFile = (profile) => {
        const fileFormat = /^.*\.(jpg|webp|png|jpeg)$/;
        const test = fileFormat.test(profile);
        return test;
    }


    return (

        <>
            <Title page='Change Profile'></Title>
            <MechanicLayout>
                {jsonData !== null && (
                    <div>
                        <h1 align='center' className="text-4xl pt-4">Change Profile Picture</h1>
                        <div className="detaills w-full float-left justify-center align-items-center flex flex-col  mt-10" >
                            <p align="center">
                                <img id="previewImage" src={previewImage || process.env.NEXT_PUBLIC_BACKEND_URL + 'profilepic/' + jsonData.profile.mechanic_profilepic} alt="Preview" height={200} width={200}></img>

                                <form onSubmit={handleSubmit} className="mt-10">
                                    <input type="file" name="profile" id="profile" className="file-input file-input-bordered file-input-accent w-full max-w-xs" onChange={handleChangeProfile} />
                                    <br />{success && <b className="text-green-500">{success}</b>}{profileError && <b className="text-red-500">{profileError}</b>}<br />
                                    <button type="submit" className="btn bg-cyan-400 hover:bg-cyan-300 mt-10">Change</button>
                                </form>
                            </p>
                        </div>
                    </div>

                )}
            </MechanicLayout>


        </>
    )
}