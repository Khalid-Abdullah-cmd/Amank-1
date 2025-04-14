const langToggleBtn = document.getElementById("lang-toggle");
const modeToggleBtn = document.getElementById("mode-toggle");

// Set default language state (English)
let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  
  // Update all text elements using data attributes.
  const elements = document.querySelectorAll("[data-en], [data-ar]");
  elements.forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  // Only display cards matching the current language.
  document.querySelectorAll(".card").forEach(card => {
    card.classList.toggle("active", card.getAttribute("data-lang") === lang);
  });
  
  // Update the language toggle button text.
  langToggleBtn.textContent = lang === "en" ? "EN" : "AR";
  
  // Refresh tip and quiz
  loadDailyTip();
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

// Single language toggle cycles between English and Arabic.
langToggleBtn.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "ar" : "en");
});

function toggleMode() {
  document.body.classList.toggle("light-mode");
  modeToggleBtn.textContent = document.body.classList.contains("light-mode") ? "Dark Mode" : "Light Mode";
}

modeToggleBtn.addEventListener("click", toggleMode);

// Daily Tips
const tips = {
  en: [
    "Use strong, unique passwords for every account.",
    "Enable two-factor authentication wherever possible.",
    "Regularly update your software to patch vulnerabilities.",
    "Beware of phishing emails and suspicious links.",
    "Backup your data frequently to prevent loss."
  ],
  ar: [
    "استخدم كلمات مرور قوية وفريدة لكل حساب.",
    "فعّل التحقق المزدوج حيثما أمكن.",
    "حدّث برامجك بانتظام لسد الثغرات.",
    "احذر من رسائل التصيد والروابط المشبوهة.",
    "احتفظ بنسخة احتياطية لبياناتك باستمرار."
  ]
};
const tipText = document.getElementById("tipText");

function loadDailyTip() {
  tipText.textContent = tips[currentLang][Math.floor(Math.random() * tips[currentLang].length)];
}
loadDailyTip();

// Quiz Code
const quizQuestions = {
  en: [
    {
      question: "What does 'phishing' refer to?",
      options: { a: "Deceptive emails", b: "Firewall type", c: "File-deleting virus" },
      answer: "a"
    },
    {
      question: "Most secure account protection?",
      options: { a: "Same password", b: "Two-factor auth", c: "Text file passwords" },
      answer: "b"
    },
    {
      question: "Purpose of a VPN?",
      options: { a: "Slow internet", b: "Secure connection", c: "Share data" },
      answer: "b"
    },
    {
      question: "Improves cybersecurity?",
      options: { a: "Software updates", b: "Clicking links", c: "Weak passwords" },
      answer: "a"
    },
    {
      question: "What is 'malware'?",
      options: { a: "Protective software", b: "Malicious software", c: "Encryption" },
      answer: "b"
    }
  ],
  ar: [
    {
      question: "ما المقصود بـ 'التصيد'؟",
      options: { a: "رسائل خادعة", b: "نوع جدار حماية", c: "فيروس يحذف الملفات" },
      answer: "a"
    },
    {
      question: "ما هو أفضل حماية للحساب؟",
      options: { a: "كلمة مرور واحدة", b: "التحقق المزدوج", c: "حفظ كلمات المرور بنص" },
      answer: "b"
    },
    {
      question: "ما هو الهدف من VPN؟",
      options: { a: "إبطاء الإنترنت", b: "اتصال آمن", c: "مشاركة البيانات" },
      answer: "b"
    },
    {
      question: "ما الذي يحسن الأمن السيبراني؟",
      options: { a: "تحديث البرامج", b: "النقر على الروابط", c: "كلمات مرور ضعيفة" },
      answer: "a"
    },
    {
      question: "ما هو 'البرمجية الخبيثة'؟",
      options: { a: "برمجية حماية", b: "برمجية خبيثة", c: "تشفير" },
      answer: "b"
    }
  ]
};

let currentQuestion = 0;
let score = 0;
const quizContainer = document.getElementById("quizContainer");
const quizFeedback = document.getElementById("quizFeedback");
const nextBtn = document.getElementById("nextBtn");

function showQuestion() {
  quizFeedback.textContent = "";
  nextBtn.style.display = "none";
  const q = quizQuestions[currentLang][currentQuestion];
  quizContainer.innerHTML = `
    <p>${q.question}</p>
    <button onclick="checkAnswer('a')">A: ${q.options.a}</button>
    <button onclick="checkAnswer('b')">B: ${q.options.b}</button>
    <button onclick="checkAnswer('c')">C: ${q.options.c}</button>
  `;
}

function checkAnswer(selected) {
  const q = quizQuestions[currentLang][currentQuestion];
  quizFeedback.style.color = selected === q.answer ? varColor("--accent") : "#ff3333";
  quizFeedback.textContent = selected === q.answer
    ? (currentLang === "en" ? "CORRECT" : "صحيح")
    : (currentLang === "en" ? "WRONG" : "خطأ");
    
  if (selected === q.answer) score++;
  const buttons = quizContainer.getElementsByTagName("button");
  for (let btn of buttons) btn.disabled = true;
  
  nextBtn.style.display = "inline-block";
  nextBtn.textContent = currentQuestion < quizQuestions[currentLang].length - 1 
    ? (currentLang === "en" ? "NEXT" : "التالي")
    : (currentLang === "en" ? "RESULTS" : "النتائج");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizQuestions[currentLang].length) {
    showQuestion();
  } else {
    quizContainer.innerHTML = `<p>${currentLang === "en" ? "SCORE" : "النتيجة"}: ${score}/${quizQuestions[currentLang].length}</p>`;
    nextBtn.textContent = currentLang === "en" ? "RESTART" : "إعادة";
    nextBtn.onclick = () => {
      currentQuestion = 0;
      score = 0;
      showQuestion();
    };
  }
});

// Make cards clickable to open their links
document.querySelectorAll('.clickable-card').forEach(card => {
  card.addEventListener('click', function() {
    const link = this.querySelector('a');
    if (link) {
      window.open(link.href, '_blank');
    }
  });
});

// Prevent default behavior of links inside cards
document.querySelectorAll('.card a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

// Helper: Get computed value for a CSS variable.
function varColor(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

// Set the default language to English on load.
setLanguage("en");
showQuestion();
