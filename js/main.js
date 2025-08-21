document.addEventListener('DOMContentLoaded', () => {
    // --- API Configuration ---
    const API_KEY = 'AIzaSyDet_RXvk9Xb1W67qxe0aoIr_iCst2qOt0';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    // --- Element Selectors ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('header nav a');

    const planSection = document.getElementById('plan');
    const practiceSection = document.getElementById('practice');
    const explanationSection = document.getElementById('explanation');
    const voiceInputSection = document.getElementById('voice-input-section');

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const newQuestionBtn = document.getElementById('new-question-btn');
    const getExplanationBtn = document.getElementById('get-explanation-btn');

    const startRecordBtn = document.getElementById('start-record-btn');
    const stopRecordBtn = document.getElementById('stop-record-btn');
    const voiceResultSpan = document.getElementById('voice-result');

    const planContent = document.getElementById('plan-content');
    const practiceContent = document.getElementById('practice-content');
    const explanationContent = document.getElementById('explanation-content');

    // --- Loader & Navigation ---
    function showLoader(container) {
        const loader = container.querySelector('.loader-container');
        if (loader) loader.style.display = 'flex';
    }

    function hideLoader(container) {
        const loader = container.querySelector('.loader-container');
        if (loader) loader.style.display = 'none';
    }

    function showSection(id) {
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // --- Gemini API Call ---
    async function callGeminiApi(prompt, contentContainer) {
        showLoader(contentContainer);
        contentContainer.innerHTML = ''; // Clear previous content

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "contents": [{ "parts": [{ "text": prompt }] }],
                    "generationConfig": {
                        "temperature": 0.7,
                        "topK": 1,
                        "topP": 1,
                        "maxOutputTokens": 2048,
                    }
                })
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorBody.error.message}`);
            }

            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;
            contentContainer.innerHTML = text; // Assumes Gemini returns safe HTML
        } catch (error) {
            console.error("Gemini API call failed:", error);
            contentContainer.innerHTML = `<p style="color: red;">Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi nanti. <br><br><i>${error.message}</i></p>`;
        } finally {
            hideLoader(contentContainer);
        }
    }

    // --- Quiz Logic ---
    const quizData = [
        // ... (quiz data remains the same)
        {
            question: "Manakah dari berikut ini yang merupakan planet terbesar di Tata Surya?",
            answers: ["Bumi", "Jupiter", "Mars", "Saturnus"],
            correct: "Jupiter"
        },
        {
            question: "Apa ibu kota dari Prancis?",
            answers: ["London", "Berlin", "Paris", "Madrid"],
            correct: "Paris"
        },
        {
            question: "Siapakah penemu bola lampu?",
            answers: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Isaac Newton"],
            correct: "Thomas Edison"
        }
    ];

    function displayQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = '';
        quizData.forEach((item, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            let answersHtml = '';
            item.answers.forEach(answer => {
                answersHtml += `<label><input type="radio" name="question${index}" value="${answer}"> ${answer}</label><br>`;
            });
            questionDiv.innerHTML = `<p><strong>${index + 1}. ${item.question}</strong></p>${answersHtml}`;
            quizContainer.appendChild(questionDiv);
        });
    }

    startQuizBtn.addEventListener('click', () => {
        displayQuiz();
        showSection('quiz');
    });

    submitQuizBtn.addEventListener('click', () => {
        let userAnswers = '';
        quizData.forEach((item, index) => {
            const selected = document.querySelector(`input[name="question${index}"]:checked`);
            userAnswers += `Pertanyaan: ${item.question} | Jawaban: ${selected ? selected.value : 'Tidak dijawab'}\n`;
        });

        const prompt = `Seorang siswa telah menyelesaikan kuis diagnostik. Berikut adalah jawaban mereka:\n${userAnswers}\nBerdasarkan jawaban ini, identifikasi gaya belajar dominan mereka (visual, auditori, atau kinestetik), kekuatan mereka, dan area untuk perbaikan. Kemudian, buat rencana pembelajaran yang dipersonalisasi dengan 3-5 langkah yang direkomendasikan. Format seluruh respons dalam HTML menggunakan tag <h3>, <p>, <ul>, dan <li>.`;

        showSection('plan');
        callGeminiApi(prompt, planContent);
    });

    // --- Feature Buttons ---
    newQuestionBtn.addEventListener('click', () => {
        const prompt = "Buatkan satu soal latihan baru (dan jawabannya) untuk siswa SMA. Topiknya bisa acak (sains, matematika, sejarah, dll.). Format sebagai HTML dengan pertanyaan dalam tag <p> dan jawaban tersembunyi yang dapat diungkap dengan sebuah tombol.";
        showSection('practice');
        callGeminiApi(prompt, practiceContent);
    });

    getExplanationBtn.addEventListener('click', () => {
        const concept = document.getElementById('concept-input').value;
        if (concept.trim() === '') {
            explanationContent.innerHTML = `<p style="color: red;">Silakan masukkan konsep.</p>`;
            return;
        }
        const prompt = `Jelaskan konsep "${concept}" untuk siswa SMA. Gunakan analogi yang sesuai untuk pelajar visual. Format respons dalam HTML menggunakan tag <h4>, <p>, dan <strong>.`;
        showSection('explanation');
        callGeminiApi(prompt, explanationContent);
        voiceInputSection.classList.remove('hidden');
    });

    // --- Voice Input (Web Speech API) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.onresult = (event) => {
            voiceResultSpan.textContent = event.results[0][0].transcript;
            stopRecordBtn.disabled = true;
            startRecordBtn.disabled = false;
        };
        recognition.onerror = (event) => {
            voiceResultSpan.textContent = 'Error pengenalan suara: ' + event.error;
        };
        startRecordBtn.addEventListener('click', () => {
            recognition.start();
            startRecordBtn.disabled = true;
            stopRecordBtn.disabled = false;
            voiceResultSpan.textContent = 'Mendengarkan...';
        });
        stopRecordBtn.addEventListener('click', () => {
            recognition.stop();
            stopRecordBtn.disabled = true;
            startRecordBtn.disabled = false;
        });
    } else {
        voiceInputSection.classList.add('hidden');
    }

    // --- Initial State ---
    showSection('hero');
});
