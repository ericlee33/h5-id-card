import React, { useEffect, useRef, useState } from 'react';
import {
    showLoading,
    hideLoading,
    showFail,
    showSuccess,
    hideToast,
    showToast,
} from '../../utils/toast';
import styles from './photo.module.scss';
import { PictureOutlined, LeftOutlined } from '@ant-design/icons';
import { startCompress } from '../../utils/compressBase64';
import { withRouter } from 'react-router';
import { getUserMediaStream } from '../../utils/getUserMediaStream';

export default withRouter(({ history }) => {
    const [videoHeight, setVideoHeight] = useState(0);
    const [fileList, setFileList] = useState([]);
    const ref = useRef(null);

    useEffect(() => {
        const video = document.getElementById('video');
        const rectangle = document.getElementById('capture-rectangle');
        const container = document.getElementById('container');
        const _canvas = document.createElement('canvas');
        _canvas.style.display = 'block';

        getUserMediaStream(video)
            .then(() => {
                setVideoHeight(video.offsetHeight);
                startCapture();
            })
            .catch(err => {
                showFail({
                    text: '无法调起后置摄像头，请点击相册，手动上传身份证',
                    duration: 6,
                });
            });

        /**
         * 获取video中对应的真实size
         */
        function getRealSize() {
            const { videoHeight: vh, videoWidth: vw, offsetHeight: oh, offsetWidth: ow } = video;

            return {
                getHeight: height => {
                    return (vh / oh) * height;
                },
                getWidth: width => {
                    return (vw / ow) * width;
                },
            };
        }

        function isChildOf(child, parent) {
            var parentNode;
            if (child && parent) {
                parentNode = child.parentNode;
                while (parentNode) {
                    if (parent === parentNode) {
                        return true;
                    }
                    parentNode = parentNode.parentNode;
                }
            }
            return false;
        }

        function startCapture() {
            ref.current = setInterval(() => {
                const { getHeight, getWidth } = getRealSize();
                /** 获取框的位置 */
                const { left, top, width, height } = rectangle.getBoundingClientRect();

                /** 测试时预览 */
                // if (isChildOf(_canvas, container)) {
                //     container.removeChild(_canvas);
                // }
                // container.appendChild(_canvas);

                const context = _canvas.getContext('2d');
                _canvas.width = width;
                _canvas.height = height;

                context.drawImage(
                    video,
                    getWidth(left + window.scrollX),
                    getHeight(top + window.scrollY),
                    getWidth(width),
                    getHeight(height),
                    0,
                    0,
                    width,
                    height,
                );

                const base64 = _canvas.toDataURL('image/jpeg');
                // TODO 此处可以根据需要调用OCR识别接口
            }, 200);
        }

        /** 防止内存泄露 */
        return () => clearInterval(ref.current);
    }, []);

    /** 只支持1张图片 */
    function updateUploadFiles(url) {
        let files = [];
        if (url) {
            files = [{ url }];
        }

        setFileList(files);
    }

    const __formatUploadFile2base64AndCompress = file => {
        const handleImgFileBase64 = file => {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = function () {
                    resolve(reader.result);
                };
            });
        };

        showLoading();
        handleImgFileBase64(file)
            .then(res => {
                if (file.size > 750 * 1334) {
                    showLoading('图片压缩中...');
                    return startCompress(res);
                } else {
                    return res;
                }
            })
            .then(res => {
                hideLoading();
                updateUploadFiles();
                // TODO 上传
                showSuccess({
                    text: '上传成功!',
                });
            })
            .catch(err => {
                console.error(err);
                hideLoading();
                showFail({
                    text: '上传失败',
                });
            });
    };

    const onChangeFile = event => {
        const files = event.target.files;
        if (files?.[0]) {
            __formatUploadFile2base64AndCompress(files[0]);
        }
    };

    const customUploadProps = {
        onChange: onChangeFile,
        accept: 'image/jpeg,image/jpg,image/png',
        files: fileList,
    };

    /**
     * 从本地上传
     */
    const CustomUpload = customUploadProps => (
        <input className={styles['input']} type="file" {...customUploadProps} />
    );

    // const onClickBack = () => {
    //     history.goBack();
    // };

    return (
        <div id="container" className={styles.container}>
            {/* <LeftOutlined
                    style={{ fontSize: '0.555rem' }}
                    className={styles['back']}
                    onClick={onClickBack}
                /> */}
            <video
                id="video"
                autoPlay
                muted
                playsInline
                style={{
                    width: '100%',
                }}
            ></video>

            <div className={styles['shadow-layer']} style={{ height: `${videoHeight}px` }}>
                <div id="capture-rectangle" className={styles['capture-rectangle']}></div>

                <div className={styles['hold-tips']}>hold-tips</div>
            </div>

            <div className={styles.tips}>tips</div>

            <div className={styles['gallery-container']}>
                <CustomUpload {...customUploadProps} />
                <PictureOutlined className={styles['icon']} />
            </div>
        </div>
    );
});
