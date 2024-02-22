let menuIcon = document.querySelector("#header-icon");
let themeModal = document.querySelector(".theme-modal");
let dltModal  = document.querySelector(".delete-modal");
let no = document.querySelector("#non");
let toggleTheme = document.querySelector("#theme-icon");
let body = document.querySelector("#body");
let totalP = document.querySelector(".total-p");
let totalPur = document.querySelector("#total-pur");
let currencyFont = document.querySelector(".currency-theme-font");
let theme = document.querySelector(".theme");
let dltDiv = document.querySelector("#dlt");
let inputForm = document.querySelector("#input-div");
let itemBtn = document.querySelector("#addItemBtn");
let itemSection = document.querySelector("#item-section");
let transModal = document.querySelector(".trans-wrapper");
let totalAmount = document.querySelector("#amount");
let cancleIcon = document.querySelector("#cancle");
let notify = document.querySelector(".notify");



// modals

isIconOpened = false

menuIcon.addEventListener("click", () => {
    if (!isIconOpened) {
        themeModal.classList.remove("hide-modal");
        menuIcon.classList.remove("header-icon")
    }
})

cancleIcon.addEventListener("click", () => {
    if (!isIconOpened) {
        themeModal.classList.add("hide-modal");
    }
    
});

let openTransition = (message) => {
    transModal.classList.add("open-modal");
    notify.innerText = message;
}

let closeNotification = () => {
    transModal.classList.remove("open-modal");
    notify.innerText = ""; 
}

let inputBg = document.querySelectorAll(".inputBg");



// Mode
let fieldLightMode = (field) => {
    field.classList.toggle("fieldBdg")
}
toggleTheme.addEventListener("click", () => {
    body.classList.toggle("lightMode");
    inputBg.forEach(field => {
        fieldLightMode(field)
    });

localStorage.setItem("itemDetails", JSON.stringify(itemDetails))
    
})

console.log(inputBg);

// Add item

let isItemAvailable = localStorage.getItem("itemDetails");
let itemDetails = isItemAvailable ? JSON.parse(isItemAvailable) : [];




inputForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let itemName = e.target[0].value;
    let itemQuantity = parseInt(e.target[1].value);
    let itemPrice = parseInt(e.target[2].value);
    let total = itemQuantity * itemPrice;

    let itemDetail = {
        id : "item" + Math.random()* 1000,
        itemName,
        itemQuantity,
        itemPrice,
        total,
        isPurchased: false,
    };

    console.log(itemDetail);
    
    
        setTimeout(() => {
            openTransition("Item added!");
            setTimeout(closeNotification, 2000);           
            inputForm.reset();
            generateItem(itemDetails)
            itemDetails.push(itemDetail);
            localStorage.setItem("itemDetails", JSON.stringify(itemDetails));
            generateItem(itemDetails)
        }, 500);



});



// total price
const totalPrice = () => {
    let totals = itemDetails
    .map( itemDetail => {
        let = {
            itemPrice,
            itemQuantity,
        } = itemDetail;

        return  itemPrice * itemQuantity

    });
    
    console.log(totals);
    let total = totals.reduce((acc, cur) => acc + cur, 0 );
    console.log(total);
    totalAmount.innerText = "$"+total;

    if (total > 1) {
        totalAmount.style.color = "#3AEC82";
    }
   
};
totalPrice();


const generateItem = (data) => {
    itemSection.innerHTML = data
    .map(item => {
            let = {
            itemName,
                itemPrice,
                itemQuantity,
                id,
                isPurchased
            } = item;
    
                return `
              <div class="item-div">  
                <input type="checkbox" class="checkbox activeCheckBox" onchange="togglePurchaseItem('${id}')" ${isPurchased ? "checked" : ""}>
    
       
       
                
                <p id="${id}" class="item-p ${isPurchased ? "selectCheckBox" : ""}">${itemName} - ${itemPrice} x ${itemQuantity}
                </p>
        
                <div class="items-actions">
                  <button class="trash item-Btn" onclick="deleteItem('${id}')" ><ion-icon name="trash"></ion-icon></button>
                  <button onclick="editItem('${id}');" class="edit item-Btn"><ion-icon name="push-outline"></ion-icon></button>
                </div>
              </div>  
                `
        }).reverse().join("");
        totalPrice();
    };
     generateItem(itemDetails);


     


// delete item


let deleteItem = (id) => {
    dltModal.classList.remove("hide-modal");
    let ylsAction = document.querySelector("#yls");

    
    no.addEventListener("click", () => {
        dltModal.classList.add("hide-modal");
    })

    ylsAction.addEventListener("click", () => {
        
            let isItemFound = itemDetails.find((item) => item.id == id);
            console.log(isItemFound);
            itemDetails =  itemDetails.filter((item) => item.id != isItemFound.id )
        
            generateItem(itemDetails);
            closeNotification()
            localStorage.setItem("itemDetails", JSON.stringify(itemDetails));

        dltModal.classList.add("hide-modal");

    })

}

let updateItemBtn =  document.getElementById("updateItemBtn");
let addItemBtn = document.getElementById("addItemBtn");

// edit item 

let editedItemIndex;

let editItem = (id) => {
    let itemName = document.getElementById("itemName");
    let itemPrice = document.getElementById("itemPrice");
    let itemQuantity = document.getElementById("itemQuantity");
    selectedItemId = id
    let isItemFound = itemDetails.find((item) => selectedItemId == item.id);
    editedItemIndex = itemDetails.findIndex((item) => selectedItemId == item.id );

    if (isItemFound !== undefined) {
     itemName.value = isItemFound.itemName;
     itemQuantity.value = isItemFound.itemPrice;
     itemPrice.value = isItemFound.itemQuantity;
     addItemBtn.classList.add("hide");
     updateItemBtn.classList.remove("hide");
    }else{
     addItemBtn.classList.remove("hide");
     updateItemBtn.classList.add("hide");
    }



};

let updateItem = (id) => {
    selectedItemId = id
    let isItemFound = itemDetails.find((item) => selectedItemId == item.id);
    if (editedItemIndex == isItemFound) {
        let  itemDetail = {
            itemName:document.getElementById("itemName").value,
            itePrice:document.getElementById("itemPrice").value,
            itemQuantity:document.getElementById("itemQuantity").value,

        };
        itemDetails.splice(editedItemIndex, 1, itemDetail);
        generateItem(itemDetails);
        totalPrice()

    }

}

updateItemBtn.addEventListener("click", () => {
    updateItem();
})



// SELECT ALL

let selAllBtn = document.querySelector("#selcAll");
let seperateBtn = document.querySelectorAll(".seperateBtn");
let isBtnActive = false; 

// btn.classList.add("unactiveBtn");

let activateBtn = (btn) => {
    btn.classList.remove("unactiveBtn");
    btn.disabled = false;
}

let deactivateBtn = (btn) => {
    btn.classList.add("unactiveBtn");
    btn.disabled = true;
}

console.log(seperateBtn);


let deactivateBtnOnStart = () => {
    seperateBtn.forEach(btn => {
        deactivateBtn(btn);
        
        
    })
}

deactivateBtnOnStart();




selAllBtn.addEventListener("click", () => {
    
    seperateBtn.forEach((btn) => {
        if(isBtnActive ){
            deactivateBtn(btn);
            selAllBtn.innerText = "Select all"
            selAllBtn.style.backgroundColor = "blue"
            itemSection.classList.remove("addSectionBackground");

        }
        else {
            activateBtn(btn);
            itemSection.classList.add("addSectionBackground");
            selAllBtn.innerText = "Unselect all"
            selAllBtn.style.backgroundColor = "rgba(0, 0, 255, 0.503)"
            
        }
    });
    
            isBtnActive = !isBtnActive;

        console.log("clicked");
    
    }) 
    console.log(selAllBtn);
        


// delete all
let deleteAllModal = document.querySelector(".delete-all-modal");
let dltAll = document.querySelector(".dltAlls");
let dltAllYes = document.querySelector("#dltAllModalDiv-yls");
let dltAllNo = document.querySelector("#dltAllModalDiv-non");



let deleteAllItems = () => {
    deleteAllModal.classList.remove("hide-modal");
    
}

dltAll.addEventListener("click", () => {
    deleteAllItems();
    themeModal.classList.add("hide-modal")

    dltAllNo.addEventListener("click", () => {
        deleteAllModal.classList.add("hide-modal");
    });


    dltAllYes.addEventListener("click", () => {
        
        itemDetails =  []
    
        generateItem(itemDetails);
        deleteAllModal.classList.add("hide-modal");

        localStorage.setItem("itemDetails", JSON.stringify(itemDetails));
    })
})


// toggle purchase


let togglePurchaseItem = (id) => {
    
    
    let isBoxFound = itemDetails.find((item) => item.id == id);
    if (isBoxFound) {
        itemDetails = itemDetails.map(item => {
            if(item.id == isBoxFound.id){
                item.isPurchased = !item.isPurchased;
                
                return item;
            }
            return item;
        })
        console.log(itemDetails);
        generateItem(itemDetails);
        calculateTotalpurchased();
      
    }      

}



// purchase items

const calculateTotalpurchased = () => {
    let totalspurchased = itemDetails.map(item => {
        if(item.isPurchased === true){
            return item.itemPrice * item.itemQuantity;
        }
        return 0;
    })
    console.log(totalspurchased);
    let total = totalspurchased.reduce((acc, cur) => acc + cur, 0);
    document.getElementById("purAmount").innerText = `$${total}`
    if (total > 0) {
        document.getElementById("purAmount").style.color = "#3AEC82";
    }
    else{document.getElementById("purAmount").style.color = "red";}
}


// purchase all items
let purchaseAllItems = document.querySelector("#purSelc");


purchaseAllItems.addEventListener("click", () => {
    itemDetails = itemDetails.map(item => {
        item.isPurchased = true;
        return item;
    })
    generateItem(itemDetails);
    calculateTotalpurchased()
})

// unpurchase all items

let unpurchaseAllItems = document.querySelector("#unpurSelc");

unpurchaseAllItems.addEventListener("click", () => {
    itemDetails = itemDetails.map(item => {
        item.isPurchased = false;
        return item;
    })
    generateItem(itemDetails);
    calculateTotalpurchased()
})


// delete all selected

let deleteSelected = document.querySelector("#dltSelc");

deleteSelected.addEventListener("click", () => {
    itemDetails = itemDetails.filter(item => item.isPurchased !==  true)

    generateItem(itemDetails);
    calculateTotalpurchased()
})





// purchase all

let themePurchase = document.querySelector("#theme-purchase");


themePurchase.addEventListener("click", () => {
    itemDetails = itemDetails.map(item => {
        item.isPurchased = true;
        return item;
    })
    generateItem(itemDetails);
    calculateTotalpurchased()
    themeModal.classList.add("hide-modal");
})





// option
select = document.querySelector(".select");

select.addEventListener("change", (e) => {
    if (e.target.value === "name") {
        itemDetails = itemDetails.sort((a,b) => {
            let fa = a.itemName.toLowerCase();
            let fb  = b.itemName.toLowerCase();
            if (fa > fb) {
                return -1;
            };
            if (fa < fb) {
                return 1;
            }
            return 0
        } );
        console.log(itemDetails);
        generateItem(itemDetails);
    
    }
    else if (e.target.value === "price"){
        itemDetails = itemDetails.sort((b,a) => 
           a.itemPrice - b.itemPrice
         );
        generateItem(itemDetails);
    }
})
console.log(select);