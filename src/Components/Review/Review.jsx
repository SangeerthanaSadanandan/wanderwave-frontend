import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Review.css';
import reviewimg from '../../Assets/GUEST_KuLov53.jpg'

function Review() {
    const reviews = [
        {
            text: "Trip with WanderWave was a very good experience... Willing to go to with their future tour packages also.. ",
            author: "Naveen",
            image: reviewimg
        },
        {
            text: "Had a fantastic time exploring new places. Would definitely recommend it to others!",
            author: "Meera",
            image: reviewimg
        },
        {
            text: "I like WanderWave for their quick service and support. Also, they have attractive holiday packages, highly recommended.",
            author: "Vipinlal",
            image: reviewimg
        },
        {
            text: "Thank you so much to the entire team who have worked behind our family trip a huge success. It was a great experience and full of happy memories.",
            author: "Pooja",
            image: reviewimg
        },
        {
            text: "Very supportive and organaized service. Flexible and friendly dealings... Highly recomended. Decent packages.",
            author: "Nithin",
            image: reviewimg
        },
        {
            text: "Amazing experience! The tour guides were very knowledgeable and friendly.",
            author: "Hiran",
            image: reviewimg
        }
    ];

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        arrows: true,
    };

    return (
        <div className="review-section">
            <div className="slider-container">
                <Slider {...settings}>
                    {reviews.map((review, index) => (
                        <div key={index}>
                            <div className="review-card">
                                <img src={review.image} alt='' className="review-image" />
                                <p className="review-text">{review.text}</p>
                                <p className="review-author">- {review.author}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Review;
