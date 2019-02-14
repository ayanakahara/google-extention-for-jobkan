// backgroundで受け取った値を取得
function logBackgroundValue () {
    var result = chrome.extension.getBackgroundPage().result_value;
    console.log(result)
    reflectPopup(result);
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

function reflectPopup(result){
    let popupResult = document.querySelector('.result');
    if(result[2]=== 1){
        popupResult.innerHTML= "+"+result[0] +":"+ result[1]; //4:11
    }
    if(result[2]=== -1){
        popupResult.innerHTML= "-"+result[0] +":"+ result[1]; //4:11
    }
}
    

function animation(){
    document.querySelector('#log').classList.add('fadeout');
}
document.getElementById('log').addEventListener('click', logBackgroundValue);
document.getElementById('log').addEventListener('click', animation);
// document.getElementById('send').addEventListener('click', sendToContents);