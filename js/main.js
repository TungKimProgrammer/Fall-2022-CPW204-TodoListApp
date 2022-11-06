var picker = datepicker("#due-date", {
    formatter: function (input, date, instance) {
        var value = date.toLocaleDateString();
        input.value = value;
    }
});
var ToDoItem = (function () {
    function ToDoItem(desiredTitle, dueDate, isComplete) {
        this.title = desiredTitle;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
    }
    return ToDoItem;
}());
var completeItemList = [];
var incompleteItemList = [];
var completeLegendCount = 0;
var incompleteLegendCount = 0;
window.onload = function () {
    var addBtn = getByID("addButton");
    addBtn.addEventListener("click", clearErrMsg);
    addBtn.addEventListener("click", main);
    specialKeyEventListener("title");
    specialKeyEventListener("due-date");
};
function main() {
    addToDoItem();
}
function setItemULColor(id) {
}
function moveItem() {
}
function displayToDoItems() {
    createDisplayFrame();
    if (completeItemList.length >= 1 || incompleteItemList.length >= 1) {
        displaySpecificItemList("complete", completeItemList);
        displaySpecificItemList("incomplete", incompleteItemList);
    }
}
function displaySpecificItemList(s, list) {
    var DisplayDiv = getByID(s + "-div");
    DisplayDiv.setAttribute("style", "text-align: center;");
    DisplayDiv.innerHTML = "";
    list.sort(function (a, b) { return (a.dueDate > b.dueDate) ? 1 : -1; });
    for (var index in list) {
        var ulID = s + "-ul-" + index;
        var createUL = document.createElement("ul");
        createUL.setAttribute("id", ulID);
        DisplayDiv.appendChild(createUL);
        createDisplayLI(ulID, "Item ", index + 1);
        createDisplayLI(ulID, "Title: ", list[index].title);
        console.log(list[index].dueDate);
        createDisplayLI(ulID, "Due Date: ", list[index].dueDate.toDateString());
        if (list[index].isComplete) {
            createLiWithChkBx(ulID, s, index, "Is completed? ");
            getInputByID(s + "-li-" + index).checked = true;
        }
        else {
            createLiWithChkBx(ulID, s, index, "Is completed? ");
            getInputByID(s + "-li-" + index).checked = false;
        }
        createDisplayLI(ulID, "-----------------------", "-----------------------");
    }
}
function getToDoItem() {
    var title = getInputValueByID("title").trim();
    var dueDate = getInputValueByID("due-date");
    var isComplete = getInputByID("is-complete").checked;
    var month = parseInt(dueDate.substring(0, dueDate.indexOf("/")));
    var day = parseInt(dueDate.substring(dueDate.indexOf("/") + 1, dueDate.lastIndexOf("/")));
    var year = parseInt(dueDate.substring(dueDate.lastIndexOf("/") + 1));
    var item = new ToDoItem(title, new Date(year, month - 1, day), isComplete);
    return item;
}
function addToDoItem() {
    addInputEventToClearErrors();
    if (isValid()) {
        var item = getToDoItem();
        if (item.isComplete) {
            completeItemList.push(item);
            console.log("complete" + completeItemList);
            console.log(item);
        }
        else {
            incompleteItemList.push(item);
            console.log("incomplete" + incompleteItemList);
            console.log(item);
        }
        getByID("myForm").reset();
        setTimeout(function () { displayToDoItems(); }, 500);
    }
}
function isValid() {
    addInputEventToClearErrors();
    var title = getInputValueByID("title").trim();
    var dueDate = getInputValueByID("due-date").trim();
    var month = parseInt(dueDate.substring(0, dueDate.indexOf("/")));
    var day = parseInt(dueDate.substring(dueDate.indexOf("/") + 1, dueDate.lastIndexOf("/")));
    var year = parseInt(dueDate.substring(dueDate.lastIndexOf("/") + 1));
    var date = new Date(year, month - 1, day + 1);
    var today = new Date();
    console.log("entered date: " + date);
    console.log(today);
    if (title !== "" &&
        dueDate !== "" &&
        isValidDate(dueDate) &&
        today < date) {
        return true;
    }
    else {
        createErrorDisplay();
        if (title == "") {
            createErrLI("validationUL", "Title can't be empty!");
        }
        if (dueDate == "") {
            createErrLI("validationUL", "Due date can't be empty!");
        }
        if (dueDate !== "" && !isValidDate(dueDate)) {
            createErrLI("validationUL", "Due date is not valid!");
        }
        if (today > date) {
            createErrLI("validationUL", "The due date has been passed!");
        }
        return false;
    }
}
function isValidDate(input) {
    var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    var isCorrectFormat = pattern.test(input);
    return isCorrectFormat;
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
    getByID("title").addEventListener("input", clearErrMsg);
    getByID("due-date").addEventListener("input", clearErrMsg);
    getByID("is-complete").addEventListener("input", clearErrMsg);
}
function specialKeyEventListener(id) {
    var input = getInputByID(id);
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
function createDisplayFrame() {
    var createDisplayFrameDiv = document.createElement("DIV");
    createDisplayFrameDiv.setAttribute("id", "display-frame-div");
    createDisplayFrameDiv.setAttribute("style", "display: table; \
                                                 margin: auto; \
                                                 width: 100%");
    document.body.appendChild(createDisplayFrameDiv);
    if (incompleteLegendCount < 1) {
        createFieldset("incomplete");
        incompleteLegendCount++;
    }
    if (completeLegendCount < 1) {
        createFieldset("complete");
        completeLegendCount++;
    }
}
function createFieldset(s) {
    var displayFrameDiv = getByID("display-frame-div");
    var createFieldset = document.createElement("FIELDSET");
    createFieldset.setAttribute("id", s + "-fieldset");
    createFieldset.setAttribute("class", s + "-fieldset");
    createFieldset.setAttribute("style", "display: table-cell;");
    displayFrameDiv.appendChild(createFieldset);
    var fieldset = getByID(s + "-fieldset");
    var fieldsetClass = document.getElementsByClassName(s + "-fieldset");
    var legendCount = fieldsetClass[0].childElementCount;
    var createLegend = document.createElement("LEGEND");
    var legendTitle = s.charAt(0).toUpperCase() + s.slice(1);
    var createTitle = document.createTextNode(legendTitle + " Items");
    createLegend.appendChild(createTitle);
    fieldset.appendChild(createLegend)
        .setAttribute("id", s + "-legend");
    var createDiv = document.createElement("div");
    fieldset.appendChild(createDiv)
        .setAttribute("id", s + "-div");
}
function createDisplayLI(id, a, b) {
    var createLI = document.createElement("LI");
    var createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
}
function createLiWithChkBx(ulID, s, index, text) {
    var chkBxID = s + "-li-" + index;
    var createLI = document.createElement("LI");
    var createLINote = document.createTextNode(text);
    createLI.appendChild(createLINote);
    var createChkBx = document.createElement("input");
    createChkBx.setAttribute("id", chkBxID);
    createChkBx.setAttribute("type", "checkbox");
    getByID(ulID).appendChild(createLI).appendChild(createChkBx);
    ;
}
function getByID(id) {
    return document.getElementById(id);
}
function getInputByID(id) {
    return getByID(id);
}
function getInputValueByID(id) {
    return getByID(id).value;
}
