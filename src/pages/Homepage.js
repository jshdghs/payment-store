import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const products = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    price: 120,
    image: 'https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg'
  },
  {
    id: 2,
    name: 'Adidas Ultraboost Light',
    price: 140,
    image: 'https://images.pexels.com/photos/1750045/pexels-photo-1750045.jpeg'
  },
  {
    id: 3,
    name: 'Puma RS-X Efekt',
    price: 90,
    image: 'https://images.pexels.com/photos/2759779/pexels-photo-2759779.jpeg'
  },
  {
    id: 4,
    name: 'Converse Chuck Taylor',
    price: 65,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
  },
  {
    id: 5,
    name: 'Reebok Classic Leather',
    price: 75,
    image: 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg'
  },
  {
    id: 6,
    name: 'New Balance 997H',
    price: 100,
    image: 'https://images.pexels.com/photos/7543639/pexels-photo-7543639.jpeg'
  },
  {
    id: 7,
    name: 'Vans Old Skool',
    price: 60,
    image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg'
  },
  {
    id: 8,
    name: 'Asics Gel-Kayano',
    price: 130,
    image: 'https://images.pexels.com/photos/18946887/pexels-photo-18946887.jpeg'
  },
  {
    id: 9,
    name: 'Fila Disruptor II',
    price: 95,
    image: 'https://images.pexels.com/photos/2442889/pexels-photo-2442889.jpeg'
  },
  {
    id: 10,
    name: 'Jordan Retro 1',
    price: 150,
    image: 'https://images.pexels.com/photos/12739960/pexels-photo-12739960.jpeg'
  }
];

function HomePage() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector(state => state.cart);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePayment = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    setShowPayment(false);
    setPaymentSuccess(true);
  };

  return (
    <div className="container">
      <h1>Shoe Store</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="cart-box">
        <h2>🛒 Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span>{item.name} - ${item.price}</span>
                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </div>
            ))}
            <h3>Total: ${totalAmount}</h3>
            <button onClick={() => setShowPayment(true)}>Proceed to Payment</button>
          </>
        )}
      </div>

      {showPayment && (
        <div className="payment-box">
          <h2>💳 Payment</h2>
          <form onSubmit={handlePayment}>
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="Expiry Date" required />
            <input type="text" placeholder="CVV" required />
            <button type="submit">Pay</button>
          </form>
        </div>
      )}

      {paymentSuccess && (
        <div className="success-box">
          <h2>✅ Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;

