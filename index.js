const categoriesForm = document.getElementById('categories-form');
const gamersJSON = localStorage.getItem('gamers');
const gamers = JSON.parse(gamersJSON);

const generateQuestionButton = document.getElementById('generateQ');
const generateSideButton = document.getElementById('generateSide');
const questionContainer = document.getElementById('question-container');
const playerSideContainer = document.getElementById('player-side');
const checkboxes = document.querySelectorAll('input[name="category"]');
const rectangleSide = document.getElementById('rectangleSide');

document.addEventListener('DOMContentLoaded', function () {
var checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        this.parentNode.classList.toggle('selected', this.checked);
    });
});
});

generateQuestionButton.addEventListener('click', () => {
const selectedCategories = [...checkboxes]
.filter(checkbox => checkbox.checked)
.map(checkbox => checkbox.value);

if (selectedCategories.length === 0) {
alert('Виберіть хоча б одну категорію.');
return;
}

fetch('db.json')
.then(response => response.json())
.then(data => {
    const questions = data.questions;
    const filteredQuestions = questions.filter(question => selectedCategories.includes(question.category));

    questionContainer.innerHTML = '';

    if (filteredQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        const question = filteredQuestions[randomIndex];

        const questionElement = document.createElement('div');
        questionElement.className = 'question';

        if (question.text.includes('Обери сторону')) {
            // Додаємо <br> перед 1) або 2)
            const questionText = question.text.replace('1)', '<br>1)').replace('2)', '<br>2)');
            questionElement.innerHTML = questionText;

            const optionContainer1 = document.createElement('div');
            optionContainer1.className = 'rectangle-option';
            const rectangle1 = document.createElement('div');
            rectangle1.className = 'rectangle';
            rectangle1.style.backgroundColor = "#6764E7";
            const text1 = document.createElement('h3');
            text1.textContent = '1';
            optionContainer1.appendChild(rectangle1);
            optionContainer1.appendChild(text1);

            const optionContainer2 = document.createElement('div');
            optionContainer2.className = 'rectangle-option';
            const rectangle2 = document.createElement('div');
            rectangle2.className = 'rectangle';
            rectangle2.style.backgroundColor = "#F8F26B";
            const text2 = document.createElement('h3');
            text2.textContent = '2';
            optionContainer2.appendChild(rectangle2);
            optionContainer2.appendChild(text2);

            questionElement.appendChild(optionContainer1);
            questionElement.appendChild(optionContainer2);
        } else if (question.text.includes('За чи проти')) {
            questionElement.textContent = question.text;

            const optionContainer1 = document.createElement('div');
            optionContainer1.className = 'rectangle-option';
            const rectangle1 = document.createElement('div');
            rectangle1.className = 'rectangle';
            rectangle1.style.backgroundColor = "#6764E7";
            const text1 = document.createElement('h3');
            text1.textContent = 'За';
            optionContainer1.appendChild(rectangle1);
            optionContainer1.appendChild(text1);

            const optionContainer2 = document.createElement('div');
            optionContainer2.className = 'rectangle-option';
            const rectangle2 = document.createElement('div');
            rectangle2.className = 'rectangle';
            rectangle2.style.backgroundColor = "#F8F26B";
            const text2 = document.createElement('h3');
            text2.textContent = 'Проти';
            optionContainer2.appendChild(rectangle2);
            optionContainer2.appendChild(text2);

            questionElement.appendChild(optionContainer1);
            questionElement.appendChild(optionContainer2);
        }

        questionContainer.appendChild(questionElement);
    } else {
        const noQuestionsElement = document.createElement('p');
        noQuestionsElement.textContent = 'Немає питань у вибраних категоріях.';
        questionContainer.appendChild(noQuestionsElement);
    }
})
.catch(error => {
    console.error('Помилка завантаження даних:', error);
});
});


generateSideButton.addEventListener('click', () => {
    const colors = ["#6764E7", "#F8F26B"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    rectangleSide.style.display = 'block';
    rectangleSide.style.backgroundColor = randomColor;
});