import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token');

  return (
    <div className="home-layout">
      {/* NAVBAR */}
      <nav className="home-nav">
        <div className="home-nav__container">
          <div className="home-nav__brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="home-nav__logo">🏸</span>
            <span className="home-nav__name">Giao lưu Cầu Lông</span>
          </div>
          
          <div className="home-nav__links">
            <Link to="/feed" className="home-nav__link home-nav__link--active">Tìm kèo</Link>
            <a href="#san" className="home-nav__link">Sân</a>
            <a href="#xephang" className="home-nav__link">Xếp hạng</a>
            <a href="#sudung" className="home-nav__link">Sử dụng</a>
          </div>

          <div className="home-nav__actions">
            <button className="home-nav__icon-btn">📍 Khu vực</button>
            <button className="home-nav__icon-btn">🏆</button>
            <button className="home-nav__icon-btn">📅</button>
            <button className="home-nav__icon-btn">🔔</button>
            {token ? (
              <button className="btn-gradient" onClick={() => navigate('/feed')}>
                Vào Tìm Kèo
              </button>
            ) : (
              <button className="btn-gradient" onClick={() => navigate('/login')}>
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="home-main">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero__badge">
            <span className="hero__badge-text">✨ Nền tảng cầu lông số 1 Việt Nam</span>
          </div>
          <h1 className="hero__title">
            Kết Nối Đam Mê <br />
            <span className="text-gradient">Chinh Phục Sân Cầu</span>
          </h1>
          <p className="hero__subtitle">
            Tìm đối thủ, ghép kèo, đặt sân và tham gia các giải đấu hấp dẫn một cách dễ dàng và nhanh chóng nhất.
          </p>
          <div className="hero__cta">
            <button className="btn-gradient btn-gradient--large" onClick={() => navigate('/feed')}>
              Bắt Đầu Ngay
            </button>
            {!token && (
              <button className="btn-outline btn-outline--large" onClick={() => navigate('/login')}>
                Tạo Tài Khoản
              </button>
            )}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="features">
          <div className="feature-card feature-card--blue">
            <div className="feature-card__content">
              <span className="feature-card__tag">Phổ biến</span>
              <h3 className="feature-card__title">Tìm Kèo Giao Lưu</h3>
              <p className="feature-card__desc">Tham gia các nhóm đánh cầu phù hợp với trình độ của bạn.</p>
            </div>
            <div className="feature-card__icon">🏸</div>
          </div>

          <div className="feature-card feature-card--pink">
            <div className="feature-card__content">
              <span className="feature-card__tag feature-card__tag--pink">Mới</span>
              <h3 className="feature-card__title">Lớp Dạy Cầu Lông</h3>
              <p className="feature-card__desc">Nâng cao kỹ năng với các huấn luyện viên chuyên nghiệp.</p>
            </div>
            <div className="feature-card__icon">🎓</div>
          </div>

          <div className="feature-card feature-card--purple">
            <div className="feature-card__content">
              <span className="feature-card__tag feature-card__tag--purple">Hot</span>
              <h3 className="feature-card__title">Giải Đấu CLB</h3>
              <p className="feature-card__desc">Tranh tài và tích lũy điểm số trên bảng xếp hạng.</p>
            </div>
            <div className="feature-card__icon">🏆</div>
          </div>
        </section>
      </main>
      
      {/* FLOATING AI BUTTON */}
      <div className="floating-ai">
        <button className="floating-ai__btn">
          ✨ Trợ lý AI
        </button>
      </div>
    </div>
  );
};

export default HomePage;
