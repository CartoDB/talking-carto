getScreenshot();

function getScreenshot() {
    html2canvas(document.querySelector('html')).then(canvas => {
        $('#tc-screenshoot-sample').append(canvas)
    });
}

$('#tc-screenshot-checkbox').on('change', function() {
    if(this.checked) {
        getScreenshot()
    } else {
        $('#tc-screenshoot-sample').empty();
    }
})

function getBrowser() {
    navigator.sayswho= (function(){
        var ua= navigator.userAgent, tem, 
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })();
    $('#tc-browser').val(hello);

    console.log(navigator.sayswho);
    return navigator.sayswho
}