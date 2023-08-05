import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';

const Layout = dynamic(()=>import('../layouts/layout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
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

        // name validation
        if (!mechanic_name ) {
            setNameError('Name is required');
        } 
        else if(!isValidName(mechanic_name)){
            setNameError('Name only contain a-z or A-Z or dot(.) or dash(-) and must start with a letter and atleast 2 charecter ');
        }
        else{
            setNameError('');
        }

        // email validation
        if (!mechanic_email) {
            setEmailError('Email is required');
        }
        else if (!isValidEmail(mechanic_email)) {
            setEmailError('Invalid email address');
        }
        else{
            setEmailError('');
        }

        // phone validation
        if (!mechanic_phone) {
            setPhoneError('Phone is required');
        }
        else if (!isValidPhone(mechanic_phone)) {
            setPhoneError('Please enter a valid 11 digit Phone number');
        }
        else{
            setPhoneError('');
        }
        


        // nid validation
        if (!mechanic_nid) {
            setNidError('NID is required');
        }
        else if (!isValidNid(mechanic_nid)) {
            setNidError('Please enter a valid nid');
        }
        else{
            setNidError('');
        }


        // gender validation
        if (!mechanic_gender) {
            setGenderError('Gender is required');
        }
        else{
            setGenderError('');
        }

        //address validation
        if (!mechanic_address) {
            setAddressError('Address is required');
        }
        else{
            setAddressError('');
        }


        //password validatio
        if (!mechanic_password) {
            setPasswordError('Password is required');
        }
        else if(!isValidPassword){
            setPasswordError('Password Must contain one upper letter,lower letter,digit and special character');
        }
        else{
            setPasswordError('');
        }

        if (!mechanic_cpassword) {
            setCpassError('Confirm password is required');
        }
        else if(mechanic_password != mechanic_cpassword){
            setCpassError('Password doesn\'t match');
        }
        else{
            setCpassError('');
        }


        if (!profile) {
            setProfileError('Profile picture is required');
        }
        else{
            setProfileError('');
        }

        
        if(mechanic_name && mechanic_email && mechanic_nid && mechanic_phone && mechanic_address && mechanic_gender && mechanic_password && mechanic_cpassword && profile) {
            const res = await register();
        
            setSuccess('Registration successfull')
        }
    };


    async function register() {
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
            
            const response = await axios.post('http://localhost:3000/mechanic/registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            console.log(data);
        } 
        catch (error) {
            console.error(error);
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
    
    









    //Handle Submit part end here

    ///////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
        <Title page='Registration'></Title>
        <Layout>
            <section id="login" >
                <h1 align='center'>Registration</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td width={550}>
                                
                            </td>
                            <td>
                                <label for='name'>Name</label><br/>
                                <input type='text' name='mechanic_name' id='name' onChange={handleChangeName}/>
                                <br/>{nameError && <b>{nameError}</b>}<br/>

                                <label for='email'>Email</label><br/>
                                <input type='email' name='mechanic_email' id='email' onChange={handleChangeEmail}/>
                                <br/>{emailError && <b>{emailError}</b>}<br/>

                                <label for='nid'>NID</label><br/>
                                <input type='text' name='mechanic_nid' id='nid' onChange={handleChangeNid}/>
                                <br/>{nidError && <b>{nidError}</b>}<br/>

                                <label for='phone' maxLength='11'>Phone</label><br/>
                                <input type='text' name='mechanic_phone' id='phone' onChange={handleChangePhone}/>
                                <br/>{phoneError && <b>{phoneError}</b>}<br/>

                                <label>Gender</label><br/>
                                <label>
                                    <input type="radio" name='mechanic_gender'  value='Male' checked={mechanic_gender === "Male"} onChange={handleChangeGender}/>Male
                                </label>
                                <label>
                                    <input type="radio" name='mechanic_gender' value='Female' checked={mechanic_gender === "Female"} onChange={handleChangeGender}/>Female
                                </label>
                                <label>
                                    <input type="radio" name='mechanic_gender' value='Others'  checked={mechanic_gender === "Others"} onChange={handleChangeGender}/>Others
                                </label>
                                <br/>{genderError && <b>{genderError}</b>}<br/>

                                <label for='address'>Address</label><br/>
                                <input type='text' name='mechanic_address' id='address' onChange={handleChangeAddress}/>
                                <br/>{addressError && <b>{addressError}</b>}<br/>

                                <label for='password'>Password</label><br/>
                                <input type='text' name='mechanic_password' id='password' onChange={handleChangePassword}/>
                                <br/>{passwordError && <b>{passwordError}</b>}<br/>

                                <label for='cpassword'>Confirm Password</label><br/>
                                <input type='text' name='mechanic_cpassword' id='cpassword' onChange={handleChangeCPassword}/>
                                <br/>{cpassError && <b>{cpassError}</b>}<br/>

                                <label for='profile'>Select Profile Picture</label><br/>
                                <input type='file' name='profile' id='profile' onChange={handleChangeProfile}/>
                                <br/>{profileError && <b>{profileError}</b>}
                                {success && <b>{success}</b>}
                                
                                <p align='center'><input type="submit" name="mechanic_registration" value='Submit'/></p>
                                <p align='center'>Already have an account?</p>
                                <p align='center'><Link href='./login'>Login</Link></p>
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