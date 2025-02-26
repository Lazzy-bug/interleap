document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-button').addEventListener('click', function() {
        const query = document.getElementById('search-input').value;
        searchQuestions(query);
    });
});

function searchQuestions(query) {
    fetch('./data/questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched questions:", data); // Debugging log

            // Ensure data is an array
            if (!Array.isArray(data)) {
                console.error("Error: Fetched data is not an array", data);
                return;
            }

            // Filter questions safely
            const filteredQuestions = data.filter(q => 
                q.question && q.question.toLowerCase().includes(query.toLowerCase())
            );

            if (filteredQuestions.length > 0) {
                const question = filteredQuestions[0];

                console.log("Matched Question:", question); // Debugging log

                document.getElementById('question-text').innerText = question.question;
                document.getElementById('option-a').innerText = `A: ${question.options[0]}`;
                document.getElementById('option-b').innerText = `B: ${question.options[1]}`;
                document.getElementById('option-c').innerText = `C: ${question.options[2]}`;
                document.getElementById('option-d').innerText = `D: ${question.options[3]}`;

                document.getElementById('question-display').style.display = 'block';

                // Reset option colors
                document.querySelectorAll("#options-list li").forEach(li => li.style.backgroundColor = '');

                // Highlight correct answer
                const correctOptionIndex = question.options.indexOf(question.answer);
                if (correctOptionIndex !== -1) {
                    const correctOptionId = ['option-a', 'option-b', 'option-c', 'option-d'][correctOptionIndex];
                    document.getElementById(correctOptionId).style.backgroundColor = 'green';
                }
            } else {
                console.warn("No matching questions found.");
                document.getElementById('question-display').style.display = 'none';
            }
        })
        .catch(error => console.error("Error fetching questions:", error));
}
