var alarms = [];
var alarmCounter = 0;
function StartTimer(date) {
  var secondsT = document.getElementById("seconds");
  var hoursT = document.getElementById("hours");
  var minutesT = document.getElementById("minutes");
  var PmAm = document.getElementById("PmAm");
  // date = date.now();
  secondsT.value = date.getSeconds();
  minutesT.value = date.getMinutes();
  var temp = date.getHours();
  if (temp > 12) {
    hoursT.value = temp - 12;
    PmAm.innerHTML = "Pm";
  } else {
    if (temp == 0) {
      hoursT.value = 12;
    } else {
      hoursT.value = temp;
    }
    PmAm.innerHTML = "Am";
  }
}

function setAlarm() {
  var alarmTime = document.getElementById("alarmtime");
  if (alarmTime.value != "") {
    alarms.push(alarmTime.value);
    alarmTime.value = "";
    UpdateAlarmsOnScreen(alarms);
  }
}

function removeAlarm(currentAlarm) {
  alarms.splice(parseInt(currentAlarm.id), 1);
  UpdateAlarmsOnScreen(alarms);
}

function UpdateAlarmsOnScreen(List, divID = "alarms") {
  let txt = "";
  List.forEach(myFunction);
  document.getElementById(divID).innerHTML = txt;
  function myFunction(value, index, array) {
    txt += `
    <div class="alarm_item controls">
      <input type="time" id="alarmtime" value="${value}" readonly>
      <button class="btn cancel" id="${index}" onclick="removeAlarm(this)"> X </button>
    </div><br>`;
  }
}

setInterval(() => {
  var date = new Date();

  // slicing Time
  var hours = `${date.getHours()}`;
  var minutes = `${date.getMinutes()}`;
  var currentTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  StartTimer(date);

  if (alarms.length > 0 && alarms.includes(currentTime)) {
    // console.log(alarms, alarmCounter, alarmCounter);
    document.getElementById("audio").play();
    alarms.splice(alarms.indexOf(currentTime), 1);
    UpdateAlarmsOnScreen(alarms);

    // alarm for 10 seconds
    let alarmtimer = setInterval(() => {
      alarmCounter++;
      if (alarmCounter > 10) {
        document.getElementById("audio").pause();
        alarmCounter = 0;
        clearInterval(alarmtimer);
      }
    }, 1000);
  }
}, 1000);
