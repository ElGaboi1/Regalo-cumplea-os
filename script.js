/*
  PERSONALIZA AQUÍ TU REGALO 💗
  Cambia el nombre de tu amiga y tu firma. No necesitas tocar el resto del código.
*/
const CONFIG = {
  nombre: "Ania", // Escribe aquí el nombre o apodo de tu amiga.
  firma: "De un amigo de muchos años ;3", // Escribe tu nombre o una firma bonita.
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Personalización inicial
const safeName = String(CONFIG.nombre || "STAR GIRL").trim();
const safeSignature = String(CONFIG.firma || "alguien que quería sacarte una sonrisa").trim();
$("#heroName").textContent = safeName.toUpperCase();
$("#senderName").textContent = safeSignature;
document.title = `Feliz cumpleaños, ${safeName} ✦ ONCE CLUB`;

// Estrellitas suaves creadas con CSS; no se necesitan imágenes.
const sparkleField = $("#sparkleField");
for (let i = 0; i < 28; i++) {
  const star = document.createElement("span");
  star.textContent = i % 3 === 0 ? "✧" : "·";
  star.style.position = "absolute";
  star.style.left = `${(i * 37 + 13) % 100}%`;
  star.style.top = `${(i * 61 + 7) % 100}%`;
  star.style.fontSize = `${7 + (i % 4) * 3}px`;
  star.style.color = i % 2 ? "#c4a6ff" : "#ff9ac0";
  star.style.opacity = `${0.16 + (i % 5) * 0.07}`;
  star.style.animation = `twinkle ${2 + (i % 4) * 0.7}s ease-in-out ${(i % 6) * -0.4}s infinite`;
  sparkleField.appendChild(star);
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function launchConfetti(amount = 90) {
  const colors = ["#ff8eb7", "#ffd4e5", "#bba7ff", "#fff0a6", "#9de3e1", "#f6a7db"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--fall-duration", `${2.1 + Math.random() * 2.8}s`);
    piece.style.setProperty("--drift", `${-130 + Math.random() * 260}px`);
    piece.style.setProperty("--spin", `${Math.random() * 1000 - 500}deg`);
    piece.style.width = `${5 + Math.random() * 7}px`;
    piece.style.height = `${7 + Math.random() * 10}px`;
    sparkleField.appendChild(piece);
    window.setTimeout(() => piece.remove(), 5200);
  }
}

function launchHearts(amount = 14) {
  const symbols = ["♡", "♥", "✦", "✧"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${5 + Math.random() * 90}%`;
    heart.style.animationDelay = `${Math.random() * 1.2}s`;
    heart.style.animationDuration = `${2.8 + Math.random() * 2}s`;
    heart.style.fontSize = `${12 + Math.random() * 17}px`;
    sparkleField.appendChild(heart);
    window.setTimeout(() => heart.remove(), 5400);
  }
}

$("#confettiButton").addEventListener("click", () => {
  launchConfetti(110);
  showToast("¡Que comience tu birthday era! ♡");
});
$("#sparkleButton").addEventListener("click", () => {
  launchHearts(20);
  launchConfetti(45);
  showToast("Modo mágico activado ✧");
});
$("#finalButton").addEventListener("click", () => {
  launchConfetti(140);
  launchHearts(24);
  showToast("¡Feliz cumpleaños! Hoy se celebra tu existencia. ♡");
});

// La torta: al hacer clic, las llamas se apagan y aparece una dedicatoria.
const cakeScene = $(".cake-scene");
const wishButton = $("#wishButton");
const wishMessage = $("#wishMessage");
let wishGranted = false;
wishButton.addEventListener("click", () => {
  if (!wishGranted) {
    cakeScene.classList.add("blown");
    wishMessage.classList.add("is-visible");
    wishMessage.textContent = "✨ Deseo enviado al universo. Que algo bonito te encuentre este año. ♡";
    wishButton.innerHTML = '¡Deseo pedido! <span>♡</span>';
    wishGranted = true;
    launchConfetti(55);
    launchHearts(12);
  } else {
    cakeScene.classList.remove("blown");
    wishMessage.classList.remove("is-visible");
    wishButton.innerHTML = 'Pedir mi deseo <span>✧</span>';
    wishGranted = false;
    showToast("Las velitas están listas para otro deseo. 🕯");
  }
});

// Dedicatorias originales inspiradas en la vibra de algunos títulos de TWICE.
const vibes = {
  feel: {
    icon: "♡",
    label: "FEEL SPECIAL · PARA TI",
    text: "Que nunca olvides lo valiosa que eres, incluso en los días en que no te sientas al cien. Tu forma de ser puede iluminar más de lo que imaginas."
  },
  fancy: {
    icon: "✦",
    label: "FANCY · TU ERA",
    text: "Este año te toca elegirte, atreverte a intentar cosas nuevas y brillar sin pedir permiso. La protagonista de esta era eres tú."
  },
  feels: {
    icon: "☼",
    label: "THE FEELS · PURA ENERGÍA",
    text: "Que tu playlist tenga temazos, tus días tengan pequeñas aventuras y tus recuerdos favoritos terminen siendo historias que cuentes con una sonrisa."
  },
  talk: {
    icon: "✿",
    label: "TALK THAT TALK · NUEVOS CAPÍTULOS",
    text: "Que este nuevo año venga lleno de conversaciones que abracen, amistades que se sientan como hogar y oportunidades que te emocionen de verdad."
  }
};
$$(".vibe-card").forEach(card => {
  card.addEventListener("click", () => {
    $$(".vibe-card").forEach(item => item.classList.remove("selected"));
    card.classList.add("selected");
    const vibe = vibes[card.dataset.vibe];
    $(".vibe-message-icon").textContent = vibe.icon;
    $(".vibe-message-label").textContent = vibe.label;
    $(".vibe-message-text").textContent = vibe.text;
    launchHearts(5);
  });
});

// Mini test ONCE. Preguntas de cultura general del grupo; no usa letras de canciones.
const questions = [
  {
    question: "¿Cómo se llama el fandom de TWICE?",
    answers: ["ONCE", "CANDY", "TWINKLE"],
    correct: 0,
    note: "¡Sí! El fandom de TWICE se llama ONCE. 💗"
  },
  {
    question: "¿Cuántas integrantes tiene TWICE?",
    answers: ["7", "9", "11"],
    correct: 1,
    note: "¡Exacto! TWICE está formado por nueve integrantes. ✨"
  },
  {
    question: "¿Cuál de estos es un título de TWICE?",
    answers: ["Moonlight Sunrise", "Starlight Forever", "Pink Universe"],
    correct: 0,
    note: "¡Correcto! “MOONLIGHT SUNRISE” es una canción de TWICE. 🌙"
  }
];
let questionIndex = 0;
let score = 0;
let answered = false;
const quizCard = $("#quizCard");
const quizResult = $("#quizResult");
const questionText = $("#questionText");
const answersEl = $("#answers");
const questionCount = $("#questionCount");
const quizFeedback = $("#quizFeedback");
const nextQuestion = $("#nextQuestion");
const quizProgress = $("#quizProgress");

function renderQuestion() {
  const item = questions[questionIndex];
  answered = false;
  questionCount.textContent = `PREGUNTA 0${questionIndex + 1} / 03`;
  quizProgress.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  questionText.textContent = item.question;
  quizFeedback.textContent = "Escoge tu respuesta, sin hacer trampa 👀";
  nextQuestion.disabled = true;
  nextQuestion.textContent = questionIndex === questions.length - 1 ? "Ver resultado ↗" : "Siguiente ↗";
  answersEl.innerHTML = "";
  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.dataset.answer = String(index);
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  const item = questions[questionIndex];
  const buttons = $$(".answer-button", answersEl);
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === item.correct) button.classList.add("correct");
    if (i === index && i !== item.correct) button.classList.add("wrong");
  });
  if (index === item.correct) {
    score++;
    quizFeedback.textContent = item.note;
    launchHearts(4);
  } else {
    quizFeedback.textContent = `Casi 💗 La respuesta era: ${item.answers[item.correct]}. ¡Lo importante es divertirse!`;
  }
  nextQuestion.disabled = false;
}

nextQuestion.addEventListener("click", () => {
  if (!answered) return;
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    quizCard.hidden = true;
    quizResult.hidden = false;
    const title = score === 3 ? "ONCE de corazón ♡" : score === 2 ? "ONCE en entrenamiento ✦" : "Comienza una nueva era ✧";
    const message = score === 3
      ? "¡Puntuación perfecta! Se nota el cariño por TWICE. Que tu cumpleaños tenga esa misma energía de concierto."
      : score === 2
        ? "¡Muy bien! Ya tienes la vibra; ahora toca seguir disfrutando de la música y descubrir más cositas."
        : "Toda fan tiene un comienzo. Tu misión de cumpleaños: poner TWICE en la playlist y pasarlo increíble. ♡";
    $("#resultTitle").textContent = title;
    $("#resultText").textContent = `${score}/3 correctas. ${message}`;
    if (score === 3) launchConfetti(50);
  }
});

$("#restartQuiz").addEventListener("click", () => {
  questionIndex = 0;
  score = 0;
  quizResult.hidden = true;
  quizCard.hidden = false;
  renderQuestion();
});
renderQuestion();

// Pequeño extra: dejar la firma final personalizada.
$("#finalSignature").textContent = `hecho con cariño por ${safeSignature} ✦`;
