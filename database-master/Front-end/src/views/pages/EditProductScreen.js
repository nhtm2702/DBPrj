import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
import {listProductCategories} from "../../actions/productActions";
import '../css/EditProductScreen.css';


export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [idProduct, setIdProduct] = useState(''); 
  const listCategory = useSelector((state) => state.listCategory);
  const {loading: loadingCategory, error: errorCategory, categories} = listCategory;

  const [qty, setQty] = useState('');
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/products/productsManage');
    }
    
    if (!product || successUpdate || product.idProduct !== parseInt(productId)) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        dispatch(detailsProduct(productId));
        dispatch(listProductCategories());
        
    } 
    else {
       
        setName(product.productName);
        setPrice(product.productPrice);
        setImage(product.productdetails[0].image);
        setCategory(product.idCategory);
        setQty(product.quantityInStock);
        setDescription(product.productDescription);
    }

    
  }, [productId, product, dispatch, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        id: productId,
        name,
        price,
        image,
        category,
        qty,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(subString(replaceStr(data)));
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  function replaceStr(x) {
    return x.replace(/\\/g, "/");
  };
  function subString(x){
    const index = x.indexOf("image");
    const pathImage = x.slice(index, x.length);
    return  "..//../" + pathImage;
  };
  



  return (
    <div className="edit-product" >
      <form className=" form edit-form" onSubmit={submitHandler}>
        <div>
          <h1 style={{textAlign: 'center'}}>Chỉnh sửa sản phẩm <br/> <br/> </h1>
          <h1>{name}</h1>
          
        </div>

        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (   
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          {
              image ? (
                <img className="edit-image" src={image} alt =""/>
              ) : (
                <div></div>
              )
            }
            <div>
              <label htmlFor="name">Tên sản phẩm</label>
              <input
                id="name"
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Giá tiền</label>
              <input
                id="price"
                type="text"
                placeholder="Nhập giá tiền"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Hình ảnh</label>
              <input
                id="image"
                type="text"
                placeholder=""
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">File ảnh</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Danh mục</label>
              <select className="categories-list" 
                      value={category}  
                      onChange={(e) => setCategory(e.target.value)}
              >
               <option value=""  disabled hidden>Chọn</option>
              { categories ? (
              categories.map((category) => (
                 <option className= "category-select" key ={category.idCategory} value={category.idCategory}>
                   {category.categoryName}
                 </option>
              ))) : (
                <option value=""></option>
              )
              }
              </select>
              {loadingCategory && <LoadingBox></LoadingBox>}
              {errorCategory && <MessageBox variant="danger">{errorCategory}</MessageBox>} 
            </div>
            <div className="quantity-button"> Số lượng: &nbsp;
                <input className="input" type="text" value={qty} onChange={e => setQty(e.target.value)} />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>               
            <div>
              <label></label>
              <button className="primary" type="submit">
                Cập nhật
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}