document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('header nav a');

    const heroSection = document.getElementById('hero');
    const quizSection = document.getElementById('quiz');
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

    // --- Navigation Logic ---
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

    // --- Quiz Simulation ---
    const quizData = [
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
                answersHtml += `
                    <label>
                        <input type="radio" name="question${index}" value="${answer}">
                        ${answer}
                    </label><br>
                `;
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
        // AI simulation: Generate a "personalized" plan
        const planContent = document.getElementById('plan-content');
        planContent.innerHTML = `
            <h3>Analisis Kinerja Anda:</h3>
            <p>Berdasarkan jawaban kuis Anda, kami telah mengidentifikasi beberapa area untuk perbaikan dan kekuatan Anda.</p>
            <ul>
                <li><strong>Gaya Belajar yang Teridentifikasi:</strong> Visual & Kinestetik.</li>
                <li><strong>Area Kekuatan:</strong> Pengetahuan Umum.</li>
                <li><strong>Area untuk Peningkatan:</strong> Sains & Sejarah.</li>
            </ul>
            <h3>Rencana yang Direkomendasikan:</h3>
            <ol>
                <li>Tonton video dokumenter tentang Sejarah Penemuan.</li>
                <li>Selesaikan modul interaktif tentang Tata Surya.</li>
                <li>Berlatih dengan 10 soal latihan baru setiap hari.</li>
            </ol>
        `;
        showSection('plan');
    });

    // --- Simulated AI Content Generation ---
    newQuestionBtn.addEventListener('click', () => {
        // AI simulation: Generate a new practice question
        const practiceContent = document.getElementById('practice-content');
        practiceContent.innerHTML = `
            <p><strong>Pertanyaan:</strong> Apa rumus kimia untuk air?</p>
            <input type="text" placeholder="Jawaban Anda">
            <button onclick="alert('Jawaban yang benar adalah H2O!')">Periksa Jawaban</button>
        `;
        showSection('practice');
    });

    getExplanationBtn.addEventListener('click', () => {
        const concept = document.getElementById('concept-input').value;
        const explanationContent = document.getElementById('explanation-content');
        if (concept.trim() === '') {
            explanationContent.innerHTML = `<p style="color: red;">Silakan masukkan konsep.</p>`;
            return;
        }
        // AI simulation: Generate an explanation
        explanationContent.innerHTML = `
            <h4>Penjelasan untuk: ${concept}</h4>
            <p><strong>Analogi Visual:</strong> Bayangkan ${concept} seperti pohon besar. Akarnya adalah prinsip-prinsip dasar, batangnya adalah ide utama, dan cabang-cabangnya adalah aplikasi yang berbeda.</p>
            <p><strong>Penjelasan Teknis:</strong> [Ini adalah penjelasan teknis terperinci tentang ${concept}, dipecah menjadi poin-poin yang dapat dicerna.]</p>
        `;
        showSection('explanation');
        // Make voice input section visible for verbal response
        voiceInputSection.classList.remove('hidden');
    });

    // --- Voice Input (Web Speech API) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'id-ID';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            voiceResultSpan.textContent = transcript;
            stopRecordBtn.disabled = true;
            startRecordBtn.disabled = false;
        };

        recognition.onerror = (event) => {
            voiceResultSpan.textContent = 'Error pengenalan suara: ' + event.error;
            stopRecordBtn.disabled = true;
            startRecordBtn.disabled = false;
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
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = true;
        voiceResultSpan.textContent = 'Pengenalan suara tidak didukung di browser ini.';
        // Hide the voice input section if not supported
        voiceInputSection.classList.add('hidden');
    }


    // --- Initial State ---
    showSection('hero');
});
