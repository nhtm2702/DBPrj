import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders,updateOrder } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { ORDER_DELETE_RESET, ORDER_UPDATE_RESET } from '../../constants/orderConstants';
import DoneIcon from '@material-ui/icons/Done';
import { Link, useParams } from 'react-router-dom';

export const OrdersManage = (props) => {
  const param = new URLSearchParams(props.location.search);
  const page = param.get("page");

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, pages } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = orderUpdate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const getFilterUrl = (filter) => {
    const filterPage = filter.page > 0 ? filter.page : filter.page === 0 ? 1 : page >= 0 ? page : 1;
    return `/ordersManage?page=${filterPage-1}`;
  }


  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch({ type: ORDER_UPDATE_RESET });
    dispatch(listOrders(page));
  }, [dispatch, successDelete, successUpdate, page]);



  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order.idOrder));
    }
  };
  const updateStatus = (order) =>{
    dispatch(updateOrder(order.idOrder));
  }

  function numberWithCommas(order) {
    const x = order.orderdetails.reduce((a, c) => a + c.quantityOrder * c.priceEach,0);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="order-admin-list">
      <h1>Quản lý đơn hàng</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Người đặt hàng</th>
                <th>Email</th>
                <th>Khách hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Tổng giá tiền</th>
                <th>Phương thức thanh toán</th>
                <th>Tình trạng</th>
                <th>Ngày giao hàng</th>
                <th>Tùy chỉnh</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.idOrder}>
                  <td>{order.idOrder}</td>
                  <td>{order.user.userLname} {order.user.userFname}</td>
                  <td>{order.user.userEmail}</td>
                  <td>{order.customerName}</td>
                  <td>{order.orderDate}</td>
                  <td>{numberWithCommas(order)}</td>
                  <td>
                    {
                    order.paymentMethod == 'PayPal' ? "Đã thanh toán" : "Thanh toán khi nhận hàng"
                    }</td>
                    <td>{order.status}</td>
                  <td>
                    {order.shippedDate}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order.idOrder}`);
                      }}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </button>
                    <button 
                      type="button"
                      className="small"
                      onClick={() => updateStatus(order)}
                      >
                        <DoneIcon/>
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

        </div>

        
      )}
    </div>
  );
};

