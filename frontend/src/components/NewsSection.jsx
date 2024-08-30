import React from 'react';
import '../assets/css/NewsSection.css';
import img1 from '../assets/images/news/img1.jpg';
import img2 from '../assets/images/news/img2.jpg';
import img3 from '../assets/images/news/img3.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NewsSection = () => {
  return (
    <div className="container2 my-5">
      <div className="text-center mb-3">
        <h2 className="text-uppercase display-4">
          <span className="text-orange">Our</span> News
        </h2>
      </div>
      <div className="row">
        <div className="col-md-4 col-12">
          <div className="card news-card">
            <img src={img1} className="card-img-top2" alt="News 1" />
            <div className="card-body2">
              <h5 className="card-title2">You will vainly look for fruit on it in autumn.</h5>
              <div className="card-meta mb-2 text-muted">
                <span><i className="fas fa-user"></i> Admin</span>
                <span><i className="fas fa-calendar-alt"></i> 27 December, 2019</span>
              </div>
              <p className="card-text">Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi. Praesent vitae mattis nunc, egestas viverra eros.</p>
              <a href="#" className="btn btn-link read-more">Read more <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="card news-card">
            <img src={img2} className="card-img-top2" alt="News 2" />
            <div className="card-body2">
              <h5 className="card-title2">A man's worth has its season, like tomato.</h5>
              <div className="card-meta mb-2 text-muted">
                <span><i className="fas fa-user"></i> Admin</span>
                <span><i className="fas fa-calendar-alt"></i> 27 December, 2019</span>
              </div>
              <p className="card-text">Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi. Praesent vitae mattis nunc, egestas viverra eros.</p>
              <a href="#" className="btn btn-link read-more">Read more <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="card news-card">
            <img src={img3} className="card-img-top2" alt="News 3" />
            <div className="card-body2">
              <h5 className="card-title2">Good thoughts bear good fresh juicy fruit.</h5>
              <div className="card-meta mb-2 text-muted">
                <span><i className="fas fa-user"></i> Admin</span>
                <span><i className="fas fa-calendar-alt"></i> 27 December, 2019</span>
              </div>
              <p className="card-text">Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi. Praesent vitae mattis nunc, egestas viverra eros.</p>
              <a href="#" className="btn btn-link read-more">Read more <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
