import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function EditProfile() {
    //input variables
    const [mechanic_name, setName] = useState('');
    const [mechanic_phone, setPhone] = useState('');
    const [mechanic_nid, setNid] = useState('');
    const [mechanic_gender, setGender] = useState('');
    const [mechanic_address, setAddress] = useState('');
    const [success, setSuccess] = useState('');

    //error variables
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nidError, setNidError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [error, setError] = useState('');


    //handle inpute field changes start here

    const handleChangeName = (e) => {
      setName(e.target.value);
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



    const [email,setEmail] = useState('');
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        fetchEmail();
    }, [email]);


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
            const response = await axios.get('http://localhost:3000/mechanic/profile?email='+email);
            const jsonData = response.data;
            setJsonData(jsonData);
            
            console.log(jsonData);

            setName(jsonData.mechanic_name);
            setNid(jsonData.mechanic_nid);
            setPhone(jsonData.mechanic_phone);
            setGender(jsonData.mechanic_gender);
            setAddress(jsonData.mechanic_address);
            console.log(mechanic_name)
            
        } catch (error) {
            console.error(error);
        }
    }


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


      if(setNameError == setPhoneError == setGenderError == setAddressError == setNidError == '') {
          const res = await editProfile(email);

          console.log('Update successfull');
      }
    };


    async function editProfile(email) {
      try {
        const data = {
          mechanic_name: mechanic_name,
          mechanic_phone: mechanic_phone,
          mechanic_nid: mechanic_nid,
          mechanic_gender:mechanic_gender,
          mechanic_address:mechanic_address
        };
        const response = await axios.put('http://localhost:3000/mechanic/updateprofile?email='+email, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const updatedData = response.data;
        console.log(updatedData);
      } 
      catch (error) {
          console.error(error);
      }
  }


  const isValidName = (name) => {
      const namePattern = /^[a-zA-Z][a-zA-Z\-\.\s]{2,150}$/;
      return namePattern.test(name);
  }
  


  const isValidPhone = (phone) => {
      const phonePattern = /^[0][1][3-9][0-9]{8}$/;
      return phonePattern.test(phone);
  }


  const isValidNid = (nid) => {
      const phonePattern = /^[0-9]{10}$/;
      return phonePattern.test(nid);
  }




  return (
    <>
      <Title page='Edit Profile'></Title>
      <MechanicLayout>
      {jsonData !== null && (
        <div>
          {Array.isArray(jsonData) ? (
            <div>
              <p>Response is an array:</p>
              <ul>
                {jsonData.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            
            <section id="editprofile" >
              <h1 align='center'>Edit Profile</h1>
              <form onSubmit={handleSubmit}>
                <table>
                  <tr>
                    <td width={550}>
                    
                    </td>
                    <td>
                      <label for='name'>Name</label><br/>
                      <input type='text' name='mechanic_name' id='name' defaultValue={jsonData.mechanic_name} onChange={handleChangeName}/>
                      
                      <br/>{nameError && <b>{nameError}</b>}<br/>
                      <label for='nid'>NID</label><br/>
                      <input type='text' name='mechanic_nid' id='nid' defaultValue={jsonData.mechanic_nid} onChange={handleChangeNid}></input>
                      <br/>{nidError && <b>{nidError}</b>}<br/>
                      <label for='phone'>Phone</label><br/>
                      <input type='text' name='mechanic_phone' id='phone' defaultValue={jsonData.mechanic_phone} onChange={handleChangePhone}></input>
                      <br/>{phoneError && <b>{phoneError}</b>}<br/>
                      <label> Gender</label><br/>
                      <label>
                        <input type="radio" name='mechanic_gender' defaultValue='Male' checked={jsonData.mechanic_gender === "Male"} onChange={handleChangeGender}></input>Male
                      </label>
                      <label>
                        <input type="radio" name='mechanic_gender' defaultValue='Female' checked={jsonData.mechanic_gender === "Female"} onChange={handleChangeGender}></input>Female
                      </label>
                      <label>
                        <input type="radio" name='mechanic_gender' defaultValue='Others' checked={jsonData.mechanic_gender === "Others"} onChange={handleChangeGender}></input>Others
                      </label><br/>{genderError && <b>{genderError}</b>}<br/>
                      <label for='address'>Address</label><br/>
                      <input type='text' name='mechanic_address' id='address' defaultValue={jsonData.mechanic_address} onChange={handleChangeAddress}></input>
                      <br/>{addressError && <b>{addressError}</b>}<br/>

                      <p align='center'><input type="submit" name="editprofile" value='Submit'></input></p>

                      {error && <b>{error}</b>}
                    </td>
                    <td >
                        
                    </td>
                  </tr>
                </table>
              </form>
              <p align='right'><Link href='./mechanichome'>Back</Link></p>
            </section>



            
          )}
        </div>
      )}
        
      </MechanicLayout>
    </>
  )
}