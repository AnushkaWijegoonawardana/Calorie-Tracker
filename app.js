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
      { id: 001, name: "Bread With Chiken Curry", calories: 1500 },
      { id: 002, name: "Bickets", calories: 600 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: function() {
      return data.items;
    },
    logData: function() {
      return data;
    }
  };
})();

//UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemListContainer: "#item-list"
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
    }
  };
})();

//App Controller
const AppScript = (function(ItemCtrl, UICtrl) {
  //Public Methods
  return {
    init: function() {
      // Fetching Items Form Data Structure
      const items = ItemCtrl.getItems();

      //   Populate List With Itmes
      UICtrl.populateItemList(items);
    }
  };
})(ItemCtrl, UICtrl);

AppScript.init();
