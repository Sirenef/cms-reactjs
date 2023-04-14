import { Card, Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import TextField from '@components/common/form/TextField';
import CropImageField from '@components/common/form/CropImageField';
import { AppConstants } from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import SelectField from '@components/common/form/SelectField';
import useTranslate from '@hooks/useTranslate';
import { statusOptions } from '@constants/masterData';

const CategoryFormCommon = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues } = props;
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const [ imageUrl, setImageUrl ] = useState(null);
    const translate = useTranslate();
    const statusValues = translate.formatKeys(statusOptions, [ 'label' ]);

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setImageUrl(response.data.filePath);
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, categoryImage: imageUrl });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
        setImageUrl(dataDetail.categoryImage);
    }, [ dataDetail ]);

    return (
        <Form
            style={{ width: '70%' }}
            id={formId}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
        >
            <Card className="card-form" bordered={false}>
                <CropImageField
                    label="Avatar"
                    name="categoryImage"
                    imageUrl={imageUrl && `${AppConstants.contentRootUrl}${imageUrl}`}
                    aspect={1 / 1}
                    uploadFile={uploadFile}
                />
                <Row gutter={10}>
                    <Col span={12}>
                        <TextField required label="Name" name="categoryName" />
                    </Col>
                    <Col span={12}>
                        <TextField required label="Description" name="categoryDescription" type="textarea" />
                    </Col>
                </Row>

                <div className="footer-card-form">{actions}</div>
            </Card>
        </Form>
    );
};

export default CategoryFormCommon;
