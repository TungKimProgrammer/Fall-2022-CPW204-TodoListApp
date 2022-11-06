// @ts-ignore: ignoring issue with js-datepicker lack of intellisense

// call datepicker from js library with format m/d/yyyy
const picker = datepicker("#due-date", {
    formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = value // => '1/1/2099'
    }
});
// set minimum past date
// picker.setMin(new Date());

class ToDoItem {
    title: string;
    dueDate: Date;
    isComplete: boolean;

    constructor(desiredTitle: string, dueDate: Date, isComplete: boolean) {
        this.title = desiredTitle;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
    }
}

var completeItemList: ToDoItem[] = [];
var incompleteItemList: ToDoItem[] = [];
var completeLegendCount = 0;
var incompleteLegendCount = 0;

window.onload = function () {
    let addBtn = <HTMLElement>getByID("addButton");
    //addBtn.onclick = additem;

    addBtn.addEventListener("click", clearErrMsg);
    addBtn.addEventListener("click", main);

    // button clicked when 'Enter' key pressed
    // form reset and err msg cleared when 'ESC' key pressed
    specialKeyEventListener("title");
    specialKeyEventListener("due-date");

    /* 
        addBtn.onclick = () => {
            clearErrMsg();
            additem();
        }
    */
}


function main(): void {
    addToDoItem();
}

// sets color for complete and non-complete item
function setItemULColor(id: string): void {

}

// Allows user to mark a ToDoItem as complete

// Stores ToDoItems in cookies or web storage

// moves complete and non-complete item
function moveItem(): void {

}

// display item
function displayToDoItems(): void {
    createDisplayFrame();
    if (completeItemList.length >= 1 || incompleteItemList.length >= 1) {
        displaySpecificItemList("complete", completeItemList);
        displaySpecificItemList("incomplete", incompleteItemList);
    }
}

function displaySpecificItemList(s: string, list: ToDoItem[]) {
    let DisplayDiv = getByID(s + "-div");
    DisplayDiv.setAttribute("style", "text-align: center;");
    DisplayDiv.innerHTML = "";

    // sort ToDoItems list by due date
    list.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
    //completeItemList.sort((a,b) => (a.dueDate > b.dueDate) ? 1 : ((b.dueDate > a.dueDate) ? -1 : 0));

    // create and add ul list with item details 
    for (var index in list) {
        let ulID = s + "-ul-" + index;
        let createUL = document.createElement("ul");
        createUL.setAttribute("id", ulID);
        DisplayDiv.appendChild(createUL);

        createDisplayLI(ulID, "Item ", index + 1);
        createDisplayLI(ulID, "Title: ", list[index].title);
        console.log(list[index].dueDate);
        createDisplayLI(ulID, "Due Date: ", list[index].dueDate.toDateString());
        if (list[index].isComplete) {
            //createDisplayLI(ulID, "Status: ", "COMPLETED");
            createLiWithChkBx(ulID, s, index, "Is completed? ");
            getInputByID(s + "-li-" + index).checked = true;
        }
        else {
            //createDisplayLI(ulID, "Status: ", "NOT YET COMPLETED");
            createLiWithChkBx(ulID, s, index, "Is completed? ");
            getInputByID(s + "-li-" + index).checked = false;
        }
        createDisplayLI(ulID, "-----------------------", "-----------------------");
    }
}


/**
 * Get all input from the form and assign to a ToDoItem object
 */
 function getToDoItem(): ToDoItem {
    // get data from the form
    let title = getInputValueByID("title").trim();
    let dueDate = getInputValueByID("due-date");
    let isComplete = getInputByID("is-complete").checked;

    let month = parseInt(dueDate.substring(0, dueDate.indexOf("/")));
    let day = parseInt(dueDate.substring(dueDate.indexOf("/") + 1, dueDate.lastIndexOf("/")));
    let year = parseInt(dueDate.substring(dueDate.lastIndexOf("/") + 1));

    // Create item from input
    let item = new ToDoItem(title, new Date(year, month - 1, day), isComplete);

    return item;
}

/**
 * add ToDoItem to database when all conditions are met
 */
function addToDoItem(): void {
    addInputEventToClearErrors();
    if (isValid()) {
        let item = getToDoItem();
        if (item.isComplete) {
            completeItemList.push(item);
            console.log("complete" + completeItemList);
            console.log(item);
        }
        else {
            incompleteItemList.push(item);
            console.log("incomplete"+incompleteItemList);
            console.log(item);
        }
        (<HTMLFormElement>getByID("myForm")).reset();
        setTimeout(() => { displayToDoItems(); },500)
        //displayToDoItem(item);
        
    }
}

/**
 * Checks form data is valid
 */
function isValid(): boolean {
    
    addInputEventToClearErrors();
    let title = getInputValueByID("title").trim();
    let dueDate = getInputValueByID("due-date").trim();

    let month = parseInt(dueDate.substring(0, dueDate.indexOf("/")));
    let day = parseInt(dueDate.substring(dueDate.indexOf("/") + 1, dueDate.lastIndexOf("/")));
    let year = parseInt(dueDate.substring(dueDate.lastIndexOf("/") + 1));

    // JS counts month from 0, need to subtract 1 from month
    // day counts at 00:00:00, add 1 to day to count the whole day until mid night
    let date = new Date(year, month - 1, day + 1);
    let today = new Date();
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

/**
 * checks valid date input
 * @param input date
 * @returns true if input date is valid
 */
function isValidDate(input: string): boolean {
    // Validating mm/dd/yyyy or m/d/yyyy
    // \d{1,2}\/d{1,2}\/d{4}
    let pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    let isCorrectFormat = pattern.test(input);

    return isCorrectFormat;
}

/**
 * create ul to display error messages
 */
var ulErrCount = 0;
function createErrorDisplay(): void {
    let validationDiv = getByID("error-div");
    validationDiv.setAttribute("style", "display: flex; \
                                         justify-content: center; ");
    while (ulErrCount == 0) {
        // create and add ul list with item details 
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
function createErrLI(id: string, s: string): void {
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
function clearErrMsg(): void {
    if (ulErrCount != 0) {
        getByID("validationUL").innerHTML = "";
    }
}

/**
 * function that clears error messages user starts typing 
 */
function addInputEventToClearErrors() {
    getByID("title").addEventListener("input", clearErrMsg);
    getByID("due-date").addEventListener("input", clearErrMsg);
    getByID("is-complete").addEventListener("input", clearErrMsg);
}

/**
 * execute functions when particular key entered
 * @param event of key pressed
 */
function specialKeyEventListener(id: string): void {
    let input = getInputByID(id);
    let addBtn = <HTMLElement>getByID("addButton");
    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keyup", function (event) {
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
 * create display frame div to display complete and incomplete items added,
 */
function createDisplayFrame(): void {
    // create a div to display ToDoItems
    let createDisplayFrameDiv = document.createElement("DIV");
    createDisplayFrameDiv.setAttribute("id", "display-frame-div");
    createDisplayFrameDiv.setAttribute("style", "display: table; \
                                                 margin: auto; \
                                                 width: 100%");
    document.body.appendChild(createDisplayFrameDiv);
    if (incompleteLegendCount < 1) { // prevent creating multiple <legend>
        createFieldset("incomplete");
        incompleteLegendCount++
    }
    if (completeLegendCount < 1) {
        createFieldset("complete");
        completeLegendCount++
    }
}

/**
 * creates fieldset for complete/incomplete items
 * @param s "complete" or "incomplete"
 */
function createFieldset(s: string): void {
    let displayFrameDiv = getByID("display-frame-div");

    // create and add fieldset to "display-frame-div" to display Complete Items
    let createFieldset = document.createElement("FIELDSET");
    createFieldset.setAttribute("id", s + "-fieldset");
    createFieldset.setAttribute("class", s + "-fieldset");
    createFieldset.setAttribute("style", "display: table-cell;");
    displayFrameDiv.appendChild(createFieldset);

    let fieldset = getByID(s + "-fieldset");

    let fieldsetClass = document.getElementsByClassName(s + "-fieldset");
    let legendCount = fieldsetClass[0].childElementCount;


    // create <legend>s + Items</legend>
    // add <legend>Complete Items</legend> in the <fieldset id= s + "-fieldset">
    let createLegend = document.createElement("LEGEND");
    let legendTitle = s.charAt(0).toUpperCase() + s.slice(1)
    let createTitle = document.createTextNode(legendTitle + " Items");

    createLegend.appendChild(createTitle);

    fieldset.appendChild(createLegend)
        .setAttribute("id", s + "-legend");

    let createDiv = document.createElement("div");
    fieldset.appendChild(createDiv)
        .setAttribute("id", s + "-div");
}

/**
 * create li line to display ToDoItem
 * @param id of ul of current item
 * @param a Title/Field such as item Title
 * @param b extra information to display
 */
function createDisplayLI(id: string, a: string, b: string) {
    let createLI = document.createElement("LI");
    let createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
}

/**
 * create li line with check box for "is complete" of ToDoItem
 * @param id of ul of current item
 * @param s "complete" or "incomplete"
 * @param text extra information to display
 */
 function createLiWithChkBx(ulID: string, s: string, index: string, text: string) {
    let chkBxID = s + "-li-" + index;
    let createLI = document.createElement("LI");
    let createLINote = document.createTextNode(text);
    createLI.appendChild(createLINote);
    let createChkBx = document.createElement("input");
    createChkBx.setAttribute("id", chkBxID);
    createChkBx.setAttribute("type", "checkbox");
    getByID(ulID).appendChild(createLI).appendChild(createChkBx);;
}

/**
 * short version of document.getElementById()
 * @param id of input textbox
 * @returns document.getElementById(id); 
 */
function getByID(id: string) {
    return document.getElementById(id);
}

/**
 * short version of (<HTMLInputElement>document.getElementById()).value
 * @param id of input textbox
 * @returns value of input textbox
 */
function getInputByID(id: string) {
    return <HTMLInputElement>getByID(id);
}

/**
 * short version of (<HTMLInputElement>document.getElementById()).value
 * @param id of input textbox
 * @returns value of input textbox
 */
function getInputValueByID(id: string) {
    return (<HTMLInputElement>getByID(id)).value;
}

