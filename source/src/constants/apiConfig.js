import { apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    account: {
        login: {
            baseURL: `${apiUrl}v1/account/login`,
            method: 'POST',
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/account/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/account/update_profile`,
            method: 'PUT',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        refreshToken: {
            baseURL: `${apiUrl}v1/account/refresh_token`,
            method: 'POST',
            headers: baseHeader,
        },
        logout: {
            baseURL: `${apiUrl}v1/account/logout`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    user: {
        getList: {
            baseURL: `${apiUrl}v1/account/list`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/account/create_admin`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/account/update_admin`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/account/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
    },
    file: {
        upload: {
            path: `${apiUrl}v1/file/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
        image: {
            path: `${apiUrl}admin/v1/image/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
        video: {
            path: `${apiUrl}admin/v1/video/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    category: {
        getList: {
            baseURL: `${apiUrl}v1/category/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/category/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/category/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/category/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/category/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/category/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    languages: {
        getList: {
            baseURL: `${apiUrl}admin/v1/languages`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    groupPermission: {
        getGroupList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getPemissionList: {
            baseURL: `${apiUrl}v1/permission/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/group/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/group/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/group/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/group/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        getGroupListCombobox: {
            baseURL: `${apiUrl}v1/group/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    branchs: {
        getListCombobox: {
            baseURL: `${apiUrl}v1/branch/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    news: {
        getList: {
            baseURL: `${apiUrl}v1/news/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/news/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/news/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/news/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/news/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
    },
};

export default apiConfig;
