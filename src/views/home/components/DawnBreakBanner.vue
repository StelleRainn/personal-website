<script setup>
import { useRouter } from 'vue-router'

import dawnBreakBanner from '@/assets/images/general/dawn-break-banner.png'

const router = useRouter()

const backgroundImage = [
  'linear-gradient(90deg, rgba(7, 16, 25, 0.72), rgba(7, 16, 25, 0.24) 48%, rgba(255, 210, 142, 0.12))',
  'linear-gradient(180deg, rgba(2, 8, 14, 0.18), rgba(2, 8, 14, 0.36))',
  `url(${dawnBreakBanner})`
].join(', ')

const onVisiting = () => {
  router.push({ name: 'dawnbreak' })
}
</script>

<template>
  <div class="main-container" @click="onVisiting">
    <div class="background-layer" :style="{ backgroundImage }"></div>
    <div class="light-sweep"></div>
    <div class="content-layer">
      <div class="banner-content">
        <p class="eyebrow">Dawn Break</p>
        <h1 class="main-title">黎明已至</h1>
        <p class="subtitle">长夜将尽，晨光正从地平线醒来。</p>
        <div class="bottom-titles" aria-label="走向黎明">
          <span class="trail-line"></span>
          <span class="dawn-word" style="--index: 0">走</span>
          <span class="dawn-word" style="--index: 1">向</span>
          <span class="dawn-word" style="--index: 2">黎</span>
          <span class="dawn-word" style="--index: 3">明</span>
          <span class="trail-line"></span>
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
  cursor: pointer;

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
      align-items: center;
      justify-content: center;
      margin-top: 110px;
      gap: 18px;

      .trail-line {
        width: 96px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 239, 204, 0.95), transparent);
        opacity: 0;
        transform: scaleX(0.2);
        animation: lineBreath 4.8s ease-in-out infinite;
      }

      .dawn-word {
        position: relative;
        width: 54px;
        height: 54px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(255, 240, 204, 0.36);
        border-radius: 50%;
        background:
          radial-gradient(circle at 50% 14%, rgba(255, 241, 195, 0.32), transparent 48%), rgba(255, 255, 255, 0.04);
        box-shadow:
          inset 0 0 20px rgba(255, 224, 174, 0.08),
          0 0 22px rgba(255, 204, 128, 0.1);
        font-size: 29px;
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px) rotate(-8deg);
        animation:
          glyphRise 0.9s cubic-bezier(0.2, 0.72, 0.25, 1) calc(1.25s + var(--index) * 0.16s) forwards,
          glyphPulse 3.8s ease-in-out calc(2.1s + var(--index) * 0.2s) infinite;

        &::before {
          content: '';
          position: absolute;
          inset: -45%;
          background: conic-gradient(
            from 120deg,
            transparent,
            rgba(255, 242, 204, 0.12),
            rgba(255, 242, 204, 0.65),
            transparent 38%
          );
          animation: haloRotate 5.5s linear infinite;
        }

        &::after {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px solid rgba(255, 240, 204, 0.18);
        }
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

@keyframes slowBreath {
  to {
    transform: scale(1.08);
  }
}

@keyframes glyphRise {
  to {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes glyphPulse {
  0%,
  100% {
    box-shadow:
      inset 0 0 20px rgba(255, 224, 174, 0.08),
      0 0 22px rgba(255, 204, 128, 0.1);
    transform: translateY(0);
  }
  50% {
    box-shadow:
      inset 0 0 24px rgba(255, 230, 190, 0.18),
      0 0 34px rgba(255, 208, 134, 0.34);
    transform: translateY(-6px);
  }
}

@keyframes haloRotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes lineBreath {
  0%,
  100% {
    opacity: 0.18;
    transform: scaleX(0.45);
  }
  50% {
    opacity: 0.92;
    transform: scaleX(1);
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
        gap: 10px;

        .trail-line {
          width: 44px;
        }

        .dawn-word {
          width: 42px;
          height: 42px;
          font-size: 23px;
        }
      }
    }
  }
}
</style>
