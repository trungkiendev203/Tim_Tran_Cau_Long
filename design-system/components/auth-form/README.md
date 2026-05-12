# ds:comp:auth-form-001 — Auth Form

## DS-ID
`ds:comp:auth-form-001`

## Mô tả
Auth Form xử lý toàn bộ authentication flows của Chill Cầu: Login, Register.
Hỗ trợ cả Google OAuth và email/password.

## When to Use / Do Not Use

| ✅ When to use | ❌ Do NOT use |
|---|---|
| Login, Register, Password Reset screens | Embedded trong card/modal nhỏ |
| Full-page auth flow | Inline re-authentication |

## States

| State | DS-ID | Mô tả |
|---|---|---|
| Login Default | `ds:comp:auth-form-001--login` | Form đăng nhập mặc định |
| Login Error | `ds:comp:auth-form-001--login-error` | Email/password sai — hiển thị error message |
| Login Loading | `ds:comp:auth-form-001--loading` | Đang gửi request — button spinner |
| Login Success | `ds:comp:auth-form-001--success` | Đăng nhập thành công — redirect countdown |
| Register | `ds:comp:auth-form-001--register` | Form đăng ký tài khoản mới |

## Props / Attributes

| Prop | Type | Mô tả |
|---|---|---|
| `mode` | `login \| register \| reset` | Flow hiện tại |
| `error` | string | Error message (hiển thị dưới form) |
| `loading` | boolean | Submit button spinner state |
| `redirect-to` | string | URL sau khi login thành công |

## A11y Notes

- Tất cả inputs có `<label for="...">` với `id` trên input
- Error state: input có `aria-invalid="true"` + `aria-describedby` trỏ vào error message element
- Error message element có `role="alert"` để screen reader đọc ngay
- Loading button: `disabled` + `aria-busy="true"`
- Success state container: `role="status"` + `aria-live="polite"`

## HTML Pattern (Error State)

```html
<div class="form-group">
  <label class="form-label" for="login-password">Mật khẩu</label>
  <input id="login-password"
         class="form-input form-input--error"
         type="password"
         aria-invalid="true"
         aria-describedby="login-error-msg" />
  <div id="login-error-msg" class="form-error" role="alert">
    ⚠️ Email hoặc mật khẩu không đúng
  </div>
</div>
```
