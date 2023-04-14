import styles from './index.module.scss';

import React from 'react';

import { Form, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import useFormField from '@hooks/useFormField';

function CropImageField({
    label,
    fileList,
    disabled,
    name,
    valuePropName,
    accept,
    onChange,
    beforeUpload,
    showUploadList,
    aspect = 1,
    maxFile,
    imageUrl,
    loading,
    style,
    required,
    formItemProps,
    ...props
}) {
    const { rules } = useFormField(props);

    const onUploadFile = ({ file, onSuccess, onError }) => {
        const { uploadFile } = props;
        uploadFile(file, onSuccess, onError);
    };

    const getContent = () => {
        if (imageUrl && !loading) {
            return (
                <div style={{ margin: 4 }}>
                    <img
                        style={{ maxWidth: '100%', objectFit: 'contain' }}
                        className="img-uploaded"
                        src={imageUrl}
                        alt="field-upload"
                    />
                </div>
            );
        } else if (showUploadList && fileList && fileList.length === maxFile) {
            return null;
        } else {
            return renderUploadButton();
        }
    };

    const renderUploadButton = () => {
        return (
            <div style={style}>
                {!showUploadList && loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">{loading ? 'uploading' : 'upload'}</div>
            </div>
        );
    };

    return (
        <Form.Item
            {...formItemProps}
            required={required}
            label={label}
            name={name}
            rules={rules}
            valuePropName={valuePropName}
        >
            {showUploadList ? (
                <ImgCrop aspect={aspect}>
                    <Upload
                        fileList={fileList}
                        disabled={disabled}
                        accept={accept}
                        name="field-upload"
                        listType="picture-card"
                        style={{ width: '100%' }}
                        customRequest={onUploadFile}
                        beforeUpload={beforeUpload}
                        onChange={onChange}
                    >
                        {getContent()}
                    </Upload>
                </ImgCrop>
            ) : (
                <ImgCrop aspect={aspect}>
                    <Upload
                        disabled={disabled}
                        accept={accept}
                        valuePropName={valuePropName}
                        listType="picture-card"
                        style={{ width: '100%' }}
                        showUploadList={false}
                        customRequest={onUploadFile}
                        beforeUpload={beforeUpload}
                        onChange={onChange}
                    >
                        {getContent()}
                    </Upload>
                </ImgCrop>
            )}
        </Form.Item>
    );
}

export default CropImageField;
