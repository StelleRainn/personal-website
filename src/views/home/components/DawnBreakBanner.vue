<script setup>
import dawnBreakBanner from '@/assets/images/general/dawn-break-banner.png'

const backgroundImage = [
  'linear-gradient(90deg, rgba(7, 16, 25, 0.72), rgba(7, 16, 25, 0.24) 48%, rgba(255, 210, 142, 0.12))',
  'linear-gradient(180deg, rgba(2, 8, 14, 0.18), rgba(2, 8, 14, 0.36))',
  `url(${dawnBreakBanner})`
].join(', ')
</script>

<template>
  <div class="main-container">
    <div class="background-layer" :style="{ backgroundImage }"></div>
    <div class="light-sweep"></div>
    <div class="content-layer">
      <div class="banner-content">
        <p class="eyebrow">Dawn Break</p>
        <h1 class="main-title">黎明已至</h1>
        <p class="subtitle">长夜将尽，晨光正从地平线醒来。</p>
        <div class="bottom-titles">
          <p>走</p>
          <p>/</p>
          <p>向</p>
          <p>/</p>
          <p>黎</p>
          <p>/</p>
          <p>明</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #0d1820;

  .background-layer {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center bottom;
    transform: scale(1.03);
    animation: slowBreath 12s ease-in-out infinite alternate;
  }

  .light-sweep {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 18%, rgba(255, 235, 190, 0.14) 45%, transparent 70%);
    mix-blend-mode: screen;
    opacity: 0;
    transform: translateX(-18%);
    animation: dawnSweep 6s ease-in-out 0.8s infinite;
  }

  .content-layer {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff8ea;
    text-align: center;
    text-shadow: 2px 2px 8px rgba(4, 12, 18, 0.6);

    .banner-content {
      width: min(1000px, 86vw);
      margin-top: -10px;
    }

    .eyebrow {
      margin-bottom: 22px;
      font-family: 'texgyrecursor-regular';
      font-size: 24px;
      text-transform: uppercase;
      opacity: 0;
      animation: fadeInUp 0.9s ease 0.2s forwards;
    }

    .main-title {
      margin-bottom: 22px;
      font-size: 96px;
      font-weight: 700;
      opacity: 0;
      animation: fadeInUp 1s ease 0.45s forwards;
    }

    .subtitle {
      margin-bottom: 0;
      font-size: 1.35rem;
      opacity: 0;
      animation: fadeInUp 1s ease 0.85s forwards;
    }

    .bottom-titles {
      display: flex;
      justify-content: center;
      margin-top: 110px;
      font-size: 35px;

      p {
        margin: 0 10px;
      }

      p:nth-child(1) {
        animation: floating 1.5s linear infinite alternate forwards;
      }

      p:nth-child(2) {
        animation: floating 1.5s linear 0.2s infinite alternate forwards;
      }

      p:nth-child(3) {
        animation: floating 1.5s linear 1.5s infinite alternate forwards;
      }

      p:nth-child(4) {
        animation: floating 1.5s linear 0.6s infinite alternate forwards;
      }

      p:nth-child(5) {
        animation: floating 1.5s linear infinite alternate forwards;
      }

      p:nth-child(6) {
        animation: floating 1.5s linear 0.8s infinite alternate forwards;
      }

      p:nth-child(7) {
        animation: floating 1.5s linear 1.5s infinite alternate forwards;
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floating {
  to {
    transform: translateY(-5px);
  }
}

@keyframes slowBreath {
  to {
    transform: scale(1.08);
  }
}

@keyframes dawnSweep {
  0%,
  100% {
    opacity: 0;
    transform: translateX(-18%);
  }
  45% {
    opacity: 1;
  }
  70% {
    opacity: 0.4;
    transform: translateX(18%);
  }
}

@media (max-width: 760px) {
  .main-container {
    .content-layer {
      .main-title {
        font-size: 64px;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .main-container {
    .content-layer {
      .banner-content {
        width: 90vw;
      }

      .main-title {
        font-size: 46px;
      }

      .bottom-titles {
        font-size: 28px;

        p {
          margin: 0 6px;
        }
      }
    }
  }
}
</style>
