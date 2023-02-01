const breakMin = document.getElementById("breakMin");
const breakNum = document.getElementById("breakNum");
const breakPlus = document.getElementById("breakPlus");
const workMin = document.getElementById("workMin");
const workNum = document.getElementById("workNum");
const workPlus = document.getElementById("workPlus");
const playPauseIcon = document.getElementById("playPauseIcon");
const timer = document.getElementById("timer");
const actionHeader = document.getElementById("actionHeader");
const filled = document.getElementById("filled");
const introParagraph = document.getElementById("introParagraph");

let breakNumValue = +breakNum.innerHTML;
let workNumValue = +workNum.innerHTML;
let minutes = 0;
let seconds = 0;
let isOnPlay = false;
let isInterval = false;
let isSession = true;
let filledHeight = 0;
let introHTML =
  '<div id="introParagraph"><p>Press the icon</p> <iconify-icon id="exampleIcon" icon="material-symbols:play-circle" width="30"></iconify-icon><p> to start the session</p></div>';

actionHeader.innerHTML = introHTML;

setValidDial = () => {
  let min;
  let sec;
  if (minutes <= 9) {
    min = `0${minutes}`;
  } else {
    min = `${minutes}`;
  }
  if (seconds <= 9) {
    sec = `0${seconds}`;
  } else {
    sec = `${seconds}`;
  }
  timer.innerHTML = `${min}:${sec}`;
};

setValidDial();

resetTimer = () => {
  resetTime();
  setValidDial();
  isOnPlay = false;
  isSession = true;
  playPauseIcon.setAttribute("icon", "material-symbols:play-circle");
  filled.style.height = `${0}px`;
  filledHeight = 0;
  filled.style.backgroundColor = `#9cc6c4eb`;
  actionHeader.innerHTML = introHTML;
};

resetTime = () => {
  minutes = 0;
  seconds = 0;
};

breakMin.addEventListener("click", () => {
  if (breakNumValue > 1) {
    breakNumValue--;
    breakNum.innerHTML = breakNumValue;
    resetTimer();
  }
});
breakPlus.addEventListener("click", () => {
  breakNumValue++;
  breakNum.innerHTML = breakNumValue;
  resetTimer();
});
workMin.addEventListener("click", () => {
  if (workNumValue > 1) {
    workNumValue--;
    workNum.innerHTML = workNumValue;
    workMinites = workNumValue;
    resetTimer();
  }
});
workPlus.addEventListener("click", () => {
  workNumValue++;
  workNum.innerHTML = workNumValue;
  workMinites = workNumValue;
  resetTimer();
});

playPauseIcon.addEventListener("click", () => {
  if (playPauseIcon.attributes.icon.value === "material-symbols:play-circle") {
    playPauseIcon.setAttribute("icon", "material-symbols:pause-circle");
  } else {
    playPauseIcon.setAttribute("icon", "material-symbols:play-circle");
  }

  isOnPlay = !isOnPlay;
  if (!isInterval) {
    isInterval = true;
    mytimerInterval = setInterval(myTimer, 1000);
  }
});

myTimer = () => {
  if (isOnPlay) {
    if (isSession) {
      actionHeader.innerHTML = "<div id='introParagraph'>Session</div>";
      if (minutes <= workNumValue) {
        filled.style.backgroundColor = `#37cabbeb`;
        filledHeight += 300 / (workNumValue * 60);
        filled.style.height = `${filledHeight}px`;
      }
      if (minutes < workNumValue) {
        seconds += 1;

        setValidDial();

        if (seconds >= 59) {
          seconds = -1;
          minutes += 1;
        }
      } else {
        minutes = 0;
        filledHeight = 0;
        resetTime();
        isSession = !isSession;
      }
    } else if (!isSession) {
      actionHeader.innerHTML = "<div id='introParagraph'>Break</div>";
      if (minutes <= breakNumValue) {
        filled.style.backgroundColor = `#57ca37eb`;
        filledHeight += 300 / (breakNumValue * 60);
        filled.style.height = `${filledHeight}px`;
      }
      if (minutes < breakNumValue) {
        seconds += 1;

        setValidDial();

        if (seconds === 59) {
          seconds = -1;
          minutes += 1;
        }
      } else {
        minutes = 0;
        filledHeight = 0;
        resetTime();
        isSession = !isSession;
      }
    }
  }
};
