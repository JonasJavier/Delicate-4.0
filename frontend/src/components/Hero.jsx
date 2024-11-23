import React from 'react'; 
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroImage from '../assets/images/hero/Hero.jpg'; 
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <StyledHeroSection>
            <div className="overlay"></div>
            <div className="content">
                <p className="small-title">Fresh & Organic</p>
                <h1 className="main-title">Handmade Soaps</h1>
                <Link to= "/shop" className="btn custom-btn">Shop Now</Link>
            </div>
        </StyledHeroSection>
    );
};

const StyledHeroSection = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${heroImage}); 
    background-size: cover; 
    background-position: center;
    background-attachment: fixed; 
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    .overlay {
        background-color: rgba(0, 0, 0, 0.5); 
        position: absolute;
        top: 0;
        start: 0;
        width: 100%;
        height: 100%;
    }

    .content {
        z-index: 1; 
        color: white;
        position: relative;
    }

    .small-title {
        color: #fff;
        font-size: 3rem !important; 
        margin-top: 5%;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .main-title {
        color: #fff;
        font-size: 7rem;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
        font-family: Sarlotte;
        letter-spacing: 4px;
    }

    .custom-btn {
        background-color: #cd8532; 
        color: #fff; 
        border: none; 
        font-size: 1.3rem; 
        padding: 10px 35px; 
        border-radius: 30px; 
        transition: all 0.3s ease; 

        &:hover {
            background-color: #000000; 
            color: #ff910b; 
            transform: scale(1.1); 
        }
    }

    /* Responsive Design */
    @media (max-width: 1081px) {
        .small-title {
            font-size: 2.3rem !important;
        }

        .main-title {
            font-size: 5rem;
        }

        .custom-btn {
            font-size: 1.3rem;
            padding: 6px 25px;
            margin-top: -2%;
        }
    }

    @media (max-width: 940px) {
        .small-title {
            font-size: 2.5rem !important;
        }

        .main-title {
            font-size: 4.5rem;
        }

        .custom-btn {
            font-size: 1rem;
            padding: 8px 20px;
            margin-top: -3%;
        }
    }

    @media (max-width: 768px) {
        .small-title {
            font-size: 2.3rem !important ;
        }

        .main-title {
            font-size: 4rem;
        }

        .custom-btn {
            font-size: 1rem;
            padding: 7px 20px;
        }
    }

    @media (max-width: 620px) {
        height: 90vh; 

        .small-title {
            font-size: 1.8rem !important;
        }

        .main-title {
            font-size: 3rem !important;
        }

        .custom-btn {
            font-size: 1rem;
            padding: 5px 20px;
        }
    }

    @media (max-width: 500px) {
        height: 80vh; 

        .small-title {
            font-size: 1.5rem !important;
        }

        .main-title {
            font-size: 2.5rem !important;
        }

        .custom-btn {
            font-size: 0.9rem;
            padding: 4px 18px;
        }
    }

    @media (max-width: 420px) {
        height: 80vh; 

        .small-title {
            font-size: 1.2rem !important;
        }

        .main-title {
            font-size: 2rem !important;
        }

        .custom-btn {
            font-size: 0.7rem;
            padding: 4px 17px;
        }
    }

    @media (max-width: 353px) {
        height: 80vh; 
        .small-title {
            font-size: 0.9rem !important;
        }

        .main-title {
            font-size: 1.6rem !important;
        }

        .custom-btn {
            font-size: 0.6rem;
            padding: 4px 14px;
        }
    }
`;

export default HeroSection;
