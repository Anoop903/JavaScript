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

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },

    totals: {
      exp: 0,
      inc: 0,
    },
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
  };

  return {
    getinput: function () {
      return {
        type: document.querySelector(domString.inputType).value,
        description: document.querySelector(domString.inputDescription).value,
        value: document.querySelector(domString.inputValue).value,
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

    // Add the item to the budget Controller

    var newItem = budgetCntrl.addItem(
      input.type,
      input.description,
      input.value
    );

    //Add item to the UI interface
    UIcntrl.addListItem(newItem, input.type);
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
