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
