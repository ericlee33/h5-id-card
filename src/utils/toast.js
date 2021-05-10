import { Toast } from 'antd-mobile';

function __hide() {
    Toast.hide();
}

function showToast(text = '', isError = true) {
    __hide();
    Toast.info(text || (isError && '出错了'), 2, null, false);
}

function hideToast() {
    __hide();
}

function hideLoading() {
    __hide();
}

function showLoading(text = 'Loading...') {
    __hide();
    Toast.loading(text, 0, () => {});
}

function showSuccess(config = {}) {
    const { text = 'Success', mask = false, duration = 2, onClose = () => {} } = config;
    Toast.success(text, duration, onClose, mask);
}

function showFail(config = {}) {
    const { text = 'fail', mask = false, duration = 2, onClose = () => {} } = config;
    Toast.fail(text, duration, onClose, mask);
}

export { showToast, hideToast, hideLoading, showLoading, showSuccess, showFail };
