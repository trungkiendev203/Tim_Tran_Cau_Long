import React, { useState } from 'react';
import api from '../../services/api';
import './CreatePostModal.css';

interface CreatePostModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const LEVELS = ['Y', 'Y+', 'TBY', 'TBY+', 'TB-', 'TB', 'TB+', 'TB++', 'Khá', 'Giỏi'];

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState('');
  const [courtName, setCourtName] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [playTime, setPlayTime] = useState('');
  const [level, setLevel] = useState('');
  const [neededPlayers, setNeededPlayers] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!courtName.trim()) { setError('Vui lòng nhập tên sân.'); return; }
    if (!area.trim()) { setError('Vui lòng nhập khu vực.'); return; }
    if (!playDate || !playTime) { setError('Vui lòng chọn ngày và giờ chơi.'); return; }
    if (!level) { setError('Vui lòng chọn trình độ.'); return; }

    setLoading(true);
    try {
      const playTimeISO = `${playDate}T${playTime}:00`;
      await api.post('/posts', {
        title: title || `Kèo ${courtName}`,
        description,
        area,
        courtName,
        playTime: playTimeISO,
        level,
        neededPlayers,
      });
      onCreated();
      onClose();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Tạo bài đăng thất bại.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="create-post-modal__header">
          <h2 className="create-post-modal__title">🏸 Đăng kèo mới</h2>
          <button className="create-post-modal__close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="create-post-modal__body">
            {error && <div className="create-post-message create-post-message--error">{error}</div>}

            <div className="form-group">
              <label className="form-label">🏟️ Tên sân *</label>
              <input
                className="form-input"
                type="text"
                placeholder="VD: Sân A&C số 32 Đại Tú"
                value={courtName}
                onChange={(e) => setCourtName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">📍 Khu vực *</label>
              <input
                className="form-input"
                type="text"
                placeholder="VD: Hoàng Mai, Hà Nội"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>

            <div className="create-post-modal__row">
              <div className="form-group">
                <label className="form-label">📅 Ngày chơi *</label>
                <input
                  className="form-input"
                  type="date"
                  value={playDate}
                  onChange={(e) => setPlayDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">⏰ Giờ chơi *</label>
                <input
                  className="form-input"
                  type="time"
                  value={playTime}
                  onChange={(e) => setPlayTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">🎯 Trình độ *</label>
              <div className="level-selector">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    className={`level-btn ${level === lvl ? 'level-btn--active' : ''}`}
                    onClick={() => setLevel(lvl)}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">👥 Cần thêm bao nhiêu người?</label>
              <input
                className="form-input"
                type="number"
                min={1}
                max={20}
                value={neededPlayers}
                onChange={(e) => setNeededPlayers(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">📝 Tiêu đề (tùy chọn)</label>
              <input
                className="form-input"
                type="text"
                placeholder="VD: Kèo tối nay Hoàng Mai"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">💬 Mô tả thêm</label>
              <textarea
                className="form-input"
                placeholder="Sân mới, có quạt, nước uống..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="create-post-modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Đang đăng...' : '🏸 Đăng kèo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
