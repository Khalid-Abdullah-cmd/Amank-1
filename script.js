const langEnBtn = document.getElementById("lang-en");
const langArBtn = document.getElementById("lang-ar");

function setLanguage(lang) {
  document.documentElement.lang = lang;
  const elements = document.querySelectorAll("[data-en], [data-ar]");
  elements.forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.classList.toggle("active", card.getAttribute("data-lang") === lang);
  });

  currentQuestion = 0;
  score = 0;
  showQuestion();
}

langEnBtn.addEventListener("click", () => setLanguage("en"));
langArBtn.addEventListener("click", () => setLanguage("ar"));

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
  const lang = document.documentElement.lang || "en";
  tipText.textContent = tips[lang][Math.floor(Math.random() * tips[lang].length)];
}
loadDailyTip();

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
  const lang = document.documentElement.lang || "en";
  const q = quizQuestions[lang][currentQuestion];
  quizContainer.innerHTML = `
    <p>${q.question}</p>
    <button onclick="checkAnswer('a')">A: ${q.options.a}</button>
    <button onclick="checkAnswer('b')">B: ${q.options.b}</button>
    <button onclick="checkAnswer('c')">C: ${q.options.c}</button>
  `;
}

function checkAnswer(selected) {
  const lang = document.documentElement.lang || "en";
  const q = quizQuestions[lang][currentQuestion];
  quizFeedback.style.color = selected === q.answer ? "#00ff99" : "#ff3333";
  quizFeedback.textContent = selected === q.answer ? (lang === "en" ? "CORRECT" : "صحيح") : (lang === "en" ? "WRONG" : "خطأ");
  if (selected === q.answer) score++;
  const buttons = quizContainer.getElementsByTagName("button");
  for (let btn of buttons) btn.disabled = true;
  nextBtn.style.display = "inline-block";
  nextBtn.textContent = currentQuestion < quizQuestions[lang].length - 1 ? (lang === "en" ? "NEXT" : "التالي") : (lang === "en" ? "RESULTS" : "النتائج");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  const lang = document.documentElement.lang || "en";
  if (currentQuestion < quizQuestions[lang].length) {
    showQuestion();
  } else {
    quizContainer.innerHTML = `<p>${lang === "en" ? "SCORE" : "النتيجة"}: ${score}/${quizQuestions[lang].length}</p>`;
    nextBtn.textContent = lang === "en" ? "RESTART" : "إعادة";
    nextBtn.onclick = () => {
      currentQuestion = 0;
      score = 0;
      showQuestion();
    };
  }
});

setLanguage("en");
showQuestion();