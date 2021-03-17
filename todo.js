const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".pendingList"),
    finishedList = document.querySelector(".finishedList");

const PENDING_LS = "pending";
const FINISH_LS = "finished";

let pendings = [];
let Finisheds = [];
let idNum = 1;

function savePending() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function saveFinished() {
    localStorage.setItem(FINISH_LS, JSON.stringify(Finisheds));
}

function cleanPending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanedPendings = pendings.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    pendings = cleanedPendings;
    savePending();
}

function cleanFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanedFinished = Finisheds.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    Finisheds = cleanedFinished;
    saveFinished();
}

function ReturnToPending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const CheckBtn = document.createElement("button");
    const ReturnBtn = li.querySelector("button:nth-child(3)");
    const newDelBtn = document.createElement("button");
    newDelBtn.innerText = "Del";
    const newId = idNum;
    idNum += 1;
    li.id = newId;
    li.removeChild(ReturnBtn);
    CheckBtn.innerText = "Done";
    li.appendChild(newDelBtn);
    li.appendChild(CheckBtn);
    pendingList.appendChild(li);
    const text = li.querySelector("span").innerText;
    const returnedObj = {
        text: text,
        id: newId,
    };

    const DelBtn = li.querySelector("button");
    li.removeChild(DelBtn);
    newDelBtn.addEventListener("click", cleanPending);
    CheckBtn.addEventListener("click", cleanPending);
    CheckBtn.addEventListener("click", moveToFinished);
    pendings.push(returnedObj);
    savePending();
}

function moveToFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const newDelBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    const newId = idNum;
    idNum += 1;
    li.id = newId;
    newDelBtn.innerText = "Del";
    returnBtn.innerText = "Back";
    returnBtn.addEventListener("click", cleanFinished);
    returnBtn.addEventListener("click", ReturnToPending);
    newDelBtn.addEventListener("click", cleanFinished);
    li.appendChild(newDelBtn);
    li.appendChild(returnBtn);
    const text = li.querySelector("span").innerText;
    const movedObj = {
        text: text,
        id: newId,
    };

    finishedList.appendChild(li);
    const DelBtn = li.querySelector("button:nth-child(2)");
    li.removeChild(DelBtn);
    const CheckBtn = li.querySelector("button:nth-child(2)");
    li.removeChild(CheckBtn);
    Finisheds.push(movedObj);
    saveFinished();
}

function paintPending(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const CheckBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNum;
    li.id = newId;
    idNum += 1;
    delBtn.innerText = "Del";
    CheckBtn.innerText = "Done";
    delBtn.addEventListener("click", cleanPending);
    CheckBtn.addEventListener("click", cleanPending);
    CheckBtn.addEventListener("click", moveToFinished);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(CheckBtn);
    pendingList.appendChild(li);
    const pendingObj = {
        text: text,
        id: newId,
    };
    pendings.push(pendingObj);
    savePending();
}

function paintFinished(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNum;
    idNum += 1;
    li.id = newId;
    delBtn.innerText = "Del";
    returnBtn.innerText = "Back";
    delBtn.addEventListener("click", cleanFinished);
    returnBtn.addEventListener("click", cleanFinished);
    returnBtn.addEventListener("click", ReturnToPending);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(returnBtn);
    finishedList.appendChild(li);
    const finishedObj = {
        text: text,
        id: newId,
    };
    Finisheds.push(finishedObj);
    saveFinished();
}

function loadPending() {
    const loadedPending = localStorage.getItem(PENDING_LS);
    if (loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(function (task) {
            paintPending(task.text);
        });
    }
}

function loadFinished() {
    const loadedFinished = localStorage.getItem(FINISH_LS);
    if (loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function (task) {
            paintFinished(task.text);
        });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintPending(currentValue);
    toDoInput.value = "";
}

function init() {
    loadPending();
    loadFinished();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
