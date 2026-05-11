# TODO

## High Priority

- [ ] ریسپانسیو بودن توی دیوایس موبایل
- [ ] Remove Three curated posts from Medium. You can choose them by updating MEDIUM_CONFIG.featuredPostLinks. 
- [ ] کرسر دیسکریپشن و لوگو لینک ها رو چک کن
- [x] طول مستطیل QUICK_FACTS رو کمتر کن
- [ //] افزودن لوگو
- [ ] درست کردن پروفایل ارت اتیشن.
- [x] افزودن سوشال X به گت این تاچ و جایگذاریش به جای تلگرام. ولی همه سوشال ها در فوتر باقی بمونن
- [ ] اضافه کردن موزک بکگراند و ساند افکت
- [x] www.linkedin.com/in/parsaghaei
- [ ] شکل های کنترولر پلی استیشن.
- [ ] سئو
- [x] حذف بخش tech stack
- [x] گفتن چیزایی که بلدم تو what i know مثل داکیومنشن و ابزار های ارتباط تیمی ذکر داشتن تجربه کار تیمی ذکر فعال بودن در مراکز رشد بازی سازی در بخش درباره
- [x] تغییر سن رویای گیم دایرکتور شدن از ۳۰ به ۳۵+
- [x] تنظیم `MEDIUM_CONFIG.username` در `src/lib/medium.ts`
- [ ] جایگذاری ۳ لینک پست منتخب در `MEDIUM_CONFIG.featuredPostLinks`
- [x] تست کامل مسیر `/blog` و `#Devlog` در دسکتاپ و موبایل
- [ ] بازبینی محتوای Hero/Projects/About/Contact با متن نهایی
## Cursor Hover Preview

- [x] بهبود موقعیت Preview نزدیک لبه‌های صفحه (جلوگیری از خروج از viewport)
- [x] اضافه‌کردن انیمیشن ورود/خروج نرم‌تر برای Preview
- [x] تعریف `data-cursor-preview` برای لینک‌های مهم (CTAها و Navbar)
- [x] تنظیم اندازه فونت/پدینگ Preview برای موبایل‌های بزرگ و تبلت

## UI / UX Polish

- [x] یکدست‌سازی hover state کارت‌ها در همه سکشن‌ها
- [x] بازبینی فاصله‌ها (spacing) بین سکشن‌های صفحه اصلی
- [x] بررسی نهایی کنتراست رنگ متن‌ها برای خوانایی بهتر
- [ ] افزودن steam profile به بخش social (وقتی از بن در اومد😭)

## Blog / Devlog

- [ ] دیدن محیط کلودفلر پیجس و چک کردن بخش فانکشنس برای سئو SSR/SSG
- [x] تعیین دقیق دسته‌بندی Devlog در Medium (مثلاً tag ثابت: `devlog`)
- [x] بهبود پیام خطا هنگام لود نشدن Medium feed
- [x] بررسی نمایش تصویر شاخص پست (thumbnail) در کارت‌ها

## Documentation

- [ ] مرور و تکمیل `docs/PROJECT_DOCUMENTATION.md`
- [ ] مرور `docs/SEO_MEDIUM_FAQ.md` و `docs/SSR_HOSTING_FAQ.md`
- [ ] اضافه کردن راهنمای انتشار نهایی (deploy checklist)
- [x] داکیومنت برای تمام کامپوننت هایی که تو ساخت این سایت به کار برده شدن رو با استفاده از کتگوری های مشخص (ui, blog و...) بنویس که مثلا هر کدوم چیکار میکنن و برای کدوم بخش هستن چیزاییش که قابل شخصی سازی هست رو بگو ساختار فولدر ها رو توضیح بده و... . چیزایی که نباید باشه: تموم اطلاعات رو توی یک فایل نوشتن. پس چند تا فایل مشخص برای داکیومنشن قوی سایت بذار. متن های داکیومنت ها هم بسیار روان و هیومنایزد باشن. نحوه ستاپ و چیزای کلی و ساختار سایت رو هم بگو.

## Validation

- [ ] اجرای `npm run typecheck`
- [ ] اجرای `npm run lint`
- [ ] اجرای `npm run build`
- [ ] تست نهایی در مرورگر بعد از `Hard Refresh`
- [x] Cloudflare Email Routing



سوال خوبیه و جواب صادقانه می‌خواد. بذار محتوای کامل سایت رو با دقت تحلیل کنم:

***

بله، چند جای مشخص وجود دارد که متن می‌تواند حس **توهم یا اغراق** بدهد — نه به خاطر دروغ بودن، بلکه به خاطر شکاف بین **ادعا و واقعیت قابل‌اثبات** در همان لحظه:

***

### ۱. عنوان سایت: "Game Developer & Designer" — بزرگ‌ترین مورد

`Parsa Ghaei | Game Developer & Designer`

در حالی که در همان Hero section نوشته شده: **«Eager to Become a Game Developer / Designer»** [localhost](http://localhost:8080/)

این یک تناقض مستقیم است. عنوان tab مرورگر و title سایت ادعا می‌کند که هستی، اما متن اصلی می‌گوید داری می‌شوی. یکی از این دو باید تغییر کند.

***

### ۲. بخش "SELECTED WORK" — وقتی کاری برای نشان دادن نیست

نوشته: **«Games, experiments, and creative endeavors.»** — اما هر سه پروژه یا In Development هستند یا Planning یا Concept. هیچ‌کدام قابل‌بازی نیستند. کلمه «Selected Work» وقتی کاری تموم‌نشده باشد، حس portfolio را می‌دهد بدون اینکه portfolio وجود داشته باشد.

***

### ۳. بخش About — «My current skills revolve around prototyping gameplay mechanics»

> *"My current skills revolve around prototyping gameplay mechanics and analyzing gameplay systems, story, lore, and more."*

این جمله برای کسی که هنوز اولین پروژه‌اش در حال ساخت است، یک‌کم بیش از حد قوی به نظر می‌رسد. «Prototyping gameplay mechanics» به عنوان یک مهارت جا افتاده، معمولاً وقتی نمونه قابل‌دیدنی وجود داشته باشد قابل قبول است.

***

### ۴. Tech Stack — Blender

در بخش `TECH_STACK` نوشته: Unity، C#، Git، VS Code، **Blender**

اما در بخش Journey زیر `NEXT GOALS` نوشته: *«Learning basic 3D modeling, rigging, and animation with Blender»*

یعنی Blender یک **هدف آینده** است، نه مهارت فعلی. قرار دادنش در Tech Stack کنار Unity و C# گمراه‌کننده است.

***

### ۵. «Follow the journey →» لینک به Devlog خالی

دکمه «Follow the journey → Devlog» در بخش پروژه‌ها وجود دارد، اما Devlog صفر پست دارد. این یک call-to-action است که به هیچ‌جا ختم می‌شود.

***

### مواردی که توهم **نیستند** و صادقانه‌اند:

- معرفی به عنوان دانش‌آموز ۱۶ ساله در حال یادگیری ✅
- Future Vision با زبان واقع‌بینانه («I aim to...», «I plan to...») ✅
- Journey section با تفکیک «می‌دانم / دارم یاد می‌گیرم / هدف بعدی» ✅

***

### جمع‌بندی

بدترین مورد، **تناقض بین title سایت و متن Hero** است — این را حتماً باید حل کنی. بقیه موارد با اضافه شدن محتوای واقعی (یک پروژه تموم‌شده، چند پست Devlog) خودبه‌خود برطرف می‌شوند. سایت روی لبه‌ای بین «صادقانه در حال رشد» و «ادعای بیشتر از واقعیت» قرار دارد — کافی است چند تنظیم کوچک در کلمات انجام شود.