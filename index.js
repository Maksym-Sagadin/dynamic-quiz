const questions = [
    {
      questionIndex: 0,
      questionText: "Which of the following is not a real eCommerce platform?",
      choices: [
        {
          choiceText: 'Shopify',
          correct: false
        },
        {
          choiceText: 'WooCommerce',
          correct: false
        },
        {
          choiceText: 'ShopCommerce',
          correct: true
        },
        {
          choiceText: 'BigCommerce',
          correct: false
        },
      ]
    },
    {
      questionIndex: 1,
      questionText: "If Shopify is so good, why are Shopify developers necessary?",
      choices: [
        {
          choiceText: 'To save time on things like store setups and migrations',
          correct: false
        },
        {
          choiceText: 'To extend the limited design options and functionalities of themes with custom code',
          correct: false
        },
        {
          choiceText: 'To provide support with a deep understanding of how the platform works and what its limitations are',
          correct: false
        },
        {
          choiceText: 'All of the above',
          correct: true
        },
      ]
    },
    {
      questionIndex: 2,
      questionText: "Which of the following is true about Shopify developers?",
      choices: [
        {
          choiceText: 'They are paid extremely well',
          correct: false
        },
        {
          choiceText: 'There is a high demand for them',
          correct: false
        },
        {
          choiceText: 'They need to know web development, the platform itself, and the liquid template language',
          correct: false
        },
        {
          choiceText: 'BigCommerce',
          correct: true
        }
      ]
    }
  ];
  
  let currentQuestion = 0;
  let questionContainer = document.getElementById('question');
  let beginButton = document.getElementsByClassName('begin')[0];
  let nextButton = document.getElementsByClassName('next')[0];
  let backButton = document.getElementsByClassName('back')[0];
  let resetButton = document.getElementsByClassName('reset')[0];
  let result = document.getElementsByClassName('result')[0];
  let answers = [];
  
  
  renderQuestion(currentQuestion);
  function renderQuestion(currentQuestion) {
    questionContainer.innerHTML = `
      <h2>Question ${currentQuestion + 1} of ${questions.length}:</h2>
      <h3>${questions[currentQuestion].questionText}</h3>
      <p class='hidden error'>Please select an answer to continue</p>
      <form class='questions'>
            <input type='radio' value='${questions[currentQuestion].choices[0].correct}' name='choice' id='q1'>
            <label for='q1'>${questions[currentQuestion].choices[0].choiceText}</label><br>
            <input type='radio' value='${questions[currentQuestion].choices[1].correct}' name='choice' id='q2'>
            <label for='q2'>${questions[currentQuestion].choices[1].choiceText}</label><br>
            <input type='radio' value='${questions[currentQuestion].choices[2].correct}' name='choice' id='q3'>
            <label for='q3'>${questions[currentQuestion].choices[2].choiceText}</label><br>
            <input type='radio' value='${questions[currentQuestion].choices[3].correct}' name='choice' id='q4'>
            <label for='q4'>${questions[currentQuestion].choices[3].choiceText}</label><br>
          </form>
      `
  }
  
  resetButton.addEventListener('click', function() {
    currentQuestion = 0;
    renderQuestion(currentQuestion);
    backButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
    nextButton.textContent = 'Next';
    result.classList.add('hidden');
    answers.length = 0;
  });
  
  nextButton.addEventListener('click', function() {
    let radiobuttons = document.querySelectorAll('input[name="choice"]');
  
    for (let radiobutton of radiobuttons) {
      if (radiobutton.checked) {
        answers.push(radiobutton.value);
        backButton.classList.remove('hidden');
        currentQuestion++;
        
        if (currentQuestion === 2) {
          nextButton.textContent = 'Submit';
        }
        else if (currentQuestion === 3) {
          calculateResults();
          currentQuestion--;
        }
        renderQuestion(currentQuestion);
        break;
      }
      else {
        document.querySelector('.error').classList.remove('hidden');
      }
    }
    
  });
  
  backButton.addEventListener('click', function() {
    answers.pop();
    if (currentQuestion === 2) {
      nextButton.textContent = 'Next';
    }
    currentQuestion--;
    renderQuestion(currentQuestion);
    if (currentQuestion === 0) {
      backButton.classList.toggle('hidden');
    }
  });
  
  function calculateResults() {
    let correctCount = 0;
    for (let correct of answers) {
      if (correct === 'true') {
        correctCount++;
      }
    }
    let percent = (correctCount/questions.length*100).toFixed(0);
    result.textContent = `You got ${percent}% correct : ${correctCount} / ${questions.length}`;
    result.classList.remove('hidden');
    nextButton.classList.add('hidden');
    backButton.classList.add('hidden');
    correctCount = 0;
  }