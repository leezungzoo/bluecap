// WelcomePage.js

import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { FaHome, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer';
import './styles/Footer.css';
import NavBar from './components/NavBar';

const images = [
  "images/ss-1.png",
  "images/ss-2.png",
  "images/ss-3.png",
  "images/ss-4.png",
  "images/ss-5.png",
  "images/ss-6.png",  
];

function WelcomePage() {
  const navigate = useNavigate();
  const bodyTextRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (bodyTextRef.current) {
      observer.observe(bodyTextRef.current);
    }

    return () => {
      if (bodyTextRef.current) {
        observer.unobserve(bodyTextRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextImage();
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, [currentImageIndex]); 

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <NavBar />
      <div className="welcomepage-container">
        <div id="body">
          <div className='welcompage-img' style={{ position: 'relative' }}>
            <img
              src={images[currentImageIndex]}
              alt="bluecap"
              style={{
                height: '650px',
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                objectFit: 'cover',
                marginBottom: '30px',
              }}
            />
            <button
              onClick={goToPrevImage}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNextImage}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="scroll-fade-in">

            <div className='button-row'>
              <button onClick={() => window.open('https://www.hanwhaeagles.co.kr/index.do', '_blank')} className="home-button">
                <FaHome />
                한화이글스 구단 홈페이지로 이동
              </button>

              <button onClick={() => window.open('https://www.koreabaseball.com/Schedule/Schedule.aspx', '_blank')} className='date-button'>
                <FaCalendarAlt />
                경기일정 바로가기
              </button>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WelcomePage;