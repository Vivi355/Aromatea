import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './Navigation.css';
// import OpenModalButton from '../OpenModalButton';
import UserProfileDropdown from './UserAccountDropdown';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

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
					<div className='account'>
						{sessionUser ?
							<UserProfileDropdown user={sessionUser} />
							:
							<NavLink to="/login">ACCOUNT</NavLink>
						}
					</div>
					<div>CART</div>
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
