var result_value= [];

// contents.jsで送信した値を受信
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        result_value = request.value;
    }
);

console.log(result_value);