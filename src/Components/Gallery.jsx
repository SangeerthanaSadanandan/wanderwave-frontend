import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import gallery1 from '../Assets/gallery-01.jpg'
import gallery2 from '../Assets/gallery-02.jpg'
import gallery3 from '../Assets/gallery-03.jpg'
import gallery4 from '../Assets/gallery-04.jpg'
import gallery5 from '../Assets/gallery-05.jpg'
import gallery6 from '../Assets/gallery-06.jpg'
import gallery7 from '../Assets/gallery-07.jpg'
import gallery8 from '../Assets/gallery-08.jpg'


const galleryImages = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8
]

function Gallery() {
  return (
    <>
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 1, 992: 4 }}>
            <Masonry gutter='16px'>
                {
                    galleryImages.map((item, index) => (
                        <img className='masonry__img' src={item} key={index} alt=""
                            style={{ 'width': '100%', 'display': 'block', 'borderRadius': '10px' }} />
                    ))
                }
            </Masonry>
        </ResponsiveMasonry>
    </>
  )
}

export default Gallery