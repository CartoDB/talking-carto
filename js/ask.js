// getScreenshot();

function getScreenshot() {
    html2canvas(document.querySelector('html')).then(canvas => {
        $('#tc-screenshoot-sample').append(canvas)
    });
}

$('#tc-screenshot-checkbox').on('change', function() {
    // if(this.checked) {
    //     getScreenshot()
    // } else {
    //     $('#tc-screenshoot-sample').empty();
    // }
    if(this.checked) {
        $('#tc-screenshot-image').show()
    } else {
        $('#tc-screenshot-image').hide()
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
   

    console.log(navigator.sayswho);
    return navigator.sayswho
}

var currentNavigator =  getBrowser()
$('#tc-browser').val(currentNavigator);

/* Get user info */

function getCookieValue(cookieName) {
    var cookies = document.cookie.split("; ");
    for(var i = 0; i < cookies.length; i++){
      var keyValue = cookies[i].split("=");
      if(keyValue[0] == cookieName)
        return keyValue[1];
    }
    return null;
}


function isConnected(){
    if(getCookieValue("_cartodb_base_url"))
      return true;
    return false;
}

function getBaseURL() {
    return decodeURIComponent(getCookieValue("_cartodb_base_url"))
}

function setUserInfoForm(userData) {
    $('#tc-email').val(userData.email);
}

function setUserInfoFormMock(userMail) {
    $('#tc-email').val(userMail);
}
setUserInfoFormMock("cillas@cartodb.com")

/* Make support bee request to open ticket */
function sendMessage() {
    var service_id = 'gmail';
    var template_id = 'template_9tPC1hOy';
    var template_params = {
    name: 'Cillas',
    reply_email: $('#tc-email').val(),
    message: $('#tc-message').val(),
    subject: $('#tc-subject').val(),
    browser: currentNavigator,
    screenshot: $('#tc-screenshot-image').attr('src'),
    url: location.href
    };
    emailjs.send(service_id,template_id,template_params);

}

$("#tc-form").submit(function(event){
    event.preventDefault();
    sendMessage()
    //TO FILL WITH LAST SCREEN
})