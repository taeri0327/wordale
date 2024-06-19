let attempts = 0;
let index = 0;
let timer;
const clickKey = document.querySelector("footer");
const rotate = [{ transform: "rotate(360deg)" }];

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content: center; align-items: center; position : absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px; border: 1px solid black; transition: 3s ease-in;";
    document.body.appendChild(div);
    div.animate(rotate, 1000);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const clickKeyboard = (event) => {
    const clickKey = event.target.innerText; //event가 발생한 객체의 innertext = key
    const clickBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (clickKey === "") {
      // 만약 event가 발생한 개체의 text가 비어있으면
      handleBackspace();
      //backspace를 눌렀을 때 화면에 표시되는게 지워짐
    } else if (index === 5) {
      //엔터키 클릭했을 때
      if (clickKey === "ENTER") handleEnterKey();
      else return;
    } else if ("A" <= clickKey && clickKey <= "Z" && clickKey.length == 1) {
      clickBlock.innerText = clickKey;
      index += 1;
    }
  };

  const handleEnterKey = async () => {
    //정답확인코드 입력
    let 맞은_갯수 = 0;
    const 응답 = await fetch("/answer"); //await구문은 함수앞에 async를 넣어줘야 사용가능,
    //fetch()->javaScript에서 서버에 요청을 보낼때 사용
    //await 이라는 구문? -> 서버에서 서버로 요청을 보내고 응답을 기다리는 구문

    console.log("응답", 응답);
    const 정답_객체 = await 응답.json();
    //.json() -> JavaScript object notation의 약자 = 자바스크립트에 맞는 포맷으로 바꿔준다
    console.log("정답_객체", 정답_객체);

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      const keyboard = document.querySelector(
        `.browser-block[data-key='${block.innerText}']`
      );
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        keyboard.style.background = "#787C7E";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      keyboard.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const starTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date(); //-> 현재 시간 값을 가져옴
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString(); //toString(숫자를 문자열로 변환)
      const 초 = 흐른_시간.getSeconds().toString();
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`; //padstart(지정글자개수, 빈곳에 채울 내용)
    }

    timer = setInterval(setTime, 1000);
  };
  starTimer();
  window.addEventListener("keydown", handlekeydown);
  clickKey.addEventListener("click", clickKeyboard);
}

appStart();
