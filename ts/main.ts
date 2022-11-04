// @ts-ignore: ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date());

class ToDoItem {
    title:string;
    dueDate:Date;
    isCompleted:boolean;

    constructor(desiredTitle:string, dueDate:Date, isCompleted:boolean){
        this.title = desiredTitle;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }
}

let item = new ToDoItem("Testing", new Date (2022, 11, 4), false);
item.title = "Testing";
item.dueDate = new Date(2022, 11, 4);
item.isCompleted = false;

window.onload = function(){
    let addBtn = <HTMLElement>getByID("addButton");
    //addBtn.onclick = addProduct;

    addBtn.addEventListener("click", clearErrMsg);
    addBtn.addEventListener("click", addProduct);

    // button clicked when 'Enter' key pressed
    // form reset and err msg cleared when 'ESC' key pressed
    specialKeyEventListener("product-name");
    specialKeyEventListener("product-price");
    specialKeyEventListener("expiration-date");
    
    /* 
        addBtn.onclick = () => {
            clearErrMsg();
            addProduct();
        }
    */
}

/**
 * Display given TodoItem on the web
 */
 function displayToDoItem(item:ToDoItem):void {

}

// display Product
function displayProduct(myProduct:BabyProduct):void{
    // create a fieldset to display products added
    createDisplayFrame();

    let displayDiv = getByID("display-div");
    displayDiv.setAttribute("style", "text-align: center;");

    // create and add ul list with product details 
    let ulID = "ul-" + productCount;  
    let createUL = document.createElement("ul");
    createUL.setAttribute("id", ulID);
    createUL.setAttribute("style", "color:blue; \
                                    display: inline-block; \
                                    text-align: left; \
                                    width: 70%; \
                                    margin: auto; ");
    displayDiv.appendChild(createUL);
    
    // insert this product to top of display
    displayDiv.insertBefore(createUL, displayDiv.children[0]);

    let orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly){
        orderOptions = "online only.";
    }

    let productCountStr = productCount.toString();

    createDisplayLI(ulID, "Product adding order: ", productCountStr);
    createDisplayLI(ulID, "Product Name: ", myProduct.productName);
    createDisplayLI(ulID, "Product Price: $", myProduct.productPrice.toString());
    createDisplayLI(ulID, "Product Rating: ", myProduct.productRating);
    createDisplayLI(ulID, "Expiration Date: ", myProduct.expirationDate);
    createDisplayLI(ulID, "Expiration Status: ", addExpirationStatus(myProduct.expirationDate));
    createDisplayLI(ulID, "Product Available: ", orderOptions);
    createDisplayLI(ulID, "-----------------------", "-----------------------");

    // change word "expired" to red color
    changeTextColor(ulID, "expired!", "EXPIRED!", "red"); 
}

/**
 * create fieldset to display products added,
 * the last one show on top of the list
 */
 function createDisplayFrame():void{
    while (legendCount == 0){
        // create and add fieldset to form to display Products
        let createFieldset = document.createElement("FIELDSET");
        document.body.appendChild(createFieldset).setAttribute("id","display-fieldset");
        
        let inventoryFieldset = getByID("display-fieldset");

        // create <legend>Inventory</legend>
        // add <legend>Inventory</legend> in the <fieldset id="inventory">
        let createLegend = document.createElement("LEGEND");
        let createTitle = document.createTextNode("Products added:");

        createLegend.appendChild(createTitle);

        inventoryFieldset.appendChild(createLegend)
                         .setAttribute("id","display-legend");

        let createDiv = document.createElement("div");
        inventoryFieldset.appendChild(createDiv)
                         .setAttribute("id","display-div");
            
        legendCount++;
    }
}

/**
 * create li line to display product info
 * @param id of ul of current product
 * @param a Title/Field such as Product Name
 * @param b name of specific product
 */
 function createDisplayLI(id: string, a:string, b:string){
    let createLI = document.createElement("LI");
    let createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
}

/**
 * add ToDoItem to database when all conditions are met
 */
 function addProduct():void{
    addInputEventToClearErrors();
    if (isAllDataValid()){
        //clearErrMsg();
        let product = getBabyProduct();
        productCount++;
        displayProduct(product);
        (<HTMLFormElement>getByID("myForm")).reset();
    }
}

/**
 * Checks form data is valid
 */
function isValid():boolean {

}

/**
 * Get all input from the form and assign to a ToDoItem object
 */
function getToDoItem():ToDoItem {

}

/**
 * create ul to display error messages
 */
var ulErrCount = 0;
function createErrorDisplay():void{
    let validationDiv = getByID("error-div");
    validationDiv.setAttribute("style", "display: flex; \
                                         justify-content: center; ");
    while (ulErrCount == 0){
        // create and add ul list with product details 
        let createUL = document.createElement("ul");
        createUL.setAttribute("id", "validationUL");
        createUL.setAttribute("style", "color:red; \
                                        text-align:left; \
                                        display: inline-block;");

        validationDiv.appendChild(createUL);  
                
        ulErrCount++;
    }
}

/**
 * create error message line
 * @param id of validation ul
 * @param s message to display
 */
function createErrLI(id: string, s:string):void {
    let createLI = document.createElement("LI");
    let createSpan = document.createElement("SPAN");
    let createNote = document.createTextNode(s);
    createLI.appendChild(createSpan);
    createSpan.appendChild(createNote);
    getByID(id).appendChild(createLI);
    getByID(id).insertBefore(createLI, getByID(id).children[0]);
}

/**
 * clear validation ul
 */
 function clearErrMsg():void{
    if (ulErrCount != 0){
        getByID("validationUL").innerHTML = "";
    }
}

/**
 * function that clears error messages user starts typing 
 */
 function addInputEventToClearErrors() {
    getByID("product-name").addEventListener("input", clearErrMsg);
    getByID("product-price").addEventListener("input", clearErrMsg);
    getByID("product-rating").addEventListener("input", clearErrMsg);
    getByID("expiration-date").addEventListener("input", clearErrMsg);
}



/**
 * execute functions when particular key entered
 * @param event of key pressed
 */
 function specialKeyEventListener(id:string):void{
    let input = <HTMLInputElement>getByID(id);
    let addBtn = <HTMLElement>getByID("addButton");
    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keyup", function(event){
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            addBtn.click();
        }

        if (event.key === "Escape") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Reset the form
            (<HTMLFormElement>getByID("myForm")).reset();
            clearErrMsg();
        }
    });
}

/**
 * short version of document.getElementById()
 * @param id of input textbox
 * @returns document.getElementById(id); 
 */
 function getByID(id:string){
    return document.getElementById(id);
}

/**
 * short version of (<HTMLInputElement>document.getElementById()).value
 * @param id of input textbox
 * @returns value of input textbox
 */
 function getInputByID(id:string){
    return (<HTMLInputElement>getByID(id)).value;
}

/**
 * short version of (<HTMLInputElement>document.getElementById()).value
 * @param id of input textbox
 * @returns value of input textbox
 */
function getInputValueByID(id:string){
    return (<HTMLInputElement>getByID(id)).value;
}