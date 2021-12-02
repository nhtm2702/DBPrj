import React, {useEffect}  from 'react';
import "./css/home.css";
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {searchKeyword} from '../actions/searchActions';
import {Link} from "react-router-dom";

export default function SearchScreen(props) {
    const dispatch = useDispatch();
    const param = new URLSearchParams(props.location.search);
    const query = param.get("query");
    const page = param.get("page");
    const keywordSearch  = useSelector((state) => state.keywordSearch );
    const { loading, error, products, pages} = keywordSearch;

  
    useEffect(() => {
      dispatch(searchKeyword(query, page));
    }, [dispatch, query, page]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page > 0 ? filter.page : filter.page === 0 ? 1 : page >= 0 ? page : 1;
        const filterQuery = query;
        return `/search?query=${filterQuery}&page=${filterPage-1}`;
    }
    return (
        <div>
            { loading ? (
                <LoadingBox></LoadingBox>
            ): error ? (
                <MessageBox variant="danger"> {error}</MessageBox>
            ) : ( 
            <div>
            <div className="home">    
                <div className="home__container">
                    <div className="home__row">
                        {products.map((product) => (
                            <Product key={product.idProduct} product={product}> </Product>
                        ))}
                    </div>
                </div>
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

 