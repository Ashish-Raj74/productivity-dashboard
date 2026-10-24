function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var allFullElems = document.querySelectorAll(".fullElems");
  var allFullBack = document.querySelectorAll(".fullElems .back");
  // Target the landing section containing the header and video
  var mainDashboard = document.querySelector(".allelems");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullElems[elem.id].style.display = "block";
      mainDashboard.style.display = "none";
    });
  });

  allFullBack.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullElems[elem.id].style.display = "none";
      mainDashboard.style.display = "block";
    });
  });
}

openFeatures();

function todoList() {
  let form = document.querySelector(".addTask form");
  let formInput = document.querySelector(".addTask form input");
  let formDetailInput = document.querySelector(".addTask form textarea");

  // localStorage.clear(current)
  var current = [];

  if (localStorage.getItem("current")) {
    current = JSON.parse(localStorage.getItem("current"));
  } else {
    console.log("List is empty");
  }

  if (!Array.isArray(current)) current = [];

  function renderTask() {
    var allTask = document.querySelector(".allTask");
    var sum = "";

    current.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
                        <h5>${elem.task}</h5>
                        <button id = ${idx}>Mark as Done</button>
                    </div>`;
    });
    allTask.innerHTML = sum;

    localStorage.setItem("current", JSON.stringify(current));

    var markCompletedBtn = document.querySelectorAll(".task button");
    markCompletedBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        current.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    current.push({ task: formInput.value, details: formDetailInput.value });

    formInput.value = "";
    formDetailInput.value = "";

    //   console.log(current);

    renderTask();
  });
}

todoList();

function dailyPlanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var dayPlanner = document.querySelector(".day-planner");
  var hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var saveData = dayPlanData[idx] || "";
    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value = ${saveData}>
                </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

function motivationQuotes() {
  var motivationQuote = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let motidata = await response.json();
    console.log(motidata);
    

    motivationQuote.innerHTML = motidata.quote;
    motivationAuthor.innerHTML = motidata.author;
  }

  document.querySelector(".moti").addEventListener("click", fetchQuote);
}

motivationQuotes();

function pomoTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start-btn");
  var pauseBtn = document.querySelector(".pomo-timer .pause-btn");
  var resetBtn = document.querySelector(".pomo-timer .reset-btn");
  var sessionType = document.querySelector(".pomo-session");

  var isWorkSession = true;

  let timerInterval = null;
  let totalSeconds = 25 * 60;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    if (isWorkSession) {
      // totalSeconds = 25*60;
      sessionType.innerHTML = "Work Session";
      sessionType.style.backgroundColor = "rgb(8, 138, 89)";
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          totalSeconds = 5 * 60;
          sessionType.innerHTML = "Take a Break";
          sessionType.style.backgroundColor = "rgb(22, 174, 239)";
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
        }
      }, 0.1);
    } else {
      // totalSeconds = 5*60;
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          totalSeconds = 25 * 60;
          sessionType.innerHTML = "Work Session";
          sessionType.style.backgroundColor = "rgb(8, 138, 89)";
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
        }
      }, 0.1);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 60 * 25;
    updateTimer();
  }

  startBtn.addEventListener("click", function () {
    startTimer();
  });

  pauseBtn.addEventListener("click", function () {
    pauseTimer();
  });

  resetBtn.addEventListener("click", function () {
    resetTimer();
  });
}

pomoTimer();

let apiKey = "21eb857db0ba46f9b45122647261910";
var city = "Pune";
var data = null;

var headerTemp = document.querySelector(".header2 h2");
var headerCond = document.querySelector(".header2 h4");
var headIndex = document.querySelector(".header2 .heat");
var humidity = document.querySelector(".header2 .humi");
var wind = document.querySelector(".header2 .wind");

async function weatherApi() {
  var response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
  );
  data = await response.json();

  headerTemp.innerHTML = `${data.current.temp_c}°C `;
  console.log(data.current.condition.text); // gives current like cloudy,light rain ... etc
  console.log(data.current);

  headerCond.innerHTML = `${data.current.condition.text}`;
  headIndex.innner = `Heat Index: ${data.current.headindex_c}°C`;
  humidity.innerHTML = `Humidity:${data.current.humidity}%`;
  wind.innerHTML = `Wind: ${data.current.wind_kph} Km/h`;
}

weatherApi();

var todayDay = document.querySelector(".header1 h2");
var todayDate = document.querySelector(".header1 h3");

function timeDate() {
  const totalDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const totalMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var date = new Date();
  var dayOfWeek = totalDays[date.getDay()];
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var secs = date.getSeconds();

  var ampm = hours>=12? "PM" : "AM";

  todayDay.innerHTML = `${dayOfWeek}, ${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")} ${ampm}`;

  var todaydate = date.getDate();
  var month = totalMonths[date.getMonth()];
  var year = date.getFullYear();

  todayDate.innerHTML = `${todaydate} ${month}, ${year}`;
}
setInterval(() => {
  timeDate();
}, 1000);


document.querySelector('.goals').addEventListener('click', function(){
  alert("Feature currently Unavailable!");
  
})


var theme = document.querySelector('.theme');
var rootElement = document.documentElement;
var flag = 0;

theme.addEventListener('click', function(){
    // --pri: #DCE7DE;
    // --sec: #B8664F;
    // --tri1: #AA8B56;
//     --tri2: #3F607A;
// --new: #5D7A91C8;
// --btn: #263F55;

    if(flag == 0){
      rootElement.style.setProperty('--new', '#5D7A91C8');
      rootElement.style.setProperty('--tri2', '#3e5d74e3');
      rootElement.style.setProperty('--btn', '#263F55');
      flag = 1;
    }
    else if(flag == 1){
      rootElement.style.setProperty('--new', '#7A648DC8');
      rootElement.style.setProperty('--tri2', '#5B456F');
      rootElement.style.setProperty('--btn', '#392B4A');
      flag = 2;
    }
    else if(flag == 2){
      rootElement.style.setProperty('--new', '#477D83C8');
      rootElement.style.setProperty('--tri2', '#28616A');
      rootElement.style.setProperty('--btn', '#174149');
      flag = 3;
    }
    else if(flag == 3){
      rootElement.style.setProperty('--new', '#935F4BC8');
      rootElement.style.setProperty('--tri2', '#A85E43');
      rootElement.style.setProperty('--btn', '#693825');
      flag = 4;
    }
    else if(flag == 4){
      rootElement.style.setProperty('--new', '#70958CC8');
      rootElement.style.setProperty('--tri2', '#1E4745');
      rootElement.style.setProperty('--btn', '#713F2A');
      flag = 0;
    }

})