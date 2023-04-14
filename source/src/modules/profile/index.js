import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import useSaveBase from '@hooks/useSaveBase';
import { accountActions } from '@store/actions';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProfileForm from './ProfileForm';
const ProfilePage = () => {
    const params = useParams();
    const [ detail, setDetail ] = useState({});
    const { execute, loading } = useFetch({ ...apiConfig.account.getProfile }, { immediate: false });
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile);
    const { mixinFuncs, onSave, setIsChangedFormValues, isEditing } = useSaveBase({
        options: {
            getListUrl: `/admins`,
            objectName: 'profile',
        },
        apiConfig: {
            getDetail: apiConfig.account.getProfile,
            update: apiConfig.account.updateProfile,
        },
        override: (funcs) => {
            const onSaveCompleted = funcs.onSaveCompleted;

            funcs.onSaveCompleted = (response) => {
                onSaveCompleted(response);
                executeGetProfile();
            };
        },
    });

    useEffect(() => {
        execute({
            onCompleted: (response) => {
                if (response.result === true) setDetail(response.data);
            },
            onError: mixinFuncs.handleGetDetailError,
        });
    }, []);

    return (
        <PageWrapper
            loading={loading}
            routes={[ { breadcrumbName: 'Home', path: `/admins` }, { breadcrumbName: 'Profile' } ]}
            
        >
            <ProfileForm
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

export default ProfilePage;
