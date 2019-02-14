    this.generateArrWorkTime();

    function generateArrWorkTime(){
        const elTable =  document.querySelectorAll('.note tr');
        let arrWorkTimeColumn = []; //["労働時間", "08:00", "09:41", "10:28", "08:00", "08:54", "07:08", "10:36", "07:11", "07:54", "77:52"]
        Array.from(elTable, el => {
            let strWorkTimeCell = el.childNodes[13].innerText;
            if(!strWorkTimeCell) return;
            arrWorkTimeColumn.push(strWorkTimeCell);
        });
        arrWorkTimeColumn.shift();// ["08:00", "09:41", "10:28", "08:00", "08:54", "07:08", "10:36", "07:11", "07:54", "77:52"]
        this.arrangeArrWorkTimeColumn(arrWorkTimeColumn);
    };

    function arrangeArrWorkTimeColumn(arrWorkTimeColumn){
        let arrWorkTimeLength = arrWorkTimeColumn.length; //10
        if(!arrWorkTimeLength) return;
        this.splitStrTime(arrWorkTimeColumn,arrWorkTimeLength);
    };

    function splitStrTime(array,length){
        let strHour = [];//  ["08", "09", "10", "08", "08", "07", "10", "07", "07", "77"]
        let strMinites = [];// ["00", "41", "28", "00", "54", "08", "36", "11", "54", "52"]
        for(var i= 0; i < length; i++){
            strHour.push(array[i].split(":", 2)[0]); 
            strMinites.push(array[i].split(":", 2)[1]);
        }
        this.changeStrTime(strHour,strMinites);
    }

    function changeStrTime(strHour,strMinites){
        const dataHour = strHour.map( str => parseInt(str, 10) );//[8, 9, 10, 8, 8, 7, 10, 7, 7, 77]
        const dataMinites = strMinites.map( str => parseInt(str, 10) );// [0, 41, 28, 0, 54, 8, 36, 11, 54, 52]
        this.separateArr(dataHour,dataMinites);
    };

    function separateArr(hour,minites){
        var endHour = hour[hour.length-1];//77
        var endMinites = minites[minites.length-1];//52
        hour.pop();//[8, 9, 10, 8, 8, 7, 10, 7, 7]
        minites.pop();//[0, 41, 28, 0, 54, 8, 36, 11, 54]
        this.sumResult(hour,minites,endHour,endMinites);
    }

    function sum(arr){
        let sum = 0;
        arr.forEach(function(elm) {
            sum += elm;
        });
        return sum;
    }

    function sumResult(hour,minites,endHour,endMinites){
        let recentryHour = hour.pop();//7 hour= [8, 9, 10, 8, 8, 7, 10, 7]
        let recentryMinites = minites.pop();//54 minites = [0, 41, 28, 0, 54, 8, 36, 11]
        const correct = hour.length*8*60 + recentryHour*60 + recentryMinites;
        this.calcDifference(correct,endHour,endMinites);
    }

    function calcDifference(correct,endHour,endMinites){
        const diff = endHour *60+endMinites - correct;
        const resultHour = Math.floor(Math.abs(diff)/60);
        const resultMinites = Math.abs(diff)%60;
        if(diff>0) isTime = 1;
        if(diff<0) isTime = -1;
        this.send(resultHour,resultMinites,isTime);
    }

    function send(resultHour,resultMinites,isTime){
        // // 送信側 contents -> background
        chrome.runtime.sendMessage(
            { value: [resultHour,resultMinites,isTime] }
        );
    }




// 受信側 other tab -> contents(popup/option -> contents)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    return;
});

