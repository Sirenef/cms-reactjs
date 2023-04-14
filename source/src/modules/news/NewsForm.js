import React from 'react';
import { Card, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import TextField from '@components/common/form/TextField';
import CropImageField from '@components/common/form/CropImageField';
import { AppConstants, STATUS_ACTIVE, STATUS_DELETE, STATUS_INACTIVE, STATUS_PENDING } from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import DropdownField from '@components/common/form/DropdownField';
import SelectField from '@components/common/form/SelectField';
import RichTextField from '@components/common/form/RichTextField';
import CheckboxField from '@components/common/form/CheckboxField';
import NumericField from '@components/common/form/NumericField';
import RadioField from '@components/common/form/RadioField';
const NewsForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, branchs, isEditing, listcategory } = props;
    const { execute: executeUpFile, data } = useFetch(apiConfig.file.upload);
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ imageUrl1, setImageUrl1 ] = useState(null);
    const [ dataCheckBox, setDataCheckBox ] =useState(0);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });
    console.log("datadetail",dataDetail);
    const listStatus=[ { value:STATUS_PENDING , label:"Pending" },  { value:STATUS_ACTIVE , label:"Active" },  { value:STATUS_DELETE , label:"Delete" },  { value:STATUS_INACTIVE , label:"Inactive" }  ];
    // let datalist=[];
    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
               
            },
            onCompleted: (response) => {
                console.log(response.data.filePath);
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
    const uploadFile1 = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
               
            },
            onCompleted: (response) => {
                console.log(response);
                if (response.result === true) {
                    onSuccess();
                    setImageUrl1(response.data.filePath);
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, avatar: imageUrl, banner: imageUrl1, pinTop: dataCheckBox });
    };
    const handleValueCheckBox=(checkedValues) => {
        if(checkedValues.target.checked){
            setDataCheckBox(dataCheckBox => dataCheckBox=1); 
        }  
        else{
            setDataCheckBox(dataCheckBox => dataCheckBox=0); 
        }      
    };
    let updatedListcategory=[];
    if(listcategory.data){
        updatedListcategory = listcategory?.data.map(({ id: value, categoryName: label }) => ({ value, label }));
    }
    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
        setImageUrl(dataDetail.avatar);
        setImageUrl1(dataDetail.banner);
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
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label="Avatar"
                            name="avatar"
                            imageUrl={imageUrl && `${AppConstants.contentRootUrl}${imageUrl}`}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                    <Col span={12}>
                        <CropImageField
                            label="Banner"
                            name="banner"
                            imageUrl={imageUrl1 && `${AppConstants.contentRootUrl}${imageUrl1}`}
                            aspect={16 / 9}
                            uploadFile={uploadFile1}
                            
                        />
                    </Col>
                </Row>
               
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label="Title" name="title" />
                    </Col>
                    <Col span={12}>
                        <TextField label="Description" required name="description" type="textarea" />
                    </Col>
                </Row>  
                <Row gutter={16}>
                    <Col span={12}>                       
                        <SelectField label='Category' options={updatedListcategory} optionValue='value' optionLabelProp="label" name='categoryId' ></SelectField>
                    </Col>
                    <Col span={12}>                       
                        <SelectField label='Status' options={listStatus} optionValue='value' optionLabelProp="label" name='status' required ></SelectField>
                    </Col>
                </Row>  
                <Row gutter={16}>                    
                    {/* <TextField label="Pin Top"  name="pinTop" type="checkbox" />                     */}
                    <Col span={12}>
                        <CheckboxField optionLabel="Pin Top" name="pinTop" onChange={handleValueCheckBox}/>
                    </Col>
                    
                    {/* <RadioField name="pinTop" label="Pin Top"/> */}
                    
                </Row>          
                <Row gutter={16}>
                    <Col span={24}>
                        <RichTextField label='Content' required name="content"   ></RichTextField>
                    </Col>                            
                </Row>
              
                <div className="footer-card-form">{actions}</div>
            </Card>
        </Form>
    );
};

export default NewsForm;