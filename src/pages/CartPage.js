import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cartItems, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 30 }}>
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <h4>{item.name}</h4>
          <p>${item.price}</p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
      <h3>Total: ${totalAmount}</h3>
      <button onClick={() => navigate('/payment')}>Proceed to Payment</button>
    </div>
  );
}

export default CartPage;
