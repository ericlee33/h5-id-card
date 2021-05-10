function startCompress(base64) {
    function compress(
        base64, // 源图片
        rate, // 缩放比例
        resolve,
    ) {
        //处理缩放，转格式
        var _img = new Image();
        _img.src = base64;
        _img.onload = function () {
            var _canvas = document.createElement('canvas');
            var w = this.width / rate;
            var h = this.height / rate;
            _canvas.setAttribute('width', w);
            _canvas.setAttribute('height', h);
            _canvas.getContext('2d').drawImage(this, 0, 0, w, h);
            var base64 = _canvas.toDataURL('image/jpeg');
            _canvas.toBlob(function (blob) {
                // blob size单位为byte 1000byte = 1kb  1000kb = 1mb
                if (blob.size > 750 * 1334) {
                    //如果还大，继续压缩
                    compress(base64, rate, resolve);
                } else {
                    resolve(base64);
                }
            }, 'image/jpeg');
        };
    }

    return new Promise(resolve => {
        compress(base64, 1.5, resolve);
    });
}

export { startCompress };
