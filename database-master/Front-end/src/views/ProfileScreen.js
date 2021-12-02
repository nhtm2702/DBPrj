import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
      success: successUpdate,
      error: errorUpdate,
      loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        
        if (!user) {
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
          dispatch(detailsUser(userInfo.id));
          
        } else {
          setFname(user.userFname);
          setLname(user.userLname);
          setPhone(user.phone);
          setAddress(user.address);
        }
      }, [dispatch, userInfo.id, user]);
      const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
          dispatch(
            updateUserProfile({
              userId: user.id,
              Fname,
              Lname,
              phone,
              address
            })
          );
      };
    return(
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="Fname">FName</label>
              <input
                id="Fname"
                type="text"
                placeholder="Enter name"
                value={Fname}
                onChange={(e) => setFname(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Lname">LName</label>
              <input
                id="Lname"
                type="text"
                placeholder="Enter name"
                value={Lname}
                onChange={(e) => setLname(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="phone">phone</label>
              <input
                id="phone"
                type="text"
                placeholder="Enter name"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="address">address</label>
              <input
                id="address"
                type="text"
                placeholder="Enter name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
        </>
        )}
        </form>
    </div>

    );



}