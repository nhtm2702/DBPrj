import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { signin } from '../actions/userActions';

export default function ProfileScreen() {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
      success: successUpdate,
      error: errorUpdate,
      loading: loadingUpdate,
    } = userUpdateProfile;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();
    const { userInfo } = userSignin;
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
    }, [dispatch,  userInfo.id]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (newPassword !== confirmPassword) {
          alert('Password and Confirm Password Are Not Matched');
        } else {
          dispatch(
            updateUserProfile({
              userId: userInfo.id,
              oldPassword,
              newPassword,
            })
          );
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }

      };

    return (
        <div>
            {loadingUpdate ? (<LoadingBox></LoadingBox>
            ) : (
                    <form className="form a list" onSubmit={submitHandler}>
                <div>
                    <h1>Đổi mật khẩu</h1>
                </div>
                <div>
                {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
                )}
                {successUpdate && (
                <MessageBox variant="success">
                    Profile Updated Successfully
                </MessageBox>
                )}
                </div>
                <div>
                        <label htmlFor="password">Mật khẩu cũ</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu cũ"
                            onChange={(e) => setOldPassword(e.target.value)}
                        ></input>
                </div>
                <div>
                        <label htmlFor="password">Mật khẩu mới</label>
                        <input
                            id="newpassword"
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            onChange={(e) => setNewPassword(e.target.value)}
                        ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Xác nhận
                    </button>
                </div>
                </form>
                )}
                
        </div>
    );
}