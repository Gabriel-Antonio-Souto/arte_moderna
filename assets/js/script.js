// Ativa o Navbar quando o usuário rola a página
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('#mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Suavização do scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lógica do Quiz
const quizQuestions = [
    {
        question: "Qual foi o marco inicial do Modernismo no Brasil?",
        options: ["A Proclamação da República", "A Semana de Arte Moderna de 1922", "A Invasão Holandesa", "A chegada da Família Real"],
        answer: "A Semana de Arte Moderna de 1922"
    },
    {
        question: "Qual pintor(a) brasileiro(a) é considerado(a) o(a) grande nome da antropofagia com a obra 'Abaporu'?",
        options: ["Di Cavalcanti", "Cândido Portinari", "Anita Malfatti", "Tarsila do Amaral"],
        answer: "Tarsila do Amaral"
    },
    {
        question: "Oswald de Andrade é o autor do 'Manifesto Antropófago'. O que ele defendia?",
        options: ["A importação de todas as ideias europeias", "A completa rejeição de culturas estrangeiras", "A 'deglutição' das culturas estrangeiras para criar uma arte nacional", "A arte como uma cópia fiel da natureza"],
        answer: "A 'deglutição' das culturas estrangeiras para criar uma arte nacional"
    },
    {
        question: "Qual das obras abaixo é de Mário de Andrade e é considerada uma 'rapsódia' da identidade brasileira?",
        options: ["Vidas Secas", "Macunaíma", "O Cortiço", "Obras Poéticas"],
        answer: "Macunaíma"
    },
    {
        question: "A segunda fase do Modernismo no Brasil é conhecida por focar em temas de qual natureza?",
        options: ["Mitologia e fantasia", "Apenas poesia e sonetos", "Questões sociais e regionalismo", "Tecnologia e ficção científica"],
        answer: "Questões sociais e regionalismo"
    },
    {
        question: "Quem é o autor de 'Vidas Secas', um dos grandes romances regionalistas da segunda fase modernista?",
        options: ["Carlos Drummond de Andrade", "Graciliano Ramos", "João Cabral de Melo Neto", "Vinicius de Moraes"],
        answer: "Graciliano Ramos"
    },
    {
        question: "Qual arquiteto(a) brasileiro(a) é considerado(a) um ícone do Modernismo na arquitetura, famoso(a) por suas 'curvas sensuais'?",
        options: ["Lina Bo Bardi", "Oscar Niemeyer", "Paulo Mendes da Rocha", "Affonso Reidy"],
        answer: "Oscar Niemeyer"
    },
    {
        question: "Qual dos membros do 'Grupo dos Cinco' era o responsável pelo 'Manifesto Pau-Brasil'?",
        options: ["Mário de Andrade", "Menotti Del Picchia", "Oswald de Andrade", "Anita Malfatti"],
        answer: "Oswald de Andrade"
    },
    {
        question: "Qual dos nomes abaixo pertence à terceira fase (Geração de 45) do Modernismo?",
        options: ["Mário de Andrade", "Clarice Lispector", "Graciliano Ramos", "Manuel Bandeira"],
        answer: "Clarice Lispector"
    },
    {
        question: "O Modernismo brasileiro se opunha principalmente a qual movimento artístico anterior?",
        options: ["O Barroco", "O Romantismo", "O Academicismo", "O Renascimento"],
        answer: "O Academicismo"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const modalQuiz = new bootstrap.Modal(document.getElementById('quizModal'));
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-question');
const questionCounter = document.getElementById('question-counter');
const resultBox = document.getElementById('result-box');
const questionBox = document.getElementById('question-box');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-quiz');

function loadQuestion() {
    answered = false;
    nextButton.disabled = true;
    optionsContainer.innerHTML = '';
    
    if (currentQuestionIndex < quizQuestions.length) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn', 'quiz-option');
            button.addEventListener('click', () => selectOption(button, option));
            optionsContainer.appendChild(button);
        });
    } else {
        showResult();
    }
}

function selectOption(selectedButton, selectedOption) {
    if (answered) return;
    answered = true;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const allOptions = optionsContainer.querySelectorAll('.quiz-option');

    allOptions.forEach(button => {
        button.disabled = true; // Desabilita todos os botões
        if (button.textContent === currentQuestion.answer) {
            button.classList.add('correct');
        }
        if (button === selectedButton && selectedOption !== currentQuestion.answer) {
            button.classList.add('incorrect');
        }
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
    }
    
    nextButton.disabled = false;
}

function showResult() {
    questionBox.classList.add('d-none');
    resultBox.classList.remove('d-none');
    finalScore.textContent = `${score}/${quizQuestions.length}`;

    if (score >= 8) {
        resultMessage.textContent = 'Parabéns! Você é um verdadeiro especialista em Modernismo!';
    } else if (score >= 5) {
        resultMessage.textContent = 'Muito bem! Você conhece bem o movimento.';
    } else {
        resultMessage.textContent = 'Não desanime! Explore mais o site e tente novamente.';
    }

    nextButton.classList.add('d-none');
    restartButton.classList.remove('d-none');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionBox.classList.remove('d-none');
    resultBox.classList.add('d-none');
    nextButton.classList.remove('d-none');
    restartButton.classList.add('d-none');
    loadQuestion();
}

// Event Listeners
document.getElementById('quizModal').addEventListener('shown.bs.modal', loadQuestion);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});
restartButton.addEventListener('click', restartQuiz);