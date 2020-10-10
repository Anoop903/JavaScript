var budgetController = (function () {
  //some code
})();

var UIController = (function () {
  //some code
  var domString = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
  };

  return {
    getinput: function () {
      return {
        type: document.querySelector(domString.inputType).value,
        description: document.querySelector(domString.inputDescription).value,
        value: document.querySelector(domString.inputValue).value,
      };
    },

    getDomstrings: function () {
      return domString;
    },
  };
})();

var controller = (function (budgetCntrl, UIcntrl) {
  //some code

  var setUpEventListeners = function () {
    var Dom = UIcntrl.getDomstrings();

    document
      .querySelector(Dom.inputButton)
      .addEventListener("click", ctrlAdditem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAdditem();
      }
    });
  };

  var ctrlAdditem = function () {
    //Get the input Data
    var input = UIcntrl.getinput();
    console.log(input);
    // Add the item to the budget Controller
    //Add item to the UI interface
    // Calculate the Budget
    // Display the Budget
  };

  return {
    init: function () {
      console.log("Started");
      setUpEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
