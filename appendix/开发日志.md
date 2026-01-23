## 创建项目

```
pnpm create vue@latest
```

## 安装依赖

1. scss

2. element-plus（库，图标库，按需导入组件）

```
 pnpm install element-plus   
 
 pnpm install @element-plus/icons-vue
 
 pnpm add -D unplugin-vue-components unplugin-auto-import
```

```jsx
// vite.config.js
// Element-Plus按需且自动导入配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
```

3. 格式化（eslint & prettier）

```
pnpm eslint-plugin-prettier
```

```jsx
// eslint.config.js
// 记得把原有的 skipFormatter 删除

import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from '@vue/eslint-config-prettier'

export default defineConfig([
  // 使用 @vue/eslint-config-prettier 来处理 Vue 项目的 Prettier 集成
  configPrettier,

  {
    name: 'app/prettier-integration',
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      // 启用 Prettier 作为 ESLint 规则，自动读取 .prettierrc.json 配置
      'prettier/prettier': 'warn'
    }
  },

  {
    name: 'app/custom-rules',
    rules: {
      // Vue 相关规则
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-destructure': 'off',

      // JavaScript 代码质量规则 - 只保留真正重要的错误
      'no-undef': 'error', // 未定义变量 - 这是真正的错误
      'no-debugger': 'warn', // debugger 语句 - 开发时可能需要，改为警告
      'no-unused-vars': 'warn', // 未使用的变量
      'no-console': 'warn', // console 语句
      'no-unreachable': 'warn', // 不可达代码
      'no-empty': 'warn' // 空代码块
    }
  }
])
```

```jsx
// .prettierrc.json

{
  "$schema": "https://json.schemastore.org/prettierrc",
  "singleQuote": true,
  "printWidth": 120,
  "trailingComma": "none",
  "endOfLine": "auto",
  "semi": false
}
```

```jsx
// settings.json (vscode系列)

// ESlint插件 + Vscode配置 实现自动格式化修复
  "editor.codeActionsOnSave": {
    "source.fixAll": "always"
  },
  // "editor.formatOnSave": false, // 默认关闭
```

## 设计规划

### 通用导航头 GeneralHeader

1. 放在 `@/components/`下，方便所有页面复用。
2. 采取 Apple 官网灵感，搭配深色毛玻璃效果。

### 主页 HomeIndex

#### 功能

1. 网站入口，路由重定向将导向此页面
2. 展示所有板块，作为对外宣传的主页面
3. 采用 `el-anchor` ，并将整个 `main` 板块置于其要求的滚动容器中，实现侧栏的**动态定位**

#### 美术 / 设计

1. 采用 `1+3+1` 设计，即 `header` + `main` (含3个`section`) + `footer`

### 简历 ResumeIndex

#### 功能

1. 展示个人简历，包括身份、技术栈、项目经历

#### 美术 / 设计

1. 简约风格，使用统一风格的圆角和阴影。
2. 玻璃的艺术之旅。

### 作品集 CollectionIndex

#### 功能

1. 展示所有作品集

#### 美术 / 设计

1. 参照 苹果官网-iPad主页，通过一个大的版图吸引。
2. 下方设置画廊展示单个作品

### 单个作品展示页 \`${projectName}.vue\`

#### 功能

1. 设置路由，位于`/project`下的二级路由。使用`name`跳转，从主页、简历页、作品集页等点击，都可以跳转到对应项目展示页。暂不需要参数。
2. 介绍单个作品，包括背景说明，基本外观展示，技术点与亮点介绍等
#### 美术 / 设计

1. 基本头版（保持和简历、作品集一致）
2. “画廊”设计复用
3. 技术点介绍（组件复用。设置深浅色两种主题。）

### 逐雨之旅 ChasingRainIndex

#### 功能

1. 介绍“逐雨之旅”的故事

#### 美术 / 设计

1. 美术实验田，可以多尝试不同风格
2. 视频背景
3. 音乐控制台

### 其他（至 V1.0 暂不开发）

1. 蔷薇、改创计划、开发试验场 → 设置“敬请期待”
2. 与我联系 → 展示各种链接