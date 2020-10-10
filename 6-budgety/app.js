var budgetController = (function () {
  //some code
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (element) {
      sum = sum + element.value;
    });

    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function (type, des, value) {
      var newItem, id;

      //create new id
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // create new item
      if (type === "inc") {
        newItem = new Income(id, des, value);
      } else {
        newItem = new Expense(id, des, value);
      }
      // push to data structure
      data.allItems[type].push(newItem);

      return newItem;
    },

    calculateBudget: function () {
      //calculate total income and expense
      calculateTotal("exp");
      calculateTotal("inc");

      // calculate the balance
      data.budget = data.totals.inc - data.totals.exp;
      //calculate the percentage
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExpenses: data.totals.exp,
        percentage: data.percentage,
      };
    },
    test: function () {
      console.log(data);
    },
  };
})();

var UIController = (function () {
  //some code
  var domString = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContrainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabels: ".budget__value",
    budgetIconmeLabel: ".budget__income--value",
    budgetExpenseLabel: ".budget__expenses--value",
    budgetExpensePercentageLabel: ".budget__expenses--percentage",
  };

  return {
    getinput: function () {
      return {
        type: document.querySelector(domString.inputType).value,
        description: document.querySelector(domString.inputDescription).value,
        value: parseFloat(document.querySelector(domString.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      // Create HTML String with Place Holder text
      var html, element;
      if (type === "inc") {
        element = domString.incomeContrainer;
        html =
          '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        element = domString.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Replace the placeholder with Actual Data
      newhtml = html.replace("%id%", obj.id);
      newhtml = newhtml.replace("%description%", obj.description);
      newhtml = newhtml.replace("%value%", obj.value);

      // Insert the HTML to DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newhtml);
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        domString.inputDescription + "," + domString.inputValue
      );
      var fields_Array = Array.prototype.slice.call(fields);
      fields_Array.forEach(function (element) {
        element.value = "";
      });

      fields_Array[0].focus();
    },

    displayBudget: function (obj) {
      document.querySelector(domString.budgetLabels).textContent = obj.budget;
      document.querySelector(domString.budgetIconmeLabel).textContent =
        obj.totalIncome;
      document.querySelector(domString.budgetExpenseLabel).textContent =
        obj.totalExpenses;
      if (obj.percentage > 0) {
        document.querySelector(
          domString.budgetExpensePercentageLabel
        ).textContent = obj.percentage;
      } else {
        document.querySelector(
          domString.budgetExpensePercentageLabel
        ).textContent = "----";
      }
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

  var updateBudget = function () {
    // Calculate the Budget
    budgetCntrl.calculateBudget();
    //return the Budget
    budget = budgetCntrl.getBudget();
    // Display the Budget
    UIController.displayBudget(budget);
  };

  var ctrlAdditem = function () {
    //Get the input Data
    var input = UIcntrl.getinput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Add the item to the budget Controller
      var newItem = budgetCntrl.addItem(
        input.type,
        input.description,
        input.value
      );

      //Add item to the UI interface
      UIcntrl.addListItem(newItem, input.type);

      // Clear Input FIelds
      UIcntrl.clearFields();

      // Calculte and Update Budget
      updateBudget();
    }
  };

  return {
    init: function () {
      var budget = {
        budget: 0,
        totalIncome: 0,
        totalExpenses: 0,
        percentage: -1,
      };
      setUpEventListeners();
      UIController.displayBudget(budget);
    },
  };
})(budgetController, UIController);

controller.init();
