var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem(desiredTitle, dueDate, isCompleted) {
        this.title = desiredTitle;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }
    return ToDoItem;
}());
var item = new ToDoItem("Testing", new Date(2022, 11, 4), false);
item.title = "Testing";
item.dueDate = new Date(2022, 11, 4);
item.isCompleted = false;
window.onload = function () {
    var addBtn = getByID("addButton");
    addBtn.addEventListener("click", clearErrMsg);
    addBtn.addEventListener("click", addProduct);
    specialKeyEventListener("product-name");
    specialKeyEventListener("product-price");
    specialKeyEventListener("expiration-date");
};
function setItemULColor(id) {
}
function moveItem() {
}
function displayToDoItem(myProduct) {
    createDisplayFrame();
    var displayDiv = getByID("display-div");
    displayDiv.setAttribute("style", "text-align: center;");
    var ulID = "ul-" + productCount;
    var createUL = document.createElement("ul");
    createUL.setAttribute("id", ulID);
    createUL.setAttribute("style", "color:blue; \
                                    display: inline-block; \
                                    text-align: left; \
                                    width: 70%; \
                                    margin: auto; ");
    displayDiv.appendChild(createUL);
    displayDiv.insertBefore(createUL, displayDiv.children[0]);
    var orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly) {
        orderOptions = "online only.";
    }
    var productCountStr = productCount.toString();
    createDisplayLI(ulID, "Product adding order: ", productCountStr);
    createDisplayLI(ulID, "Product Name: ", myProduct.productName);
    createDisplayLI(ulID, "Product Price: $", myProduct.productPrice.toString());
    createDisplayLI(ulID, "Product Rating: ", myProduct.productRating);
    createDisplayLI(ulID, "Expiration Date: ", myProduct.expirationDate);
    createDisplayLI(ulID, "Expiration Status: ", addExpirationStatus(myProduct.expirationDate));
    createDisplayLI(ulID, "Product Available: ", orderOptions);
    createDisplayLI(ulID, "-----------------------", "-----------------------");
    changeTextColor(ulID, "expired!", "EXPIRED!", "red");
}
function addProduct() {
    addInputEventToClearErrors();
    if (isAllDataValid()) {
        var product = getBabyProduct();
        productCount++;
        displayProduct(product);
        getByID("myForm").reset();
    }
}
function isValid() {
}
function getToDoItem() {
}
var ulErrCount = 0;
function createErrorDisplay() {
    var validationDiv = getByID("error-div");
    validationDiv.setAttribute("style", "display: flex; \
                                         justify-content: center; ");
    while (ulErrCount == 0) {
        var createUL = document.createElement("ul");
        createUL.setAttribute("id", "validationUL");
        createUL.setAttribute("style", "color:red; \
                                        text-align:left; \
                                        display: inline-block;");
        validationDiv.appendChild(createUL);
        ulErrCount++;
    }
}
function createErrLI(id, s) {
    var createLI = document.createElement("LI");
    var createSpan = document.createElement("SPAN");
    var createNote = document.createTextNode(s);
    createLI.appendChild(createSpan);
    createSpan.appendChild(createNote);
    getByID(id).appendChild(createLI);
    getByID(id).insertBefore(createLI, getByID(id).children[0]);
}
function clearErrMsg() {
    if (ulErrCount != 0) {
        getByID("validationUL").innerHTML = "";
    }
}
function addInputEventToClearErrors() {
    getByID("product-name").addEventListener("input", clearErrMsg);
    getByID("product-price").addEventListener("input", clearErrMsg);
    getByID("product-rating").addEventListener("input", clearErrMsg);
    getByID("expiration-date").addEventListener("input", clearErrMsg);
}
function specialKeyEventListener(id) {
    var input = getByID(id);
    var addBtn = getByID("addButton");
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addBtn.click();
        }
        if (event.key === "Escape") {
            event.preventDefault();
            getByID("myForm").reset();
            clearErrMsg();
        }
    });
}
var legendCount = 0;
function createDisplayFrame() {
    while (legendCount == 0) {
        var createFieldset = document.createElement("FIELDSET");
        document.body.appendChild(createFieldset).setAttribute("id", "display-fieldset");
        var inventoryFieldset = getByID("display-fieldset");
        var createLegend = document.createElement("LEGEND");
        var createTitle = document.createTextNode("ToDo Item added:");
        createLegend.appendChild(createTitle);
        inventoryFieldset.appendChild(createLegend)
            .setAttribute("id", "display-legend");
        var createDiv = document.createElement("div");
        inventoryFieldset.appendChild(createDiv)
            .setAttribute("id", "display-div");
        legendCount++;
    }
}
function createDisplayLI(id, a, b) {
    var createLI = document.createElement("LI");
    var createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
}
function getByID(id) {
    return document.getElementById(id);
}
function getInputByID(id) {
    return getByID(id).value;
}
function getInputValueByID(id) {
    return getByID(id).value;
}
