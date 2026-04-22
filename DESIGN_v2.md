# Yhea v2.0 综合设计方案

## 基于26条建议的全局重构

---

## 一、全局架构变化

### Sidebar 导航（重新设计）
```
Yhea (Logo)
---
Dashboard          ← 首页仪表板
Agent              ← Agent大厅（多个Agent选择入口）
Learning           ← 学习中心（三大部分）
  ├── My Courses   ← 学生自己的选课
  ├── Standardized Tests ← 托福/雅思/SAT/ACT/多邻国
  └── Subject Courses    ← AP/A-Level/IB各学科
Planning           ← 升学规划+日历
Universities       ← 大学数据库
Apply Guide        ← 申请系统指南+文书写作
Background         ← 竞赛+项目+背景提升
Flashcards         ← 卡片记忆
Notes              ← 个人笔记
Plaza              ← 社区广场
People             ← 好友+聊天+群聊
Meeting            ← Class/Group/World会议
Calendar           ← 个人日历（与Planning联动）
---
Buy Me Coffee      ← 捐赠
```

### Agent 架构（4个Agent）
| Agent | 职责 | 交互方式 |
|-------|------|----------|
| College Planning | 升学规划：选校、标化目标、选课、竞赛项目安排 | 学生提供信息→Agent生成规划→同步到Planning |
| Teaching | 学科教学：根据学生选课提供针对性教学 | 每学科一个Agent实例 |
| Schedule | 日程规划：整合任务、考试、截止日期到日历 | 自动生成提醒 |
| Mental Health | 心理支持：检测情绪、提供疏导 | 被动触发+主动关怀 |

### 数据库核心变化
1. 所有表启用RLS + 完整Policy
2. Edge Function Secrets：KIMI_API_KEY + SUPABASE_SERVICE_ROLE_KEY（不用publishable key，Edge Function需要admin权限操作多表）
3. 新增表：flashcards, calendar_events, essays, friends, messages, groups, meetings, competitions, projects
4. 环境变量：VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY

---

## 二、模块详细设计

### Learning Center（重构）
**三大部分：**

1. **My Courses** - 从学生Profile的选课信息动态显示
2. **Standardized Tests** - 托福(iBT 0-120) | 雅思(0-9) | Duolingo(10-160) | SAT(1600) | ACT(36)
3. **Subject Courses** - AP/A-Level/IB → 各学科 → Unit → Topic

**新增 Flashcards**：Quizlet-like卡片记忆，覆盖所有学科和标化考试

### Universities（改进）
- 去掉录取率字段
- 加校徽（用户自己上传PNG）
- 三大榜单学科分类：
  - QS: 5大领域55学科
  - THE: 11学科
  - US News: 学科分类

### Apply Guide（重构）
按申请系统区分：
- Common App (7个Prompts, 650词)
- Coalition App (5个Prompts, 550词)
- UC Application (8个PIQ, 350词each)
- UCAS (2026起3个问答, 4000字符)
- OUAC (加拿大)
- MIT独立
- 各校独立系统

新增 **Essays** 功能：在线写文书，按申请系统区分不同文书

### Background（新增）
- 竞赛数据库：多维度分类
  - 分类：STEM/人文社科/商科/艺术/综合
  - 五边形评分：难度、投入、含金量、质量、体验
  - Yhea综合推荐评分（加权计算）
- 个人项目：学生自己的项目记录（不公开）

### People（新增）
- 添加好友（搜索用户名/邮箱）
- 私聊 + 群聊
- 聊天记录7天覆盖（数据库定时清理）
- 隐私提示：角落标注"聊天记录每7天自动清除"

### Meeting（新增）
- **Class**：关联学生的课程（暂时空着，等校园版）
- **Group**：群组会议（学生自己填Zoom链接分享）
- **World**：公开会议（所有Yhea用户可见）
- 不集成Zoom/Teams API（收费+复杂），让学生自己开好后填信息

### Profile（大改）
注册后引导填写：
- 入学体系（AP/A-Level/IB 单选）
- 年级
- 语言考试（托福/雅思/多邻国 多选）+ 目标分数
- 标化考试（SAT/ACT 多选）+ 目标分数
- 选课（多选）
- 目标国家/地区
- 昵称、Bio、Tag
- 头像上传

### Planning + Calendar
Planning页面集成日历视图：
- 升学规划两种模式：
  1. 自己手动填写
  2. Agent根据学生Profile生成规划
- Agent规划可同步到Planning和Calendar
- Calendar页面：月/周/日视图

### Plaza（改进）
- 接入真实数据库
- 改进视觉：卡片式瀑布流、热度标签、作者信息更丰富

### 隐私政策
- 注册时弹出隐私政策
- 必须阅读并勾选才能注册
- 内容：数据收集范围、用途、不泄露承诺

---

## 三、文件规划

### 数据库表（全部）
users, profiles, courses, course_units, knowledge_nodes,
standardized_tests, test_sections, flashcards, flashcard_decks,
universities, university_majors, university_rankings, university_logos,
application_systems, application_essays, essays,
competitions, projects, background_items,
chat_sessions, chat_messages, agent_configs,
notes, note_interactions, point_balances, point_transactions,
ai_usage_quotas, tasks, calendar_events,
friends, messages, chat_groups, group_members,
meetings, privacy_consents

### Edge Functions
agent-chat, agent-planning, agent-teaching, agent-schedule, agent-mental,
heat-calculate, point-transaction

### 前端页面（全部重写）
Login, Onboarding, Dashboard,
AgentHub, AgentChat,
Learning, MyCourses, StandardizedTests, SubjectCourses, LearningUnit, Flashcards,
Planning, Calendar,
Universities, UniversityDetail,
ApplyGuide, Essays,
Background,
Notes, Plaza,
People, ChatRoom,
Meeting,
Profile, Settings,
Donate, Admin,
PrivacyPolicy, TermsOfService
