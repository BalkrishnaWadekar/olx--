import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function OlxCarousel() {
    return <>
        <Carousel>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    src='../../images/tfour.jpg'
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3 className='text-light shadow-lg'>Upto 70% Off On All Credit Card*</h3>
                    <p className='text-light'>Get upto 30% to 70% off on all orders. Offer for limited period.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    src='../../images/ttwo.jpg'
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3 className='text-light'>Evergreen Your Happiness On Shopping </h3>
                    <p className='text-light'>Explore your fashion find everything about lifestyle.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    src='../../images/tthree.jpg'
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3 className='text-light'>Earn Gifts And Much More!</h3>
                    <p className='text-light'>
                        Earn surprice gifts on all order above 499 /- Lets continue shopping
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
}
