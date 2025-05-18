// DOM Elements
const langToggleBtn = document.getElementById("lang-toggle");
const modeToggleBtn = document.getElementById("mode-toggle");
const tipTextElement = document.getElementById("tipText");
const refreshTipBtn = document.getElementById("refreshTipBtn");
const blogCardContainer = document.getElementById("blogCardContainer");
const courseCardContainer = document.getElementById("courseCardContainer");
const quizContainer = document.getElementById("quizContainer");
const quizFeedbackElement = document.getElementById("quizFeedback");
const nextBtn = document.getElementById("nextBtn");
const quizProgressElement = document.getElementById("quizProgress");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const currentYearElement = document.getElementById("currentYear");
const aboutModal = document.getElementById("aboutAmanakModal");
const openAboutModalBtn = document.getElementById("openAboutModal");
const closeAboutModalBtn = document.getElementById("closeAboutModal");

// --- State Variables ---
let currentLang = "en"; // Default language
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let isQuizFinished = false; // Added to manage quiz state

// --- Data ---

// Daily Tips Data
const tips = {
    en: [
        "Use strong, unique passwords with a mix of characters for every online account.",
        "Enable Two-Factor Authentication (2FA) whenever available for an extra layer of security.",
        "Regularly update your operating system, browser, and applications to patch security vulnerabilities.",
        "Be cautious of phishing emails: don't click suspicious links or download unknown attachments.",
        "Backup your important data frequently to an external drive or secure cloud storage.",
        "Secure your Wi-Fi network with a strong password and WPA3 encryption if possible.",
        "Be mindful of what you share on social media; adjust privacy settings accordingly.",
        "Use a VPN (Virtual Private Network) when connecting to public Wi-Fi to encrypt your traffic.",
        "Install reputable antivirus and anti-malware software and keep it updated.",
        "Educate yourself and your family about common online threats and safe practices."
    ],
    ar: [
        "استخدم كلمات مرور قوية وفريدة مع مزيج من الأحرف لكل حساب على الإنترنت.",
        "قم بتمكين المصادقة الثنائية (2FA) كلما أمكن ذلك لطبقة إضافية من الأمان.",
        "قم بتحديث نظام التشغيل والمتصفح والتطبيقات بانتظام لسد الثغرات الأمنية.",
        "كن حذرًا من رسائل التصيد الاحتيالي: لا تنقر على الروابط المشبوهة أو تنزل المرفقات غير المعروفة.",
        "قم بعمل نسخة احتياطية من بياناتك المهمة بشكل متكرر على محرك أقراص خارجي أو تخزين سحابي آمن.",
        "قم بتأمين شبكة Wi-Fi الخاصة بك بكلمة مرور قوية وتشفير WPA3 إذا أمكن.",
        "انتبه لما تشاركه على وسائل التواصل الاجتماعي؛ اضبط إعدادات الخصوصية وفقًا لذلك.",
        "استخدم VPN (شبكة افتراضية خاصة) عند الاتصال بشبكة Wi-Fi عامة لتشفير حركة المرور الخاصة بك.",
        "قم بتثبيت برامج مكافحة فيروسات وبرامج ضارة ذات سمعة جيدة وحافظ على تحديثها.",
        "ثقف نفسك وعائلتك حول التهديدات الشائعة عبر الإنترنت والممارسات الآمنة."
    ]
};

// Resource Data (Blogs & Courses)
const resources = {
    blogs: {
        en: [
            { title: "Online Safety Tips for Parents", description: "Learn how to keep your children safe from online dangers with these essential tips.", url: "https://www.unicef.org/jordan/ar/%D9%86%D8%B5%D8%A7%D8%A6%D8%AD-%D9%84%D8%A3%D9%88%D9%84%D9%8A%D8%A7%D8%A1-%D8%A7%D9%84%D8%A3%D9%85%D9%88%D8%B1-%D9%84%D9%84%D8%AD%D9%81%D8%A7%D8%B8-%D8%B9%D9%84%D9%89-%D8%B3%D9%84%D8%A7%D9%85%D8%A9-%D8%A3%D8%B7%D9%81%D8%A7%D9%84%D9%87%D9%85-%D8%B9%D8%A8%D8%B1-%D8%A7%D9%84%D8%A5%D9%86%D8%AA%D8%B1%D9%86%D8%AA/%D8%AD%D9%85%D8%A7%D9%8A%D8%A9-%D8%A7%D9%84%D8%B7%D9%81%D9%84" },
            { title: "What is Social Engineering?", description: "Understand common social engineering tactics and how to protect yourself from manipulation.", url: "https://www.annajah.net/%D8%A7%D9%84%D9%87%D9%86%D8%AF%D8%B3%D8%A9-%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A%D8%A9-%D9%85%D9%81%D9%87%D9%88%D9%85%D9%87%D8%A7-%D9%88%D9%85%D8%AE%D8%A7%D8%B7%D8%B1%D9%87%D8%A7-%D9%88%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%A7%D9%84%D8%AD%D9%85%D8%A7%D9%8A%D8%A9-%D9%85%D9%86%D9%87%D8%A7-article-39468" },
            { title: "How to Protect Your Phone from Hacking", description: "Actionable tips to make your smartphone as secure as a fortress against hackers.", url: "https://www.bayut.com/mybayut/ar/%D8%AD%D9%85%D8%A7%D9%8A%D8%A9-%D8%A7%D9%84%D9%87%D8%A7%D8%AA%D9%81-%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D8%B1%D8%A7%D9%82/" },
            { title: "Beginner's Guide to Cybersecurity", description: "A comprehensive post by Eng. Ibrahim Hejazi to guide you from the very first step into the field.", url: "https://www.facebook.com/Zigoo.eg/posts/pfbid02aKHYFph2kh3V1En2xi8jPNUDBmpsRnYssrnwCKXuNDhFX5PAScBduZeZDWhqL2XCl?_rdc=1&_rdr" }
        ],
        ar: [
            { title: "نصائح للآباء لحماية أبنائهم على الإنترنت", description: "تعلم كيف تحافظ على سلامة أطفالك من مخاطر الإنترنت بهذه النصائح الأساسية.", url: "https://www.unicef.org/jordan/ar/%D9%86%D8%B5%D8%A7%D8%A6%D8%AD-%D9%84%D8%A3%D9%88%D9%84%D9%8A%D8%A7%D8%A1-%D8%A7%D9%84%D8%A3%D9%85%D9%88%D8%B1-%D9%84%D9%84%D8%AD%D9%81%D8%A7%D8%B8-%D8%B9%D9%84%D9%89-%D8%B3%D9%84%D8%A7%D9%85%D8%A9-%D8%A3%D8%B7%D9%81%D8%A7%D9%84%D9%87%D9%85-%D8%B9%D8%A8%D8%B1-%D8%A7%D9%84%D8%A5%D9%86%D8%AA%D8%B1%D9%86%D8%AA/%D8%AD%D9%85%D8%A7%D9%8A%D8%A9-%D8%A7%D9%84%D8%B7%D9%81%D9%84" },
            { title: "ما هي الهندسة الاجتماعية؟", description: "افهم تكتيكات الهندسة الاجتماعية الشائعة وكيف تحمي نفسك من التلاعب.", url: "https://www.annajah.net/%D8%A7%D9%84%D9%87%D9%86%D8%AF%D8%B3%D8%A9-%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A%D8%A9-%D9%85%D9%81%D9%87%D9%88%D9%85%D9%87%D8%A7-%D9%88%D9%85%D8%AE%D8%A7%D8%B7%D8%B1%D9%87%D8%A7-%D9%88%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%A7%D9%84%D8%AD%D9%85%D8%A7%D9%8A%D8%A9-%D9%85%D9%86%D9%87%D8%A7-article-39468" },
            { title: "كيف تحمي هاتفك من الاختراق", description: "نصائح عملية لجعل هاتفك الذكي حصنًا منيعًا ضد المخترقين.", url: "https://www.bayut.com/mybayut/ar/%D8%AD%D9%85%D8%A7%D9%8A%D8%A9-%D8%A7%D9%84%D9%87%D8%A7%D8%AA%D9%81-%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D8%B1%D8%A7%D9%82/" },
            { title: "كيف تبدأ في مجال الأمن السيبراني", description: "منشور شامل من م. إبراهيم حجازي ليرشدك من الخطوة الأولى في هذا المجال.", url: "https://www.facebook.com/Zigoo.eg/posts/pfbid02aKHYFph2kh3V1En2xi8jPNUDBmpsRnYssrnwCKXuNDhFX5PAScBduZeZDWhqL2XCl?_rdc=1&_rdr" }
        ]
    },
    courses: {
        en: [
            { title: "CyberSecurity for Everyone by ITI Mahara Tech", description: "Learn cybersecurity basics with this free introductory course from Mahara Tech.", url: "https://maharatech.gov.eg/mod/page/view.php?id=14091" },
            { title: "Junior CyberSecurity Analyst Path by Cisco", description: "Kickstart your cybersecurity career with Cisco’s comprehensive pathway for aspiring analysts.", url: "https://www.netacad.com/career-paths/cybersecurity?courseLang=en-US" },
            { title: "Professor Messer’s CompTIA Security+ SY0-701", description: "Free, high-quality video course to prepare for the CompTIA Security+ certification exam.", url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/" },
            { title: "Harvard CS50’s Cybersecurity Course", description: "Explore cybersecurity principles with this engaging and informative course from Harvard University.", url: "https://cs50.harvard.edu/cybersecurity/2023/" }
        ],
        ar: [
            { title: "الأمن السيبراني للجميع من ITI مهارة تك", description: "تعلم أساسيات الأمن السيبراني مع هذه الدورة التمهيدية المجانية من مهارة تك.", url: "https://maharatech.gov.eg/mod/page/view.php?id=14091" },
            { title: "مسار محلل الأمن السيبراني المبتدئ من سيسكو", description: "ابدأ حياتك المهنية في الأمن السيبراني مع مسار سيسكو الشامل للمحللين الطموحين.", url: "https://www.netacad.com/career-paths/cybersecurity?courseLang=en-US" },
            { title: "دورة بروفيسور ميسر لـ Security+ SY0-701", description: "دورة فيديو مجانية عالية الجودة للتحضير لامتحان شهادة CompTIA Security+.", url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/" },
            { title: "دورة هارفارد CS50 في الأمن السيبراني", description: "استكشف مبادئ الأمن السيبراني مع هذه الدورة الجذابة والمفيدة من جامعة هارفارد.", url: "https://cs50.harvard.edu/cybersecurity/2023/" }
        ]
    }
};

// Quiz Questions Data
const quizQuestions = {
    en: [
        {
            question: "What is 'phishing' primarily aimed at stealing?",
            options: { a: "Computer processing power", b: "Sensitive information like passwords", c: "Internet bandwidth" },
            answer: "b",
            explanation: "Phishing attacks use deceptive emails or websites to trick users into revealing personal data, such as login credentials or credit card numbers."
        },
        {
            question: "Which of these is the strongest type of password?",
            options: { a: "Your pet's name: 'Fluffy123'", b: "A long phrase: 'CorrectHorseBatteryStaple!'", c: "A common word: 'password'" },
            answer: "b",
            explanation: "Long, complex passphrases are much harder to crack than simple passwords or those based on easily guessable information."
        },
        {
            question: "What is the main purpose of a firewall?",
            options: { a: "To speed up your internet", b: "To block unauthorized network access", c: "To clean viruses from your computer" },
            answer: "b",
            explanation: "A firewall acts as a barrier between your internal network (or computer) and external networks, controlling incoming and outgoing traffic based on security rules."
        },
        {
            question: "What does 'HTTPS' at the beginning of a website URL indicate?",
            options: { a: "The website is interactive", b: "The website has high-definition content", c: "The connection to the website is encrypted and secure" },
            answer: "c",
            explanation: "HTTPS (HyperText Transfer Protocol Secure) means that data exchanged between your browser and the website is encrypted, protecting it from eavesdroppers."
        },
        {
            question: "What is 'malware' a short term for?",
            options: { a: "Malfunctioning hardware", b: "Malicious software", c: "Maximum allowance" },
            answer: "b",
            explanation: "Malware is any software intentionally designed to cause damage to a computer, server, client, or computer network. Examples include viruses, ransomware, and spyware."
        }
    ],
    ar: [
        {
            question: "ما هو الهدف الأساسي من 'التصيد الاحتيالي'؟",
            options: { a: "سرقة قوة معالجة الكمبيوتر", b: "سرقة معلومات حساسة مثل كلمات المرور", c: "سرقة عرض النطاق الترددي للإنترنت" },
            answer: "b",
            explanation: "تستخدم هجمات التصيد رسائل بريد إلكتروني أو مواقع ويب خادعة لحمل المستخدمين على الكشف عن بيانات شخصية، مثل بيانات تسجيل الدخول أو أرقام بطاقات الائتمان."
        },
        {
            question: "أي من هذه تعتبر أقوى أنواع كلمات المرور؟",
            options: { a: "اسم حيوانك الأليف: 'Fluffy123'", b: "عبارة طويلة: '!CorrectHorseBatteryStaple'", c: "كلمة شائعة: 'password'" },
            answer: "b",
            explanation: "عبارات المرور الطويلة والمعقدة أصعب بكثير في الاختراق من كلمات المرور البسيطة أو تلك التي تعتمد على معلومات يمكن تخمينها بسهولة."
        },
        {
            question: "ما هو الغرض الرئيسي لجدار الحماية (Firewall)؟",
            options: { a: "لتسريع الإنترنت الخاص بك", b: "لمنع الوصول غير المصرح به للشبكة", c: "لتنظيف الفيروسات من جهاز الكمبيوتر الخاص بك" },
            answer: "b",
            explanation: "يعمل جدار الحماية كحاجز بين شبكتك الداخلية (أو جهاز الكمبيوتر) والشبكات الخارجية، ويتحكم في حركة المرور الواردة والصادرة بناءً على قواعد الأمان."
        },
        {
            question: "ماذا يشير 'HTTPS' في بداية عنوان URL لموقع الويب؟",
            options: { a: "الموقع تفاعلي", b: "الموقع يحتوي على محتوى عالي الدقة", c: "الاتصال بالموقع مشفر وآمن" },
            answer: "c",
            explanation: "HTTPS (بروتوكول نقل النص التشعبي الآمن) يعني أن البيانات المتبادلة بين متصفحك والموقع الإلكتروني مشفرة، مما يحميها من المتلصصين."
        },
        {
            question: "ما هو المصطلح المختصر لـ 'البرامج الضارة' (malware)؟",
            options: { a: "عطل في الأجهزة", b: "برامج خبيثة", c: "الحد الأقصى المسموح به" },
            answer: "b",
            explanation: "البرامج الضارة هي أي برنامج مصمم عمدًا لإلحاق الضرر بجهاز كمبيوتر أو خادم أو عميل أو شبكة كمبيوتر. تشمل الأمثلة الفيروسات وبرامج الفدية وبرامج التجسس."
        }
    ]
};

// Password Checker Messages
const passwordMessages = {
    en: {
        strength: ["Weak", "Medium", "Strong"],
        tips: {
            length: "Use at least 8 characters",
            uppercase: "Include uppercase letters",
            lowercase: "Include lowercase letters",
            number: "Include numbers",
            special: "Include special characters"
        },
        empty: "Please enter a password"
    },
    ar: {
        strength: ["ضعيف", "متوسط", "قوي"],
        tips: {
            length: "استخدم 8 أحرف على الأقل",
            uppercase: "قم بتضمين أحرف كبيرة",
            lowercase: "قم بتضمين أحرف صغيرة",
            number: "قم بتضمين أرقام",
            special: "قم بتضمين أحرف خاصة"
        },
        empty: "الرجاء إدخال كلمة مرور"
    }
};

// --- Functions ---

/**
 * Sets the language for the website.
 * @param {string} lang - The language code ('en' or 'ar').
 */
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // Update text for all elements with data attributes
    const elements = document.querySelectorAll("[data-en], [data-ar]");
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) { // Ensure attribute exists
            // For buttons with specific aria-label structures
            if (el.id === 'lang-toggle' || el.id === 'mode-toggle') {
                const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
                let labelKey = `data-${lang}-label`;
                if (el.id === 'mode-toggle') {
                    labelKey = `data-${lang}-label-${mode}`;
                }
                const ariaLabelText = el.getAttribute(labelKey);
                if(ariaLabelText) el.setAttribute("aria-label", ariaLabelText);
            }
            // For general text content
            if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'STRONG' || el.tagName === 'SPAN' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'P') {
                 el.textContent = text;
            }
        }
    });

    // Update language toggle button text and ARIA label
    langToggleBtn.textContent = lang === "en" ? "AR" : "EN"; // Show the *other* language
    const langToggleLabelKey = lang === "en" ? `data-en-label` : `data-ar-label`;
    langToggleBtn.setAttribute("aria-label", langToggleBtn.getAttribute(langToggleLabelKey) || (lang === "en" ? "Switch to Arabic" : "Switch to English"));

    // Update mode toggle button ARIA label based on current mode and new language
    const isLightMode = document.body.classList.contains("light-mode");
    const modeToggleLabelKey = `data-${lang}-label-${isLightMode ? 'light' : 'dark'}`;
    modeToggleBtn.setAttribute("aria-label", modeToggleBtn.getAttribute(modeToggleLabelKey) || (isLightMode ? (lang === "en" ? "Switch to Dark Mode" : "التحول إلى الوضع الداكن") : (lang === "en" ? "Switch to Light Mode" : "التحول إلى الوضع الفاتح")));

    // Update password input placeholder
    const passwordInput = document.getElementById("passwordInput");
    if (passwordInput) {
        passwordInput.placeholder = lang === "en" ? passwordInput.getAttribute("data-en-placeholder") : passwordInput.getAttribute("data-ar-placeholder");
    }
    const passwordFeedbackElement = document.getElementById("passwordFeedback");
    if (passwordFeedbackElement) {
        passwordFeedbackElement.innerHTML = "";
    }

    // Refresh dynamic content
    loadDailyTip();
    populateCards('blogs', blogCardContainer);
    populateCards('courses', courseCardContainer);
    startQuiz(); // Restart quiz with new language
}

/**
 * Toggles between dark and light mode.
 */
function toggleMode() {
    document.body.classList.toggle("light-mode");
    const isLightMode = document.body.classList.contains("light-mode");
    modeToggleBtn.textContent = isLightMode ? (currentLang === "en" ? "Dark Mode" : "الوضع الداكن") : (currentLang === "en" ? "Light Mode" : "الوضع الفاتح");

    // Update ARIA label for mode toggle button
    const labelKey = `data-${currentLang}-label-${isLightMode ? 'light' : 'dark'}`;
    modeToggleBtn.setAttribute("aria-label", modeToggleBtn.getAttribute(labelKey) || (isLightMode ? (currentLang === "en" ? "Switch to Dark Mode" : "التحول إلى الوضع الداكن") : (currentLang === "en" ? "Switch to Light Mode" : "التحول إلى الوضع الفاتح")));

    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

/**
 * Loads a random daily tip based on the current language.
 */
function loadDailyTip() {
    if (tipTextElement) {
        const langTips = tips[currentLang];
        const randomIndex = Math.floor(Math.random() * langTips.length);
        tipTextElement.textContent = langTips[randomIndex];
        tipTextElement.classList.add('fade-in');
        setTimeout(() => tipTextElement.classList.remove('fade-in'), 500);
    }
}

/**
 * Populates a container with cards from the resources data.
 * @param {string} type - 'blogs' or 'courses'.
 * @param {HTMLElement} container - The container element to populate.
 */
function populateCards(type, container) {
    if (!container) return;
    container.innerHTML = ""; // Clear existing cards
    const cardData = resources[type][currentLang];
    const linkText = currentLang === "en" ? "Read More" : "اقرأ المزيد";
    if (type === 'courses') {
       // linkText = currentLang === "en" ? "View Course" : "عرض الدورة"; // Example if different text needed
    }

    cardData.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.url}" class="card-link styled-button" target="_blank" rel="noopener noreferrer">${linkText}</a>
        `;
        container.appendChild(card);
    });
}

/**
 * Shuffles an array in place.
 * @param {Array} array - The array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Starts or restarts the quiz.
 */
function startQuiz() {
    isQuizFinished = false; // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    shuffledQuestions = [...quizQuestions[currentLang]]; // Create a new copy to shuffle
    shuffleArray(shuffledQuestions);
    showQuestion();
    updateQuizProgress();
    nextBtn.textContent = currentLang === "en" ? "NEXT" : "التالي";
    quizFeedbackElement.innerHTML = ""; // Clear previous feedback
}

/**
 * Displays the current quiz question.
 */
function showQuestion() {
    quizFeedbackElement.innerHTML = ""; // Clear feedback from previous question
    nextBtn.style.display = "none";

    if (currentQuestionIndex < shuffledQuestions.length) {
        const q = shuffledQuestions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <p>${q.question}</p>
            ${Object.entries(q.options).map(([key, value]) => `
                <button class="quiz-option-btn" data-answer="${key}">
                    <span class="option-key">${key.toUpperCase()}:</span> ${value}
                </button>
            `).join('')}
        `;
        // Add event listeners to new buttons
        quizContainer.querySelectorAll(".quiz-option-btn").forEach(button => {
            button.addEventListener("click", () => checkAnswer(button.dataset.answer));
        });
    } else {
        showResults();
    }
    updateQuizProgress();
}

/**
 * Checks the selected answer against the correct answer.
 * @param {string} selectedOptionKey - The key of the selected option (e.g., 'a', 'b').
 */
function checkAnswer(selectedOptionKey) {
    const q = shuffledQuestions[currentQuestionIndex];
    const buttons = quizContainer.querySelectorAll(".quiz-option-btn");
    let correct = false;

    buttons.forEach(button => {
        button.disabled = true; // Disable all buttons after an answer
        if (button.dataset.answer === q.answer) {
            button.classList.add("correct"); // Highlight correct answer
        }
        if (button.dataset.answer === selectedOptionKey) {
            if (selectedOptionKey === q.answer) {
                button.classList.add("correct");
                correct = true;
            } else {
                button.classList.add("incorrect"); // Highlight selected incorrect answer
            }
        }
    });

    if (correct) {
        score++;
        quizFeedbackElement.innerHTML = `
            <div class="feedback-text correct">${currentLang === "en" ? "CORRECT!" : "إجابة صحيحة!"}</div>
            <div class="explanation">${q.explanation}</div>
        `;
    } else {
        quizFeedbackElement.innerHTML = `
            <div class="feedback-text incorrect">${currentLang === "en" ? "WRONG!" : "إجابة خاطئة!"}</div>
            <div class="explanation">${currentLang === "en" ? "The correct answer was " : "كانت الإجابة الصحيحة "} <strong>${q.options[q.answer]}</strong>. ${q.explanation}</div>
        `;
    }

    nextBtn.style.display = "inline-block";
    if (currentQuestionIndex >= shuffledQuestions.length - 1) {
        nextBtn.textContent = currentLang === "en" ? "SHOW RESULTS" : "عرض النتائج";
    } else {
        nextBtn.textContent = currentLang === "en" ? "NEXT" : "التالي";
    }
    nextBtn.focus();
}

/**
 * Handles moving to the next question or showing results.
 */
function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

/**
 * Displays the final quiz results.
 */
function showResults() {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    let resultMessage = "";
    if (currentLang === "en") {
        resultMessage = `You scored ${score} out of ${shuffledQuestions.length} (${percentage}%).`;
        if (percentage >= 80) resultMessage += " Excellent work!";
        else if (percentage >= 50) resultMessage += " Good job, keep learning!";
        else resultMessage += " Keep practicing to improve your cybersecurity knowledge!";
    } else {
        resultMessage = `لقد حصلت على ${score} من ${shuffledQuestions.length} (${percentage}%).`;
        if (percentage >= 80) resultMessage += " عمل ممتاز!";
        else if (percentage >= 50) resultMessage += " عمل جيد، استمر في التعلم!";
        else resultMessage += " استمر في الممارسة لتحسين معرفتك بالأمن السيبراني!";
    }

    quizContainer.innerHTML = `<p class="quiz-final-score">${resultMessage}</p>`;
    quizFeedbackElement.innerHTML = ""; // Clear any previous question feedback
    nextBtn.textContent = currentLang === "en" ? "RESTART QUIZ" : "إعادة الاختبار";
    nextBtn.style.display = "inline-block";
    isQuizFinished = true; // Indicate quiz is finished
    quizProgressElement.textContent = currentLang === "en" ? "Quiz Complete!" : "اكتمل الاختبار!";
}

/**
 * Updates the quiz progress display.
 */
function updateQuizProgress() {
    if (currentQuestionIndex < shuffledQuestions.length) {
        quizProgressElement.textContent = `${currentLang === "en" ? "Question" : "السؤال"} ${currentQuestionIndex + 1} ${currentLang === "en" ? "of" : "من"} ${shuffledQuestions.length}`;
    }
}

/**
 * Handles scrolling to the top of the page.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Shows or hides the "Scroll to Top" button based on scroll position.
 */
function handleScroll() {
    if (window.pageYOffset > 200) { // Show button after scrolling 200px
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
}

/**
 * Checks the strength of the entered password and provides feedback.
 */
function checkPasswordStrength() {
    const passwordInput = document.getElementById("passwordInput");
    const passwordFeedbackElement = document.getElementById("passwordFeedback");
    const password = passwordInput.value;

    if (!password) {
        passwordFeedbackElement.innerHTML = `<p class="error">${passwordMessages[currentLang].empty}</p>`;
        return;
    }

    const criteria = [
        { regex: /.{8,}/, message: "length" },
        { regex: /[A-Z]/, message: "uppercase" },
        { regex: /[a-z]/, message: "lowercase" },
        { regex: /\d/, message: "number" },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, message: "special" }
    ];

    let metCriteria = 0;
    const tips = [];
    criteria.forEach(criterion => {
        if (criterion.regex.test(password)) {
            metCriteria++;
        } else {
            tips.push(passwordMessages[currentLang].tips[criterion.message]);
        }
    });

    let strengthIndex;
    if (metCriteria <= 2) strengthIndex = 0; // Weak
    else if (metCriteria <= 4) strengthIndex = 1; // Medium
    else strengthIndex = 2; // Strong

    const strengthText = passwordMessages[currentLang].strength[strengthIndex];
    const strengthClass = ["weak", "medium", "strong"][strengthIndex];

    let feedbackHTML = `<p class="strength ${strengthClass}">${strengthText}</p>`;
    if (tips.length > 0) {
        feedbackHTML += `<ul class="tips">`;
        tips.forEach(tip => {
            feedbackHTML += `<li>${tip}</li>`;
        });
        feedbackHTML += `</ul>`;
    }
    passwordFeedbackElement.innerHTML = feedbackHTML;
}

/**
 * Initializes the website.
 */
function init() {
    // Set current year in footer
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Event Listeners
    langToggleBtn.addEventListener("click", () => {
        setLanguage(currentLang === "en" ? "ar" : "en");
    });
    modeToggleBtn.addEventListener("click", toggleMode);
    if (refreshTipBtn) {
      refreshTipBtn.addEventListener("click", loadDailyTip);
    }
    nextBtn.addEventListener("click", () => {
        if (isQuizFinished) {
            startQuiz();
        } else {
            handleNextQuestion();
        }
    });
    scrollToTopBtn.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", handleScroll);

    // Password Checker Event Listener
    const checkPasswordBtn = document.getElementById("checkPasswordBtn");
    if (checkPasswordBtn) {
        checkPasswordBtn.addEventListener("click", checkPasswordStrength);
    }

    // Modal listeners
    if (openAboutModalBtn && aboutModal && closeAboutModalBtn) {
        openAboutModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aboutModal.classList.add('active');
            aboutModal.setAttribute('aria-hidden', 'false');
            closeAboutModalBtn.focus(); // Focus on close button for accessibility
        });
        closeAboutModalBtn.addEventListener('click', () => {
            aboutModal.classList.remove('active');
            aboutModal.setAttribute('aria-hidden', 'true');
            openAboutModalBtn.focus(); // Return focus to the button that opened it
        });
        // Close modal on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
                aboutModal.classList.remove('active');
                aboutModal.setAttribute('aria-hidden', 'true');
                openAboutModalBtn.focus();
            }
        });
        // Close modal on outside click
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                 aboutModal.classList.remove('active');
                 aboutModal.setAttribute('aria-hidden', 'true');
                 openAboutModalBtn.focus();
            }
        });
    }

    // Load persisted theme
    const persistedTheme = localStorage.getItem('theme');
    if (persistedTheme === 'light' && !document.body.classList.contains('light-mode')) {
        toggleMode(); // Apply light mode if persisted and not already set
    } else if (persistedTheme === 'dark' && document.body.classList.contains('light-mode')) {
        toggleMode(); // Apply dark mode if persisted and light mode is set (e.g. from CSS default)
    } else {
        // Default: ensure button text matches initial state if no persisted theme or matches default
        const isLightMode = document.body.classList.contains("light-mode");
        modeToggleBtn.textContent = isLightMode ? (currentLang === "en" ? "Dark Mode" : "الوضع الداكن") : (currentLang === "en" ? "Light Mode" : "الوضع الفاتح");
    }

    // Initial content load
    setLanguage(currentLang); // This will also call loadDailyTip, populateCards, and startQuiz
}

// --- Initialize ---
document.addEventListener("DOMContentLoaded", init);
