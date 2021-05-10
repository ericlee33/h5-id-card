//访问用户媒体设备的兼容方法
function getUserMedia(constrains) {
    if (navigator.mediaDevices?.getUserMedia) {
        //最新标准API
        return navigator.mediaDevices.getUserMedia(constrains);
    } else if (navigator.webkitGetUserMedia) {
        //webkit内核浏览器
        return navigator.webkitGetUserMedia(constrains);
    } else if (navigator.mozGetUserMedia) {
        //Firefox浏览器
        return navigator.mozGetUserMedia(constrains);
    } else if (navigator.getUserMedia) {
        //旧版API
        return navigator.getUserMedia(constrains);
    }
}

//成功的回调函数
function success(stream, video) {
    return new Promise((resolve, reject) => {
        video.srcObject = stream;

        //播放视频
        video.onloadedmetadata = function (e) {
            video.play();
            resolve();
        };
    });
}

function getUserMediaStream(videoNode) {
    //调用用户媒体设备，访问摄像头
    return getUserMedia({
        audio: false,
        // video: { facingMode: { exact: 'environment' } },
        video: true,
        // video: { facingMode: { exact: 'environment', width: 1280, height: 720 } },
    })
        .then(res => {
            return success(res, videoNode);
        })
        .catch(error => {
            console.log('访问用户媒体设备失败：', error.name, error.message);
            return Promise.reject();
        });
}

export { getUserMediaStream };
