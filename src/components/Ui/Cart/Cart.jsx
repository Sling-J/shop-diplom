import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Badge, Modal, Alert, InputNumber, Button, Pagination, Input} from "antd";
import {ShoppingCartOutlined, DeleteOutlined} from "@ant-design/icons";

import {changeItemCount, removeFromCart, clearCart} from "../../../ducks/Cart";
import {addToOrder} from "../../../ducks/Admin";

const { TextArea } = Input;

const Cart = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [stage, setStage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');

  const {items} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentItems = items.slice(indexOfFirstProduct, indexOfLastProduct);

  function success() {
    Modal.success({
      content: 'Заказ успешно оформлен!',
    });
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    if (items.length === 0) {
      setIsModalVisible(false);
    } else if (stage === 1) {
      setStage(2);
    } else {
      setIsModalVisible(false);
      dispatch(clearCart());
      setStage(1);
      setFullName('');
      setPhone('');
      setComment('');
      setAddress('');
      setCurrentPage(1);
      dispatch(addToOrder({
        fullName: fullName,
        address: address,
        phone: phone,
        comment: comment,
        items,
      }));
      success();
    }
  };

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  };

  return (
    <Fragment>
      <Badge className="cart" count={items.reduce((a, b) => a + b.count, 0)} onClick={showModal}>
        <ShoppingCartOutlined/>
      </Badge>

      <Modal
        title={stage === 1 ? (
          <div><ShoppingCartOutlined/> Корзина</div>
        ) : (
          `Общая сумма: ${items.reduce((a, b) => a + (b.price * b.count), 0)} тг`
        )}
        onOk={items.length !== 0 ? handleOk : handleCancel}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button onClick={() => {
            if (stage === 1) {
              setIsModalVisible(false);
            } else {
              setStage(1)
            }
          }}>
            {stage === 1 ? "Закрыть" : "Назад"}
          </Button>,
          <Button
            type="primary"
            onClick={handleOk}
            disabled={stage === 2 && (fullName.length === 0 || phone.length === 0 || address.length === 0)}
          >
            {items.length !== 0 && stage === 1
              ? 'Далее'
              : items.length !== 0 && stage === 2
                ? 'Оформить заказ'
                : 'Ок'
            }
          </Button>
        ]}
        width={600}
      >
        {items.length === 0 ? (
          <Alert message="Ваша корзина пуста" type="error"/>
        ) : (
          <div className="cart-list">
            {stage === 1 ? (
              <Fragment>
                {currentItems.map(item => (
                  <div className="cart-list__item flex flex-align-center justify-sb" key={item.id}>
                    <div className="flex flex-align-center">
                      <div className="cart-list-item__img">
                        <img src={item.img} alt="Product"/>
                      </div>

                      <p className="cart-list-item__title">
                        {item.title}
                      </p>

                      <p className="cart-list-item__price">
                        {item.price} тг
                      </p>

                      <div className="cart-list-item__counter">
                        <InputNumber
                          min={1}
                          value={item.count}
                          onChange={value => dispatch(changeItemCount({
                            id: item.id,
                            count: value
                          }))}
                        />
                      </div>

                      <p className="cart-list-item__total">
                        {item.price * item.count} тг
                      </p>
                    </div>

                    <div className="cart-list-item__action">
                      <Button
                        type="primary"
                        icon={<DeleteOutlined/>}
                        onClick={() => dispatch(removeFromCart(item.id))}
                        danger
                      />
                    </div>
                  </div>
                ))}

                <div className="cart-pagination">
                  <p>Общая сумма: <b>{items.reduce((a, b) => a + (b.price * b.count), 0)} тг</b></p>

                  <Pagination
                    pageSize={itemsPerPage}
                    total={items.length}
                    current={currentPage}
                    onChange={paginate}
                  />
                </div>
              </Fragment>
            ) : (
              <div className="card-form">
                <div className="card-form-field">
                  <p className="card-form-field-label">
                    ФИО <span>*</span>
                  </p>

                  <Input
                    required
                    value={fullName}
                    placeholder="Введите фио"
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>

                <div className="card-form-field">
                  <p className="card-form-field-label">
                    Номер телефона <span>*</span>
                  </p>

                  <Input
                    required
                    value={phone}
                    placeholder="Введите номер телефона"
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div className="card-form-field">
                  <p className="card-form-field-label">
                    Адрес доставки <span>*</span>
                  </p>

                  <Input
                    required
                    value={address}
                    placeholder="Введите адрес доставки"
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>

                <div className="card-form-field">
                  <p className="card-form-field-label">
                    Комментарии (необязательно)
                  </p>

                  <TextArea
                    value={comment}
                    rows={4}
                    placeholder="Введите комментарии"
                    onChange={e => setComment(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal>

      </Modal>
    </Fragment>
  );
};

export default Cart;