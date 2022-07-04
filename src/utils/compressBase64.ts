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
      var w = _img.width / rate;
      var h = _img.height / rate;
      _canvas.setAttribute('width', w.toString());
      _canvas.setAttribute('height', h.toString());
      _canvas.getContext('2d')?.drawImage(_canvas, 0, 0, w, h);
      var base64 = _canvas.toDataURL('image/jpeg');
      _canvas.toBlob(function (blob) {
        // blob size单位为byte 1000byte = 1kb  1000kb = 1mb
        if (blob?.size ?? 0 > 750 * 1334) {
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
