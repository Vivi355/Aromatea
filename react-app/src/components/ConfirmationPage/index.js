import React from 'react';
import './ConfirmationPage.css'
import { NavLink } from 'react-router-dom';

const ConfirmationPage = () => {

    return (
        <div className='order-page'>
            <div className='order-title'>Order Completed!</div>
            <div className='order-thanku'>Thank you for choosing Aromatea! Your order is now being processed and will be with you shortly.</div>
            <NavLink to={'/products/all'}>
                <button className='obtn'>Continue Shopping</button>
            </NavLink>
            <div className='order-img'>
                <img src='https://capstone-aromatea.s3.us-west-1.amazonaws.com/tea-leaves-139617_1280.jpg'/>
            </div>
        </div>
    )
}

export default ConfirmationPage;
