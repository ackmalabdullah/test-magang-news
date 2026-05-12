<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="logo">
          <span class="logo-icon">⟐</span>
          <h2>Berita Kini</h2>
        </div>

        <p class="copyright">
          © 2023 Berita Kini. All Rights Reserved.
        </p>

        <div class="follow-us">
          <p class="follow-title">Ikuti Kami</p>

          <div class="social-icons">
            <!-- YouTube -->
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.597.246 11.625.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 15.5V8.5L16 12 9 15.5z"
                />
              </svg>
            </a>

            <!-- Instagram -->
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm8.75 1.5a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
                />
              </svg>
            </a>

            <!-- Facebook -->
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.9h-2.33V22c4.78-.75 8.45-4.91 8.45-9.93z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Telusuri -->
      <div class="footer-column">
        <h3>Telusuri</h3>

        <ul>
          <li><a href="#">Beranda</a></li>
          <li><a href="#">Kesehatan</a></li>
          <li><a href="#">Otomotif</a></li>
          <li><a href="#">Politik</a></li>
          <li><a href="#">Olahraga</a></li>
        </ul>
      </div>

      <!-- Bantuan -->
      <div class="footer-column">
        <h3>Bantuan</h3>

        <ul>
          <li><a href="#">Kontak Kami</a></li>
          <li><a href="#">Kebijakan</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="footer-newsletter">
        <h3>Berlangganan</h3>

        <div class="newsletter-form">
          <input
            type="email"
            placeholder="Masukkan email"
            class="email-input"
          />

          <button class="send-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 2L3 10.5L10.5 13.5L13.5 21L21 2Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #1e293b;
  color: white;
  padding: 40px 20px 24px;
  margin-top: 50px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 1.2fr;
  gap: 28px;
}

/* Brand */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.logo-icon {
  font-size: 24px;
}

.logo h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.copyright {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 18px;
  line-height: 1.5;
}

.follow-title {
  font-size: 14px;
  margin-bottom: 10px;
  color: #e2e8f0;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-icons a {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #334155;
  border-radius: 10px;

  color: #cbd5e1;
  transition: 0.3s ease;
}

.social-icons a svg {
  width: 18px;
  height: 18px;
}

.social-icons a:hover {
  background-color: #3b82f6;
  color: white;
  transform: translateY(-3px);
}

/* Menu */
.footer-column h3,
.footer-newsletter h3 {
  font-size: 17px;
  margin-bottom: 14px;
  font-weight: 700;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 10px;
}

.footer-column a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  transition: 0.3s ease;
}

.footer-column a:hover {
  color: #60a5fa;
  padding-left: 3px;
}

/* Newsletter */
.newsletter-form {
  display: flex;
  align-items: center;

  background-color: #334155;
  border-radius: 10px;
  overflow: hidden;
}

.email-input {
  flex: 1;
  border: none;
  outline: none;

  background: transparent;
  color: white;

  padding: 12px 14px;
  font-size: 14px;
}

.email-input::placeholder {
  color: #94a3b8;
}

.send-btn {
  width: 48px;
  height: 48px;

  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #3b82f6;
  color: white;

  transition: 0.3s ease;
}

.send-btn svg {
  width: 18px;
  height: 18px;
}

.send-btn:hover {
  background-color: #2563eb;
}

/* Tablet */
@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .footer {
    padding: 32px 16px 20px;
  }

  .footer-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .logo h2 {
    font-size: 18px;
  }

  .footer-column h3,
  .footer-newsletter h3 {
    margin-bottom: 12px;
  }
}
</style>