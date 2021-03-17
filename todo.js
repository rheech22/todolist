const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".pendingList"),
    finishedList = document.querySelector(".finishedList");

const PENDING_LS = "pending";
const FINISH_LS = "finished";

let pendings = [];
let Finisheds = [];
let idNum = 1;

function saveThings(list, data) {
    localStorage.setItem(list, JSON.stringify(data));
}

function cleanPending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanedPendings = pendings.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    pendings = cleanedPendings;
    saveThings(PENDING_LS, pendings);
}

function cleanFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanedFinished = Finisheds.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    Finisheds = cleanedFinished;
    saveThings(FINISH_LS, Finisheds);
}

function ReturnToPending(event) {
    const text = getText(event);
    cleanFinished(event);
    paintPending(text);
}

function moveToFinished(event) {
    const text = getText(event);
    cleanPending(event);
    paintFinished(text);
}

function getText(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.querySelector("span").innerText;
    return text;
}

function paintPending(text) {
    const li = document.createElement("li");
    const firstBtn = document.createElement("button");
    const secondBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNum;
    idNum += 1;
    li.id = newId;
    span.innerText = text;
    firstBtn.innerText = "Del";
    secondBtn.innerText = "Done";
    li.append(span, firstBtn, secondBtn);
    pendingList.appendChild(li);
    firstBtn.addEventListener("click", cleanPending);
    secondBtn.addEventListener("click", moveToFinished);
    const pendingObj = {
        text: text,
        id: newId,
    };
    pendings.push(pendingObj);
    saveThings(PENDING_LS, pendings);
}

function paintFinished(text) {
    const li = document.createElement("li");
    const firstBtn = document.createElement("button");
    const secondBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNum;
    idNum += 1;
    li.id = newId;
    span.innerText = text;
    firstBtn.innerText = "Del";
    secondBtn.innerText = "Back";
    li.append(span, firstBtn, secondBtn);
    finishedList.appendChild(li);
    firstBtn.addEventListener("click", cleanFinished);
    secondBtn.addEventListener("click", ReturnToPending);
    const finishedObj = {
        text: text,
        id: newId,
    };
    Finisheds.push(finishedObj);
    saveThings(FINISH_LS, Finisheds);
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
