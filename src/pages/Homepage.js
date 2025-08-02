import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';
import '../App.css';

const products = [
  {
    id: 1,
    name: 'Nike Air Max',
    price: 120,
    image: 'https://thumblr.uniid.it/product/352916/045f2653b5d7.jpg?width=1920&format=webp&q=75',
  },
  {
    id: 2,
    name: 'Adidas Ultraboost',
    price: 150,
    image: 'https://thumblr.uniid.it/product/373236/46e72d99af3f.jpg?width=1920&format=webp&q=75',
  },
  {
    id: 3,
    name: 'Puma Runner',
    price: 100,
    image: 'https://thumblr.uniid.it/product/385894/63d141f08121.jpg?width=640&format=webp&q=75',
  },
  {
    id: 4,
    name: 'Reebok Flexagon',
    price: 110,
    image: 'https://thumblr.uniid.it/product/291976/522c9cdcb217.jpg?width=640&format=webp&q=75',
  },
  {
    id: 5,
    name: 'New Balance Fresh Foam',
    price: 130,
    image: 'https://thumblr.uniid.it/product/392862/610037036365.jpg?width=640&format=webp&q=75',
  },
  {
    id: 6,
    name: 'Under Armour HOVR',
    price: 125,
    image: 'https://thumblr.uniid.it/product/384408/639ff462382f.jpg?width=640&format=webp&q=75',
  },
  {
    id: 7,
    name: 'Asics Gel Kayano',
    price: 140,
    image: 'https://thumblr.uniid.it/product/373235/0917c63b56d6.jpg?width=640&format=webp&q=75',
  },
  {
    id: 8,
    name: 'Converse Chuck Taylor',
    price: 90,
    image: 'https://thumblr.uniid.it/product/384245/6fbf256d38e1.jpg?width=640&format=webp&q=75',
  },
  {
    id: 9,
    name: 'Vans Old Skool',
    price: 85,
    image: 'https://thumblr.uniid.it/product/408087/c936660e6415.jpg?width=640&format=webp&q=75',
  },
  {
    id: 10,
    name: 'Jordan Retro 1',
    price: 160,
    image: 'https://thumblr.uniid.it/product/380174/a719f00b6cf6.jpg?width=640&format=webp&q=75',
  },
];


function HomePage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const total = useSelector(state => state.cart.totalAmount);

  const [view, setView] = useState('shop'); // 'shop' | 'payment' | 'success'
  const [search, setSearch] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handlePay = () => {
    if (cardNumber && cardName) {
      dispatch(clearCart());
      setView('success');
    } else {
      alert('Please enter valid card details');
    }
  };

  return (
    <div className="app-container">
      <h1>Shoe Store</h1>

      {view === 'shop' && (
        <>
          <input
            type="text"
            placeholder="Search shoes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />

          <div className="main-content">
            <div className="product-list">
              {filtered.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
                </div>
              ))}
            </div>

            <div className="cart">
              <h2>Cart</h2>
              {cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - ${item.price}
                      <button onClick={() => dispatch(removeFromCart(item.id))}>❌</button>
                    </li>
                  ))}
                </ul>
              )}
              <h3>Total: ${total}</h3>
              <button
                disabled={cartItems.length === 0}
                onClick={() => setView('payment')}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </>
      )}

      {view === 'payment' && (
        <div className="payment-page">
          <h2>Payment Page</h2>
          <p>Total: ${total}</p>
          <input
            type="text"
            placeholder="Cardholder Name"
            value={cardName}
            onChange={e => setCardName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Card Number"
            maxLength="16"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
          />
          <div className="payment-buttons">
            <button onClick={() => setView('shop')}>Back to Cart</button>
            <button onClick={handlePay}>Pay Now</button>
          </div>
        </div>
      )}

      {view === 'success' && (
        <div className="success-page">
          <h2>✅ Payment Successful!</h2>
          <button onClick={() => setView('shop')}>Back to Home</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
