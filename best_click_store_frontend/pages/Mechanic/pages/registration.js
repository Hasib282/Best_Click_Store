import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';

const Layout = dynamic(() => import('../layouts/layout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function Registration() {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //input variables
    const [mechanic_name, setName] = useState('');
    const [mechanic_email, setEmail] = useState('');
    const [mechanic_phone, setPhone] = useState('');
    const [mechanic_nid, setNid] = useState('');
    const [mechanic_gender, setGender] = useState('Male');
    const [mechanic_address, setAddress] = useState('');
    const [mechanic_password, setPassword] = useState('');
    const [mechanic_cpassword, setCPassword] = useState('');
    const [profile, setprofile] = useState('');
    const [success, setSuccess] = useState('');


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //error variables
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nidError, setNidError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [cpassError, setCpassError] = useState('');
    const [profileError, setProfileError] = useState('');




    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //handle inpute field changes start here

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleChangeNid = (e) => {
        setNid(e.target.value);
    };
    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangeCPassword = (e) => {
        setCPassword(e.target.value);
    };
    const handleChangeProfile = (e) => {
        setprofile(e.target.files[0]);
    };

    //handle input field changes end here

    ///////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    //Handle Submit part start here

    const handleSubmit = async (e) => {

        e.preventDefault();
        let formIsValid = true;
        // name validation
        if (!mechanic_name) {
            setNameError('Name is required');
            formIsValid = false;
        }
        else if (!isValidName(mechanic_name)) {
            setNameError('Name only contain a-z or A-Z or dot(.) or dash(-) and must start with a letter and atleast 2 charecter ');
            formIsValid = false;
        }
        else {
            setNameError('');
        }

        // email validation
        if (!mechanic_email) {
            setEmailError('Email is required');
            formIsValid = false;
        }
        else if (!isValidEmail(mechanic_email)) {
            setEmailError('Invalid email address');
            formIsValid = false;
        }
        else {
            setEmailError('');
        }

        // phone validation
        if (!mechanic_phone) {
            setPhoneError('Phone is required');
            formIsValid = false;
        }
        else if (!isValidPhone(mechanic_phone)) {
            setPhoneError('Please enter a valid 11 digit Phone number');
            formIsValid = false;
        }
        else {
            setPhoneError('');
        }



        // nid validation
        if (!mechanic_nid) {
            setNidError('NID is required');
            formIsValid = false;
        }
        else if (!isValidNid(mechanic_nid)) {
            setNidError('Please enter a valid nid');
            formIsValid = false;
        }
        else {
            setNidError('');
        }


        // gender validation
        if (!mechanic_gender) {
            setGenderError('Gender is required');
            formIsValid = false;
        }
        else {
            setGenderError('');
        }

        //address validation
        if (!mechanic_address) {
            setAddressError('Address is required');
            formIsValid = false;
        }
        else {
            setAddressError('');
        }


        //password validatio
        if (!mechanic_password) {
            setPasswordError('Password is required');
            formIsValid = false;
        }
        else if (!isValidPassword(mechanic_password)) {
            setPasswordError('Password Must contain one upper letter,lower letter,digit and special character');
            formIsValid = false;
        }
        else {
            setPasswordError('');
        }

        if (!mechanic_cpassword) {
            setCpassError('Confirm password is required');
            formIsValid = false;
        }
        else if (mechanic_password != mechanic_cpassword) {
            setCpassError('Password doesn\'t match');
            formIsValid = false;
        }
        else {
            setCpassError('');
        }


        if (!profile) {
            setProfileError('Profile picture is required');
            formIsValid = false;
        }
        else if(!isValidFile(profile.name)){
            setProfileError('Only take jpg/png/webp/jpeg files');
            formIsValid = false;
        }
        else {
            setProfileError('');
        }


        if (formIsValid) {
            try {
                const res = await registration();

                setSuccess('Registration successfull')
            }
            catch (error) {
                console.log(error);
                setSuccess("");
                formIsValid = false;
            }


        }
        else {
            setSuccess("");
        }
    };


    async function registration() {
        try {
            const formData = new FormData();
            formData.append('mechanic_name', mechanic_name);
            formData.append('mechanic_email', mechanic_email);
            formData.append('mechanic_phone', mechanic_phone);
            formData.append('mechanic_nid', mechanic_nid);
            formData.append('mechanic_gender', mechanic_gender);
            formData.append('mechanic_address', mechanic_address);
            formData.append('mechanic_password', mechanic_password);
            formData.append('profile', document.querySelector('#profile').files[0]);

            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            console.log(data);
        }
        catch (error) {
            if (error.response) {
                if (error.response.data.message === "Phone already exist") {
                    setPhoneError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                }
                else if (error.response.data.message === "NID already exist") {
                    setNidError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                }
                else if (error.response.data.message === "Email already exist") {
                    setEmailError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                }
                else {
                    console.log(error.response.data.message);
                    console.log(error);
                    setSuccess('');
                }
            }
            console.log(error);
        }
    }


    const isValidName = (name) => {
        const namePattern = /^[a-zA-Z][a-zA-Z\-\.\s]{1,150}$/;
        return namePattern.test(name);
    }


    const isValidEmail = (email) => {
        const emailPattern = /^\S+@\S+\.\S+$/;
        return emailPattern.test(email);
    }


    const isValidPhone = (phone) => {
        const phonePattern = /^[0][1][3-9][0-9]{8}$/;
        return phonePattern.test(phone);
    }


    const isValidNid = (nid) => {
        const phonePattern = /^[1-9][0-9]{9}$/;
        return phonePattern.test(nid);
    }


    const isValidPassword = (password) => {
        const phonePattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
        return phonePattern.test(password);
    }


    const isValidFile = (profile) => {
        const fileFormat = /^.*\.(jpg|webp|png|jpeg)$/;
        const test = fileFormat.test(profile);
        return test;
    }



    //Handle Submit part end here

    ///////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <Title page='Registration'></Title>
            <Layout>
                <section id="registration" className="navigation w-full h-full float-left bg-teal-400 pb-20 justify-center align-items-center flex flex-row" >
                    
                    <form onSubmit={handleSubmit}>
                        <div className="detaills w-full bg-teal-500 mt-10 px-20 py-10 rounded-xl">
                            <div>
                                <h1 align='center' className="text-4xl pb-4">Registration</h1>
                                <label htmlFor='name'>Name</label><br />
                                <input type="text" name='mechanic_name' id='name' onChange={handleChangeName} placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
                                <br />{nameError && <b className="text-red-600">{nameError}</b>}<br />

                                <label htmlFor='email'>Email</label><br />
                                <input type='email' name='mechanic_email' id='email' onChange={handleChangeEmail}  placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs"/>
                                <br />{emailError && <b className="text-red-600">{emailError}</b>}<br />

                                <label htmlFor='nid'>NID</label><br />
                                <input type='text' name='mechanic_nid' id='nid' onChange={handleChangeNid}  placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs"/>
                                <br />{nidError && <b className="text-red-600"> {nidError}</b>}<br />

                                <label htmlFor='phone' maxLength='11'>Phone</label><br />
                                <input type='text' name='mechanic_phone' id='phone' onChange={handleChangePhone} placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
                                <br />{phoneError && <b className="text-red-600">{phoneError}</b>}<br />

                                <label>Gender</label><br />
                                <label>
                                    <input type="radio" name='mechanic_gender' value='Male' checked={mechanic_gender === "Male"} onChange={handleChangeGender} />Male
                                </label>
                                <label>
                                    <input type="radio" name='mechanic_gender' value='Female' checked={mechanic_gender === "Female"} onChange={handleChangeGender} />Female
                                </label>
                                <label>
                                    <input type="radio" name='mechanic_gender' value='Others' checked={mechanic_gender === "Others"} onChange={handleChangeGender} />Others
                                </label>
                                <br />{genderError && <b className="text-red-600">{genderError}</b>}<br />

                                <label htmlFor='address'>Address</label><br />
                                <input type='text' name='mechanic_address' id='address' onChange={handleChangeAddress} placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs"/>
                                <br />{addressError && <b className="text-red-600">{addressError}</b>}<br />

                                <label htmlFor='password'>Password</label><br />
                                <input type='text' name='mechanic_password' id='password' onChange={handleChangePassword} placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs"/>
                                <br />{passwordError && <b className="text-red-600">{passwordError}</b>}<br />

                                <label htmlFor='cpassword'>Confirm Password</label><br />
                                <input type='text' name='mechanic_cpassword' id='cpassword' onChange={handleChangeCPassword} placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs"/>
                                <br />{cpassError && <b className="text-red-600">{cpassError}</b>}<br />

                                <label htmlFor='profile'>Select Profile Picture</label><br />
                                <input type='file' name='profile' id='profile' onChange={handleChangeProfile} />
                                <br />{profileError && <b className="text-red-600">{profileError}</b>}
                                {success && <b className="text-green-600">{success}</b>}
                                <p align="center"><button type="submit" name="mechanic_registration" className="btn bg-teal-700 hover:bg-teal-600 m-5 border-none">Submit</button></p>
                                <p align='center'>Already have an account?</p>
                                <p align='center'><Link href='./login'>Login</Link></p>
                            </div>
                        </div>


                    </form>

                </section>
            </Layout>
        </>
    )
}