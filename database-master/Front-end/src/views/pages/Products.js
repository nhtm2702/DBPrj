import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../../constants/productConstants';
import {listProductCategories, listProductBrands} from "../../actions/productActions";
import Axios from 'axios';
import '../../utils';
import { sizeShoes, sizeShirt } from '../../utils';




export const Products = () => {
  return (
    <div className='products'>
      <h1>Products</h1>
    </div>
  );
};

export const ProductsManage = (props) => {
  const param = new URLSearchParams(props.location.search);
  const page = param.get("page");
  const productList = useSelector((state) => state.productList);
  const {loading, error, products, pages} = productList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts(page)
    );
    
  }, [
    dispatch,
    props.history,
    successDelete,
    userInfo.id,
    page
  ]);
  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product.idProduct));
    }
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const getFilterUrl = (filter) => {
    const filterPage = filter.page > 0 ? filter.page : filter.page === 0 ? 1 : page >= 0 ? page : 1;
    return `/products/productsManage?page=${filterPage-1}`;
}
  return (
    <div className='admin-listproducts'>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      { loading ? (
          <LoadingBox></LoadingBox>
        ): error ? (
          <MessageBox variant="danger"> {error}</MessageBox>
        ) : (           
      <>
        <h1>Quản lý sản phẩm</h1>
        <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá tiền</th>
                <th>Danh mục</th>
                <th>Nhãn hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.idProduct}>
                  <td>{product.idProduct}</td>
                  <td> <img id="image-product-manage" src ={product.productdetails[0].image} alt={product.productName}/></td> 
                  <td>{product.productName}</td>
                  <td>{numberWithCommas(product.productPrice)}</td>
                  <td>{product.category.categoryName}</td>
                  <td>{product.brand.brandName}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/${product.idProduct}/edit`)
                      }
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
                    <div className="row center pagination">
                        {[...Array(pages).keys()].map((x) => (
                        <Link
                            className={x === page ? 'active' : ''}
                            key={x}
                            to={getFilterUrl({page: x+1})}
                        >
                            <li className='page-item'>
                                <span>
                                    {x+1} 
                                </span>
                            </li>
                        </Link>
                      ))}
              </div>
            </div>
      </>
      )}
    </div>
  );
};

export const AddProducts = (props) => {

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const listCategory = useSelector((state) => state.listCategory);
  const {loading: loadingCategory, error: errorCategory, categories} = listCategory;
  const listBrand = useSelector((state) => state.listBrand);
  const {loading: loadingBrand, error: errorBrand, brands} = listBrand;
  const productCreate = useSelector((state) => state.productCreate);
  const [sizeQuantity, setSizeQuantity] = useState(''); 
  const [categoryName, setCategoryName] = useState('');
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push('/products/productsManage');
    }
    if(category == 1 || category == 2) {
      setSizeQuantity(sizeShoes)
    }
     else {
      setSizeQuantity(sizeShirt)
    }
    dispatch(listProductCategories());
    dispatch(listProductBrands())
  }, [dispatch, successCreate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      createProduct({
        name,
        price,
        image,
        category,
        brand,
        sizeQuantity,
      })
    );
  };  
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
  }
  function subString(x){
    const index = x.indexOf("image");
    const pathImage = x.slice(index, x.length);
    return  "..//../" + pathImage;
  }

  return (
    <div className='admin-products addproduct'>
      <form className="form a list" onSubmit={submitHandler}> 
        <div><h1 class = "addPro">Thêm sản phẩm</h1></div>
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
              <label htmlFor="category">Danh mục</label>
              <select className="categories-list" 
                      value={category, categoryName}  
                      onChange={(e) => (setCategory(e.target.value),
                        setCategoryName(e.target.value)
                        )}
              >
              <option value="" disabled hidden>Chọn</option>
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
          <div>
              <label htmlFor="brand">Nhãn hàng</label>
              <select className="categories-list" 
                      value={brand}  
                      onChange={(e) => setBrand(e.target.value)}
              >
              <option value=""  disabled hidden>Chọn</option>
              { brands ? (
              brands.map((brand) => (
                 <option  className= "category-select" key ={brand.idBrand} value={brand.idBrand}>
                   {brand.brandName}
                 </option>
              ))) : (
                <option value=""></option>
              )
              }
              </select>
              {loadingBrand && <LoadingBox></LoadingBox>}
              {errorBrand && <MessageBox variant="danger">{errorBrand}</MessageBox>} 
          </div>
      <div>
          <label htmlFor="imageFile">Ảnh</label>
          {
              image ? (
                <div>
                <img className="image-input" src={subString(replaceStr(image))} alt =""/>
                </div>
              ) : (
                <div></div>
              )
            }
              <input
                type="file"
                id="imageFile"
                label="Chọn ảnh"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
        </div>
      <div>
        <label></label>
        <button className="primary" type="submit">
                Cập nhật
        </button>
      </div>
    </form>
    </div>
  );
};



