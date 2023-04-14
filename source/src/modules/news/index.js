import React, { useEffect, useState } from 'react';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar } from 'antd';
import BaseTable from '@components/common/table/BaseTable';
import { UserOutlined } from '@ant-design/icons';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE, STATUS_ACTIVE, STATUS_DELETE, STATUS_INACTIVE, STATUS_PENDING } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import useFetch from '@hooks/useFetch';
import { IconPinnedOff, IconPin } from '@tabler/icons-react';
const NewsListPage = () => {
    const [ listcategory, setListCategory ] = useState([]);
    const [ rawlistcategory, setRawListCategory ] = useState([]);
    const { execute:executeCategory, data:dataCategory }=useFetch(apiConfig.category.autocomplete);
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.news,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'News',
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
        listdataCategory:rawlistcategory,
    });

    const listStatus=[ { value:STATUS_PENDING , label:"Pending" },  { value:STATUS_ACTIVE , label:"Active" },  { value:STATUS_DELETE , label:"Delete" },  { value:STATUS_INACTIVE , label:"Inactive" }  ];
    // mergedArray 
    // let mergedArray=[];
    // if(listcategory.data){
    //     mergedArray = data.map(obj1 => {
    //         const obj2 = listcategory.data.find(obj2 => obj2.id === obj1.categoryId);
    //         // return { id: obj1.id, categoryId: obj1.categoryId, categoryName: obj2.categoryName, avatar: obj1.avatar, banner: obj1.banner, createdBy: obj1.createdBy, createdDate: obj1.createdDate, kind: obj1.kind, modifiedBy: obj1.modifiedBy, modifiedDate: obj1.modifiedDate, pinTop: obj1.pinTop, ...obj1 };
    //         return { id: obj1.id, categoryId: obj1.categoryId, categoryName: obj2.categoryName, ...obj1 };
    //     });
    // }
    // console.log("mergedArray", mergedArray);
    // const categoryIdMap = {};
    // rawlistcategory.forEach(category => {
    //     categoryIdMap[category.id] = category.categoryName;
    // });
    // const listStatusIdMap={};
    // listStatus.forEach(status => {
    //     listStatusIdMap[status.value]=status.label;
    // });
    // console.log("categoryIdMap",categoryIdMap);
    // const updateQueryFilter = {};
    // for (const [ key, value ] of Object.entries(queryFilter)) {
    //     if (key === 'categoryId' && categoryIdMap[value]) {
    //         updateQueryFilter[key] = categoryIdMap[value];
    //     } 
    //     else if( key === 'status' && listStatusIdMap[value] ){
    //         updateQueryFilter[key] = listStatusIdMap[value];
    //     }
    //     // else {
    //     //     updateQueryFilter[key] = value;
    //     // }
    // }
    // console.log("updateQueryFilter",updateQueryFilter);
    const handleCategoryName = (id) => {
        let categoryname="";        
        rawlistcategory.map((item) => {
            if(id==item.id){
                categoryname=item.categoryName;
            }
        });
        return categoryname;
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'avatar',
            align: 'center',
            width: 100,
            render: (avatar) => (
                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
                />
            ),
        },
        { title: 'title', dataIndex: 'title' },
        { title: 'Category',align: "center", dataIndex: 'categoryId', render:(categoryId) => (handleCategoryName(categoryId)), width:"150px" },     
        { title: 'Created Date', dataIndex: 'createdDate', width:"200px", align:"center", color:"red" },
        { title: 'Pin top',align: "center", dataIndex: 'pinTop', width: '90px', render:(pinTop) => ( pinTop==1 ? ( <IconPin size={"18px"}/> ) : (<IconPinnedOff size={"18px"}/>) )  },
        mixinFuncs.renderStatusColumn({ width: '90px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '90px' }),
    ];
    const searchFields = [
        {
            key: 'title',
            placeholder: 'Title',
        },
        {   
            type:"SELECT", 
            key: "status",
            placeholder: 'Select status',
            options:  listStatus ,
            optionValue: 'value',
            optionLabelProp: "label",
        },
        {   
            type:"SELECT", 
            key: "categoryId",
            placeholder: 'Select category',
            options:  listcategory ,
            optionLabelProp: "label",
            optionValue: 'value',
        },
    ];
   
    useEffect(() => {
        executeCategory({
            onCompleted: (respone) => {
                if (respone.result===true){ 
                    setRawListCategory(respone.data.data);
                    setListCategory(respone.data.data.map(({ id: value, categoryName: label }) => ({ value, label })));
                   
                    // console.log(listcategory);
                } 
            },          
        });
    },[]);
    return (
        <PageWrapper routes={[ { breadcrumbName: 'Home' }, { breadcrumbName: 'News' } ]}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter  })}
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

export default NewsListPage;