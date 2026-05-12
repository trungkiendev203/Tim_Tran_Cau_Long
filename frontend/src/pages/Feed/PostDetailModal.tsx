import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './PostDetailModal.css';

interface PostDetailModalProps {
  postId: string;
  onClose: () => void;
  currentUser: any;
}

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

interface JoinRequest {
  id: string;
  userId: string;
  fullName: string;
  status: string;
  joinedAt: string;
}

const levelBadgeClass: Record<string, string> = {
  'TB': 'badge--tb',
  'TB+': 'badge--tb-plus',
  'TBY': 'badge--tby',
  'Khá': 'badge--kha',
};

function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', { 
      hour: '2-digit', minute: '2-digit', 
      day: '2-digit', month: '2-digit', year: 'numeric' 
    });
  } catch {
    return isoString;
  }
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ postId, onClose, currentUser }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'info' | 'participants'>('info');

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  const fetchPostDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/posts/${postId}`);
      setPost(response.data);
      
      // If the current user is the creator, fetch join requests
      if (response.data.createdById === (currentUser?.userId || currentUser?.id)) {
        fetchJoinRequests();
      }
    } catch (err: any) {
      setError('Không thể tải thông tin chi tiết kèo.');
    } finally {
      setLoading(false);
    }
  };

  const fetchJoinRequests = async () => {
    try {
      const response = await api.get(`/posts/${postId}/join-requests`);
      setRequests(response.data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách người tham gia:', err);
    }
  };

  const isOwner = post?.createdById === (currentUser?.userId || currentUser?.id);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="detail-modal__loading">Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="detail-modal__header">
            <h2 className="detail-modal__title">Lỗi</h2>
            <button className="detail-modal__close" onClick={onClose}>✕</button>
          </div>
          <div className="detail-modal__body">
            <p className="detail-message--error">{error || 'Không tìm thấy kèo.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal__header">
          <h2 className="detail-modal__title">🏸 Chi tiết Kèo</h2>
          <button className="detail-modal__close" onClick={onClose}>✕</button>
        </div>

        {isOwner && (
          <div className="detail-tabs">
            <button 
              className={`detail-tab ${activeTab === 'info' ? 'detail-tab--active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Thông tin chung
            </button>
            <button 
              className={`detail-tab ${activeTab === 'participants' ? 'detail-tab--active' : ''}`}
              onClick={() => setActiveTab('participants')}
            >
              Quản lý thành viên ({requests.length})
            </button>
          </div>
        )}

        <div className="detail-modal__body">
          {activeTab === 'info' ? (
            <div className="detail-info">
              <h3 className="detail-info__court">{post.courtName || post.title}</h3>
              <p className="detail-info__title">{post.title}</p>
              
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-item__icon">📍</span>
                  <div className="detail-item__content">
                    <strong>Khu vực</strong>
                    <span>{post.area}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-item__icon">⏰</span>
                  <div className="detail-item__content">
                    <strong>Thời gian</strong>
                    <span>{formatDateTime(post.playTime)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-item__icon">🎯</span>
                  <div className="detail-item__content">
                    <strong>Trình độ</strong>
                    <span className={`badge ${levelBadgeClass[post.level] || 'badge--tb'}`}>{post.level}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-item__icon">👥</span>
                  <div className="detail-item__content">
                    <strong>Người cần thêm</strong>
                    <span>{post.neededPlayers - (post.currentPlayers || 0)} người</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-item__icon">📝</span>
                  <div className="detail-item__content">
                    <strong>Trạng thái</strong>
                    <span>{post.status}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-item__icon">👤</span>
                  <div className="detail-item__content">
                    <strong>Người tạo</strong>
                    <span>{post.createdByName}</span>
                  </div>
                </div>
              </div>

              {post.description && (
                <div className="detail-description">
                  <strong>Mô tả chi tiết:</strong>
                  <p>{post.description}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="detail-participants">
              {requests.length === 0 ? (
                <div className="detail-participants__empty">
                  Chưa có ai xin tham gia kèo này.
                </div>
              ) : (
                <ul className="participant-list">
                  {requests.map((req) => (
                    <li key={req.id} className="participant-item">
                      <div className="participant-item__info">
                        <div className="participant-item__avatar">
                          {req.fullName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="participant-item__details">
                          <strong>{req.fullName}</strong>
                          <span>{formatDateTime(req.joinedAt)}</span>
                        </div>
                      </div>
                      <div className="participant-item__status">
                        <span className="badge badge--tby">{req.status}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
