//Storage COntroller

//Item Controller
const ItemCtrl = (function() {
  //   Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure
  const data = {
    items: [
      { id: 1, name: "Bread With Chiken Curry", calories: 1500 },
      { id: 2, name: "Bickets", calories: 600 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: function() {
      return data.items;
    },
    addnewItem: function(name, calories) {
      let ID;
      //Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Calories To Number
      calories = parseInt(calories);

      //Create new item
      newitem = new Item(ID, name, calories);

      //   Adding To The Items Arrya
      data.items.push(newitem);

      return newitem;
    },
    logData: function() {
      return data;
    }
  };
})();

//UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemListContainer: "#item-list",
    additemBtn: ".add-btn",
    itemnamevalue: "#item-name",
    itemcalorevalue: "#item-calories"
  };

  //Public Controller
  return {
    populateItemList: function(items) {
      let itemlisthtml = "";

      items.forEach(function(item) {
        itemlisthtml += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`;
      });

      //Insert List Item
      document.querySelector(
        UISelectors.itemListContainer
      ).innerHTML = itemlisthtml;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemnamevalue).value,
        calories: document.querySelector(UISelectors.itemcalorevalue).value
      };
    },
    getUISelectors: function() {
      return UISelectors;
    }
  };
})();

//App Controller
const AppScript = (function(ItemCtrl, UICtrl) {
  //Loding All the event Listners
  const loadEventlistners = function() {
    //Get UI Selectors
    const UISelectors = UICtrl.getUISelectors();

    //Add Items Event
    document
      .querySelector(UISelectors.additemBtn)
      .addEventListener("click", addItemSubmit);
  };

  //Add Item Function
  const addItemSubmit = function(e) {
    //Get Form Item Inputs Form UICtrl
    const iteminputs = UICtrl.getItemInput();

    //Check For Value is not null
    if (iteminputs.name !== "" && iteminputs.calories !== "") {
      //Add Item
      const newitem = ItemCtrl.addnewItem(iteminputs.name, iteminputs.calories);
    } else {
      console.log("Error");
    }
    e.preventDefault();
  };

  //Public Methods
  return {
    init: function() {
      // Fetching Items Form Data Structure
      const items = ItemCtrl.getItems();

      //   Populate List With Itmes
      UICtrl.populateItemList(items);

      //Load Event Listners
      loadEventlistners();
    }
  };
})(ItemCtrl, UICtrl);

AppScript.init();
