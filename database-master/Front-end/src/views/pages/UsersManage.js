import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import '../css/userManage.css'
import {USER_DELETE_RESET } from '../../constants/userConstants';
import { Link, useParams } from 'react-router-dom';

function UsersManage(props) {
  const param = new URLSearchParams(props.location.search);
  const page = param.get("page");

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, pages } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(listUsers(page));
    dispatch({
      type: USER_DELETE_RESET,
    });
  }, [dispatch, successDelete, page]);


  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user.idUser));
    }
  };
  const getFilterUrl = (filter) => {
    const filterPage = filter.page > 0 ? filter.page : filter.page === 0 ? 1 : page >= 0 ? page : 1;
    return `/usersManage?page=${filterPage-1}`;
}
  return (
    <div className="users">
      <h1>Danh sách người dùng</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <div>
        <div className="table-content">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.idUser}>
                  <td>{user.idUser}</td>
                  <td>{user.userFname} {user.userLname}</td>
                  <td>{user.userEmail}</td>
                
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => props.history.push(`/user/${user.idUser}/edit`)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(user)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    </div>
    )}
  </div>
  );
}

export default UsersManage;