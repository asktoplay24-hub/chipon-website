# Chipon — Personal Brand Website

เว็บไซต์ส่วนตัวของ **อชิตพล จอมไอยรา (Chipon)** สร้างด้วย Vanilla HTML / CSS / JavaScript
แยกไฟล์เป็นระบบ เพื่อให้แก้ไขและต่อยอดได้ง่ายในอนาคต

---

## 1. โครงสร้างไฟล์

```
chipon-website/
├── index.html          หน้าแรก (Hero + Featured Works)
├── about.html          หน้าแนะนำตัวและ Skills
├── portfolio.html       ผลงานทั้งหมด พร้อมระบบ Filter
├── services.html        บริการ
├── contact.html          ติดต่อ + Contact Form
├── robots.txt
├── sitemap.xml
│
├── assets/
│   ├── images/
│   │   ├── logo.png            ← แทนที่ด้วยโลโก้จริงของคุณ
│   │   ├── profile.jpg         ← แทนที่ด้วยรูปโปรไฟล์จริง
│   │   ├── og-cover.jpg        ← รูปที่แสดงเวลาแชร์ลิงก์ (Open Graph)
│   │   └── portfolio/          ← รูปปกผลงานแต่ละชิ้น
│   └── icons/
│
├── css/
│   ├── style.css        ตัวแปรสี, typography, layout หลัก
│   ├── components.css   navbar, ปุ่ม, การ์ด, ฟอร์ม
│   └── responsive.css   breakpoints (360 / 390 / 768 / 1024 / 1440px)
│
├── js/
│   ├── main.js          navbar, hamburger menu, scroll reveal
│   ├── portfolio.js     โหลดและกรองผลงานจาก portfolio.json
│   └── contact.js       ตรวจสอบฟอร์มติดต่อ (ยังไม่เชื่อม backend)
│
└── data/
    └── portfolio.json   ข้อมูลผลงานทั้งหมด (แก้ไฟล์นี้ไฟล์เดียวเวลาเพิ่มผลงาน)
```

**ไฟล์รูปทั้งหมดใน `assets/images/` ตอนนี้เป็น placeholder ที่มีข้อความกำกับไว้ชัดเจน**
(เช่น "LOGO PLACEHOLDER", "PROFILE PHOTO PLACEHOLDER") ให้แทนที่ด้วยไฟล์จริงของคุณ
โดยใช้ **ชื่อไฟล์เดิม** เพื่อไม่ต้องแก้โค้ดที่อื่น

---

## 2. วิธีเปิดเว็บไซต์ (สำคัญ)

เว็บไซต์นี้โหลดข้อมูลผลงานจาก `data/portfolio.json` ด้วย `fetch()`
ซึ่ง **เบราว์เซอร์จะบล็อกการโหลดไฟล์ JSON ถ้าเปิดไฟล์ `index.html` ตรง ๆ แบบ `file://`**
ดังนั้นต้องรันผ่าน local server เล็ก ๆ (ใช้เวลาไม่ถึงนาที):

**ตัวเลือก A — ใช้ Python (มีมากับเครื่องส่วนใหญ่):**
```bash
cd chipon-website
python3 -m http.server 8000
```
แล้วเปิดเบราว์เซอร์ไปที่ `http://localhost:8000`

**ตัวเลือก B — ใช้ VS Code:**
ติดตั้ง extension "Live Server" แล้วคลิกขวาที่ `index.html` → "Open with Live Server"

**ตัวเลือก C — ใช้ Node.js:**
```bash
npx serve chipon-website
```

---

## 3. วิธีเปลี่ยนชื่อ / ข้อมูลส่วนตัว

- **ชื่อที่แสดงในหน้าเว็บ:** แก้ข้อความใน `index.html` (ส่วน Hero) และ `about.html` (ส่วนแนะนำตัว)
- **ชื่อ Brand "Chipon":** ค้นหาคำว่า `Chipon` ในทุกไฟล์ `.html` แล้วแทนที่
- **Title / Description (SEO):** แก้ในแท็ก `<title>` และ `<meta name="description">` ที่หัวไฟล์แต่ละหน้า

---

## 4. วิธีเปลี่ยนรูป Profile และโลโก้

1. เตรียมไฟล์รูปของคุณ
2. เปลี่ยนชื่อไฟล์ให้ตรงกับที่ใช้อยู่ (หรือแก้ path ใน HTML ให้ตรงกับชื่อไฟล์ใหม่):
   - โลโก้ → `assets/images/logo.png`
   - รูปโปรไฟล์ → `assets/images/profile.jpg`
   - รูปสำหรับแชร์ลิงก์ (OG Image) → `assets/images/og-cover.jpg`
3. วางไฟล์ทับตำแหน่งเดิม

โลโก้ถูกใช้อยู่ 4 จุด: Navbar (ซ้ายบน), Footer, และเตรียมไว้เป็น favicon —
ทุกจุดควบคุมขนาดด้วย CSS (`object-fit: contain`) จึงไม่ต้องแก้ไฟล์รูปเอง

---

## 5. วิธีเพิ่มผลงานใหม่ใน Portfolio

เปิดไฟล์ `data/portfolio.json` แล้วเพิ่มออบเจกต์ใหม่ต่อจากรายการเดิม:

```json
{
  "id": 7,
  "title": "ชื่อผลงานใหม่",
  "category": "Film",
  "year": "2026",
  "image": "assets/images/portfolio/project-07.jpg",
  "description": "คำอธิบายสั้น ๆ เกี่ยวกับผลงานนี้",
  "link": "#"
}
```

- `category` ต้องเป็นหนึ่งใน: `Film`, `Photography`, `Video`, `Design`, `Other`
  (ใช้ควบคุมปุ่ม Filter ในหน้า Portfolio)
- วางรูปปกผลงานไว้ที่ `assets/images/portfolio/`
- ไม่ต้องแก้ไฟล์ HTML หรือ JavaScript ใด ๆ ระบบจะสร้างการ์ดให้อัตโนมัติ

---

## 6. วิธีเปลี่ยน Facebook / TikTok และช่องทางอื่น

ค้นหาและแทนที่ลิงก์ในไฟล์ต่อไปนี้:

- `index.html` — ส่วน Social Links ใต้ Hero
- `contact.html` — ส่วน Contact Channels

แต่ละลิงก์ตอนนี้เป็น `href="#"` พร้อมข้อความ `[ใส่ URL ภายหลัง]` —
แก้ `href="#"` เป็น URL จริงของคุณ เช่น `href="https://facebook.com/yourpage"`

เมื่อพร้อมเปิดใช้งาน YouTube หรือ Instagram ให้เพิ่มลิงก์ในตำแหน่งที่เตรียมไว้แล้ว
(มีคอมเมนต์ `<!-- เตรียมพื้นที่... -->` กำกับไว้ในโค้ด)

---

## 7. วิธีเปลี่ยนสี (Theme)

สีทั้งหมดกำหนดเป็นตัวแปรอยู่บนสุดของ `css/style.css`:

```css
:root {
  --color-bg: #0b0b0c;       /* พื้นหลังหลัก */
  --color-fg: #f2f1ed;       /* สีตัวอักษรหลัก */
  --color-accent: #ff4b3e;   /* สี Accent (เปลี่ยนเป็นน้ำเงินหรือสีอื่นได้) */
  ...
}
```

แก้ค่าตรงนี้ที่เดียว สีจะเปลี่ยนทั้งเว็บไซต์ทันที

โครงสร้างสำหรับ **Light Mode** เตรียมไว้แล้วที่ `:root[data-theme="light"]`
ในไฟล์เดียวกัน หากต้องการเปิดใช้งานในอนาคต ให้เพิ่มปุ่มสลับธีมที่แก้ค่า
`data-theme` บนแท็ก `<html>` (ปัจจุบันตั้งเป็น `"dark"` ถาวรในทุกหน้า)

---

## 8. วิธี Deploy

### GitHub Pages
1. สร้าง repository ใหม่บน GitHub แล้วอัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้
2. ไปที่ Settings → Pages
3. เลือก Branch เป็น `main` และโฟลเดอร์เป็น `/root`
4. บันทึก แล้วรอสักครู่ เว็บไซต์จะออนไลน์ที่ `https://<username>.github.io/<repo-name>/`

### Cloudflare Pages
1. เข้า Cloudflare dashboard → Pages → Create a project
2. เชื่อมต่อ GitHub repository หรืออัปโหลดไฟล์โดยตรง (Direct Upload)
3. ตั้งค่า Build command เป็นว่าง (ไม่ต้อง build) และ Output directory เป็น `/`
4. Deploy — เว็บไซต์จะออนไลน์ที่โดเมน `*.pages.dev` ทันที (สามารถผูกโดเมนของตัวเองภายหลังได้)

หลัง deploy แล้ว อย่าลืมแก้ URL ใน `sitemap.xml`, `robots.txt` และแท็ก
`canonical` / `og:url` ในทุกไฟล์ `.html` จาก `https://chipon.example.com/`
ให้เป็นโดเมนจริงของคุณ

---

## 9. แนวทางพัฒนาต่อในอนาคต

โครงสร้างปัจจุบันออกแบบไว้ให้ต่อยอดได้โดยไม่ต้องรื้อของเดิม:

- **Blog / News:** เพิ่มไฟล์ `blog.html` + `data/posts.json` ตามรูปแบบเดียวกับ Portfolio
- **Backend / Database:** เชื่อม `js/contact.js` เข้ากับ API จริง (แทนที่ส่วน `TODO: connect backend`)
- **Admin Dashboard / ระบบ Upload:** แยกเป็นแอปพลิเคชันต่างหากที่เขียนไปยัง `data/portfolio.json`
  หรือย้ายข้อมูลไปเก็บในฐานข้อมูลแล้วให้ `portfolio.js` ดึงจาก API แทนไฟล์ static
- **หลายภาษา (ไทย / English):** แยกข้อความออกมาเป็นไฟล์ `data/i18n-th.json` และ `data/i18n-en.json`
  แล้วปรับ `main.js` ให้สลับข้อความตามภาษาที่เลือก
- **ระบบค้นหา / Tag:** ต่อยอดจากระบบ Filter ที่มีอยู่ใน `portfolio.js`
- **Analytics / YouTube Integration:** เพิ่ม script แยกไฟล์ใหม่ เช่น `js/analytics.js`
  แล้วแนบใน `<head>` หรือก่อนปิด `</body>` โดยไม่กระทบไฟล์อื่น

---

## 10. หมายเหตุ

- เว็บไซต์นี้เป็น Vanilla HTML/CSS/JS ไม่มี framework หรือ build step ใด ๆ
- รองรับ `prefers-reduced-motion` — ผู้ใช้ที่ปิด animation ในระบบปฏิบัติการจะไม่เห็นแอนิเมชัน
- Contact Form ยังไม่เชื่อมต่อ backend จริง เมื่อกรอกถูกต้องและกดส่ง
  ระบบจะแสดงข้อความแจ้งว่า "ฟังก์ชันส่งข้อความจะเชื่อมต่อระบบ Backend ในอนาคต"
