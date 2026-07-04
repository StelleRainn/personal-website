<script setup>
import ProjectExpSingle from './components/ProjectExpSingle.vue'

import { avatar, skillsList, projectDetails } from '@/staticData/resume'
</script>

<template>
  <div class="resume-page-content">
    <div class="resume-index-header">
      <h1>个人简历</h1>
      <div>
        <p>以小见大，</p>
        <p>潜力迸发。</p>
      </div>
    </div>
    <div class="main-container">
      <div class="personal-info">
        <el-row>
          <el-col :span="8">
            <div class="avatar-area">
              <el-avatar :size="320" :src="avatar"></el-avatar>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="details-area">
              <h3>徐友友</h3>
              <h5>软件工程系，前端开发</h5>
              <p>男，21岁 (2004)</p>
              <p>广东省，广州市 / 广东省，深圳市</p>
              <p>就读于<strong>广东外语外贸大学</strong>，软件工程学士学位</p>
              <p>主修课程：数据结构，算法设计，计算机组成原理，操作系统，计算机网络，自然语言处理，大数据处理等</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="skills">
        <el-row>
          <el-col :span="8"><div class="title">技能/证书</div></el-col>
          <el-col :span="16">
            <div class="skills-list">
              <ul>
                <li v-for="skill in skillsList" :key="skill.name">
                  <div class="skill-name">{{ skill.name }}</div>
                  <div class="skill-contents">
                    {{ skill.contents.join(', ') }}
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="projects-experiences">
        <el-row>
          <el-col :span="8">
            <h1>项目经历</h1>
          </el-col>
        </el-row>
        <div class="projects-list">
          <ProjectExpSingle
            class="projects-list-item"
            v-for="(projectDetail, index) in projectDetails"
            :key="index"
            :projectDetail="projectDetail"
            :projectIndex="index"
          ></ProjectExpSingle>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume-index-header {
  width: 100%;
  height: 230px;
  padding: 65px 120px 0 80px;
  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 64px;
    letter-spacing: 0.4rem;
  }

  div {
    font-size: 30px;
    font-weight: bold;
  }
}

.main-container {
  padding: 0 40px;
  .personal-info,
  .skills,
  .projects-experiences {
    margin-bottom: 50px;
  }

  .personal-info {
    width: 100%;
    height: 400px;
    padding: 40px 0;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);

    .el-row,
    .el-col,
    .avatar-area,
    .details-area {
      height: 100%;
      display: flex;
    }

    .el-col:first-child {
      border-right: 1px solid #b7acac;
      justify-content: center;
      > .avatar-area {
        align-items: center;
      }
    }

    .details-area {
      flex-direction: column;
      padding: 20px 40px 0 40px;

      h3 {
        font-size: 48px;
        letter-spacing: 0.8rem;
        margin-bottom: 10px;
      }

      h5 {
        font-size: 24px;
        letter-spacing: 0.3rem;
        margin-bottom: 10px;
      }

      p {
        font-size: 15px;
        color: #8f8f8f;
        font-weight: light;
        line-height: 30px;
      }
    }
  }

  .skills {
    width: 100%;
    height: 650px;
    padding: 40px 0;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);

    .el-row,
    .el-col,
    .title,
    .skills-list {
      height: 100%;
      display: flex;
    }

    .el-col:first-child {
      justify-content: center;

      .title {
        align-items: center;
        font-size: 48px;
        letter-spacing: 0.5rem;
        font-weight: bold;
      }
    }

    .el-col:last-child {
      padding-left: 40px;

      .skills-list {
        align-items: center;

        ul {
          list-style: none;

          li {
            height: 80px;
            margin-bottom: 16px;
            padding: 0 20px;
            border: #8f8f8f solid 0.5px;
            border-radius: 30px;

            .skill-name {
              font-size: 20px;
              font-weight: bold;
              height: 40px;
              line-height: 40px;
            }

            .skill-contents {
              color: #2f2f2f;
            }
          }
        }
      }
    }
  }

  .projects-experiences {
    width: 100%;
    height: fit-content;
    padding: 40px 0;
    border-radius: 30px;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;

    h1 {
      text-align: center;
      font-size: 48px;
      letter-spacing: 0.5rem;
      margin-bottom: 24px;
    }

    .projects-list {
      width: 100%;
      padding: 0 40px;
      display: flex;
      flex-direction: column;

      // 方案 2 - 背景与内容错位
      .projects-list-item {
        height: fit-content;
        width: 100%;
        margin-bottom: 50px;
        border-radius: 30px;
      }
    }
  }
}
</style>
