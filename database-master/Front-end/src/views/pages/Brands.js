import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import {createBrand, deleteBrand, listProductBrands, detailsBrand, updateBrand} from "../../actions/productActions";
import {
  CREATE_BRAND_RESET,
  DELETE_BRAND_RESET,
  BRAND_UPDATE_RESET
} from '../../constants/productConstants';


export const BrandsManage = (props) => {
  const listBrand= useSelector((state) => state.listBrand);
  const {loading: loadingBrand, error: errorBrand, brands} = listBrand;
  const brandDelete = useSelector((state) => state.brandDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = brandDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: DELETE_BRAND_RESET});
    }
  dispatch(listProductBrands());
  },[dispatch, successDelete, props.history]);
  const deleteHandler = (brand) => {
  if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteBrand(brand.idBrand));
    }
  };

  return (
    <div className='ProductsType'>
      <h1>Quản lý nhãn hàng</h1>
        { loadingBrand ? (
          <LoadingBox></LoadingBox>
        ): errorBrand ? (
          <MessageBox variant="danger"> {errorBrand}</MessageBox>
        ) : (
          <>
              <table className="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Nhãn hàng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {
                  brands.map((brand) => (
                    <tr >
                      <td>{brand.idBrand}</td>
                      <td>{brand.brandName}</td>
                      <td>
                      <button
                          type="button"
                          className="small"
                          onClick={() =>
                            props.history.push(`${brand.idBrand}/edit`)
                          }
                          >
                          Chỉnh sửa
                        </button>
                      <button
                        type="button"
                        className="small"
                        onClick={() => deleteHandler(brand)}
                      >
                        Xóa
                    </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              </table>

          </>)} 
    </div>
  );
}

export const AddBrands = (props) => {
  const [nameBrand, setNameBrand] = useState('');
  const brandCreate = useSelector((state) => state.brandCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = brandCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CREATE_BRAND_RESET });
      props.history.push('/brands/brandsManage');
    }
  }, [dispatch, successCreate, props.history]);
  const submitHandler = (e) => {
  
    e.preventDefault();
    
    // TODO: dispatch update product
    dispatch(
      createBrand({
        nameBrand,
      })
    );
  };  
  return (
    <div className='AddProductsType'>
       <form className="form a list" onSubmit={submitHandler}>  
      <div><h1>Thêm nhãn hàng</h1></div>
      <div>
            <label htmlFor="name">Tên nhãn hàng</label>
              <input
                id="name"
                type="text"
                placeholder="Nhập tên nhãn hàng"
                value={nameBrand}
                onChange={(e) => setNameBrand(e.target.value)}
              ></input>
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
}

export const EditBrandScreen = (props) => {
  const brandId = props.match.params.id;
  const [name, setName] = useState('');
  const brandUpdate = useSelector((state) => state.brandUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = brandUpdate;

  const brandDetails = useSelector((state) => state.brandDetails);

  const { loading, error, brand } = brandDetails;
  const dispatch = useDispatch();
   useEffect(() => {
     console.log(brandId)
    if (successUpdate) {
      props.history.push('/productsType/productsTypeManage');
    }
    if (!brand || successUpdate) {
      dispatch({ type: BRAND_UPDATE_RESET})
      dispatch(detailsBrand(brandId));
    }
    else{
      setName(brand.brandName);
    }
    }, [brand, dispatch, brandId, successUpdate, props.history]);
    const submitHandler = (e) => {
      e.preventDefault();
      // TODO: dispatch update product
      dispatch(
        updateBrand({
          id: brandId,
          name,
        })
      );
    };
  return(
    <div>
        <form className="form a list" onSubmit={submitHandler}>
        <div>
          <h1>Chỉnh sửa nhãn hàng {name}</h1>
        </div>
        <div>
              <label htmlFor="name">Tên nhãn hàng</label>
              <input
                id="name"
                type="text"
                placeholder="Nhập tên nhãn hàng"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
        </form>

    </div>
  );
}