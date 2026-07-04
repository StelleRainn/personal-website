<script setup>
import { notificationHero, updateLog } from '@/staticData/notification'
</script>

<template>
  <main class="notification-page">
    <section class="notification-hero">
      <p class="eyebrow">{{ notificationHero.eyebrow }}</p>
      <h1>{{ notificationHero.title }}</h1>
      <p class="summary">{{ notificationHero.summary }}</p>
    </section>

    <section class="timeline">
      <div v-for="day in updateLog" :key="day.date" class="timeline-day">
        <h2>{{ day.date }}</h2>
        <article v-for="section in day.sections" :key="`${day.date}-${section.title}`" class="notice-card">
          <h3>{{ section.title }}</h3>
          <ul>
            <li v-for="item in section.items" :key="item">{{ item }}</li>
          </ul>
          <p class="changed-files">改动文件：{{ section.files.join('、') }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.notification-page {
  min-height: 100%;
  padding: 92px 24px 72px;
  background: linear-gradient(135deg, rgba(75, 204, 239, 0.86), rgba(244, 123, 42, 0.82)), #f3f3f3;
}

.notification-hero,
.timeline {
  width: min(1080px, 100%);
  margin: 0 auto;
}

.notification-hero {
  color: #fff;
  padding: 32px 0 30px;

  .eyebrow {
    font-family: 'NotoSerifItalic';
    font-size: 14px;
    letter-spacing: 0.2rem;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 68px;
    line-height: 1;
    letter-spacing: 0.6rem;
    margin-bottom: 18px;
  }

  .summary {
    max-width: 620px;
    font-size: 17px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.86);
  }
}

.timeline-day {
  padding: 24px 0;

  h2 {
    color: #fff;
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: 0.12rem;
    margin-bottom: 18px;
  }
}

.notice-card {
  margin-bottom: 16px;
  padding: 28px 30px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.56);
  box-shadow: 0 18px 50px rgba(32, 48, 64, 0.16);
  color: #1f252b;

  h3 {
    font-size: 24px;
    letter-spacing: 0.08rem;
    margin-bottom: 18px;
  }

  ul {
    list-style: disc;
    padding-left: 22px;
  }

  li {
    line-height: 1.8;
    margin-bottom: 8px;
    color: #37414a;
  }
}

.changed-files {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(31, 37, 43, 0.12);
  color: #67727d;
  font-size: 13px;
  line-height: 1.7;
  word-break: break-word;
}

@media (max-width: 760px) {
  .notification-page {
    padding: 76px 16px 48px;
  }

  .notification-hero {
    h1 {
      font-size: 48px;
      letter-spacing: 0.35rem;
    }
  }

  .notice-card {
    padding: 22px 20px;
  }
}
</style>
