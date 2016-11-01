/*
    reuse
    嘉禄前端
 */

// 状态代码
var STATUSCODE = {
    'success' : 0 ,
    'error' : 1
}

// 成功提示
function showSuccessTip(tip, time){
    var tip = arguments[0] || '操作成功';
    var time = arguments[1] || 3;
    var background = '#5cb85c';
    var bordercolor = '#4cae4c';

    showTip(tip, time, background, bordercolor);
}

// 失败提示
function showFailTip(tip, time){
    var tip = arguments[0] || '操作失败';
    var time = arguments[1] || 3;
    var background = '#c9302c';
    var bordercolor = '#ac2925';

    showTip(tip, time, background, bordercolor);
}

// 提示
function showTip(tip, time, background, bordercolor) {
    var windowWidth = document.documentElement.clientWidth;
    var height = 10;
    var width = 200;
    var tipsDiv = '<div class="tipsClass">' + tip + '</div>';

    $('body').append(tipsDiv);
    $('div.tipsClass').css({
        'z-index': 9999,
        'top': height + 'px',
        'width': width + 'px',
        'height': '30px',
        'left': (windowWidth / 2) - (width / 2) + 'px',
        'position': 'fixed',
        'padding': '3px 5px',
        'background': background,
        'border': '1px solid transparent',
        'border-color': bordercolor,
        'border-radius':'4px',
        'font-size': 14 + 'px',
        'margin': '0 auto',
        'text-align': 'center',
        'color': '#fff',
        'opacity': '0.8'
    }).show();
    setTimeout(function(){$('div.tipsClass').fadeOut(); $('div.tipsClass').remove()}, (time * 1000));
}


// ajax 请求
function ajax(url, data) {
    var result = '';
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        async: false,
        success: function(data) {
            if (STATUSCODE['success'] == data['code']){
                showSuccessTip(data['message']);
                result = data;
            }else{
                console.log('Error message:未知错误!');
                showFailTip(data['message']);
            }
        },
        error: function(data) {
            console.log('Error message:' + data);
        },
    });
    return result;
}

// ajax 上传图片
function ajaxPostFile(url, data) {
    var result = '';
    $.ajax({
        url: url,
        type: 'POST',
        xhr: function() {
            myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
            }
            return myXhr;
        },
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        async: false,
        success: function(data) {
             if (STATUSCODE['success'] == data['code']){
                showSuccessTip(data['message']);
                result = {'message': data['message'], 'data': data['data']};

                //若数据是加密过的，则需要用以下函数解密
                //result = {'message': data['message'], 'data': ajaxResponseDecode(data['data'])};
            }else{
                console.log('Error message:未知错误!');
                showFailTip(data['message']);
            }
        },
        error: function(data) {
            console.log(data);
        },
    });
    return result;
} 

// 解密
function ajaxResponseDecode(data) {
    return $.parseJSON($.base64.decode(data, 'UTF-8'));
}