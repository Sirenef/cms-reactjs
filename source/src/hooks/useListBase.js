import React, { useEffect, useMemo, useState } from 'react';
import useQueryParams from './useQueryParams';
import { commonStatus, commonStatusColor, DEFAULT_TABLE_ITEM_SIZE, DEFAULT_TABLE_PAGE_START } from '@constants';

import { Modal, Button, Divider, Tag } from 'antd';
import { DeleteOutlined, LockOutlined, CheckOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';

import { defineMessage, useIntl } from 'react-intl';
import { Link, useLocation, useParams } from 'react-router-dom';
import ActionBar from '@components/common/elements/ActionBar';
import useFetch from './useFetch';
import useNotification from './useNotification';
import SearchForm from '@components/common/form/SearchForm';

const message = defineMessage({
    deleteConfirm: {
        title: {
            id: 'hook.useListBase.deleteConfirm.title',
            defaultMessage: 'Are you sure delete this {objectName}?',
        },
        ok: {
            id: 'hook.useListBase.deleteConfirm.ok',
            defaultMessage: 'Yes',
        },
        cancel: {
            id: 'hook.useListBase.deleteConfirm.cancel',
            defaultMessage: 'No',
        },
    },
    tableColumn: {
        action: {
            id: 'hook.useListBase.tableColumn.action',
            defaultMessage: 'Action',
        },
        status: {
            title: {
                id: 'hook.useListBase.tableColumn.status.title',
                defaultMessage: 'Status',
            },
            [commonStatus.ACTIVE]: {
                id: 'hook.useListBase.tableColumn.status.active',
                defaultMessage: 'Active',
            },
            [commonStatus.PENDING]: {
                id: 'hook.useListBase.tableColumn.status.pending',
                defaultMessage: 'Pending',
            },
            [commonStatus.LOCK]: {
                id: 'hook.useListBase.tableColumn.status.lock',
                defaultMessage: 'Lock',
            },
        },
    },
    notification: {
        deleteSuccess: {
            id: 'hook.useListBase.notification.deleteSuccess',
            defaultMessage: 'Delete {objectName} successfully',
        },
    },
});

const useListBase = ({
    apiConfig = {
        getList: null,
        delete: null,
    },
    options = {
        objectName: '',
        pageSize: DEFAULT_TABLE_ITEM_SIZE,
    },
    override,
} = {}) => {
    const { params: queryParams, setQueryParams, serializeParams, deserializeParams } = useQueryParams();
    const [ data, setData ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const { execute: executeGetList } = useFetch(apiConfig.getList);
    const { execute: executeDelete } = useFetch(apiConfig.delete);
    const [ pagination, setPagination ] = useState({
        pageSize: options.pageSize,
        total: 0,
        current: 1,
    });
    const notification = useNotification();
    const { pathname: pagePath } = useLocation();

    const intl = useIntl();
   
    const queryFilter = useMemo(() => deserializeParams(queryParams), [ queryParams ]);
    // console.log(queryFilter);
    const hasPermission = (permission) => {
        return true;
    };

    const mappingData = (response) => {
        return response;
    };
    const [ parentId, setParentId ] = useState([]);
    const handleGetListError = (error) => {
        notification({ type: 'error', message: 'Get list error' });
    };

    const onCompletedGetList = (response) => {
        const { data, total } = mixinFuncs.mappingData(response);
        setData(data);
        setPagination((p) => ({ ...p, total }));
    };

    const handleFetchList = (params) => {
        if (!apiConfig.getList) throw new Error('apiConfig.getList is not defined');
        setLoading(true);
        executeGetList({
            params,
            onCompleted: (response) => {
                mixinFuncs.onCompletedGetList(response);
                setLoading(false);
            },
            onError: (error) => {
                mixinFuncs.handleGetListError(error);
                setLoading(false);
            },
        });
    };

    const prepareGetListParams = (filter) => {
        const copyFilter = { ...filter };

        const page = parseInt(queryParams.get('page'));
        copyFilter.page = page > 0 ? page - 1 : DEFAULT_TABLE_PAGE_START;

        copyFilter.size = options.pageSize;

        return copyFilter;
    };
   
    const  getList = () => {
        if (!mixinFuncs.hasPermission('read')) return;
       
        const params =  mixinFuncs.prepareGetListParams(queryFilter);
        console.log("params",params);
       
        mixinFuncs.handleFetchList({ ...params });
       
        
        
    };

    const changeFilter = (filter) => {
        // console.log("filter",filter);
        // // console.log(listdataCategory);
        // listdataCategory.forEach(category => {
        //     console.log("name",category.categoryName);
        //     if(category.categoryName==filter.categoryId){
        //         filter.categoryId=category.id;
        //     }
        // });
        setQueryParams(serializeParams(filter));
    };

    function changePagination(page) {

        queryParams.set('page', page.current  );
        console.log('page', page.current );
        setQueryParams(queryParams);
    }

    const handleDeleteItemError = (error) => {
        notification({ type: 'error', message: error.message });
    };

    const onDeleteItemCompleted = (id) => {
        const currentPage = queryParams.get('page');
        if (data.length === 1 && currentPage > 1) {
            queryParams.set('page', currentPage );
            setQueryParams(queryParams);
        } else {
            mixinFuncs.getList();
            // setData((data) => data.filter((item) => item.id !== id));
        }
    };
    const handleDeleteItem = (id) => {
        if (!mixinFuncs.hasPermission('delete')) return;
        setLoading(true);
        executeDelete({
            pathParams: { id },
            onCompleted: (response) => {
                mixinFuncs.onDeleteItemCompleted(id);

                notification({
                    message: intl.formatMessage(message.notification.deleteSuccess, {
                        objectName: options.objectName,
                    }),
                });
            },
            onError: (error) => {
                mixinFuncs.handleDeleteItemError(error);
                setLoading(false);
            },
        });
    };

    const showDeleteItemConfirm = (id) => {
        if (!apiConfig.delete) throw new Error('apiConfig.delete is not defined');

        Modal.confirm({
            title: intl.formatMessage(message.deleteConfirm.title, { objectName: options.objectName }),
            content: '',
            okText: intl.formatMessage(message.deleteConfirm.ok),
            cancelText: intl.formatMessage(message.deleteConfirm.cancel),
            onOk: () => {
                mixinFuncs.handleDeleteItem(id);
            },
        });
    };

    const handleChangeStatusError = (error) => {
        notification({ type: 'error', message: error.message });
    };

    // This function is currently not needed
    const handleChangeStatus = (id, status) => {
        if (!mixinFuncs.hasPermission('changeStatus')) return;
        // execute({
        //     apiConfig: apiConfig.changeStatus,
        //     pathParams: { id },
        //     data: { status },
        //     onCompleted: (response) => {
        //         // show toast messages
        //     },
        //     onError: mixinFuncs.handleChangeStatusError,
        // });
    };

    const showChangeStatusConfirm = (id, status) => {
        if (!apiConfig.changeStatus) throw new Error('apiConfig.changeStatus is not defined');

        Modal.confirm({
            title: intl.formatMessage(message.changeStatusConfirm.title),
            content: '',
            okText: intl.formatMessage(message.changeStatusConfirm.ok),
            cancelText: intl.formatMessage(message.changeStatusConfirm.cancel),
            onOk: () => {
                mixinFuncs.handleChangeStatus(id, status);
            },
        });
    };

    const additionalActionColumnButtons = () => {
        return {};
    };

    const actionColumnButtons = (additionalButtons = {}) => ({
        delete: ({ id, buttonProps }) => {
            return (
                <Button
                    {...buttonProps}
                    type="link"
                    onClick={(e) => {
                        e.stopPropagation();
                        mixinFuncs.showDeleteItemConfirm(id);
                    }}
                    style={{ padding: 0 }}
                >
                    <DeleteOutlined />
                </Button>
            );
        },
        changeStatus: ({ id, status, buttonProps }) => {
            return (
                <Button
                    {...buttonProps}
                    type="link"
                    onClick={(e) => {
                        e.stopPropagation();
                        mixinFuncs.showChangeStatusConfirm(id, !status);
                    }}
                    style={{ padding: 0 }}
                >
                    {status === commonStatus.ACTIVE ? <LockOutlined /> : <CheckOutlined />}
                </Button>
            );
        },
        edit: ({ buttonProps, ...dataRow }) => {
            // console.log(dataRow);
            return (
                <Link
                    to={mixinFuncs.getItemDetailLink(dataRow)}
                    state={{ action: 'edit', prevPath: location.pathname }}
                >
                    <Button {...buttonProps} type="link" style={{ padding: 0 }}>
                        <EditOutlined color="red" />
                    </Button>
                </Link>
            );
        },
        child: ({ buttonProps, ...dataRow }) => {
            return (
                <Link
                    to={mixinFuncs.getItemParentDetailLink(dataRow) }
                    state={{ action: 'child', prevPath: location.pathname }}
                >
                    <Button {...buttonProps} type="link" style={{ padding: 0 }}>
                        <PlusSquareOutlined />
                    </Button>
                </Link>
            );
        },
        ...additionalButtons,
    });

    const createActionColumnButtons = (actions) => {
        const actionButtons = [];
        const buttons = actionColumnButtons(mixinFuncs.additionalActionColumnButtons());

        Object.entries(actions).forEach(([ key, value ], index) => {
            if (value && buttons[key]) {
                if (index > 0) {
                    actionButtons.push(() => <Divider type="vertical" />);
                }

                actionButtons.push(buttons[key]);
            }
        });

        return actionButtons;
    };

    const renderActionColumn = (
        action = { edit: false, delete: false, changeStatus: false, child: false },
        columnsProps,
        buttonProps,
    ) => {
        const actionButtons = mixinFuncs.createActionColumnButtons(action);

        return {
            align: 'center',
            ...columnsProps,
            title: intl.formatMessage(message.tableColumn.action),
            render: (data) => (
                
                <span>
                    {actionButtons.map((ActionItem, index) => (
                        <span key={index}>
                            <ActionItem {...data} {...buttonProps} />
                        </span>
                    ))}
                </span>
            ),
        };
    };

    const renderIdColumn = (columnsProps) => ({
        title: 'ID',
        dataIndex: 'id',
        width: '50px',
        align: 'left',
        ...columnsProps,
    });

    const renderStatusColumn = (columnsProps) => {
        return {
            title: intl.formatMessage(message.tableColumn.status.title),
            dataIndex: 'status',
            align: 'center',
            ...columnsProps,
            render: (status) => (
                <Tag color={commonStatusColor[status]}>
                    <div style={{ padding: '0 4px', fontSize: 14 }}>{intl.formatMessage(message.tableColumn.status[status])}</div>
                </Tag>
            ),
        };
    };

    const getItemDetailLink = (dataRow) => {
        return `${pagePath}/${dataRow.id}`;
    };
    const getItemParentDetailLink = (dataRow) => {
        setParentId(dataRow.id);
        return `${pagePath}/child/${dataRow.id}`;
    };
    const getCreateLink = () => {
        return `${pagePath}/create`;
    };

    const renderActionBar = ({ type, style, onBulkDelete, selectedRows = [] } = {}) => {
       
        return (
            <ActionBar
                selectedRows={selectedRows}
                onBulkDelete={onBulkDelete}
                objectName={options.objectName}
                createLink={mixinFuncs.getCreateLink()}
                location={location}
                type={type}
                style={style}
            />
        );
    };

    const renderSearchForm = ({ fields = [], hiddenAction, className, initialValues, onSearch, onReset }) => {
        return (
            <SearchForm
                fields={fields}
                initialValues={initialValues}
                onSearch={(values) => {
                    mixinFuncs.changeFilter(values);
                    onSearch?.(values);
                }}
                hiddenAction={hiddenAction}
                className={className}
                onReset={() => {
                    mixinFuncs.changeFilter({});
                    onReset?.();
                }}
            />
        );
    };

    const filterLanguage = (dataRow = []) => {
        let renderItem;
        dataRow.filter((item) => {
            if (item.languageId === '1') renderItem = item;
        });
        return renderItem || {};
    };

    const overrideHandler = () => {
        const centralizedHandler = {
            hasPermission,
            mappingData,
            handleGetListError,
            handleFetchList,
            prepareGetListParams,
            getList,
            changeFilter,
            showDeleteItemConfirm,
            handleDeleteItem,
            handleDeleteItemError,
            createActionColumnButtons,
            showChangeStatusConfirm,
            handleChangeStatus,
            handleChangeStatusError,
            renderActionColumn,
            renderIdColumn,
            getItemDetailLink,
            getCreateLink,
            renderStatusColumn,
            changePagination,
            additionalActionColumnButtons,
            renderActionBar,
            onCompletedGetList,
            onDeleteItemCompleted,
            filterLanguage,
            renderSearchForm,
            getItemParentDetailLink,
        };

        override?.(centralizedHandler);

        return centralizedHandler;
    };
    const mixinFuncs = overrideHandler();

    useEffect(() => {
        mixinFuncs.getList();

        const page = parseInt(queryFilter.page || DEFAULT_TABLE_PAGE_START);
        if (page > 0 && page !== pagination.current) {
            setPagination((p) => ({ ...p, current: page }));
        } else if (page < 1) {
            setPagination((p) => ({ ...p, current: 1 }));
        }
    }, [ queryParams ]);

    return {
        loading,
        data,
        setData,
        queryFilter,
        actionColumnButtons,
        changeFilter,
        changePagination,
        pagination,
        mixinFuncs,
    };
};

export default useListBase;
