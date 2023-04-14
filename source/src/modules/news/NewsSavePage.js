import React, { useEffect, useState } from 'react';
import PageWrapper from '@components/common/layout/PageWrapper';
import { STATUS_ACTIVE, UserTypes, categoryKind } from '@constants';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import { useParams } from 'react-router-dom';
import NewsForm from './NewsForm';
import useFetch from '@hooks/useFetch';
const NewsSavePage = () => {
    const [ listcategory, setListCategory ] = useState({});
    const { execute:executeCategory, data:dataCategory }=useFetch(apiConfig.category.autocomplete);
    const { id } = useParams();
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.news.getById,
            create: apiConfig.news.create,
            update: apiConfig.news.update,
        },
        options: {
            getListUrl: `/news`,
            objectName: 'News',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    status: data.status,
                    kind: categoryKind.news,
                    avatar: data.avatar,
                    banner: data.banner,
                    ...data,
                    id: id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    kind:  categoryKind.news,
                    avatarPath: data.avatar,
                                   
                };
            };

            funcs.mappingData = (data) => {
                return {
                    ...data.data,
                };
            };
        },
    });
    
    useEffect(() => {
        executeCategory({
            onCompleted: (respone) => {
                if (respone.result===true) setListCategory(respone.data);
            },
            onError: mixinFuncs.handleGetDetailError,
        });
    },[]);
    return (
        <PageWrapper
            loading={loading}
            routes={[ { breadcrumbName: 'Home' }, { breadcrumbName: 'News', path: `/news` }, { breadcrumbName: title } ]}           
        >
            <NewsForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
                listcategory={listcategory ? listcategory : {}}
            />
        </PageWrapper>
    );
};

export default NewsSavePage;