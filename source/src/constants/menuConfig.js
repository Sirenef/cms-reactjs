import React from 'react';
import {
    UsergroupAddOutlined,
    ControlOutlined,
    InboxOutlined,
} from '@ant-design/icons';
import routes from '@routes';
import { FormattedMessage } from 'react-intl';


const navMenuConfig = [
    {
        label: <FormattedMessage  defaultMessage='Quản lý tài khoản'/>,
        key: 'user-management',
        icon: <UsergroupAddOutlined />,
        children: [
            {
                label: <FormattedMessage  defaultMessage='Quản trị viên'/>,
                key: 'admin',
                path: routes.adminsListPage.path,
            },
        ],
    },
    {
        label: <FormattedMessage  defaultMessage='Tin tức'/>,
        key: 'news-management',
        icon: <ControlOutlined />,
        children: [
            {
                label: <FormattedMessage  defaultMessage='Danh sách tin tức'/>,
                key: 'news',
                path: routes.newsListPage.path,
            },
            {
                label: <FormattedMessage  defaultMessage='Danh mục'/>,
                key: 'category',
                path: routes.categoryListPage.path,
            },
        ],
    },
    {
        label: <FormattedMessage  defaultMessage='Hệ thống'/>,
        key: 'system-management',
        icon: <ControlOutlined />,
        children: [
            {
                label: <FormattedMessage  defaultMessage='Quyền'/>,
                key: 'role',
                path: routes.groupPermissionPage.path,
            },
        ],
    },
];

export default navMenuConfig;
