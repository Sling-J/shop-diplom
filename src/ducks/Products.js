const initialState = {
  products: [
    {
      id: 1,
      title: 'Фарш "Особый" говяжий смешанный 900гр',
      img: 'https://i.ibb.co/80xxV3N/2021-06-07-15-52-12.jpg',
      price: 900
    },
    {
      id: 2,
      title: 'Домашний фарш говяжий 1кг',
      img: 'https://i.ibb.co/WDK16kW/2021-06-07-15-52-31.jpg',
      price: 1500
    },
    {
      id: 3,
      title: 'Фарш говяжий смешанный 380гр',
      img: 'https://i.ibb.co/xmTDh7C/2021-06-07-15-52-22.jpg',
      price: 350
    },
    {
      id: 4,
      title: 'Слоёное тесто 1кг',
      img: 'https://i.ibb.co/VvQ1fWB/2021-06-07-15-52-56.jpg',
      price: 450
    },
    {
      id: 5,
      title: 'Торт "Сказка" с творожным кремом',
      img: 'https://i.ibb.co/0FcrdDQ/IMG-6588.jpg',
      price: 900
    },
    {
      id: 6,
      title: 'Медовик маленький 400гр',
      img: 'https://i.ibb.co/S6GzCyJ/IMG-6589.jpg',
      price: 900
    },
    {
      id: 7,
      title: 'Торт медовик 800гр',
      img: 'https://i.ibb.co/ZmNVFBj/IMG-6590.jpg',
      price: 900
    },
    {
      id: 8,
      title: 'Пельмени домашние 900гр',
      img: 'https://i.ibb.co/7QFh8DB/IMG-6591.jpg',
      price: 900
    },
    {
      id: 9,
      title: 'Пельмени мусульманские 400гр',
      img: 'https://i.ibb.co/xMGpRd7/IMG-6592.jpg',
      price: 900
    },
  ]
};

const products = (state = initialState) => state;

export default products