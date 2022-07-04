import { Toast } from 'antd-mobile';

function __hide() {
  Toast.hide();
}

function showToast(text = '', isError = true) {
  __hide();
  Toast.info(text || (isError && '出错了'), 2, undefined, false);
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

function showSuccess(config: Record<string, any> = {}) {
  const { text = 'Success', mask = false, duration = 2, onClose = () => {} } = config;
  Toast.success(text, duration, onClose, mask);
}

function showFail(config: Record<string, any> = {}) {
  const { text = 'fail', mask = false, duration = 2, onClose = () => {} } = config;
  Toast.fail(text, duration, onClose, mask);
}

export { showToast, hideToast, hideLoading, showLoading, showSuccess, showFail };
