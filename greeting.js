const form = document.querySelector(".js-form"), 
    input = form.querySelector("input"), 
    greeting = document.querySelector(".js-greetings");

const USER_LS = "Guest";  //단순 문자열로 상수 정의
const SHOWING_CN = "showing"; //css에서 불러온 클래스 상수 정의(편의상)

function saveName(text){
    localStorage.setItem(USER_LS, text);
    //local storage에 USER_LS를 저장
}

function handleSubmit(event){
    event.preventDefault();
    //event의 사라져 버리는(?) 기본 속성 제한
    const currentValue = input.value;
    //입력 값 저장해서 
    paintGreeting(currentValue);
    //인사하는 함수에 값 대입하여 출력
    saveName(currentValue);
    //그리고 그 값을 저장하는 함수 출력


}

function askForName() {
    form.classList.add(SHOWING_CN);
    //.showing 추가해서 이름 묻는 함수가 보여지게 함 
    form.addEventListener("submit", handleSubmit)
    // 나중에 확인하자.
}


function paintGreeting(text){
    form.classList.remove(SHOWING_CN); 
    //form이 들어간 classlist에서 showing 삭제
    //꼭 remove를 해야 하는가?
    greeting.classList.add(SHOWING_CN);
    //greeting이 들어간 classlist에 showing 추가)
    greeting.innerText = `Hello ${text}😃`;
    //greeting이 들어간 요소에 '내용' 추가
}

//html에 showing 클래스가 없지만, 위 함수가 classlist에 추가함으로써, showing에 대한 css요소(block)이 보여지게 됨

//해당 요소에 innerText를 통해 내용도 추가함

function loadName(){
    const currentGuest = localStorage.getItem(USER_LS);
    if(currentGuest ===null){
        askForName();
        // key가 없다면 이름을 묻는 함수 출력
    } else {
        paintGreeting(currentGuest);
        // key가 있다면 인사를 하는 함수 출력
   }
}


function init() {
    loadName();
}

init();



// 1. init() 는 loadName()이 실행한 것을 실행

// 2. loadName()은 Local storage에 key값을 획득하여 아래 조건 하에 함수 실행

// 2-1. 획득한 key값이 없다면(===null) askForName 실행
// 1) form class에 showing을 추가하여
// 2) input 창이 보여지게 함
// 3) 입력값을 handleSubmit 함수로 보냄(?)
// 4) handleSubmit은 event를 묶어둠(?)
// 5) 받은 입력값은 상수로 선언, 그 상수를 넣어 paintGreeting을 통해 실행(인사메세지 출력)
// 6) 미리 만들어 둔 saveName 함수에 상수를 넣어 실행(Local storage에 key값으로 저장)

// *paintGreeting은 
// /form class에 showing 삭제
// (romove를 안하면 form, h4 모두 보여지는 상태)
// /h4 class에 showing 추가1
// /h4 요소에 text 추가

// *saveName은 입력된 텍스트를 상수 USER_LS로서 Local storage에 key값으로 저장

// 2-2. 획득한 key값이 있다면 paintGreeting을 바로 실행
// (Local storage에 저장된 key 값을 상수로 선언하고 이를 대입하여 함수 실행)