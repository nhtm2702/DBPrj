import React, {useEffect, useState} from 'react';
import './css/productScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { addToCart } from '../actions/cartActions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faShoppingCart} from '@fortawesome/free-solid-svg-icons'



export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    
    const [qty, setQty] = useState(1);

    const incNum = () => {
        if (qty < product.quantityInStock){
        setQty(qty+1);
        }
        else {
            setQty(product.quantityInStock);
        }

    };
    
    const decNum = () => {
        if (qty > 1) {
        setQty(qty-1);
        }
        else {
        setQty(1);
        }
    };


    useEffect(() => {
      dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        dispatch(addToCart(productId,qty));
        props.history.push(`/cart/${productId}?qty=${qty}`);
        
    };
    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
      <div>
        <p/>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div className="row-product">
                {/* <div className="product-detail-left product-images col-xs-12 col-sm-6 col-md-5 col-lg-5"> */}
                <div className="product-detail-left product-images col-xs-12 col-sm-5 col-md-5 col-lg-5">
                    {/* <div className="lens"/> */}
                    <img className="medium" src={product.productdetails[0].image} alt={product.productName}/>
                    {/* <button
                        onMouseEnter={(imageMagnifier)}
                        // onMouseLeave={()}
                    ></button> */}
                </div>

                {/* <div className = "col-xs-12 col-sm-6 col-md-7 col-lg-7 details-pro"> */}
                <div className = "col-xs-12 col-sm-6 col-md-6 col-lg-6 details-pro">

                    <h1 className="titleName">
                        {product.productName}
                    </h1>

                    <div >
                        {product.quantityInStock > 0 ?(
                            <span className="productStatus"> T??nh tr???ng: C??n h??ng </span>    
                        ) : (
                        <span className="productStatus"> T??nh tr???ng: H???t h??ng </span>
                        )}
                        <p/>   
                    </div>

                    <div className="price-box">
                        <span className="productPrice">
                            {numberWithCommas(product.productPrice) } ???
                        </span>
                        <p/>
                    </div>

                    <div className="product-des">
                        <span>
                            {product.productDescription}
                            <p/>                                
                        </span>
                    </div>
                    
                    <div className="product-policy">
                        <div className="product-policy-content">
                                <FontAwesomeIcon icon={faCheckCircle} className="d-inline-block icon"/>
                                <p className="d-inline-block"> &nbsp; Freeship cho ????n h??ng t??? 1.000.000??</p> 
                        </div>
                        <div className="product-policy-content">
                                <FontAwesomeIcon icon={faCheckCircle} className="d-inline-block icon"/>
                                <p className="d-inline-block"> &nbsp; B???o h??nh ch??nh h??ng 1 th??ng v???i t???t c??? c??c s???n ph???m</p>
                        </div>
                        <div className="product-policy-content">
                                <FontAwesomeIcon icon={faCheckCircle} className="d-inline-block icon"/>
                                <p className="d-inline-block"> &nbsp; Freeship cho ????n h??ng t??? 600k ( t???i ??a 30k )</p> 
                        </div>
                    </div>

                    <div>
                        <div className="quantity-button"> S??? l?????ng: &nbsp;
                            <button onClick={decNum} className="dec-Button">  <RemoveIcon/>  </button>
                            <input className="input" type="text" value={qty} onChange={e => setQty(e.target.value)} />
                            <button onClick={incNum} className="inc-Button" > <AddIcon/> </button>
                    </div>
                        <p/> 

                        {product.quantityInStock > 0 ?(
                            <button onClick={addToCartHandler} className="addtocart">
                                Th??m v??o gi??? h??ng
                            </button>
                            

                        ) : (
                            <button className="x-cart">
                            Kh??ng th??? th??m v??o gi??? h??ng
                        </button>
                        )  
                        }
                        <p/>     
                    </div>
                    
                </div>

                <div>

                </div>

            </div>
        </div>
        )}
    </div>
    );
}