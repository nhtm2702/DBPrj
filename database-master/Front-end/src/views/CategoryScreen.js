import React, {useEffect}  from 'react';
import "./css/home.css";
import './css/CategoryScreen.css';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {searchCategory} from '../actions/searchActions';
import {Link} from "react-router-dom";
import {prices} from "../utils"

export default function CategoryScreen(props) {
    
    const param = new URLSearchParams(props.location.search);
    const name = param.get("name");
    const page = param.get("page");
    const min = param.get("min");
    const max = param.get("max");
    const limit = 10;
    const categorySearch  = useSelector((state) => state.categorySearch);
    const { loading, error, data, pages} = categorySearch;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(searchCategory(name,page, limit, min, max));
    }, [dispatch, name, page, limit, min, max]);
    const getFilterUrl = (filter) => {
        const filterPage = filter.page > 0 ? filter.page : filter.page === 0 ? 1 : page >= 0 ? page : 1;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/category?name=${name}&page=${filterPage-1}&min=${filterMin}&max=${filterMax}`;
    }

    return (
        <div>
            { loading ? (
                <LoadingBox></LoadingBox>
            ): error ? (

                <MessageBox variant="danger"> {error}</MessageBox>
            ) : ( 
            <div className="home">    
                <div className="category__container">
                    <div className="price-filter-container ">
                        <ul className="price-filter">
                            {prices.map((price) => (
                                <li key={price.tag} className="" >
                                    <Link 
                                        to={getFilterUrl({ min: price.min, max: price.max })}
                                    >
                                    {/* <input type="radio" style={{}}></input> */}
                                    <span>{price.tag}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        {
                            data.length > 0 ? (
                                data[0].products.length > 0 ? (
                                    <div className="home__row" >
                                    {data[0].products.map((product) => (
                                    <Product key={product.idProduct} product={product}> </Product>
                                    
                                ))}
                                </div>
                                ) : (
                                    <div className="error-box">
                                    <MessageBox variant="danger"> "Kh??ng c?? s???n ph???m theo y??u c???u"</MessageBox>
                                    </div>
                                )
                            ) : (
                                <MessageBox variant="danger"> "Kh??ng c?? s???n ph???m theo y??u c???u"</MessageBox>
                            )}

                    
                </div>
                </div>
            </div>
            
            )}
{/* <div className="pagination-container">

<Pagination className="pagination">
    <Pagination.First />
    <Pagination.Prev />
    <Pagination.Item>{[...Array(pages).keys()].map((x) => (
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
    </Pagination.Item>
    <Pagination.Ellipsis />
    <Pagination.Next />
    <Pagination.Last />
</Pagination>
</div> */}
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
    );
}
