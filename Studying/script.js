// Function Returning Function

function InterviewQuestion(job) {
  if (job === "Developer") {
    return function (name) {
      console.log(name + ", Which Programming Language you are Using");
    };
  }
  if (job === "Tester") {
    return function (name) {
      console.log(name + ", Manual Testing or Automation?");
    };
  } else {
    return function (name) {
      console.log("What are you doing");
    };
  }
}
InterviewQuestion("Developer")("Nelsy");
InterviewQuestion("Developer")("Maqbool");
InterviewQuestion("Developer")("Beema");
InterviewQuestion("Tester")("Reshma");

// IIFE (Immeidately Invoked Function Expressions)

function game() {
  var score = Math.random() * 10;
  console.log(score >= 4);
}
game();

// The same function returned in IIFE Used For Data Privacy

(function () {
  var score = Math.random() * 10;
  console.log(score >= 4);
})();
