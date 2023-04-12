/** design flips */

function testOpen(event) {
    currentQuestionNumber = 0;
    scoff.answers = new Array(scoff.questions.length);

 //   document.getElementById('test').removeAttribute('hidden');
 //   document.getElementById('testopenbutton').setAttribute('hidden', true);

    document.getElementById('testopenbutton').removeEventListener('click', testOpen);

    document.getElementById('question').style.display = "block";
    document.getElementById('summary').innerHTML = '';

    document.getElementById("test").style.display = "block";

    SCOFFUI.displayNext();
}

function testClose(event) {
    currentQuestionNumber = 0;
    scoff.answers = new Array(scoff.questions.length);

//    document.getElementById('test').setAttribute('hidden', true);
//    document.getElementById('testopenbutton').removeAttribute('hidden');

    document.getElementById('testopenbutton').addEventListener('click', testOpen);

    document.getElementById('question').innerHTML = '';
    document.getElementById('summary').innerHTML = '';

    document.getElementById("test").style.display = "none";
}

function testReset(event) {
    currentQuestionNumber = 0;
    scoff.answers = new Array(scoff.questions.length);

    document.getElementById('question').style.display = "block";
    document.getElementById('summary').innerHTML = '';

    SCOFFUI.displayNext();
}

/* -------------------------------------- */

function SCOFF(questions, explanations) {
    this.questions = questions;
    this.explanations = explanations;
    this.answers = new Array(questions.length);
}

SCOFF.prototype.answer = function(question, answer) {
    this.answers[question] = answer;
};

SCOFF.prototype.add_yes_answer = function(question) {
    this.answer(question, 'yes');    
}

SCOFF.prototype.add_no_answer = function(question) {
    this.answer(question, 'no');    
}

SCOFF.prototype.score = function() {
    score = 0;
    for (i = 0; i < this.answers.length; i++) {
        if (this.answers[i] == 'yes')
            score++;
    }
    return score;
}

SCOFF.prototype.isComplete = function() {
    count = 0;
    for (i = 0; i < this.answers.length; i++) {
        if (this.answers[i] != null)
            count++;
    }
    return count == this.answers.length;
}

SCOFF.prototype.getExplanation = function() {
    this.explanations.get(this.score());
}

SCOFF.prototype.getExplanation = function(i) {
    this.explanations.get(i);
}

var SCOFFUI = {
    displayNext: function () {
        if (scoff.isComplete()) {
            this.displayExplanation();
        } else {
            this.displayQuestion(currentQuestionNumber++);
        }
    },
    displayQuestion: function(i) {
        var o = document.getElementById('question');
        o.innerHTML = this.htmlQuestion(i, scoff.questions[i]);
        document.getElementById('summary').style.display = "none";
        o.style.display="block";
    },
    htmlQuestion: function(i, q) {
        return '<div id="q' + i + '" class="scoff_question">' + 
            '<span class="scoff_questioncount">Fråga ' + (i+1) + ' av ' + scoff.questions.length + '</span>' +
            '<span class="scoff_questiontext">'+ q + '</span>' + 
            '<button name="yes_q' + i + '" onclick="scoff.add_yes_answer(' + i + ');SCOFFUI.displayNext();">Ja</button>' + 
            '<button name="no_q' + i + '" onclick="scoff.add_no_answer(' + i + ');SCOFFUI.displayNext();">Nej</button>' + 
            '</div>';
    },

    displayExplanation: function() {
        var svar = '<div class="scoff_result">' + 
            '<span class="scoff_answercount">Du svarade Ja på: ' + scoff.score() + ' frågor</span>' +
            '<span class="scoff_resulttext">' + scoff.explanations.get(scoff.score()) + "</span>" +
            '</div>';

        this.populateIdWithHTML("summary", svar);
        document.getElementById('question').style.display = "none";
        document.getElementById('summary').style.display = "block";
    },
    
    populateIdWithHTML: function(id, text) {
        var e = document.getElementById(id);
        e.innerHTML = text;
    },
    
    displayProgress: function() {
        var currentQuestionNumber = scoff.score;
        this.populateIdWithHTML("summary", "Question " + currentQuestionNumber + " of " + scoff.questions.length);
    }
};

var scoff;

function init_scoff_test() {
    // event listeners -- only if there's a scoff test on-page:
    if (document.getElementById('testopenbutton') != null) {
        document.getElementById('testopenbutton').addEventListener('click', testOpen);
        document.getElementById('testclosebutton').addEventListener('click', testClose);
        document.getElementById('testresetbutton').addEventListener('click', testReset);
    }

/* -------------------------- */
// Questions ...
    let questions = [
        "Gör du så att du kräks för att du känner dig obehagligt mätt?",
        "Oroar du dig för att du har förlorat kontrollen över hur mycket du äter?",
        "Har du nyligen gått ner mer än 6 kg inom loppet av 3 månader?",
        "Tycker du att du är fet även när andra säger att du är för smal?",
        "Skulle du säga att mat dominerar ditt liv?",
    ];

// ... and explanations
    let explanations = new Map();
    explanations.set(0, 'Det är inte troligt att du har allvarliga problem med ätande, vikt och figur.');
    explanations.set(1, explanations.get(0));
    explanations.set(2, 'Det är ganska troligt att du har problem med ätande, vikt och figur som är tillräckligt allvarliga för att undersökas närmare.');
    explanations.set(3, explanations.get(2));
    explanations.set(4, explanations.get(3));
    explanations.set(5, explanations.get(4));

//Create the test
    scoff = new SCOFF(questions, explanations);

// and set the test to initially closed -- only showing the start button
    testClose();
}

