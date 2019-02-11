var elTable = document.querySelectorAll('.note tr');

var arrayTime = [];
Array.from(this.elTable, el => {
    var cellText = el.childNodes[13].innerText;
    if(!cellText) return;
    arrayTime.push(cellText);
});

var arrayTimeShifted = arrayTime.slice(1, arrayTime.length-1);// テーブルの勤務時間
var totalTimeTable = arrayTime[arrayTime.length-1];// テーブルの合計時間
var workDayCount = arrayTimeShifted.length; // 出勤日数
var totalWorkTime = arrayTimeShifted.length * 8* 60;// // 6* 8* 60= 2880min.

var hour = [];//  ["8", "9", "10", "8", "8", "7"]
var minites = [];// ["00", "41", "28", "00", "54", "08"]
for(var i= 0; i < workDayCount;i++){
hour.push(arrayTimeShifted[i].split(":", 2)[0]); 
minites.push(arrayTimeShifted[i].split(":", 2)[1]);
}


var dataHour = hour.map( hour => parseInt(hour, 10) );//[8, 9, 10, 8, 8, 7]
var dataMinites = minites.map( str => parseInt(str, 10) );// [0, 41, 28, 0, 54, 8]

var sum  = function(arr) {
    var sum = 0;
    arr.forEach(function(elm) {
        sum += elm;
    });
    return sum;
};

var arr = dataHour;
var sumDataHourtoMinnites = sum(arr)*60;// 50h*60min = 3000min.
var arr = dataMinites;
var sumDataMinites = sum(arr);// 131min.

var realWorkTime = sumDataHourtoMinnites + sumDataMinites;// 3131min.


// 送信側 contents -> background
chrome.runtime.sendMessage(
    { value: [realWorkTime,totalWorkTime] }
);

// 受信側 other tab -> contents(popup/option -> contents)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    return;
});



