import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import BaseTable from '@components/common/table/BaseTable';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE, STATUS_ACTIVE, STATUS_DELETE, STATUS_INACTIVE, STATUS_PENDING } from '@constants';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import useFetch from '@hooks/useFetch';

const CategoryListPage = () => {
   
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.category,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'category',
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.data,
                        total: response.data.totalElements,
                    };
                    
                }
            };
        },
    });
    const listStatus=[   { value:STATUS_ACTIVE , label:"Active" },  { value:STATUS_INACTIVE , label:"Lock" }  ];
    const columns = [
        {
            title: '#',
            dataIndex: 'categoryImage',
            align: 'center',
            width: 100,
            render: (categoryImage) => (
                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={categoryImage ? `${AppConstants.contentRootUrl}${categoryImage}` : null}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'categoryName',
        },
        mixinFuncs.renderStatusColumn({ width:"90px" }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '90px' }),
    ];
    const searchFields = [
        {
            key: 'Name',
            placeholder: 'Name',
        },
        {   
            type:"SELECT", 
            key: "status",
            placeholder: 'Select status',
            options:  listStatus ,
            optionValue: 'value',
            optionLabelProp: "label",
           
        },
    ];
    
    return (
        <PageWrapper routes={[ { breadcrumbName: 'Home' }, { breadcrumbName: 'category' } ]}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                    />
                }
            />
        </PageWrapper>
    );
};

export default CategoryListPage;
