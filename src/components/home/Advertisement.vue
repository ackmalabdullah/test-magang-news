<template>
  <section class="advertisement">
    <div class="ad-container">
      <div class="ad-content">
        <div class="ad-text">
          <span class="ad-label"> Newsletter </span>

          <h3>Dapatkan Berita Terbaru Setiap Hari</h3>

          <p>Subscribe newsletter kami untuk mendapatkan update berita teknologi, ekonomi, dan internasional langsung ke email kamu.</p>

          <button class="ad-button">Subscribe Sekarang</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Advertisement',
};
</script>

<style scoped>
.advertisement {
  margin: 60px 0;
  margin-bottom: 60px;
}

.ad-container {
  background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
  border-radius: 20px;
  padding: 48px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(20, 184, 166, 0.3);
}

.ad-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: center;
}

.ad-text {
  color: white;
}

.ad-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.ad-text h3 {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 16px;
  color: white;
}

.ad-text p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.95;
}

.ad-button {
  background: white;
  color: #14b8a6;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ad-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.image-grid img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 1024px) {
  .ad-container {
    padding: 40px;
  }

  .ad-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .ad-text h3 {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .advertisement {
    margin: 40px 0;
  }

  .ad-container {
    padding: 32px;
    border-radius: 16px;
  }

  .ad-text h3 {
    font-size: 24px;
  }

  .ad-text p {
    font-size: 14px;
  }

  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .image-grid img {
    height: 100px;
  }
}

@media (max-width: 576px) {
  .advertisement {
    margin: 24px 0;
  }

  .ad-container {
    padding: 24px;
  }

  .ad-text h3 {
    font-size: 20px;
  }

  .ad-text p {
    font-size: 13px;
    margin-bottom: 16px;
  }

  .ad-button {
    padding: 12px 24px;
    font-size: 12px;
  }

  .image-grid img {
    height: 80px;
  }
}
</style>
