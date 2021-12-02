import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import {listProductCategories, createCategory, deleteCategory, detailsCategory, updateCategory} from "../../actions/productActions";
import {
    CREATE_CATEGORY_RESET,
    DELETE_CATEGORY_RESET,
    CATEGORY_UPDATE_RESET,
} from '../../constants/productConstants';


export const ProductsTypeManage = (props) => {
  const listCategory = useSelector((state) => state.listCategory);
  const {loading: loadingCategory, error: errorCategory, categories} = listCategory;
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: DELETE_CATEGORY_RESET});
    }
  dispatch(listProductCategories());
  },[dispatch, successDelete, props.history]);
  const deleteHandler = (category) => {
  if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteCategory(category.idCategory));
    }
  };

  return (
    <div className='ProductsType'>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        { loadingCategory ? (
          <LoadingBox></LoadingBox>
        ) : errorCategory ? (
          <MessageBox variant="danger"> {errorCategory}</MessageBox>
        ) : (
          <>
              <table className="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Danh mục</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories.map((category) => (
                    <tr >
                      <td>{category.idCategory}</td>
                      <td>{category.categoryName}</td>
                      <td>
                        <button
                        type="button"
                        className="small"
                        onClick={() =>
                          props.history.push(`${category.idCategory}/edit`)
                        }
                        >
                        Chỉnh sửa
                        </button>
                        <button
                          type="button"
                          className="small"
                          onClick={() => deleteHandler(category)}
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

export const AddProductsType = (props) => {
  const [nameCategory, setNameCategory] = useState('');
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = categoryCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CREATE_CATEGORY_RESET });
      props.history.push('/productsType/productsTypeManage');
    }
  }, [dispatch, successCreate, props.history]);
  const submitHandler = (e) => {
  
    e.preventDefault();
    
    // TODO: dispatch update product
    dispatch(
      createCategory({
        nameCategory,
      })
    );
  };  
  return (
    <div className='AddProductsType'>
       <form className="form a list" onSubmit={submitHandler}>  
      <div><h1>Thêm danh mục</h1></div>
      <div>
            <label htmlFor="name">Tên danh mục</label>
              <input
                id="name"
                type="text"
                placeholder="Nhập tên danh mục"
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
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

export const EditCategoryScreen = (props) => {
  const param = new URLSearchParams(props.location.search);
  const categoryId = props.match.params.id
  const [name, setName] = useState('');
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  const categoryDetails = useSelector((state) => state.categoryDetails);

  const { loading, error, category } = categoryDetails;
  const dispatch = useDispatch();
   useEffect(() => {
     console.log(categoryId)
    if (successUpdate) {
      props.history.push('/productsType/productsTypeManage');
    }
    if (!category || successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET})
      dispatch(detailsCategory(categoryId));
    }
    else{
      setName(category.categoryName);
    }
    }, [category, dispatch, categoryId, successUpdate, props.history]);
    const submitHandler = (e) => {
      e.preventDefault();
      // TODO: dispatch update product
      dispatch(
        updateCategory({
          id: categoryId,
          name,
        })
      );
    };
  return(
    <div>
        <form className="form a list" onSubmit={submitHandler}>
        <div>
          <h1>Chỉnh sửa danh mục{name}</h1>
        </div>
        <div>
              <label htmlFor="name">Tên danh mục</label>
              <input
                id="name"
                type="text"
                placeholder="Nhập tên danh mục"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
        </form>

    </div>
  );
}