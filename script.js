// Preguntas y respuestas
const questions = [
    {
      text: "1. ¿Cómo prefieres pasar tu tiempo libre?",
      answers: [
        { option: "A. Solo con un libro", trait: "Introvertido", points: 3 },
        { option: "B. Con amigos en una fiesta", trait: "Extrovertido", points: 3 },
        { option: "C. Investigando algo nuevo", trait: "Analítico", points: 3 },
        { option: "D. Creando arte o música", trait: "Creativo", points: 3 }
      ]
    },
    {
      text: "2. ¿Qué te motiva más?",
      answers: [
        { option: "A. Resolver problemas complejos", trait: "Analítico", points: 3 },
        { option: "B. Conocer gente nueva", trait: "Extrovertido", points: 3 },
        { option: "C. Soñar con ideas creativas", trait: "Creativo", points: 3 },
        { option: "D. Tener momentos tranquilos", trait: "Introvertido", points: 3 }
      ]
    }
    // Aquí puedes agregar las preguntas 3 a 7 después (ver paso 7)
  ];
  
  // Inicializar variables
  let currentQuestionIndex = 0;
  let scores = {
    Introvertido: 0,
    Extrovertido: 0,
    Analítico: 0,
    Creativo: 0
  };
  
  // Función para comenzar el test
  function startTest() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion();
  }
  
  // Mostrar pregunta actual
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    const container = document.getElementById('question-container');
    container.innerHTML = `<h3>${question.text}</h3>`;
    
    question.answers.forEach(answer => {
      container.innerHTML += `
        <div>
          <label>
            <input type="radio" name="answer" value="${answer.trait}" 
              data-points="${answer.points}" onchange="enableNext()"/>
            ${answer.option}
          </label>
        </div>
      `;
    });
  }
  
  // Habilitar botón "Siguiente"
  function enableNext() {
    document.getElementById('next-btn').disabled = false;
  }
  
  // Pasar a la siguiente pregunta
  function nextQuestion() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;
  
    const points = parseInt(selected.dataset.points);
    const trait = selected.value;
    scores[trait] += points;
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      document.getElementById('next-btn').disabled = true;
    } else {
      showResult();
    }
  }
  
  // Mostrar resultado final
  function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    
    const maxTrait = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );
    document.getElementById('result-text').innerText = 
      `${maxTrait}. ¡Gracias por participar!`;
  }