// Your code for setting up Mesta and MestaReverse...
const TipPrikljuckov = {
    // Napisi dictionary racunalniskih prikljuckov in njihov tip (serijski, vzporedni) z malimi crkami
    "usb": "serijski",
    "hdmi": "vzporedni",
    "vga": "vzporedni",
    "ethernet": "serijski",
    "dvi": "vzporedni",
    "displayport": "vzporedni",
    "thunderbolt": "vzporedni",
    "sata": "serijski",
    "RS232": "serijski",
};

  
// Your code for setting up Mesta and MestaReverse...

function start_spop2() {
    console.log("hi");
    $('#main-spop2').addClass('hidden');
    $('#game-spop2').removeClass('hidden');
    $("#game-spop2").children("h1")[0].innerText = "Vnesi rešitev";
    $("#result-container").empty();

    // Filter questions where the solution is the mesto
    const filteredQuestions = Object.keys(TipPrikljuckov).map((key) => ({
        solution: key,
        display: TipPrikljuckov[key].toString(),
        type: "tip"
    }));

    // Shuffle the questions randomly
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
    }

    const totalQuestions = filteredQuestions.length;
    let currentIndex = 0; // Track the current question index
    let correctAnswers = 0; // Track the number of correct answers
    let wrongAnswers = 0; // Track the number of wrong answers
    $('#game-spop2').children("h3")[0].innerText = `0/${totalQuestions}`;

    function displayNextQuestion() {
        const currentItem = filteredQuestions[currentIndex];
        $("#vnos-spop2").removeClass("hidden");
        $("#vnos-spop2 label")[0].innerText = `${currentItem.display}: `;
    }

    displayNextQuestion(); // Display the first question

    document.getElementById("showResultSpop2").addEventListener("click", function () {
        document.getElementById("input-spop2").value = filteredQuestions[currentIndex].solution
    });

    document.querySelector('#input-spop2').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const inputVal = $("#input-spop2").val().toLowerCase();
            const currentItem = filteredQuestions[currentIndex];

            if (inputVal === currentItem.solution) {
                // Correct answer logic here
                correctAnswers++;
                currentIndex++; // Move to the next question
                updateProgress(correctAnswers,wrongAnswers, totalQuestions); // Update progress
                $("#input-spop2").val(""); // Clear the input field
                document.getElementById("input-spop2").style.backgroundColor = "initial"; // Reset background color

                if (currentIndex < totalQuestions) {
                    displayNextQuestion(); // Display the next question
                }
                 else {
                displayResult(correctAnswers, wrongAnswers); // Display the result at the end
                }
            } else {
                // Incorrect answer logic here
                wrongAnswers++;
                document.getElementById("input-spop2").style.backgroundColor = "rgba(255, 0, 0, 0.4)";
            }
        }
    });

    // Function to update the progress in h3 element
    function updateProgress(correct, wrong, total) {
            $('#game-spop2').children("h3")[0].innerHTML = `<span style="color: green">${correct}</span>/<span style="color: red">${wrong}</span>/${total}`;
     }

    // Function to display the correct/wrong ratio
    function displayResult(correct, wrong) {
        const ratio = correct / (correct + wrong);
        const resultText = `Pravilno/Nepravilno: ${correct}/${wrong} (${ratio.toFixed(2) * 100}%)`;
        // Display the result in an element of your choice
        // For example, you can create a new <p> element and append it to a specific container
        const resultElement = document.createElement("p");
        resultElement.innerText = resultText;
        document.getElementById("result-container").appendChild(resultElement);
    }
}