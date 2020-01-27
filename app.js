//Storage COntroller
const StorageCtrl = (function() {
  //Public Function
  return {
    storeItems: function(item) {
      let items;

      //Check For the items in Local Stroage
      if (localStorage.getItem("items") === null) {
        items = [];

        //Push New Items To the ls
        items.push(item);

        //Set Locat Stroage
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem("items"));

        //Push To New Items
        items.push(item);

        // Reset The Local Storage
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsLocalstore: function() {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        // items.JSON.parse(localStorage.getItem("items"));
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    }
  };
})();

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
    // items: [
    //   //   { id: 1, name: "Bread With Chiken Curry", calories: 1500 },
    //   //   { id: 2, name: "Bickets", calories: 600 }
    // ],
    items: StorageCtrl.getItemsLocalstore(),
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
    getitembyID: function(id) {
      let found = null;

      //loop throught he items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },
    updateItem: function(name, calories) {
      //Trun Calories To Number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteselectedItem: function(id) {
      //Get The ID
      ids = data.items.map(function(item) {
        return item.id;
      });

      //Get the Index
      const index = ids.indexOf(id);

      //Remove Items
      data.items.splice(index, 1);
    },
    clearAllItems: function() {
      data.items = [];
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;

      data.items.forEach(function(item) {
        total += item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
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
    listitems: "#item-list li",
    additemBtn: ".add-btn",
    updateitemBtn: ".update-btn",
    deleteitemBtn: ".delete-btn",
    clearBtn: ".clear-btn",
    backBtn: ".back-btn",
    itemnamevalue: "#item-name",
    itemcalorevalue: "#item-calories",
    totalCaloriestag: ".total-calories"
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
    addListItem: function(item) {
      //Show The LISt
      document.querySelector(UISelectors.itemListContainer).style.display =
        "block";
      //Create li Element
      const li = document.createElement("li");
      //Add Class
      li.className = "collection-item";
      //Add ID
      li.id = `item-${item.id}`;
      //Add Html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      //Insert item
      document
        .querySelector(UISelectors.itemListContainer)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: function(item) {
      let listitems = document.querySelectorAll(UISelectors.listitems);

      // Turn Node List into array
      listitem = Array.from(listitems);

      listitems.forEach(function(listitem) {
        const itemID = listitem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
        }
      });
    },
    deleteListitem: function(id) {
      const itemid = `#item-${id}`;

      const item = document.querySelector(itemid);
      item.remove();
    },
    clearFileds: function() {
      document.querySelector(UISelectors.itemnamevalue).value = "";
      document.querySelector(UISelectors.itemcalorevalue).value = "";
    },
    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemnamevalue
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemcalorevalue
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeitemLists: function() {
      let listitems = document.querySelectorAll(UISelectors.listitems);

      listitems = Array.from(listitems);

      listitems.forEach(function(listitem) {
        listitem.remove();
      });
    },
    hidelist: function() {
      document.querySelector(UISelectors.itemListContainer).style.display =
        "none";
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCaloriestag
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearFileds();
      document.querySelector(UISelectors.updateitemBtn).style.display = "none";
      document.querySelector(UISelectors.deleteitemBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.additemBtn).style.display = "inline";
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateitemBtn).style.display =
        "inline";
      document.querySelector(UISelectors.deleteitemBtn).style.display =
        "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.additemBtn).style.display = "none";
    },
    getUISelectors: function() {
      return UISelectors;
    }
  };
})();

//App Controller
const AppScript = (function(ItemCtrl, UICtrl, StorageCtrl) {
  //Loding All the event Listners
  const loadEventlistners = function() {
    //Get UI Selectors
    const UISelectors = UICtrl.getUISelectors();

    //Add Items Event
    document
      .querySelector(UISelectors.additemBtn)
      .addEventListener("click", addItemSubmit);

    //Edit Icon Click Event
    document
      .querySelector(UISelectors.itemListContainer)
      .addEventListener("click", itemEditClick);

    //Update Item Event
    document
      .querySelector(UISelectors.updateitemBtn)
      .addEventListener("click", updateItemClick);

    // Back Button Event
    document
      .querySelector(UISelectors.deleteitemBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Delete Item Event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    // Delete All Item Event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", deleteallitemsclick);

    //Disable Submit on Enter
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();

        return false;
      }
    });
  };

  //Add Item Function
  const addItemSubmit = function(e) {
    //Get Form Item Inputs Form UICtrl
    const iteminputs = UICtrl.getItemInput();

    //Check For Value is not null
    if (iteminputs.name !== "" && iteminputs.calories !== "") {
      //Add Item
      const newitem = ItemCtrl.addnewItem(iteminputs.name, iteminputs.calories);

      //Add Item To UI List
      UICtrl.addListItem(newitem);

      //Get The Total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add Total Calories To Ui
      UICtrl.showTotalCalories(totalCalories);

      //Store In Local Storage
      StorageCtrl.storeItems(newitem);

      //Clear The Input Fileds
      UICtrl.clearFileds();
    } else {
      console.log("Error");
    }
    e.preventDefault();
  };

  //  Click Edit Item
  const itemEditClick = function(e) {
    if (e.target.classList.contains("edit-item")) {
      //Get List Item ID
      const listitemid = e.target.parentNode.parentNode.id;

      //Break Into a Array
      const listitemidArray = listitemid.split("-");

      // Get The ID
      const id = parseInt(listitemidArray[1]);

      //Get The Item
      const itemtoedit = ItemCtrl.getitembyID(id);

      //   Set Current Item
      ItemCtrl.setCurrentItem(itemtoedit);

      //Add Item To Form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  //   Click Update Item
  const updateItemClick = function(e) {
    const input = UICtrl.getItemInput();

    // update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //Update On The UI
    UICtrl.updateListItem(updatedItem);

    //Get The Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add Total Calories To Ui
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  //Item Detele
  const itemDeleteSubmit = function(e) {
    //Get the ID need to delete
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete Form Data Structure
    ItemCtrl.deleteselectedItem(currentItem.id);

    //Delete From UI
    UICtrl.deleteListitem(currentItem.id);

    //Get The Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add Total Calories To Ui
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  //Delete all the items
  const deleteallitemsclick = function() {
    //Delete all items form data structure
    ItemCtrl.clearAllItems();

    //Get The Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add Total Calories To Ui
    UICtrl.showTotalCalories(totalCalories);

    //Remove All List Form UI
    UICtrl.removeitemLists();

    ///Hide The list from ui
    UICtrl.hidelist();
  };

  //Public Methods
  return {
    init: function() {
      //Clear The Edit State
      UICtrl.clearEditState();

      // Fetching Items Form Data Structure
      const items = ItemCtrl.getItems();

      //Check For Any Items
      if (items.length === 0) {
        UICtrl.hidelist();
      } else {
        //   Populate List With Itmes
        UICtrl.populateItemList(items);
      }

      //Get The Total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add Total Calories To Ui
      UICtrl.showTotalCalories(totalCalories);

      //Load Event Listners
      loadEventlistners();
    }
  };
})(ItemCtrl, UICtrl, StorageCtrl);

AppScript.init();
