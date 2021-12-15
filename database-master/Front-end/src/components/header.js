import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/header.css';
import { Link,useHistory } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {useDispatch, useSelector} from 'react-redux';
import { signout } from '../actions/userActions';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';




function Header(props) {

  const history = useHistory()
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [query, setQuery] = useState('');
  const userSignin = useSelector((state) => state.userSignin)
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  
  //var name = userInfo.Fname + userInfo.Lname
  const signoutHandler = () => {
    
    dispatch(signout());
    
  };
  const submitAction = (e) =>{
    e.preventDefault();
    setQuery(query);
  }
  const changePasswordHandler = () => {
    history.push("/changepassword");
  }
  const updateProfileHandler = () =>{
    history.push("/profile");
  }


        return(
            <nav className="navbar navbar-expand-md header">
              <Link to="/">
                <img className="header__logo" src= {process.env.PUBLIC_URL+ "/image/logo.png"} alt="background-img" width={144} height={81} />
              </Link>

              <div className="header__search"> 
                <input className="header__searchInput" placeholder="Search.." name="term" type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                { query ? (
                      <Link to ={`/search?query=${query}`}>
                            <button className="search-button" type="submit" onSubmit={submitAction}>
                            <SearchIcon className="header__searchIcon" />
                            </button>
                        </Link>
                ) : (
                  <button className="search-button" type="submit">
                  <SearchIcon className="header__searchIcon"/>
                  </button>
                )
              }
              </div>

              <div className="header__nav">
                <Link to = "/orderhistory" style={{textDecoration: 'none'}}>
                <button className="abcd">
                  <div className="header__option">
                   
                    <span className="header__optionLineOne">Kiểm tra</span>
                    <span className="header__optionLineTwo">Đơn hàng</span>
                    
                  
                  </div>
                  </button>
                </Link>

                <div className="header__option">
                {
                  userInfo ? (
                  <div>
                    <Dropdown className="dropdown">
                    <Dropdown.Toggle className="dropdown-basic"  style={{background: 'rgba(255, 120, 145, 1)'}}>
                    <div className="header__option great">
                          
                          <span className="header__optionLineOne">Xin chào!!!</span>

                          <span className="header__optionLineTwo">{userInfo.Fname} {userInfo.Lname}</span>     
                        </div> 

                    </Dropdown.Toggle>

                      <Dropdown.Menu  className="dropdown-signout"> 

                      <Dropdown.Item style={{backgroundColor: 'white'}}>
                          <div>
                          <button className="signout-button" onClick={changePasswordHandler}>
                              <span className='dropdown-content'> Đổi mật khẩu</span>
                          </button>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item style={{backgroundColor: 'white'}}>
                        
                          <button className="signout-button" onClick={updateProfileHandler}>
                              <span className='dropdown-content'> Tài khoản</span>
                          </button>
                        
                        </Dropdown.Item>
                        <Dropdown.Item style={{backgroundColor: 'white'}}> 
                          <button className="signout-button" onClick={signoutHandler} >
                            <span className='dropdown-content'> Đăng xuất </span>
                          </button>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>


                  ) : (
                    
                  <button className="abcd">
                       <Link to ="/signin" style={{textDecoration: 'none'}}>
                    <div className="header__option">
                      <span className="header__optionLineOne">Xin chào !!!</span>
                      <span className="header__optionLineTwo">Đăng nhập</span>     
                    </div>                 
                  </Link>
                  </button>
                 
                
                  )
                }
                </div>
                <Link to="/cart" style={{textDecoration: 'none'}}>
                <div className="header__optionBasket great1">
                <AddShoppingCartIcon/>
                <span className="header__optionLineTwo header__basketCount">{cartItems.length}</span>
                </div>
                </Link>
            </div>
          </nav>
        );
}

export default Header;