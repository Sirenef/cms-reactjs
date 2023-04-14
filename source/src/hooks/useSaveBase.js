import React, { useEffect, useMemo, useState } from 'react';
import useQueryParams from './useQueryParams';
import useFetch from './useFetch';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { SaveOutlined, StopOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { defineMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import useNotification from './useNotification';

const message = defineMessage({
    response: {
        create: {
            id: 'hook.useSaveBase.response.success',
            defaultMessage: 'Create {objectName} success',
        },
        update: {
            id: 'hook.useSaveBase.response.success',
            defaultMessage: 'Update {objectName} success',
        },
        error: {
            id: 'hook.useSaveBase.deleteConfirm.ok',
            defaultMessage: 'Yes',
        },
    },
});

const useSaveBase = ({
    apiConfig = {
        getDetail: null,
        create: null,
        update: null,
    },
    options = {
        objectName: '',
        getListUrl: '',
    },
    override,
}) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const { params: queryParams, setQueryParams } = useQueryParams();
    const [ detail, setDetail ] = useState({});
    const [ detailId, setDetailId ] = useState(params.id);
    const [ isSubmitting, setSubmit ] = useState(false);
    const [ isChanged, setChange ] = useState(false);
    const [ isEditing, setEditing ] = useState(params.id === 'create' ? false : true);
    const { execute: executeGet, loading } = useFetch({ ...apiConfig.getDetail }, { immediate: false });
    const { execute: executeCreate, loading: loadingCreate } = useFetch({ ...apiConfig.create }, { immediate: false });
    const { execute: executeUpdate, loading: loadingUpdate } = useFetch({ ...apiConfig.update }, { immediate: false });
    const title = params.id === 'create' ? `New ${options.objectName}` : `Edit ${options.objectName}`;
    const intl = useIntl();
    const notification = useNotification();
    // const [ filter, setFilter ] = useState({});

    const mappingData = (response) => {
        if (response.result === true) return response.data;
    };

    const handleGetDetailError = (error) => {
        // console.log({ error });
    };

    const handleFetchDetail = (params) => {
        executeGet({
            ...params,
            pathParams: { id: detailId },
            onCompleted: (response) => {
                setDetail(mixinFuncs.mappingData(response));
            },
            onError: mixinFuncs.handleGetDetailError,
        });
    };

    const getDetail = () => {
        mixinFuncs.handleFetchDetail(detailId);
    };

    const getFormId = () => {
        return `form-${location.pathname}`;
    };

    const onBack = () => {
        const doBack = () => {
            // if (location?.state?.prevPath === options.getListUrl) {
            //     navigate(-1);
            // } else {
            navigate(options.getListUrl);
            // }
        };

        // if (isChanged) {
        //     showWarningConfirmModal({
        //         title: 'Quay lại',
        //         onOk: doBack,
        //     });
        // } else {
        // }
        doBack();
    };

    const showWarningConfirmModal = ({ onOk, title = null, ...rest } = {}) => {
        confirm({
            title: title,
            centered: true,
            width: 475,
            okType: 'danger',
            className: 'custom-confirm-modal warning',
            icon: <ExclamationCircleOutlined />,
            onOk: onOk,
            ...rest,
        });
    };

    const prepareCreateData = (data) => {
        return data;
    };

    const prepareUpdateData = (data) => {
        return {
            ...data,
            id: detail.id,
        };
    };

    const onSave = (values) => {
        setSubmit(true);
        if (isEditing) {
            executeUpdate({
                data: mixinFuncs.prepareUpdateData(values),
                onCompleted: mixinFuncs.onSaveCompleted,
                onError: mixinFuncs.onSaveError,
            });
        } else {
            executeCreate({
                data: mixinFuncs.prepareCreateData(values),
                onCompleted: mixinFuncs.onSaveCompleted,
                onError: mixinFuncs.onSaveError,
            });
        }
    };

    const onSaveCompleted = (responseData) => {
        setSubmit(false);
        if (responseData?.data?.errors?.length) {
            mixinFuncs.onSaveError();
        } else {
            if (isEditing) {
                mixinFuncs.onUpdateCompleted(responseData);
            } else {
                mixinFuncs.onInsertCompleted(responseData);
            }
        }
    };

    const getActionName = () => {
        return isEditing ? 'Cập nhật' : 'Xoá';
    };

    const onUpdateCompleted = (responseData) => {
        if (responseData.result === true) {
            notification({
                message: intl.formatMessage(message.response.update, {
                    objectName: options.objectName,
                }),
            });
            onBack();
        }
    };

    const onInsertCompleted = (responseData) => {
        if (responseData.result === true) {
            notification({
                message: intl.formatMessage(message.response.create, {
                    objectName: options.objectName,
                }),
            });
            onBack();
        }
    };

    const onSaveError = (err) => {
        if (err && err.message) showErrorMessage(err.message);
        else showErrorMessage(`${getActionName()} failed. Please try again!`);
        setSubmit(false);
    };

    const setIsChangedFormValues = (flag) => {
        if (flag !== isChanged) {
            setChange(flag);
        }
    };

    const renderActions = (customDisabledSubmitValue) => {
        const disabledSubmit = customDisabledSubmitValue !== undefined ? customDisabledSubmitValue : !isChanged;
        return (
            <Row justify="end" gutter={12}>
                <Col>
                    <Button danger key="cancel" onClick={onBack} icon={<StopOutlined />}>
                        Cancel
                    </Button>
                </Col>
                <Col>
                    <Button
                        key="submit"
                        htmlType="submit"
                        type="primary"
                        form={mixinFuncs.getFormId()}
                        loading={isSubmitting}
                        // disabled={disabledSubmit}
                        icon={<SaveOutlined />}
                    >
                        {isEditing ? 'Update' : 'Create'}
                    </Button>
                </Col>
            </Row>
        );
    };

    const overrideHandler = () => {
        const centralizedHandler = {
            getDetail,
            handleFetchDetail,
            mappingData,
            handleGetDetailError,
            getFormId,
            renderActions,
            prepareCreateData,
            prepareUpdateData,
            onSaveCompleted,
            onUpdateCompleted,
            onInsertCompleted,
            onSaveError,
            onSave,
        };

        override?.(centralizedHandler);

        return centralizedHandler;
    };

    const mixinFuncs = overrideHandler();

    useEffect(() => {
        if (params.id) {
            if (params.id === 'create') setEditing(false);
            else mixinFuncs.getDetail();
        }
    }, []);

    return { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title };
};

export default useSaveBase;
