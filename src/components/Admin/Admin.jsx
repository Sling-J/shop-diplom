import React from "react";
import {Link} from "react-router-dom";

import {Table} from "antd";
import {FileTextOutlined, HeartFilled, UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

const columns = [
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Кол-во',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'Общая сумма',
    dataIndex: 'total',
    key: 'total',
  },
];

const Admin = () => {
  const {isAuth, orders} = useSelector(state => state.admin);

  return (
    <main>
      <nav>
        <div className="logo">
          <Link to="/" className="logo-link">
            <div className="logo-title flex flex-align-center justify-center">
              <p className="logo-title__prefix">T<br/>H<br/>E</p>
              <p className="logo-title__text">Big Store</p>
            </div>
          </Link>

          <p className="logo-title-desc">
            THE BEST SUPERMARKET
          </p>
        </div>
        <div className="menu flex flex-align-center justify-center">
          {isAuth ? (
            <p className="menu-item">
              Привет, admin!
            </p>
          ) : (
            <Link className="menu-item" to='/'>
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

      <div className="admin-table">
        <div className="wrapper">
          {orders.map((order, idx) => (
            <div className="admin-table-item">
              <div className="admin-table-item-title">
                <p>{idx + 1}) Заказчик: <span>{order.fullName}</span></p>
                <p>Номер телефона: <span>{order.phone}</span></p>
                <p>Адресс: <span>{order.address}</span></p>
                <p>Комментарии: <span>{order.comment}</span></p>
                <div className="admin-table-item-footer flex flex-align-center justify-sb">
                  <p>Список продуктов:</p>

                  <p>Общая сумма: <b>{order.items.reduce((a, b) => a + (b.price * b.count), 0)} тг</b></p>
                </div>
              </div>

              <Table columns={columns} dataSource={order.items.map(item => ({
                ...item,
                price: `${item.price} тг.`,
                count: `${item.count} шт.`,
                total: `${item.count * item.price} тг.`,
                key: idx + 1
              }))} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Admin;