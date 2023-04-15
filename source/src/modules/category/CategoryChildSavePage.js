import PageWrapper from '@components/common/layout/PageWrapper';
import { STATUS_ACTIVE, categoryKind, categoryOrdering } from '@constants';
import apiConfig from '@constants/apiConfig';
// import useFetch from '@hooks/useFetch';
import useSaveBase from '@hooks/useSaveBase';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import CategoryChildForm from './CategoryChildForm';
const CategoryChildSavePage = () => {
    const { id } = useParams();
    const { parentId } = useParams();
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title , detailId } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.category.getById,
            create: apiConfig.category.create,
            update: apiConfig.category.update,
        },
        options: {
            getListUrl: `/category/child/${parentId}`,
            objectName: 'category',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                // console.log(data);
                return {
                    status: STATUS_ACTIVE,
                    kind: categoryKind.news,
                    avatarPath: data.avatar,
                    ...data,
                    id: id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    categoryKind: categoryKind.news,
                    avatarPath: data.avatar,
                    parentId: parentId,
                    categoryOrdering: 0,
                };
            };

            funcs.mappingData = (data) => {
                return {
                    ...data.data,
                };
            };
        },
    });

    return (
        <PageWrapper
            loading={loading}
            routes={[
                { breadcrumbName: 'Home' },
                { breadcrumbName: 'category', path: `/category/child/${parentId}` },
                { breadcrumbName: 'child' },
            ]}
        >
            <CategoryChildForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
            />
        </PageWrapper>
    );
};

export default CategoryChildSavePage;
