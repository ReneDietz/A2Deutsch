// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Grammar page functionality
  const grammarNavBtns = document.querySelectorAll('.grammar-nav-btn');
  const grammarItems = document.querySelectorAll('.grammar-item');

  grammarNavBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      grammarNavBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Show/hide grammar items
      grammarItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Vocabulary page functionality
  const vocabNavBtns = document.querySelectorAll('.vocab-nav-btn');
  const vocabCategories = document.querySelectorAll('.vocab-category');
  const vocabSearch = document.getElementById('vocab-search');

  vocabNavBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      vocabNavBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Show/hide vocabulary categories
      vocabCategories.forEach(cat => {
        if (category === 'all' || cat.getAttribute('data-category') === category) {
          cat.style.display = 'block';
          cat.classList.add('fade-in');
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });

  // Vocabulary search functionality
  if (vocabSearch) {
    vocabSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const vocabCards = document.querySelectorAll('.vocab-card');
      
      vocabCards.forEach(card => {
        const german = card.querySelector('.vocab-german').textContent.toLowerCase();
        const japanese = card.querySelector('.vocab-japanese').textContent.toLowerCase();
        
        if (german.includes(searchTerm) || japanese.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Exercise page functionality
  const exerciseNavBtns = document.querySelectorAll('.exercise-nav-btn');
  const exerciseSections = document.querySelectorAll('.exercise-section');

  exerciseNavBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      
      // Update active button
      exerciseNavBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Show/hide exercise sections
      exerciseSections.forEach(section => {
        if (section.id === type + '-exercises') {
          section.style.display = 'block';
          section.classList.add('fade-in');
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
});

// Exercise answer functions
function showAnswer(answerId) {
  const answerDiv = document.getElementById(answerId);
  if (answerDiv) {
    answerDiv.style.display = 'block';
    answerDiv.classList.add('fade-in');
  }
}

function calculateScore() {
  const questions = [
    { name: 'q1', correct: 'a' },
    { name: 'q2', correct: 'a' },
    { name: 'q3', correct: 'c' },
    { name: 'q4', correct: 'c' },
    { name: 'q5', correct: 'b' },
    { name: 'v1', correct: 'b' },
    { name: 'v2', correct: 'c' },
    { name: 'v3', correct: 'b' },
    { name: 'r1', correct: 'b' },
    { name: 'r2', correct: 'b' },
    { name: 'r3', correct: 'c' }
  ];

  let score = 0;
  let answered = 0;

  questions.forEach(q => {
    const selected = document.querySelector(`input[name="${q.name}"]:checked`);
    if (selected) {
      answered++;
      if (selected.value === q.correct) {
        score++;
      }
    }
  });

  const scoreResult = document.getElementById('score-result');
  const percentage = answered > 0 ? Math.round((score / answered) * 100) : 0;
  
  let message = `回答数: ${answered}/${questions.length}<br>`;
  message += `正解数: ${score}/${answered}<br>`;
  message += `正答率: ${percentage}%<br><br>`;
  
  if (percentage >= 80) {
    message += '🎉 素晴らしい！A2レベルの理解度が高いです。';
  } else if (percentage >= 60) {
    message += '👍 良い結果です。もう少し練習すれば完璧です。';
  } else {
    message += '📚 もう少し学習が必要です。基礎をしっかり固めましょう。';
  }

  scoreResult.innerHTML = message;
  scoreResult.style.display = 'block';
  scoreResult.classList.add('fade-in');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const elementsToAnimate = document.querySelectorAll('.feature-card, .grammar-item, .vocab-card, .exercise-item, .tip-section');
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
});