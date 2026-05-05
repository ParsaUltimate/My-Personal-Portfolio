import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Code,
  Copy,
  ExternalLink,
  Filter,
  Github,
  Globe,
  Layout,
  Moon,
  PenTool,
  Search,
  Sun,
  Terminal,
} from "lucide-react";

type SkillItem = {
  id: number;
  categoryFa: string;
  categoryEn: string;
  title: string;
  descriptionFa: string;
  descriptionEn: string;
  prompt: string;
};

const skillsData: SkillItem[] = [
  {
    id: 1,
    categoryFa: "نوشتن و تولید محتوا",
    categoryEn: "Writing & Content Skills",
    title: "SCQA Writing Framework",
    descriptionFa:
      "تبدیل ایده‌های ساختارنیافته به محتوای جذاب و منطقی بر اساس مدل وضعیت، پیچیدگی، سوال و جواب.",
    descriptionEn:
      "Structures content using the Situation, Complication, Question, Answer framework for clear, logical, and engaging narratives suitable for threads, articles, and reports.",
    prompt: `name: scqa-writing-framework
description: Structures content using the Situation, Complication, Question, Answer framework for clear, logical, and engaging narratives suitable for threads, articles, and reports.
license: Complete terms in LICENSE.txt
---
# SCQA Writing Framework
## Overview
Transforms unstructured ideas into structured, high-engagement content. It's perfect for educational material, storytelling, and technical explanations.
**Keywords**: writing, storytelling, SCQA, structured content, clarity, narrative, article, thread

## Core Framework
### Situation
- Establish context, current state
- Concise, clear, relevant
### Complication
- Introduce problem or tension
- Create curiosity
### Question
- Frame audience's key question
- Essential and natural
### Answer
- Deliver insight or solution
- Clear, actionable

## Features
- Logical progression
- Readability optimized
- Curiosity-driven engagement

## Output Format
- SCQA blocks, short paragraphs, bullet highlights

## Instructions
- Break input into SCQA sections
- Keep sentences concise
- Avoid unnecessary jargon
- Maintain smooth flow

## Constraints
- No skipped sections
- No repetition
- Conciseness prioritized`,
  },
  {
    id: 2,
    categoryFa: "نوشتن و تولید محتوا",
    categoryEn: "Writing & Content Skills",
    title: "Content Repurposing Engine",
    descriptionFa:
      "تبدیل محتوای طولانی به فرمت‌های مختلف (رشته‌توییت، اسکریپت ویدیو و...) با حفظ پیام اصلی.",
    descriptionEn:
      "Converts long-form content into multiple formats like social media threads, short video scripts, or summaries while preserving the core message.",
    prompt: `name: content-repurposing-engine
description: Converts long-form content into multiple formats like social media threads, short video scripts, or summaries while preserving the core message.
license: Complete terms in LICENSE.txt
---
# Content Repurposing Engine
## Overview
Transforms blogs, notes, and articles into varied formats for different channels.
**Keywords**: content, repurposing, social media, threads, scripts, short-form, long-form

## Features
- Extracts key ideas
- Adapts for platforms
- Maintains tone and clarity

## Output Format
- Platform-specific content
- Structured sections
- Engaging headlines/hooks

## Instructions
- Analyze original content
- Identify key points
- Rewrite in target format
- Keep consistent tone and readability

## Constraints
- Preserve meaning
- Avoid verbosity
- Format must match channel style`,
  },
  {
    id: 3,
    categoryFa: "نوشتن و تولید محتوا",
    categoryEn: "Writing & Content Skills",
    title: "Tone & Style Enforcer",
    descriptionFa: "حفظ لحن یکپارچه و متناسب با برند یا استایل شخصی در تمام خروجی‌ها.",
    descriptionEn:
      "Ensures all outputs match a consistent brand or personal tone, maintaining clarity, style, and audience alignment across multiple outputs.",
    prompt: `name: tone-style-enforcer
description: Ensures all outputs match a consistent brand or personal tone, maintaining clarity, style, and audience alignment across multiple outputs.
license: Complete terms in LICENSE.txt
---
# Tone & Style Enforcer
## Overview
Keeps all generated content in line with defined style guidelines or brand voice.
**Keywords**: style, tone, brand voice, consistency, clarity, writing

## Features
- Tone preservation
- Consistency across outputs
- Formatting enforcement

## Output Format
- Text aligned with style guide
- Optional bullet structure
- Clean, professional

## Instructions
- Apply defined tone to all input
- Check for style inconsistencies
- Adjust language, structure, and formatting

## Constraints
- No deviation from selected tone
- Maintain clarity`,
  },
  {
    id: 4,
    categoryFa: "نوشتن و تولید محتوا",
    categoryEn: "Writing & Content Skills",
    title: "Long-Form to Summary Compressor",
    descriptionFa: "خلاصه‌سازی متون طولانی به مفاهیم کلیدی برای درک سریع.",
    descriptionEn:
      "Condenses long text into concise summaries, keeping essential ideas intact for quick consumption and understanding.",
    prompt: `name: long-form-summary-compressor
description: Condenses long text into concise summaries, keeping essential ideas intact for quick consumption and understanding.
license: Complete terms in LICENSE.txt
---
# Long-Form to Summary Compressor
## Overview
Reduces complex content into digestible summaries for easy reading.
**Keywords**: summarization, long-form, clarity, conciseness, insights

## Features
- Key point extraction
- Bullet or paragraph output
- Simplifies dense material

## Output Format
- Concise paragraph
- Optional bullet points

## Instructions
- Identify main points
- Remove redundancy
- Produce readable, actionable summary

## Constraints
- No missing critical info
- No filler`,
  },
  {
    id: 5,
    categoryFa: "نوشتن و تولید محتوا",
    categoryEn: "Writing & Content Skills",
    title: "Structured Copywriting Skill",
    descriptionFa:
      "تولید کپی‌های متقاعدکننده و ساختاریافته با قلاب‌های قوی و دعوت به اقدام (CTA).",
    descriptionEn:
      "Generates high-impact copy with clear hooks, structured flow, and concise messaging for marketing, articles, and social media content.",
    prompt: `name: structured-copywriting-skill
description: Generates high-impact copy with clear hooks, structured flow, and concise messaging for marketing, articles, and social media content.
license: Complete terms in LICENSE.txt
---
# Structured Copywriting Skill
## Overview
Produces persuasive, well-structured copy with strong hooks and calls to action.
**Keywords**: copywriting, marketing, social media, structured content, hooks, engagement

## Features
- Strong hooks
- Sectioned flow
- CTA inclusion
- Concise and readable

## Output Format
- Sections, bullet points, hooks, conclusion

## Instructions
- Craft attention-grabbing opening
- Organize main points clearly
- Include actionable CTA
- Avoid unnecessary filler

## Constraints
- Maintain readability
- Do not overcomplicate`,
  },
  {
    id: 6,
    categoryFa: "بصری و اینفوگرافیک",
    categoryEn: "Visual & Infographic Skills",
    title: "Excalidraw Diagram Generator",
    descriptionFa: "تبدیل مفاهیم متنی به ساختارهای نموداری برای ترسیم در ابزارهایی مثل Excalidraw.",
    descriptionEn:
      "Converts textual concepts or workflows into clear diagram instructions suitable for Excalidraw or other visual tools.",
    prompt: `name: excalidraw-diagram-generator
description: Converts textual concepts or workflows into clear diagram instructions suitable for Excalidraw or other visual tools.
license: Complete terms in LICENSE.txt
---
# Excalidraw Diagram Generator
## Overview
Transforms ideas into diagram structures for visualization, learning, and planning.
**Keywords**: diagrams, visualization, excalidraw, workflows, mapping

## Features
- Node and connector generation
- Logical hierarchy
- Clear labels

## Output Format
- Diagram title
- Nodes and connections
- Layout suggestion

## Instructions
- Identify main elements
- Create nodes
- Connect logically
- Suggest layout

## Constraints
- Avoid clutter
- Maintain clarity`,
  },
  {
    id: 7,
    categoryFa: "بصری و اینفوگرافیک",
    categoryEn: "Visual & Infographic Skills",
    title: "Infographic Builder",
    descriptionFa: "تبدیل متن به فرمت‌های ساختاریافته اینفوگرافیک برای گزارش‌ها و ارائه‌ها.",
    descriptionEn:
      "Turns textual content into structured infographic formats suitable for reports, presentations, and educational materials.",
    prompt: `name: infographic-builder
description: Turns textual content into structured infographic formats suitable for reports, presentations, and educational materials.
license: Complete terms in LICENSE.txt
---
# Infographic Builder
## Overview
Generates visual-friendly summaries from text, highlighting steps, processes, or data points.
**Keywords**: infographic, visual, summary, chart, design

## Features
- Sectioned breakdown
- Bullet or step representation
- Readable visual format

## Output Format
- Steps, headings, visual cues
- Optional icons or markers

## Instructions
- Extract key points
- Organize visually
- Apply concise formatting

## Constraints
- Avoid excessive text
- Maintain clarity`,
  },
  {
    id: 8,
    categoryFa: "بصری و اینفوگرافیک",
    categoryEn: "Visual & Infographic Skills",
    title: "Flowchart Decision Builder",
    descriptionFa: "تولید درخت‌های تصمیم‌گیری و فلوچارت از متن برای ساده‌سازی فرآیندهای پیچیده.",
    descriptionEn:
      "Generates decision trees and flowcharts from textual input to simplify complex decision-making processes.",
    prompt: `name: flowchart-decision-builder
description: Generates decision trees and flowcharts from textual input to simplify complex decision-making processes.
license: Complete terms in LICENSE.txt
---
# Flowchart Decision Builder
## Overview
Converts processes into stepwise flowcharts for clear decision-making.
**Keywords**: flowchart, decision tree, process, visualization, clarity

## Features
- Node-based structure
- Conditional branching
- Clear labeling

## Output Format
- Nodes
- Connections
- Layout guidance

## Instructions
- Identify steps and decisions
- Map conditional paths
- Maintain logical flow

## Constraints
- Keep diagrams simple
- Avoid unnecessary nodes`,
  },
  {
    id: 9,
    categoryFa: "بصری و اینفوگرافیک",
    categoryEn: "Visual & Infographic Skills",
    title: "UI/UX Layout Advisor",
    descriptionFa: "ارائه مشاوره ساختاریافته برای طراحی رابط‌های کاربری تمیز و کاربردی.",
    descriptionEn:
      "Advises on interface layouts to optimize clarity, spacing, hierarchy, and usability.",
    prompt: `name: ui-ux-layout-advisor
description: Advises on interface layouts to optimize clarity, spacing, hierarchy, and usability.
license: Complete terms in LICENSE.txt
---
# UI/UX Layout Advisor
## Overview
Provides structured suggestions for designing clean and usable interfaces.
**Keywords**: ui, ux, layout, design, hierarchy, clarity

## Features
- Spacing and alignment suggestions
- Hierarchy optimization
- Accessibility considerations

## Output Format
- Layout instructions
- Element positioning
- Optional visual hints

## Instructions
- Analyze input design
- Suggest optimal layout
- Maintain readability and hierarchy

## Constraints
- Do not overcrowd layout
- Prioritize clarity`,
  },
  {
    id: 10,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Deep Research Synthesizer",
    descriptionFa:
      "ترکیب و استخراج بینش از داده‌های حجیم، حذف اطلاعات نامرتبط و تولید خلاصه‌های کاربردی.",
    descriptionEn:
      "Synthesizes insights from large datasets, filters irrelevant data, identifies patterns, and produces actionable summaries.",
    prompt: `name: deep-research-synthesizer
description: Synthesizes insights from large datasets, filters irrelevant data, identifies patterns, and produces actionable summaries.
license: Complete terms in LICENSE.txt
---
# Deep Research Synthesizer
## Overview
Converts large amounts of text into structured insights and actionable takeaways.
**Keywords**: research, synthesis, insights, analysis, knowledge

## Features
- Filters low-value info
- Highlights patterns
- Creates structured output

## Output Format
- Key insights
- Supporting details
- Summary paragraph

## Instructions
- Identify key points
- Remove irrelevant content
- Organize logically

## Constraints
- Avoid generic summaries
- Focus on utility`,
  },
  {
    id: 11,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Onchain Transaction Analyzer",
    descriptionFa: "تحلیل تراکنش‌های بلاکچین و ارائه توضیحات ساده و قابل فهم.",
    descriptionEn:
      "Analyzes blockchain transactions by tracing wallets, contracts, and token movements and providing simple, understandable explanations.",
    prompt: `name: onchain-transaction-analyzer
description: Analyzes blockchain transactions by tracing wallets, contracts, and token movements and providing simple, understandable explanations.
license: Complete terms in LICENSE.txt
---
# Onchain Transaction Analyzer
## Overview
Decodes onchain data into human-readable explanations.
**Keywords**: blockchain, crypto, analysis, transactions, wallets

## Features
- Wallet tracking
- Contract mapping
- Token flow visualization
- Simple language

## Output Format
- Step-by-step explanation
- Key actors and actions
- Summary insights

## Instructions
- Trace wallet and token flows
- Identify key interactions
- Summarize in plain language

## Constraints
- Avoid jargon
- Focus on clarity`,
  },
  {
    id: 12,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Source Validation Skill",
    descriptionFa: "اعتبارسنجی منابع اطلاعاتی و برجسته‌سازی میزان قابلیت اطمینان و سوگیری‌ها.",
    descriptionEn:
      "Validates the credibility of information sources, highlighting reliability, relevance, and potential biases.",
    prompt: `name: source-validation-skill
description: Validates the credibility of information sources, highlighting reliability, relevance, and potential biases.
license: Complete terms in LICENSE.txt
---
# Source Validation Skill
## Overview
Filters information for trustworthiness and relevance.
**Keywords**: credibility, validation, sources, research, bias

## Features
- Reliability scoring
- Bias detection
- Relevance filtering

## Output Format
- Verified sources
- Key insights
- Notes on reliability

## Instructions
- Check references
- Evaluate author and date
- Highlight trustworthy content

## Constraints
- Avoid unverified info
- Prioritize high-quality sources`,
  },
  {
    id: 13,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Competitive Intelligence Skill",
    descriptionFa:
      "مقایسه محصولات و ابزارها برای ارائه تحلیل ساختاریافته از نقاط قوت و ضعف (SWOT).",
    descriptionEn:
      "Compares products, protocols, or tools to provide structured analysis of strengths, weaknesses, and opportunities.",
    prompt: `name: competitive-intelligence-skill
description: Compares products, protocols, or tools to provide structured analysis of strengths, weaknesses, and opportunities.
license: Complete terms in LICENSE.txt
---
# Competitive Intelligence Skill
## Overview
Delivers comparative insights for business, tech, or market research.
**Keywords**: analysis, competitive, research, comparison, strategy

## Features
- Feature comparison
- SWOT-style analysis
- Recommendations

## Output Format
- Bullet comparison
- Strengths/weaknesses
- Key takeaways

## Instructions
- Identify competitors/tools
- Compare features
- Highlight differences and risks

## Constraints
- Avoid bias
- Focus on actionable insights`,
  },
  {
    id: 14,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Knowledge Structuring Skill",
    descriptionFa: "سازماندهی اطلاعات نامنظم به چارچوب‌های واضح و یادداشت‌های ساختاریافته.",
    descriptionEn:
      "Organizes unstructured information into clear frameworks, bullet points, or structured notes for easier understanding and application.",
    prompt: `name: knowledge-structuring-skill
description: Organizes unstructured information into clear frameworks, bullet points, or structured notes for easier understanding and application.
license: Complete terms in LICENSE.txt
---
# Knowledge Structuring Skill
## Overview
Transforms messy input into structured, usable knowledge.
**Keywords**: knowledge, structuring, frameworks, organization, notes

## Features
- Categorizes ideas
- Creates logical hierarchy
- Bullet formatting

## Output Format
- Structured framework
- Key points
- Optional notes

## Instructions
- Identify major topics
- Group related ideas
- Present clearly and concisely

## Constraints
- Avoid ambiguity
- Maintain readability`,
  },
  {
    id: 15,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Video Script Generator",
    descriptionFa: "تولید فیلمنامه ویدیو با قلاب‌های جذاب، بخش‌بندی ساختاریافته و ریتم مناسب.",
    descriptionEn:
      "Generates video scripts with hooks, structured sections, pacing, and call-to-actions optimized for engagement and retention.",
    prompt: `name: video-script-generator
description: Generates video scripts with hooks, structured sections, pacing, and call-to-actions optimized for engagement and retention.
license: Complete terms in LICENSE.txt
---
# Video Script Generator
## Overview
Produces structured scripts for short and long-form video content.
**Keywords**: video, scripts, hooks, engagement, pacing, content

## Features
- Strong opening hooks
- Sectioned content
- Clear calls-to-action

## Output Format
- Hook
- Content sections
- Closing summary

## Instructions
- Start with hook
- Organize main points
- Maintain pacing
- Include CTA

## Constraints
- Avoid filler
- Maintain audience attention`,
  },
  {
    id: 16,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Video Editing Planner",
    descriptionFa: "پیشنهاد ساختار تدوین، برش صحنه‌ها، انتقال‌ها و ریتم برای بهبود کیفیت ویدیو.",
    descriptionEn:
      "Suggests editing structure, scene cuts, transitions, and pacing for improved video content quality and engagement.",
    prompt: `name: video-editing-planner
description: Suggests editing structure, scene cuts, transitions, and pacing for improved video content quality and engagement.
license: Complete terms in LICENSE.txt
---
# Video Editing Planner
## Overview
Assists in planning efficient, engaging edits.
**Keywords**: video, editing, pacing, transitions, scenes

## Features
- Scene breakdown
- Transition suggestions
- Pacing optimization

## Output Format
- Editing steps
- Scene notes
- Transition plan

## Instructions
- Identify key scenes
- Suggest cuts/transitions
- Optimize for engagement

## Constraints
- Avoid excessive edits
- Preserve story clarity`,
  },
  {
    id: 17,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Hook Generator",
    descriptionFa:
      "تولید قلاب‌های جلب توجه کننده برای ویدیوها، پست‌های شبکه اجتماعی و مقدمه محتوا.",
    descriptionEn:
      "Produces attention-grabbing hooks for videos, social posts, and content intros to maximize engagement.",
    prompt: `name: hook-generator
description: Produces attention-grabbing hooks for videos, social posts, and content intros to maximize engagement.
license: Complete terms in LICENSE.txt
---
# Hook Generator
## Overview
Creates compelling openings to capture attention immediately.
**Keywords**: hook, attention, engagement, intro, viral

## Features
- Short, impactful
- Curiosity-driven
- Adaptable to content type

## Output Format
- Hook sentence
- Optional follow-up intro

## Instructions
- Focus on curiosity or bold statements
- Keep concise
- Match audience interest

## Constraints
- Avoid generic hooks
- Maintain relevance`,
  },
  {
    id: 18,
    categoryFa: "تحقیق و تحلیل",
    categoryEn: "Research & Analysis Skills",
    title: "Caption & Subtitle Formatter",
    descriptionFa: "قالب‌بندی کپشن‌ها و زیرنویس‌ها برای خوانایی بهتر و زمان‌بندی مناسب.",
    descriptionEn:
      "Formats captions and subtitles for readability, timing, and accessibility across videos.",
    prompt: `name: caption-subtitle-formatter
description: Formats captions and subtitles for readability, timing, and accessibility across videos.
license: Complete terms in LICENSE.txt
---
# Caption & Subtitle Formatter
## Overview
Ensures captions are readable, timed correctly, and maintain visual clarity.
**Keywords**: caption, subtitle, accessibility, readability, video

## Features
- Line breaks for clarity
- Timing alignment
- Readability optimization

## Output Format
- Caption text blocks
- Timing cues

## Instructions
- Format each line for clarity
- Match timing to speech
- Maintain readability standards

## Constraints
- Avoid long lines
- Keep clear and concise`,
  },
  {
    id: 19,
    categoryFa: "کدنویسی و اتوماسیون",
    categoryEn: "Coding & Automation Skills",
    title: "Code Review Skill",
    descriptionFa: "بررسی کدها برای یافتن باگ‌ها، ناکارآمدی‌ها و رعایت بهترین شیوه‌ها.",
    descriptionEn:
      "Reviews code for bugs, inefficiencies, and adherence to best practices, providing actionable improvement suggestions.",
    prompt: `name: code-review-skill
description: Reviews code for bugs, inefficiencies, and adherence to best practices, providing actionable improvement suggestions.
license: Complete terms in LICENSE.txt
---
# Code Review Skill
## Overview
Analyzes code to ensure quality, efficiency, and maintainability.
**Keywords**: code, review, bugs, optimization, best practices

## Features
- Error detection
- Optimization recommendations
- Style enforcement

## Output Format
- Issues found
- Suggested fixes
- Optional summary

## Instructions
- Analyze code line by line
- Highlight errors or inefficiencies
- Suggest improvements

## Constraints
- Maintain accuracy
- Avoid false positives`,
  },
  {
    id: 20,
    categoryFa: "کدنویسی و اتوماسیون",
    categoryEn: "Coding & Automation Skills",
    title: "Workflow Automation Agent",
    descriptionFa:
      "شکستن وظایف پیچیده به جریان‌های کاری گام‌به‌گام و نگاشت اقدامات به ابزارها.",
    descriptionEn:
      "Breaks complex tasks into step-by-step workflows, mapping actions to tools, optimizing execution, and improving efficiency.",
    prompt: `name: workflow-automation-agent
description: Breaks complex tasks into step-by-step workflows, mapping actions to tools, optimizing execution, and improving efficiency.
license: Complete terms in LICENSE.txt
---
# Workflow Automation Agent
## Overview
Converts goals into actionable workflows for AI-assisted or human execution.
**Keywords**: automation, workflow, productivity, steps, execution

## Features
- Task decomposition
- Tool mapping
- Optimization

## Output Format
- Goal
- Stepwise actions
- Tools & instructions

## Instructions
- Identify goal
- Break into steps
- Assign tools
- Optimize for efficiency

## Constraints
- Avoid vague instructions
- Maintain logical flow`,
  },
  {
    id: 21,
    categoryFa: "کدنویسی و اتوماسیون",
    categoryEn: "Coding & Automation Skills",
    title: "Skill Creator (Meta Skill)",
    descriptionFa:
      "ایجاد خودکار مهارت‌های جدید هوش مصنوعی در فرمت Markdown با ساختار استاندارد.",
    descriptionEn:
      "Generates new AI skills in `.md` format, providing structured name, description, and instruction for future use.",
    prompt: `name: skill-creator-meta-skill
description: Generates new AI skills in \`.md\` format, providing structured name, description, and instruction for future use.
license: Complete terms in LICENSE.txt
---
# Skill Creator (Meta Skill)
## Overview
Automates creation of AI skills by generating fully structured \`.md\` files.
**Keywords**: skill creation, automation, AI, md, modular

## Features
- Generates skill metadata
- Includes detailed instructions
- Ready-to-use format

## Output Format
- Skill name
- Description
- Instruction steps

## Instructions
- Accept input goal
- Define role, task, process
- Output structured \`.md\` skill

## Constraints
- Maintain clarity
- Ensure usability`,
  },
  {
    id: 22,
    categoryFa: "کدنویسی و اتوماسیون",
    categoryEn: "Coding & Automation Skills",
    title: "DevOps Assistant",
    descriptionFa: "دستیار کنترل نسخه، استقرار و اتوماسیون برای تسهیل عملیات توسعه.",
    descriptionEn:
      "Assists in version control, deployment, and automation tasks, ensuring smooth DevOps operations and workflow efficiency.",
    prompt: `name: devops-assistant
description: Assists in version control, deployment, and automation tasks, ensuring smooth DevOps operations and workflow efficiency.
license: Complete terms in LICENSE.txt
---
# DevOps Assistant
## Overview
Supports development workflows by managing versioning, deployment, and automation tasks.
**Keywords**: devops, automation, deployment, git, workflow

## Features
- Commit and version guidance
- Deployment suggestions
- Workflow optimization

## Output Format
- Task instructions
- Stepwise guide
- Automation recommendations

## Instructions
- Analyze project requirements
- Suggest DevOps actions
- Optimize workflow efficiency

## Constraints
- Ensure accuracy
- Avoid redundant steps`,
  },
];

type Language = "en" | "fa";

type TranslationMap = Record<
  Language,
  {
    title: string;
    subtitle: string;
    skillsCount: string;
    categoriesTitle: string;
    copyTitle: string;
    copied: string;
    showMore: string;
    showLess: string;
    ttWebsite: string;
    ttGithub: string;
    ttTheme: string;
    ttLang: string;
  }
>;

const translations: TranslationMap = {
  en: {
    title: "AI Prompt Library",
    subtitle:
      "A curated list of structured prompts (skills) to enhance your AI assistant outputs. Copy and paste them into Claude, ChatGPT, or Gemini.",
    skillsCount: "Prompts",
    categoriesTitle: "Categories",
    copyTitle: "Copy Prompt",
    copied: "Copied!",
    showMore: "Show full prompt",
    showLess: "Show less",
    ttWebsite: "Go to main page",
    ttGithub: "View GitHub profile",
    ttTheme: "Switch to dark or light mode",
    ttLang: "Change language",
  },
  fa: {
    title: "کتابخانه پرامپت AI",
    subtitle:
      "مجموعه‌ای از پرامپت‌های ساختاریافته (مهارت‌ها) برای ارتقای خروجی دستیارهای هوش مصنوعی. پرامپت مورد نظر را کپی کنید و در Claude، ChatGPT یا Gemini پیست کنید.",
    skillsCount: "پرامپت",
    categoriesTitle: "دسته‌بندی‌ها",
    copyTitle: "کپی کردن پرامپت",
    copied: "کپی شد!",
    showMore: "نمایش کامل پرامپت",
    showLess: "بستن",
    ttWebsite: "رفتن به صفحه اصلی",
    ttGithub: "مشاهده پروفایل گیت‌هاب",
    ttTheme: "تغییر حالت تاریک یا روشن",
    ttLang: "تغییر زبان",
  },
};

const categoryMapping: Record<string, Record<Language, string>> = {
  All: { en: "All", fa: "همه" },
  "Writing & Content Skills": { en: "Writing & Content Skills", fa: "نوشتن و تولید محتوا" },
  "Visual & Infographic Skills": { en: "Visual & Infographic Skills", fa: "بصری و اینفوگرافیک" },
  "Research & Analysis Skills": { en: "Research & Analysis Skills", fa: "تحقیق و تحلیل" },
  "Coding & Automation Skills": { en: "Coding & Automation Skills", fa: "کدنویسی و اتوماسیون" },
};

const getSystemTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const PROMPTS_SEO = {
  title: "AI Prompt Library | Parsa Ghaei",
  description:
    "A curated AI Prompt Library by Parsa Ghaei with structured prompts for writing, research, visual design, and coding workflows.",
  imageAlt: "AI Prompt Library by Parsa Ghaei",
};

const PromptsPage = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategoryEn, setSelectedCategoryEn] = useState("All");
  const [lang, setLang] = useState<Language>("en");
  const [theme, setTheme] = useState<"dark" | "light">(getSystemTheme);
  const [isAnimatingTheme, setIsAnimatingTheme] = useState(false);
  const [isAnimatingLang, setIsAnimatingLang] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  useEffect(() => {
    if (isTouchDevice) {
      return undefined;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const handlePointerChange = (event: MediaQueryListEvent) => setIsTouchDevice(event.matches);
    setIsTouchDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", handlePointerChange);
    return () => mediaQuery.removeEventListener("change", handlePointerChange);
  }, []);

  useEffect(() => {
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  useEffect(() => {
    const previous = {
      title: document.title,
      description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
      ogTitle: document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content ?? "",
      ogDescription:
        document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ?? "",
      ogType: document.querySelector<HTMLMetaElement>('meta[property="og:type"]')?.content ?? "",
      ogUrl: document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content ?? "",
      ogImage: document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content ?? "",
      ogImageAlt:
        document.querySelector<HTMLMetaElement>('meta[property="og:image:alt"]')?.content ?? "",
      ogImageWidth:
        document.querySelector<HTMLMetaElement>('meta[property="og:image:width"]')?.content ?? "",
      ogImageHeight:
        document.querySelector<HTMLMetaElement>('meta[property="og:image:height"]')?.content ?? "",
      ogSiteName:
        document.querySelector<HTMLMetaElement>('meta[property="og:site_name"]')?.content ?? "",
      twitterCard: document.querySelector<HTMLMetaElement>('meta[name="twitter:card"]')?.content ?? "",
      twitterTitle: document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.content ?? "",
      twitterDescription:
        document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.content ?? "",
      twitterImage: document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.content ?? "",
      twitterImageAlt:
        document.querySelector<HTMLMetaElement>('meta[name="twitter:image:alt"]')?.content ?? "",
      twitterSite: document.querySelector<HTMLMetaElement>('meta[name="twitter:site"]')?.content ?? "",
      canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
    };

    const setMetaByName = (name: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setMetaByProperty = (property: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setCanonical = (href: string) => {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", href);
    };

    const canonicalUrl = window.location.hostname === "prompts.parsaghaei.dev"
      ? "https://prompts.parsaghaei.dev/"
      : "https://parsaghaei.dev/prompts";
    const socialUrl = window.location.hostname === "prompts.parsaghaei.dev"
      ? "https://prompts.parsaghaei.dev/"
      : window.location.href;
    const ogImageUrl = `${window.location.origin}/og-prompts.svg`;

    document.title = PROMPTS_SEO.title;
    setMetaByName("description", PROMPTS_SEO.description);
    setMetaByProperty("og:title", PROMPTS_SEO.title);
    setMetaByProperty("og:description", PROMPTS_SEO.description);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:site_name", "Parsa Ghaei");
    setMetaByProperty("og:url", socialUrl);
    setMetaByProperty("og:image", ogImageUrl);
    setMetaByProperty("og:image:alt", PROMPTS_SEO.imageAlt);
    setMetaByProperty("og:image:width", "1200");
    setMetaByProperty("og:image:height", "630");
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:site", "@Dark_px");
    setMetaByName("twitter:title", PROMPTS_SEO.title);
    setMetaByName("twitter:description", PROMPTS_SEO.description);
    setMetaByName("twitter:image", ogImageUrl);
    setMetaByName("twitter:image:alt", PROMPTS_SEO.imageAlt);
    setCanonical(canonicalUrl);

    return () => {
      document.title = previous.title;
      setMetaByName("description", previous.description);
      setMetaByProperty("og:title", previous.ogTitle);
      setMetaByProperty("og:description", previous.ogDescription);
      setMetaByProperty("og:type", previous.ogType);
      setMetaByProperty("og:site_name", previous.ogSiteName);
      setMetaByProperty("og:url", previous.ogUrl);
      setMetaByProperty("og:image", previous.ogImage);
      setMetaByProperty("og:image:alt", previous.ogImageAlt);
      setMetaByProperty("og:image:width", previous.ogImageWidth);
      setMetaByProperty("og:image:height", previous.ogImageHeight);
      setMetaByName("twitter:card", previous.twitterCard);
      setMetaByName("twitter:site", previous.twitterSite);
      setMetaByName("twitter:title", previous.twitterTitle);
      setMetaByName("twitter:description", previous.twitterDescription);
      setMetaByName("twitter:image", previous.twitterImage);
      setMetaByName("twitter:image:alt", previous.twitterImageAlt);
      setCanonical(previous.canonical);
    };
  }, []);

  const categoriesEnList = useMemo(
    () => ["All", ...new Set(skillsData.map((skill) => skill.categoryEn))],
    []
  );

  const t = translations[lang];
  const isRtl = lang === "fa";

  const filteredSkills = useMemo(
    () =>
      selectedCategoryEn === "All"
        ? skillsData
        : skillsData.filter((skill) => skill.categoryEn === selectedCategoryEn),
    [selectedCategoryEn]
  );

  const handleCopy = async (text: string, id: number) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getCategoryIcon = (categoryEn: string) => {
    switch (categoryEn) {
      case "Writing & Content Skills":
        return <PenTool className="h-5 w-5 shrink-0" />;
      case "Visual & Infographic Skills":
        return <Layout className="h-5 w-5 shrink-0" />;
      case "Research & Analysis Skills":
        return <Search className="h-5 w-5 shrink-0" />;
      case "Coding & Automation Skills":
        return <Terminal className="h-5 w-5 shrink-0" />;
      default:
        return <BookOpen className="h-5 w-5 shrink-0" />;
    }
  };

  const toggleTheme = () => {
    setIsAnimatingTheme(true);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setTimeout(() => setIsAnimatingTheme(false), 500);
  };

  const toggleLang = () => {
    setIsAnimatingLang(true);
    setTimeout(() => {
      setLang((prev) => (prev === "en" ? "fa" : "en"));
    }, 200);
    setTimeout(() => setIsAnimatingLang(false), 500);
  };

  const textAnimClass = `transition-all duration-300 ease-in-out inline-block w-full ${
    isAnimatingLang ? "opacity-0 translate-y-2 blur-sm" : "opacity-100 translate-y-0 blur-0"
  }`;
  const cursorClass = isTouchDevice ? "" : "cursor-none";
  const ambientAnimationClass = isTouchDevice ? "" : "animate-pulse";

  return (
    <div
      className={`${theme} min-h-screen w-full transition-colors duration-700 ease-in-out ${cursorClass}`}
      style={{
        fontFamily:
          lang === "fa"
            ? '"IRANSans", "IRANSansWeb", Tahoma, Arial, sans-serif'
            : 'ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <style>{`
        @font-face {
          font-family: 'IRANSans';
          src: url('https://cdn.fontcdn.ir/Font/Persian/IRANSans/IRANSansWeb.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'IRANSans';
          src: url('https://cdn.fontcdn.ir/Font/Persian/IRANSans/IRANSansWeb_Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
        }
      `}</style>

      {!isTouchDevice ? (
        <div
          className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center transition-transform duration-150 ease-out mix-blend-difference"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <div
            className={`h-3 w-3 rounded-full bg-zinc-300 shadow-[0_0_15px_#d4d4d8] transition-transform duration-300 ${
              isHovering ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <div
            className={`absolute rounded-full border-2 border-zinc-400 transition-all duration-300 ${
              isHovering
                ? "h-12 w-12 opacity-80 shadow-[0_0_20px_rgba(161,161,170,0.6)]"
                : "h-8 w-8 opacity-40"
            }`}
          />
          {hoverLabel ? (
            <div className="absolute left-6 top-6 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
              {hoverLabel}
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        className={`fixed inset-0 z-0 overflow-hidden transition-colors duration-700 ease-in-out ${
          theme === "dark" ? "bg-[#09090b]" : "bg-[#fafafa]"
        }`}
      >
        <div
          className={`absolute left-[-10%] top-[-10%] h-[40%] w-[40%] ${ambientAnimationClass} rounded-full blur-[100px] transition-all duration-[2000ms] ease-in-out ${
            theme === "dark" ? "bg-zinc-800/40" : "bg-zinc-300/50"
          }`}
        />
        <div
          className={`absolute right-[-10%] top-[20%] h-[50%] w-[50%] ${ambientAnimationClass} rounded-full blur-[120px] transition-all duration-[2000ms] ease-in-out ${
            theme === "dark" ? "bg-zinc-900/50" : "bg-zinc-200/60"
          }`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className={`absolute bottom-[-10%] left-[20%] h-[40%] w-[60%] ${ambientAnimationClass} rounded-full blur-[100px] transition-all duration-[2000ms] ease-in-out ${
            theme === "dark" ? "bg-zinc-800/30" : "bg-zinc-300/40"
          }`}
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div
        className="relative z-10 flex min-h-screen flex-col items-center p-4 text-zinc-900 dark:text-zinc-100 md:p-8"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="mb-8 flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex gap-3">
            <a
              href="https://parsaghaei.dev"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => {
                setIsHovering(true);
                setHoverLabel(t.ttWebsite);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoverLabel(null);
              }}
              className="group relative flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/60 px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white dark:border-white/10 dark:bg-zinc-900/50 dark:text-zinc-300 dark:shadow-none dark:hover:bg-zinc-800/80"
            >
              <ExternalLink className="h-5 w-5 text-zinc-800 dark:text-zinc-200" />
              <span className="hidden sm:inline" dir="ltr">
                parsaghaei.dev
              </span>
            </a>

            <a
              href="https://github.com/ParsaUltimate"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => {
                setIsHovering(true);
                setHoverLabel(t.ttGithub);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoverLabel(null);
              }}
              className="group relative flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/60 px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white dark:border-white/10 dark:bg-zinc-900/50 dark:text-zinc-300 dark:shadow-none dark:hover:bg-zinc-800/80"
            >
              <Github className="h-5 w-5 text-zinc-800 dark:text-zinc-200" />
            </a>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              onMouseEnter={() => {
                setIsHovering(true);
                setHoverLabel(t.ttTheme);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoverLabel(null);
              }}
              className={`group relative rounded-2xl border border-zinc-200 bg-white/60 p-3 text-zinc-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white dark:border-white/10 dark:bg-zinc-900/50 dark:text-zinc-300 dark:shadow-none dark:hover:bg-zinc-800/80 ${
                isAnimatingTheme ? "scale-75 rotate-180 opacity-50" : "scale-100 rotate-0 opacity-100"
              }`}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={toggleLang}
              onMouseEnter={() => {
                setIsHovering(true);
                setHoverLabel(t.ttLang);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoverLabel(null);
              }}
              className={`group relative flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/60 px-5 py-3 text-sm font-bold text-zinc-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white dark:border-white/10 dark:bg-zinc-900/50 dark:text-zinc-300 dark:shadow-none dark:hover:bg-zinc-800/80 ${
                isAnimatingLang ? "scale-90 opacity-80" : "scale-100 opacity-100"
              }`}
            >
              <Globe
                className={`h-5 w-5 transition-transform duration-500 ${
                  isAnimatingLang ? "rotate-180" : "rotate-0"
                }`}
              />
              <span className="min-w-[50px] text-center">{lang === "en" ? "فارسی" : "English"}</span>
            </button>
          </div>
        </div>

        <header
          className={`mb-12 flex w-full max-w-6xl flex-col items-center justify-between gap-6 text-center transition-all duration-500 md:flex-row ${
            isRtl ? "md:text-right" : "md:text-left"
          }`}
        >
          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 drop-shadow-sm dark:text-white md:text-5xl">
              <span className={textAnimClass}>{t.title}</span>
            </h1>
            <p className="max-w-2xl text-base font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
              <span className={textAnimClass}>{t.subtitle}</span>
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-4 shadow-sm backdrop-blur-2xl transition-all duration-500 hover:scale-105 dark:border-white/10 dark:bg-zinc-900/50">
            <div className="rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 p-3 text-white shadow-inner dark:from-zinc-200 dark:to-white dark:text-zinc-900">
              <Code className="h-7 w-7" />
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <p className="mt-1 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <span className={textAnimClass}>{t.skillsCount}</span>
              </p>
              <p className="text-2xl font-black leading-none text-zinc-900 dark:text-white">
                {skillsData.length}
              </p>
            </div>
          </div>
        </header>

        <div className="flex w-full max-w-6xl flex-col gap-8 md:flex-row">
          <aside className="w-full shrink-0 md:w-72">
            <div className="sticky top-6 rounded-3xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/50">
              <h2 className="mb-5 flex items-center gap-3 text-xl font-extrabold text-zinc-800 dark:text-white">
                <div className="rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800">
                  <Filter className="h-5 w-5 text-zinc-800 dark:text-zinc-200" />
                </div>
                <span className={textAnimClass}>{t.categoriesTitle}</span>
              </h2>
              <nav className="flex flex-col gap-2">
                {categoriesEnList.map((categoryEn) => {
                  const isActive = selectedCategoryEn === categoryEn;
                  const displayName = categoryMapping[categoryEn]?.[lang] ?? categoryEn;
                  const categoryCount =
                    categoryEn === "All"
                      ? skillsData.length
                      : skillsData.filter((skill) => skill.categoryEn === categoryEn).length;

                  return (
                    <button
                      key={categoryEn}
                      type="button"
                      onClick={() => setSelectedCategoryEn(categoryEn)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-sm font-bold transition-all duration-300 ${cursorClass} ${
                        isActive
                          ? "scale-[1.02] bg-zinc-900 text-white shadow-md dark:bg-white dark:text-zinc-900"
                          : "border-transparent text-zinc-600 hover:scale-[1.01] hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-left rtl:text-right">
                          {getCategoryIcon(categoryEn)}
                          <span className={`truncate ${textAnimClass}`}>{displayName}</span>
                        </div>
                        {categoryEn !== "All" ? (
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs shadow-sm transition-colors ${
                              isActive
                                ? "bg-zinc-700 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800"
                                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400"
                            }`}
                          >
                            {categoryCount}
                          </span>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="w-full flex-1">
            <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
              {filteredSkills.map((skill) => {
                const isExpanded = expandedId === skill.id;

                return (
                  <article
                    key={skill.id}
                    className="group flex flex-col rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/50"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className={isRtl ? "text-right" : "text-left"}>
                        <span
                          className={`mb-3 inline-block rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-800/80 dark:text-zinc-300 ${textAnimClass}`}
                        >
                          {lang === "fa" ? skill.categoryFa : skill.categoryEn}
                        </span>
                        <h3
                          className="text-xl font-extrabold leading-tight text-zinc-900 dark:text-white md:text-2xl"
                          dir="ltr"
                        >
                          {skill.title}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => void handleCopy(skill.prompt, skill.id)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`shrink-0 rounded-2xl p-3.5 shadow-sm transition-all duration-300 ${cursorClass} ${
                          copiedId === skill.id
                            ? "scale-110 bg-green-600 text-white shadow-green-500/20 dark:bg-green-500"
                            : "bg-zinc-900 text-white hover:scale-105 hover:shadow-lg active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        }`}
                        title={copiedId === skill.id ? t.copied : t.copyTitle}
                      >
                        {copiedId === skill.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <p
                      className={`mb-5 text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 ${
                        isRtl ? "text-right" : "text-left"
                      }`}
                    >
                      <span className={textAnimClass}>
                        {lang === "fa" ? skill.descriptionFa : skill.descriptionEn}
                      </span>
                    </p>

                    <div className="mt-auto flex flex-col">
                      <div
                        className={`relative overflow-hidden rounded-2xl border border-zinc-200 shadow-inner transition-all duration-500 ease-in-out dark:border-white/10 ${
                          isExpanded ? "max-h-[800px]" : "max-h-36"
                        }`}
                      >
                        <pre
                          className="h-full whitespace-pre-wrap bg-zinc-100 p-5 text-left font-mono text-xs text-zinc-800 selection:bg-zinc-300 dark:bg-black/60 dark:text-zinc-300 dark:selection:bg-zinc-700"
                          dir="ltr"
                        >
                          <code>{skill.prompt}</code>
                        </pre>

                        {!isExpanded ? (
                          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-zinc-100/90 to-transparent dark:from-black/80" />
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleExpand(skill.id)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`mt-3 self-center rounded-xl border border-zinc-200 bg-white/60 px-4 py-2 text-sm font-bold text-zinc-800 backdrop-blur-md transition-all hover:scale-105 hover:bg-white active:scale-95 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 ${cursorClass}`}
                      >
                        <span className="flex items-center justify-center gap-1.5">
                          <span className={textAnimClass}>{isExpanded ? t.showLess : t.showMore}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          )}
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PromptsPage;
