const 정답 = "APPLE";

let attempts = 0; //6번의 시도 가능(6개의 줄 존재) 0~5
let index = 0; //한줄에 5개 입력가능 0~4
let timer;
const rotate = [{ transform: "rotate(360deg)" }];
const rotateX = [{ transform: "rotateX(360deg)" }];

//전체를 하나의 함수로 지정 = appStart()
function appStart() {
  // body에 <div style="~~">게임이 종료됐습니다.</div>를 추가
  // 과제 : 회전애니메이션효과 주기
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content: center; align-items: center; position : absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px; border: 1px solid black; transition: 3s ease-in;";
    document.body.appendChild(div);
    // !! 과제
    div.animate(rotate, 1000);
  };

  //게임종료
  const gameover = () => {
    //게임종료시에는 맨처음 입력한 최하단 키보드 클릭이벤트삭제
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    // 게임종료시 interval clear -> 1초마다 주기성 반복 종료
    clearInterval(timer);
  };

  //다음줄로 넘어가기
  const nextLine = () => {
    //만약 시도가 6번째면 게임종료 호출
    if (attempts === 6) return gameover();
    //아니면 다음줄의 첫번째 칸으로 넘어감
    attempts += 1;
    index = 0;
  };

  //키보드를 클릭했을 때 이벤트
  const clickKeyboard = (event) => {
    const clickKey = event.target.innerText; //event가 발생한 객체의 innertext = key
    const clickBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    // 만약 event가 발생한 개체의 text가 비어있으면
    if (clickKey === "") {
      //backspace를 눌렀을 때 화면에 표시되는게 지워짐
      handleBackspace();
      clickBlock.style.border = "2px solid #d3d6da";
    } else if (index === 5) {
      //엔터키 클릭했을 때
      if (clickKey === "ENTER") handleEnterKey();
      else return;
    } else if ("A" <= clickKey && clickKey <= "Z" && clickKey.length == 1) {
      clickBlock.innerText = clickKey;
      clickBlock.style.border = "2px solid #787C7E";
      clickBlock.animate(
        { scale: [1, 0.9, 1], easing: ["ease-in", "ease-out", "ease-in"] },
        100
      );
      index += 1;
    }
  };

  // 한줄입력이 모두 끝나고 다음줄로 이동하기 위해 enter를 눌렀을 때
  const handleEnterKey = async () => {
    //정답확인코드 입력
    let 맞은_갯수 = 0;
    // const 응답 = await fetch("/answer"); //await구문은 함수앞에 async를 넣어줘야 사용가능,
    //fetch()->javaScript에서 서버에 요청을 보낼때 사용
    //await 이라는 구문? -> 서버에서 서버로 요청을 보내고 응답을 기다리는 구문

    // console.log("응답", 응답);
    // const 정답_객체 = await 응답.json();
    //.json() -> JavaScript object notation의 약자 = 자바스크립트에 맞는 포맷으로 바꿔준다
    // console.log("정답_객체", 정답_객체);

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
        //정답갯수 카운트 +1
        맞은_갯수 += 1;
        block.animate(rotateX, 500);
        block.animate({ easing: "ease-in-out" });
        block.style.background = "#6AAA64";
        keyboard.style.background = "#6AAA64";
        block.style.color = "white";
        keyboard.style.color = "white";
        block.style.border = "2px solid #6AAA64";
        // ~.includes('?')->~에 ?가 들어가있니 -> 맞으면 true
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        keyboard.style.background = "#C9B458";
        block.style.color = "white";
        keyboard.style.color = "white";
        block.style.border = "2px solid #C9B458";
      } else {
        block.style.background = "#787C7E";
        keyboard.style.background = "#787C7E";
        block.style.color = "white";
        keyboard.style.color = "white";
      }
    }
    //5개 다 맞으면 게임종료 호출
    if (맞은_갯수 === 5) gameover();
    //5개 다 맞은게 아니면 다음줄로 가깅
    else nextLine();
  };

  // 백스페이스를 눌렀을 때
  const handleBackspace = () => {
    // 만약 입력한 칸이 있으면
    if (index > 0) {
      // index의 이전 블럭을 선택
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      // 이전블럭의 text 삭제
      preBlock.innerText = "";
      preBlock.style.border = "2px solid #d3d6da";
    }
    // 만약 입력한 칸이 있다면 인덱스 하나 줄이기 = 전 칸으로 돌아가기
    if (index !== 0) index -= 1;
  };

  // 키보드가 키가 눌렸을 때의 함수 지정
  // 키보드의 키가 눌렸을 때의 이벤트를 event에 저장
  const handlekeydown = (event) => {
    // 현재 키보드에서 누른 키를 대문자로 변환 후 key에 저장
    const key = event.key.toUpperCase();
    // 현재 키보드에서 누른 키의 코드(숫자)를 keyCode에 저장
    const keyCode = event.keyCode;
    // 현재 문서에서 입력하고자하는 위치 = thisBlock
    const thisBlock = document.querySelector(
      //attempts(n번째 줄) 중에 index(1번째 칸)
      `.board-block[data-index='${attempts}${index}']`
    );

    // 백스페이스가 눌렸으면 handleBackspace호출
    if (event.key === "Backspace") handleBackspace();
    // index가 5
    else if (index === 5) {
      // Enter키가 눌렸으면 handleEnterKey호출
      if (event.key === "Enter") handleEnterKey();
      else return; //index가 5 + enter안눌림 => 중지
    } else if (65 <= keyCode && keyCode <= 90) {
      //key = A~Z
      // 입력하고자하는 위치에 키보드로 누른 키값을 저장함
      thisBlock.innerText = key;
      thisBlock.style.border = "2px solid #787C7E";
      thisBlock.animate(
        { scale: [1, 0.9, 1], easing: ["ease-in", "ease-out", "ease-in"] },
        100
      );
      // 해당 index(칸)이 입력되면 다음칸으로 이동시켜야 하기에 +1
      index += 1;
    }
  };

  //타이머 생성
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

    // timer = setInterval의 id출력, 몇번째 interval이 돌고있는지 확인가능
    timer = setInterval(setTime, 1000);
  };
  starTimer();

  //윈도우에서 키보드를 누르면 handlekeydown이벤트 발생
  window.addEventListener("keydown", handlekeydown);
  window.addEventListener("click", clickKeyboard);
}

appStart();
