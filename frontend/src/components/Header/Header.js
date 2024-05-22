import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../images/giftlogo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="fixed-top bg-white border-bottom" style={{ height: '120px', zIndex: '1000' }}>
      <Container fluid className="bg-custom px-0" style={{ backgroundColor: '#0496FF' }}>
        <div className="d-flex align-items-end">
          <img src={logo} alt="Logo" style={{ width: '105px', marginRight: '10px', marginLeft: '0' }} />
          <h1 className="text-primary text-white m-1" style={{ marginBottom: '5', fontFamily: 'Times New Roman, Times, serif',fontSize: 'clamp(12px, 4vw, 36px)' }}>FYP Management System</h1>
        </div>
      </Container>
    </header>
  );
};

export default Header;