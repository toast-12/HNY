const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
let fireworksContainer = document.getElementById('fireworks-container');
let fireworks = document.querySelectorAll('.firework');
let fireworksActive = false;

// 현재 카운트다운 날짜로 새해 설정 (초기값: 2024년 1월 1일)
let currentYear = new Date().getFullYear();
let countdownDate = new Date(Date.UTC(currentYear + 1, 0, 1, 0, 0, 0)).getTime();
let isTestMode = false;  // 테스트 모드 활성화 여부

function updateClock() {
  const now = new Date();
  const distance = countdownDate - now.getTime();

  // 현재 날짜 (yyyy-mm-dd)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  dateElement.innerHTML = `${year}-${month}-${day}`;

  // 현재 시간 (hh:mm:ss)
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  clockElement.innerHTML = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  // 30초 전 색상 변경
  if (distance <= 30000 && !fireworksActive) {
    clockElement.style.color = "red";
  }

  // 새해 맞이 시 불꽃놀이 및 배경 변경
  if (distance <= 0 && !fireworksActive) {
    fireworksActive = true;
    startFireworks();
    document.body.style.background = "linear-gradient(to bottom, #FF7F00, #FFD700)";
    clockElement.style.color = "yellow";
  }

  // 테스트 모드에서 고정된 시간 표시
  if (isTestMode) {
    return;  // 시간이 더 이상 업데이트되지 않도록 종료
  }
}

function startFireworks() {
  fireworksContainer.classList.remove('hidden'); // 불꽃놀이 표시
  fireworks.forEach(firework => {
    firework.style.animation = "firework 2s forwards";  // 불꽃놀이 애니메이션
  });
}

// 키보드 입력 시 카운트다운 날짜 및 시간 초기화 (2 또는 4 키)
document.addEventListener('keydown', function(event) {
  if (event.key === '2' || event.key === '4') {
    // 예시 날짜: 2023년 12월 31일 23:59:50
    const testDate = new Date(2023, 11, 31, 23, 59, 50); // 12월 31일, 23시 59분 50초
    countdownDate = testDate.getTime();
    isTestMode = true; // 테스트 모드 활성화

    // 표시되는 날짜와 시간을 2023년 12월 31일 23:59:50로 설정
    dateElement.innerHTML = '2023-12-31';  // 날짜
    clockElement.innerHTML = '23:59:50';  // 시간
    
    clockElement.style.color = "white";
    fireworksContainer.classList.add('hidden');  // 불꽃놀이 숨기기
  }
});

setInterval(updateClock, 1000);  // 1초마다 updateClock 호출
