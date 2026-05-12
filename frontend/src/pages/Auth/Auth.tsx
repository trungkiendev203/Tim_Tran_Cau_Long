import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Auth.css';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      navigate('/feed');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const response = await api.post('/auth/login', { email, password });
        const data = response.data;
        if (data && data.token) {
          localStorage.setItem('jwt_token', data.token);
          localStorage.setItem('user', JSON.stringify({
            userId: data.userId,
            fullName: data.fullName,
            email: data.email,
            role: data.role,
          }));
          navigate('/feed');
        } else {
          setError('Đăng nhập thất bại. Không nhận được token.');
        }
      } else {
        await api.post('/auth/register', { fullName, email, password, phone });
        setSuccess('Đăng ký thành công! Hãy đăng nhập.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFullName('');
        setPhone('');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message
        || err.response?.data?.error
        || err.response?.data
        || 'Có lỗi xảy ra. Vui lòng thử lại.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page">
        <div className="auth-page__brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="auth-page__logo">🏸</div>
          <h1 className="auth-page__name">Chill Cầu</h1>
          <p className="auth-page__tagline">Chơi Cầu Lông Thông Minh Hơn</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'auth-tab--active' : ''}`}
            onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
            type="button"
          >
            Đăng nhập
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'auth-tab--active' : ''}`}
            onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
            type="button"
          >
            Đăng ký
          </button>
        </div>

        <div className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-message auth-message--error">{error}</div>}
            {success && <div className="auth-message auth-message--success">{success}</div>}

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Họ và tên</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="0912345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Mật khẩu</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Xác nhận mật khẩu</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="form-row">
                <label className="auth-remember-label">
                  <input type="checkbox" className="form-checkbox" /> Ghi nhớ
                </label>
                <a href="#" className="form-link">Quên mật khẩu?</a>
              </div>
            )}

            <button type="submit" className="btn-block btn-block--primary" disabled={loading}>
              {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
            </button>
          </form>

          <div className="divider">hoặc</div>

          <button type="button" className="btn-google">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Đăng nhập với Google
          </button>
        </div>

        <div className="auth-footer">
          {isLogin ? (
            <>Chưa có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>Đăng ký ngay</a></>
          ) : (
            <>Đã có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>Đăng nhập</a></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
