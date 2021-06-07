import React from 'react';

const ProductCard = ({
  title,
  img,
  price,
  className,
}) => {
  return (
    <div className={`product-card ${className}`}>
      <div>
        <div className="product-card-in-stock">
          <p className="product-card-in-stock-text">
            В наличии
          </p>
        </div>

        <div className="product-card-img">
          <img src={img} alt="product"/>
        </div>

        <p className="product-card-title">
          {title}
        </p>

        <p className="product-card-price">
          {price} тг
        </p>
      </div>

      <div className="product-card-buy">
        <button className="product-card-buy__button">
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;