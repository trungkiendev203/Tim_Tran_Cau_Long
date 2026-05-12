import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Feed.css';
import CreatePostModal from './CreatePostModal';
import PostDetailModal from './PostDetailModal';

interface PostData {
  id: string;
  title: string;
  description: string;
  area: string;
  courtName: string;
  playTime: string;
  level: string;
  neededPlayers: number;
  currentPlayers: number;
  status: string;
  createdById: string;
  createdByName: string;
  createdAt: string;
}

const levelBadgeClass: Record<string, string> = {
  'TB': 'badge--tb',
  'TB+': 'badge--tb-plus',
  'TBY': 'badge--tby',
  'Khá': 'badge--kha',
};

function formatPlayTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return isoString;
  }
}

function timeAgo(isoString: string): string {
  try {
    const now = new Date();
    const created = new Date(isoString);
    const diffMs = now.getTime() - created.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'vừa xong';
    if (diffMin < 60) return `${diffMin} phút trước`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} giờ trước`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} ngày trước`;
  } catch {
    return '';
  }
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Lấy thông tin user từ localStorage (có thể khởi tạo từ đầu)
  const [user, setUser] = useState<any>(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchPosts();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data) {
        // Handle the difference between DTOs (id vs userId)
        const userData = {
          ...response.data,
          userId: response.data.id || response.data.userId
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      }
    } catch (err) {
      console.error('Lỗi khi đồng bộ thôngত্তি user:', err);
    }
  };

  const handleJoinRequest = async (postId: string) => {
    try {
      await api.post(`/posts/${postId}/join-request`);
      alert('Đã gửi yêu cầu tham gia thành công!');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || 'Không thể xin tham gia.';
      alert(typeof msg === 'string' ? msg : 'Có lỗi xảy ra khi xin tham gia.');
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      setError('Không thể tải danh sách kèo. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="navbar__logo">🏸</span>
          <span className="navbar__name">Chill Cầu</span>
        </div>
        <div className="navbar__links">
          <a href="#" className="navbar__link navbar__link--active">Tìm kèo</a>
          <a href="#" className="navbar__link">Bản đồ</a>
          <a href="#" className="navbar__link">Xếp hạng</a>
        </div>
        <div className="navbar__actions">
          <button className="navbar__icon-btn">🤍</button>
          <button className="navbar__bell">🔔<span className="navbar__bell-count">3</span></button>
          <a href="#" className="navbar__avatar" style={{ textDecoration: 'none' }}>
            <span className="navbar__avatar-initial">
              {user?.fullName?.[0]?.toUpperCase() || 'U'}
            </span>
          </a>
          <button className="btn btn--secondary btn--sm" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </nav>

      <main className="layout-sidebar-content">
        <aside className="sidebar">
          <div className="filter-panel">
            <div className="filter-panel__header">
              <h3 className="filter-panel__title">🔍 Bộ lọc</h3>
              <button className="filter-panel__clear">Xóa tất cả</button>
            </div>
            <div className="filter-group">
              <label className="filter-group__label">Tìm kiếm nhanh</label>
              <input className="filter-input" type="text" placeholder="Tên sân, khu vực..." />
            </div>
            <div className="filter-group">
              <label className="filter-group__label">🎯 Trình độ</label>
              <div className="filter-btns">
                {['TBY', 'TB', 'TB+', 'Khá', 'Giỏi'].map((level) => (
                  <button key={level} className="filter-btn">{level}</button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="content">
          <div className="search-bar">
            <span className="search-bar__icon">✨</span>
            <input className="search-bar__input" type="text" placeholder='Tìm kèo bằng AI... VD: "Kèo tối nay Cầu Giấy TB+"' />
            <button className="search-bar__btn">Tìm</button>
          </div>

          <div className="feed-header">
            <h2 className="feed-header__title">
              🏸 Kèo hôm nay <span className="feed-header__count">({posts.length} kết quả)</span>
            </h2>
            <button className="btn btn--primary" onClick={() => setShowCreateModal(true)}>
              ＋ Đăng kèo
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--sm-text-muted)' }}>
              Đang tải danh sách kèo...
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-danger-500)' }}>
              {error}
              <br />
              <button className="btn btn--primary" style={{ marginTop: '12px' }} onClick={fetchPosts}>
                Thử lại
              </button>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--sm-text-muted)' }}>
              Chưa có kèo nào. Hãy tạo kèo mới!
            </div>
          )}

          <div className="feed-list">
            {posts.map((post) => (
              <article 
                className="post-card" 
                key={post.id} 
                onClick={() => setSelectedPostId(post.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="post-card__header">
                  <div className="post-card__time">
                    <span className="post-card__time-icon">⏰</span>
                    <span>{formatPlayTime(post.playTime)}</span>
                  </div>
                  <span className="post-card__posted">{timeAgo(post.createdAt)}</span>
                </div>
                <div className="post-card__body">
                  <h3 className="post-card__court">
                    <span>🏸</span> {post.courtName || post.title}
                  </h3>
                  <div className="post-card__meta">
                    <span className="post-card__distance">📍 {post.area}</span>
                  </div>
                  {post.level && (
                    <div className="post-card__badges">
                      <span className={`badge ${levelBadgeClass[post.level] || 'badge--tb'}`}>
                        {post.level}
                      </span>
                    </div>
                  )}
                  <div className="post-card__details">
                    <span>
                      👥 Cần thêm <strong>{post.neededPlayers - (post.currentPlayers || 0)}</strong> người
                    </span>
                    <span>📝 {post.status}</span>
                    <span>👤 {post.createdByName}</span>
                  </div>
                  {post.description && (
                    <p className="post-card__summary">{post.description}</p>
                  )}
                </div>
                <div className="post-card__actions" onClick={(e) => e.stopPropagation()}>
                  {post.createdById !== (user?.userId || user?.id) ? (
                    <button 
                      className="post-card__action" 
                      onClick={() => handleJoinRequest(post.id)}
                    >
                      <span style={{ color: 'var(--color-primary-600)' }}>✋</span> Xin tham gia
                    </button>
                  ) : (
                    <button 
                      className="post-card__action" 
                      onClick={() => setSelectedPostId(post.id)}
                    >
                      <span style={{ color: 'var(--color-accent-600)' }}>⚙️</span> Quản lý yêu cầu
                    </button>
                  )}
                  <button className="post-card__action"><span>🔗</span> Chia sẻ</button>
                  <button className="post-card__action post-card__action--fav"><span>🤍</span> Yêu thích</button>
                </div>
              </article>
            ))}
          </div>

          {!loading && posts.length > 0 && (
            <div className="feed-pagination">
              <span className="feed-pagination__info">Hiển thị {posts.length} kết quả</span>
            </div>
          )}
        </section>
      </main>

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchPosts}
        />
      )}

      {selectedPostId && (
        <PostDetailModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
          currentUser={user}
        />
      )}
    </>
  );
};

export default Feed;
