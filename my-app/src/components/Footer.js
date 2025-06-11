// src/components/Footer.js

import React from 'react';

function Footer() {
  return (
    <footer className="text-left mt-4">
      <p>&copy; Websoftware : BLUECAP</p>
      <p>
        Blue represents our youth, and Cap signifies being at the heart of that youth.</p> 
      <p> <span style={{ fontSize: '0.8rem' }}>Team members : Leezungzoo, Kim eun-si, Oh hee-seung</span></p>
      <p> <span style={{ fontSize: '0.8rem' }}> 대한민국 충청북도 청주시 서원구 개신동 충북대학교 S-4(전자정보대학)  <img
          src="/images/Github.png"
          height="30px"
          width="30px"
          style={{ marginRight: '0px', cursor: 'pointer' }}
          onClick={() => window.open('https://github.com/leezungzoo/bluecap')}
          alt="GitHub"
        /></span></p>
    </footer>
  );
}

export default Footer;
