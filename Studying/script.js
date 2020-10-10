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

//Bind, Call and Apply

maqbool = {
  name: "Maqbool",
  job: "Developer",
  age: 28,
  presentation: function (style, time) {
    if (style === "Formal") {
      console.log(
        "Good " +
          time +
          ". I'm a " +
          this.job +
          ". My name is " +
          this.name +
          ". I'm " +
          this.age +
          "year's of old"
      );
    }
    if (style === "Casual") {
      console.log(
        "What's up!!!!" +
          " I'm " +
          this.name +
          ". I'm a " +
          this.job +
          ". I'm just " +
          this.age +
          " years's of old. Have a nice " +
          time
      );
    }
  },
};

nelsy = {
  name: "Nelsy",
  job: "Full Stack Developer",
  age: 25,
};
maqbool.presentation("Formal", "Morning");

//Good Morning. I'm a Developer. My name is Maqbool. I'm 28year's of old

maqbool.presentation.call(nelsy, "Casual", "Morning");

//  What's up!!!! I'm Nelsy. I'm a Full Stack Developer. I'm just 25 years's of old. Have a nice Morning

// Apply method only accept two arguments... One is this key word, and other is all other params as an array
maqbool.presentation.apply(nelsy, ["Formal", "Morning"]);

// Good Morning. I'm a Full Stack Developer. My name is Nelsy. I'm 25year's of old

//Bind Function Create a copy of this Function
var maqboolFriendly = maqbool.presentation.bind(maqbool, "Casual");

maqboolFriendly("Morning");
