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
    // totalP.classList.toggle("totalLightMode");
    // totalPur.classList.toggle("totalLightMode");
    // currencyFont.classList.toggle("totalLightMode");
    // theme.classList.toggle("totalLightMode");
    // dltDiv.classList.toggle("totalLightMode");
    inputBg.forEach(field => {
        fieldLightMode(field)
    });
   
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
            } = item;
    
                return `
              <div class="item-div">  
                <input type="checkbox" class="checkbox activeCheckBox" checked >
    
       
       
                
                <p class="item-p">${itemName} - ${itemPrice} x ${itemQuantity}
                </p>
        
                <div class="items-actions">
                  <button class="trash item-Btn" onclick="deleteItem('${id}')" ><ion-icon name="trash"></ion-icon></button>
                  <button class="edit item-Btn"><ion-icon name="push-outline"></ion-icon></button>
                </div>
              </div>  
                `
        }).join("");
        totalPrice();
    };
     generateItem(itemDetails);


     












// delete item
window.addEventListener("DOMContentLoaded", () => {
let trashIcon = document.querySelector(".trash");
    trashIcon.addEventListener("click", () => {

    })
  
})

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

            localStorage.setItem("itemDetails", JSON.stringify(itemDetails));

        dltModal.classList.add("hide-modal");

    })

}

// edit item 

window.addEventListener("DOMContentLoaded", () => {
    
    
})
let editIcon = document.querySelector(".edit");
// let isItemIndexFound = null;
let editItem = (id) => {
    let isItemFound = itemDetails.find((item) => item.id == id);
    //  isItemIndexFound = itemDetails.findIdex((item) => item.id == id);
    // console.log(isItemIndexFound);

    if (isItemFound !== undefined) {
        itemName.value = isItemFound.itemName;
        itemPrice.value = isItemFound.itemPrice;
        itemQuantity.value = isItemFound.itemQuantity;
    }
}

editIcon.addEventListener("click", (e) => {
    e.preventDefault();
    editItem(id);
    // itemDetails.splice(isItemIndexFound, 1, {})
})





// SELECT ALL

let selAllBtn = document.querySelector("#selcAll");
let seperateBtn = document.querySelectorAll(".seperateBtn");
let isBtnActive = false;

let activateBtn = (btn) => {
    btn.classList.remove("unactiveBtn");
    btn.disabled = false;
}

let deactivateBtn = (btn) => {
    btn.classList.add("unactiveBtn");
    btn.disabled = true;
}

console.log(seperateBtn);


function deactivateBtnOnStart() {
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
let dltAll = document.querySelector("#dltAll");
let dltAllYes = document.querySelector("#dltAllModalDiv-yls");
let dltAllNo = document.querySelector("#dltAllModalDiv-non");



let deleteAllItems = () => {
    deleteAllModal.classList.remove("hide-modal");
    
}

dltAll.addEventListener("click", () => {
    deleteAllItems();

    dltAllNo.addEventListener("click", () => {
        deleteAllModal.classList.add("hide-modal");
    });


    dltAllYes.addEventListener("click", () => {
        let isItemFound = itemDetails.find((item) => item.id == id);
        
        itemDetails =  itemDetails.filter((item) => item.id !== isItemFound.id )
    
        generateItem(itemDetails);

        localStorage.setItem("itemDetails", JSON.stringify(itemDetails));
    })
})


// select item

let purchaseItem = () => {
    isPurchased = true;
}







// option
select = document.querySelector(".select");

select.addEventListener("change", (e) => {
    if (e.target.value === "name") {
        itemDetails = itemDetails.sort((a,b) => {
            let fa = a.itemName.toLowerCase();
            let fb  = b.itemName.toLowerCase();
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0
        } );
        generateItem(itemDetails);
    
    }
    else if (e.target.value === "price"){
        itemDetails = itemDetails.sort((b,a) => {
            let fa = a.itemName.toLowerCase();
            let fb  = b.itemName.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0
        } );
        generateItem(itemDetails);
    }
})