import React from 'react';

const StarRating = ({ rating }) => {
    const renderStars = (rating) => {
        let stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
        }

        if (halfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }

        for (let j = 0; j < emptyStars; j++) {
            stars.push(<i key={`empty-${j}`} className="far fa-star"></i>);
        }

        return stars;
    };

    return (
        <div>
            {renderStars(rating)}
        </div>
    );
}

export default StarRating;
