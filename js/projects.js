/* =====================================================================
   SURESH KUMAR PORTFOLIO — YAHAN SE APNI SITE EDIT KARO
   ---------------------------------------------------------------------
   Ye file sirf aapki details aur projects ke liye hai.
   Baaki code (main.js, style.css, index.html) ko chhedne ki zarurat nahi.

   Rule: har cheez ke baad comma (,) zaroor lagao, aur text hamesha
   "double quotes" ke andar likho.
   ===================================================================== */


/* =====================================================================
   1) SITE SETTINGS — email, social links, photo, status
   ===================================================================== */
const SITE = {

  email: "editorsuresh3@gmail.com",

  instagram: "https://www.instagram.com/i.am.suresh___/",

  // LinkedIn khali ("") chhodoge to LinkedIn button hide ho jayega.
  linkedin: "https://www.linkedin.com/in/suresh-kumar-8bbb41433",

  // Apni photo (images/ folder me). Photo badalni ho to nayi file usi
  // naam se images/ folder me replace kar do, ya yahan naya naam likho.
  portrait: "images/suresh-portrait.webp",

  // Hero me chhota status text. Busy ho to badal do.
  status: "Available for new projects"
};


/* =====================================================================
   2) PROJECTS — yahin apne editing projects add karo
   ---------------------------------------------------------------------
   Har project { ... } ka ek block hai. Neeche aapke 6 projects hain.

   ► 1. NAYA PROJECT ADD KARNA
        Kisi bhi ek { ... }, block ko copy karo, uske neeche paste karo
        (comma ke saath) aur values badal do. "id" har project ka alag ho.

   ► 2. THUMBNAIL BADALNA
        thumbnail: "images/mera-thumbnail.jpg"   (file images/ folder me rakho)
        TIP: videoUrl YouTube ka ho aur thumbnail "" khali ho, to YouTube ka
        thumbnail apne aap aa jayega.

   ► 3. VIDEO LINK LAGANA
        videoUrl: "videos/meri-video.mp4"          (file videos/ folder me rakho)
        videoUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
        YouTube, Shorts, Vimeo ya .mp4 file, sab chalta hai.
        TIP: badi videos YouTube par daalo (site tez rehti hai).

   ► 4. TITLE AUR DESCRIPTION BADALNA
        title: "Mera Project"
        description: "Chhota sa description, 1-2 line."

   ► 5. PROJECT HATANA
        Pure { ... }, block ko delete kar do (comma samet).

   ► 6. FEATURED MARK KARNA
        featured: true   → bada card, sabse upar, aur hero me bhi dikhta hai
        featured: false  → normal card
        (Featured ke liye landscape/16:9 video sabse achhi lagti hai.)

   category in me se EXACT ek ho:
     "Short-form", "Long-form", "Documentary", "Personal Brand"
   (Jis category me project nahi hota, uska filter button apne aap hide ho jata hai.)

   Optional fields:
     client: "Client Name"     → client ka naam (sirf jab sach me ho)
     link:   "https://..."     → project ka alag page/link
     vertical: true            → Reels/Shorts (9:16) ke liye. Landscape ho to hata do.
   ===================================================================== */
const PROJECTS = [

  {
    id: 1,
    title: "Kinetic Typography Edit",
    category: "Short-form",
    description: "A text-driven motion piece built around typography, rhythm and pacing.",
    thumbnail: "images/kinetic-typography.jpg",
    videoUrl: "videos/kinetic-typography.mp4",
    client: "",
    services: ["Motion Graphics", "Typography", "Editing"],
    featured: true
  },

  {
    id: 2,
    title: "Editors Recap 2025 — A-Roll Edit",
    category: "Personal Brand",
    description: "A talking-head edit with captions, graphic inserts and pacing made to keep viewers watching.",
    thumbnail: "images/editors-recap-a-roll.jpg",
    videoUrl: "videos/editors-recap-a-roll.mp4",
    vertical: true,
    client: "",
    services: ["Editing", "Captions", "Motion Graphics"],
    featured: false
  },

  {
    id: 3,
    title: "Brand Promo Reel",
    category: "Short-form",
    description: "A fast-paced vertical reel with animated typography and product-focused motion graphics.",
    thumbnail: "images/brand-promo-reel.jpg",
    videoUrl: "videos/brand-promo-reel.mp4",
    vertical: true,
    client: "",
    services: ["Editing", "Motion Graphics"],
    featured: false
  },

  {
    id: 4,
    title: "Talking-Head Reel with Captions",
    category: "Personal Brand",
    description: "Clean, bold captions and tight cuts that turn raw talking-head footage into a short, watchable reel.",
    thumbnail: "images/talking-head-captions.jpg",
    videoUrl: "videos/talking-head-captions.mp4",
    vertical: true,
    client: "",
    services: ["Editing", "Captions"],
    featured: false
  },

  {
    id: 5,
    title: "Animated Captions & Icons",
    category: "Short-form",
    description: "Keyword-driven captions with animated icons and emphasis that guide the viewer through the story.",
    thumbnail: "images/animated-captions-edit.jpg",
    videoUrl: "videos/animated-captions-edit.mp4",
    vertical: true,
    client: "",
    services: ["Editing", "Motion Graphics", "Captions"],
    featured: false
  },


  // ← Naya project add karna ho to upar wale block ke baad comma lagao
  //   aur yahan naya { ... } block paste karo.

];
