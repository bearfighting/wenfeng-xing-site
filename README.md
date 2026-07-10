<p align="center">
  <img src="./public/images/wenfeng-logo.png" alt="Wenfeng logo" width="220" />
</p>

<p align="center">
  Wenfeng Xing 的个人网站仓库。
  <br />
  <sub>用来承载项目、写作、实验记录，以及关于软件、金融和长期思考的公开笔记。</sub>
</p>

<p align="center">
  <a href="./README.md">简体中文</a>
  ·
  <a href="./README.en.md">English</a>
  ·
  <a href="https://github.com/bearfighting/wenfeng-xing-site">GitHub</a>
</p>

## 这个仓库是什么

这是我个人网站的代码仓库，基于 Astro 构建，偏内容驱动。

网站目前主要包含这些部分：

- 首页：个人定位、当前在做的事情、入口导航。
- Blog：关于软件、金融、学习和产品思考的文章。
- Projects：项目简介与长期构建中的产品记录。
- Vibe：更轻量的短记录和开发碎片。
- About：个人介绍与站点说明。

它不是一个通用 starter，也不是简历模板；它更像一个会长期生长的个人工作台。

## 技术栈

- Astro
- TypeScript
- MDX
- Pagefind
- Bun
- Sharp

## 开发命令

安装依赖：

```sh
bun install
```

启动开发服务器：

```sh
bun run dev
```

构建生产版本：

```sh
bun run build
```

预览生产构建：

```sh
bun run preview
```

类型检查：

```sh
bun run lint
```

## 内容入口

最常改的文件和目录：

```text
src/config/site.toml        站点标题、导航、首页内容、个人信息、搜索、评论等
src/content/about.mdx       About 页面正文
src/content/blog/           博客文章
src/content/projects/       项目页内容
src/content/vibe/           短记录
public/images/              站点图片资源
```

当前仓库里已经有：

- `src/content/about.mdx`
- `src/content/projects/index.mdx`

博客和 Vibe 内容会在后续逐步补充。

## 新建内容

创建博客：

```sh
bun run post:new my-first-post
```

创建 MDX 博客：

```sh
bun run post:new my-interactive-post --mdx
```

创建 Vibe：

```sh
bun run vibe:new today-note
```

## 路由结构

```text
/                 首页
/blog             博客列表
/blog/[slug]      博客文章
/projects         项目列表
/projects/[slug]  项目详情
/vibe             短记录
/about            关于页面
/rss.xml          RSS
```

## 站点配置

站点级配置集中在 `src/config/site.toml`：

- `[config.site]`：站点标题、描述、仓库地址、页脚文案
- `[config.profile]`：名字、身份、地点、邮箱、GitHub、网站、头像
- `[[config.topNav.links]]`：顶部导航
- `[config.home]`：首页 Hero、当前项目、导航入口、联系链接
- `[config.search]`：搜索
- `[config.comments]`：评论系统
- `[config.theme]`：主题色盘

配置结构由 `src/content.config.ts` 校验，字段不合法时构建会直接报错。

## 部署

这是一个静态站点，构建输出在 `dist/`，可以部署到：

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

如果需要手动指定站点地址，可以在构建时传入：

```sh
SITE_URL=https://example.com bun run build
```

## 项目结构

```text
public/
  favicon*                站点图标
  images/                 当前使用中的图片资源
src/
  components/             页面组件
  config/                 站点配置
  content/                Markdown / MDX 内容
  layouts/                页面布局
  pages/                  路由页面
  styles/                 全局样式
scripts/                  内容与字体相关脚本
```

## 备注

这个仓库最初来自一个 Astro 内容站点 starter，但现在已经在逐步改造成我自己的长期个人网站。
