import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './Navigation.css';
// import OpenModalButton from '../OpenModalButton';
import UserProfileDropdown from './UserAccountDropdown';

// cart modal
import CartModal from '../CartModal';
import { useModal } from '../../context/Modal';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.cart.cart);

	const cartItemCount = sessionUser
    ? Object.values(cart).reduce((acc, product) => acc + product.qty, 0)
    : 0;

	const {openModal} = useModal();
	const {modalContent} = useModal();
	// only show modal content, hide nav
	if (modalContent) return null;

	const handleCartClick = () => {
		openModal(<CartModal />);
	}

	return (
		<>
			<ul id='navigation-container'>
				<div className='left-nav'>
					<NavLink to="/products/all">
						SHOP
					</NavLink>
				</div>
				<div className='logo'>
					<NavLink exact to="/">
						Aromatea
					</NavLink>
				</div>

				<div className='right-nav'>
					{/* <div>SEARCH</div> */}
					{/* <div className='wishlist'>
						{sessionUser ?

						}
					</div> */}
					<div className='account'>
						{sessionUser ?
							<UserProfileDropdown user={sessionUser} />
							:
							<NavLink to="/login">ACCOUNT</NavLink>
						}
					</div>
					<div className='nav-cart' onClick={handleCartClick} style={{cursor: 'pointer'}}>
						{/* <NavLink to="/cart"> */}
							CART
						{/* </NavLink> */}
						<div className='item-count'>
							{`${cartItemCount}`}
						</div>
					</div>
					{/* {isLoaded && (
						<div>
							<ProfileButton user={sessionUser} />
						</div>
					)} */}
				</div>
			</ul>
		</>
	);
}

export default Navigation;
