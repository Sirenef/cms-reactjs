import PageWrapper from '@components/common/layout/PageWrapper';
import { STATUS_ACTIVE, UserTypes, categoryKind } from '@constants';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import React, {  } from 'react';
import { useParams } from 'react-router-dom';
import UserAdminForm from './UserAdminForm';

const UserAdminSavePage = () => {
    const { id } = useParams();
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.user.getById,
            create: apiConfig.user.create,
            update: apiConfig.user.update,
        },
        options: {
            getListUrl: `/admins`,
            objectName: 'UserAdmin',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    status: STATUS_ACTIVE,
                    kind: UserTypes.ADMIN,
                    avatarPath: data.avatar,
                    ...data,
                    id: id,
                    pin:data.pinTop,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    status: STATUS_ACTIVE,
                    kind: UserTypes.ADMIN,
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
    return (
        <PageWrapper
            loading={loading}
            routes={[ { breadcrumbName: 'Home' }, { breadcrumbName: 'User Admin', path: `/admins` }, { breadcrumbName: title } ]}
           
        >
            <UserAdminForm
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

export default UserAdminSavePage;
