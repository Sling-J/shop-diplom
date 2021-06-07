import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";

import {Pagination, Modal, Input} from "antd";
import {UserOutlined, HeartFilled, FileTextOutlined} from '@ant-design/icons';

import ProductCard from "../Ui/ProductCard/ProductCard";
import Cart from "../Ui/Cart/Cart";

import {addToCart} from '../../ducks/Cart'
import {auth} from '../../ducks/Admin'

const LOGIN_KEY = 'admin';
const PASSWORD_KEY = '123123';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [productsPerPage] = useState(5);

  const {products} = useSelector(state => state.products);
  const {isAuth} = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const history = useHistory();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  };

  return (
    <main>
      <Cart/>

      <Modal
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          if (login === LOGIN_KEY && password === PASSWORD_KEY) {
            dispatch(auth());
            history.push('/admin');
          }
        }}
        cancelText="Отмена"
        okText="Войти"
        width={300}
        title="Авторизация"
      >
        <div className="auth-form">
          <div className="auth-form-field">
            <p>Имя пользователя</p>
            <Input
              value={login}
              onChange={e => setLogin(e.target.value)}
              placeholder="Введите имя пользователя"
            />
          </div>

          <div className="auth-form-field">
            <p>Пароль</p>
            <Input.Password
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
        </div>
      </Modal>

      <nav>
        <div className="logo">
          <div className="logo-title flex flex-align-center justify-center">
            <p className="logo-title__prefix">T<br/>H<br/>E</p>
            <p className="logo-title__text">Big Store</p>
          </div>

          <p className="logo-title-desc">
            THE BEST SUPERMARKET
          </p>
        </div>
        <div className="menu flex flex-align-center justify-center">
          {isAuth ? (
            <Link className="menu-item" to='/admin'>
              Привет, admin!
            </Link>
          ) : (
            <Link className="menu-item" to='/' onClick={() => setIsOpen(true)}>
              <UserOutlined/>
              Авторизоваться
            </Link>
          )}

          <Link className="menu-item" to='/'>
            <HeartFilled/>
            Список желаний
          </Link>
          <Link className="menu-item" to='/'>
            <FileTextOutlined/>
            История покупок
          </Link>
        </div>
      </nav>

      <header>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda, cupiditate, debitis dolor eum ex
          facere, harum laborum libero
        </h1>
      </header>

      <section>
        <div className="wrapper">
          <div className="offers-title">
            <span className="offers-title__text">
              Специальные предложения
            </span>

            <div className="offers-title__icon">
              <div className="offers-title-icon__line-up"/>
              <div className="offers-title-icon__line-down"/>
              <div className="offers-title-icon__box">
                <div className="offers-title-icon-box__border"/>
              </div>
            </div>
          </div>

          <div className="offers">
            <div className="pagination">
              <Pagination
                pageSize={productsPerPage}
                total={products.length}
                current={currentPage}
                onChange={paginate}
              />
            </div>

            <div className="offers-list">
              {currentProducts.map(product => (
                <ProductCard
                  key={product.id}
                  img={product.img}
                  title={product.title}
                  price={product.price}
                  onAdding={() => dispatch(addToCart(product))}
                  className="offers-list-item"
                />
              ))}
            </div>

            <div className="offers-pagination pagination">
              <Pagination
                pageSize={productsPerPage}
                total={products.length}
                current={currentPage}
                onChange={paginate}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;