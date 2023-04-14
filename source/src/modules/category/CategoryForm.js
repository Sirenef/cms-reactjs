import CropImageField from '@components/common/form/CropImageField';
import TextField from '@components/common/form/TextField';
import { AppConstants } from '@constants';
import apiConfig from '@constants/apiConfig';
import useBasicForm from '@hooks/useBasicForm';
import useFetch from '@hooks/useFetch';
import { Card, Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
const CategoryForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, branchs, isEditing } = props;
    const { execute:executeUpFile } = useFetch(apiConfig.file.upload);
    const [ imageUrl, setImageUrl ] = useState(null);
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
        form.setFieldValue({
            ...dataDetail,
        });
        setImageUrl(dataDetail.categoryImage);
    },[ dataDetail ]);
    return <div>
        <Form 
            
            style={{ width: '70%' }}
            id={formId}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
        >
            <Card className='card-form' bordered={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label="Category Image"
                            name="categoryImage"
                            imageUrl={imageUrl && `${AppConstants.contentRootUrl}${imageUrl}`}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label="Category Name" required name="categoryName" />
                    </Col>
                    <Col span={12}>
                        <TextField label="Category Description" required name="categoryDescription" type="textarea" />
                    </Col>
                    
                </Row>
               
                
                <div className="footer-card-form">{actions}</div>
            </Card>
        </Form>
    </div>;
};

export default CategoryForm;
