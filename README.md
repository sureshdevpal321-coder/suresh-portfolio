# Suresh Kumar — Portfolio Website (Final)

Simple website: HTML + CSS + JavaScript. Koi paid cheez nahi, koi install nahi.
GitHub Pages par free me publish hoti hai, aur poora control hamesha aapke paas rehta hai.

## Folder me kya hai

```
suresh-portfolio/
├── index.html          ← website ka structure (text/sections)
├── css/style.css       ← design, colours, fonts
├── js/projects.js      ← ★ AAPKI FILE: email, links, photo, projects
├── js/main.js          ← website ka logic (ise chhedna nahi hai)
├── images/             ← aapki photo + project thumbnails
└── videos/             ← aapke 6 project videos (.mp4)
```

Roz ka kaam sirf **`js/projects.js`** me hota hai.

---

## A) Website PEHLI BAAR publish karna (GitHub Pages, free)

1. [github.com](https://github.com) par free account banao (Sign up).
2. Upar right me **+ → New repository** dabao.
   - Repository name: `portfolio` (ya `suresh-kumar`)
   - **Public** chuno
   - **Create repository** dabao
3. Naye page par **"uploading an existing file"** link dabao.
4. Is folder ke andar ki **saari cheezein** drag karke daalo:
   `index.html`, `README.md`, aur folders `css`, `js`, `images`, `videos`.
   (Folder ke andar ki files drag karo, upar wala `suresh-portfolio` folder nahi.)
5. Upload poora hone do (videos ki wajah se 1-3 minute lag sakte hain) → **Commit changes** dabao.
6. Repository ki **Settings → Pages** kholo.
   - *Source*: **Deploy from a branch**
   - *Branch*: **main**, folder **/ (root)** → **Save**
7. 1-2 minute baad wahi page refresh karo. Upar site ka link dikhega:
   `https://aapka-username.github.io/portfolio/`
   Ye link apne Instagram bio aur LinkedIn me laga do.

> Tip: agar upload me error aaye to files ko 2-3 hisso me upload karo (pehle `index.html`, `css`, `js`, `images`, phir `videos`). GitHub browser upload me ek file 25 MB se chhoti honi chahiye, aapki sabse badi video ~10 MB hai, to koi dikkat nahi.

## B) Baad me update karna

- **Text / project badalna:** repository me `js/projects.js` kholo → ✏️ (edit) → badlav → **Commit changes**. 1-2 minute me site update.
- **Nayi video ya image daalni ho:** us folder (`videos` ya `images`) me jao → **Add file → Upload files** → upload karo → Commit.

---

## C) `js/projects.js` me kya badalna hai

### Upar `SITE` part
| Kya | Field | Abhi |
|---|---|---|
| Email | `email` | editorsuresh3@gmail.com |
| Instagram | `instagram` | i.am.suresh___ |
| LinkedIn | `linkedin` | suresh-kumar-8bbb41433 (khali ho to button hide) |
| Apni photo | `portrait` | `images/suresh-portrait.webp` |
| Status text | `status` | "Available for new projects" |

### Projects (`PROJECTS` list)
Har project aisa dikhta hai:

```js
{
  id: 7,
  title: "Mera Naya Project",
  category: "Short-form",
  description: "1-2 line description.",
  thumbnail: "images/naya.jpg",
  videoUrl: "videos/naya.mp4",
  vertical: true,
  client: "",
  services: ["Editing", "Captions"],
  featured: false
},
```

| Kaam | Kaise |
|---|---|
| **Naya project** | Koi block copy karo, neeche paste karo, `id` naya rakho |
| **Thumbnail** | `thumbnail:` me `images/` ka path. Khali ho aur video YouTube ka ho to apne aap aata hai |
| **Video** | `videoUrl:` me `videos/file.mp4` ya YouTube/Vimeo link |
| **Title / Description** | `title:` aur `description:` (abhi ke titles/descriptions sample jaise hain, apne hisaab se badlo) |
| **Project hatana** | Pura `{ ... },` block delete karo |
| **Featured** | `featured: true` (landscape video ho to bada card + hero me dikhta hai) |
| **Category** | Exact: `"Short-form"`, `"Long-form"`, `"Documentary"`, `"Personal Brand"` |
| **Vertical (Reels/Shorts)** | `vertical: true`; landscape video ho to hata do |
| **Client / Link** | `client: "Naam"`, `link: "https://..."` (sirf jab sach me ho) |

Jis category me koi project nahi, uska filter button apne aap hide ho jata hai.

Rule: har `{ }` block ke baad comma `,` aur text `"double quotes"` me.

## D) Videos ke baare me

- Abhi videos site ke andar `videos/` folder me hain (web ke liye compress ki hui).
- Zyada ya badi videos daalni ho to **YouTube par upload karo** (Unlisted bhi chalega) aur link `videoUrl` me paste karo. Isse site tez rehti hai.
- GitHub me ek repository ~1 GB tak ki site ke liye theek hai, par badi files se site slow ho jati hai.

## E) Computer par preview

`index.html` double-click karne par design aur filters dikhte hain, aur local videos bhi chal jati hain. YouTube links `file://` par nahi chalte, wo sirf publish ke baad chalenge.

## F) Design badalna (optional)

Colours `css/style.css` ke upar `:root { ... }` me hain. Headline, About, Services ka text `index.html` me hai.
