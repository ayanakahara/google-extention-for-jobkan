// backgroundで受け取った値を取得
function logBackgroundValue () {
    var test = chrome.extension.getBackgroundPage().test_value;
    reflectPopup(test);
    // return;
}

// 現在アクティブなタブにデータを送信
function sendToContents(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 
            JSON.stringify({ contents: "test value from popup" }),
            function (response) {
            });
    });    
}

function reflectPopup(test){
    let popupResult = document.querySelector('.result');//251
    if(test[0]> test[1]){
        let resultHour = Math.floor((test[0]- test[1])/60);
        let resultMinites = Math.abs((test[0]- test[1])% 60);
        popupResult.innerHTML= resultHour +":"+ resultMinites; //4:11
        document.querySelector('.over').classList.add('active');
    }
    if(test[0]< test[1]){
        let resultHour = Math.floor((test[1]- test[0])/60);
        let resultMinites = Math.abs((test[1]- test[0])% 60);
        popupResult.innerHTML= "-"+resultHour +":"+ resultMinites; //-4:11
        document.querySelector('.slow').classList.add('active');
    }
}
    

function animation(){
    document.querySelector('#log').classList.add('fadeout');
}
document.getElementById('log').addEventListener('click', logBackgroundValue);
document.getElementById('log').addEventListener('click', animation);
// document.getElementById('send').addEventListener('click', sendToContents);