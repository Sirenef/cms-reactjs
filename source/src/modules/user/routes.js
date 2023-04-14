import UserAdminListPage from ".";
import UserAdminSavePage from "./UserAdminSavePage";
export default {
    adminsListPage: {
        path: '/admins',
        title: 'Admins',
        auth: true,
        component: UserAdminListPage,
    },
    adminsSavePage: {
        path: '/admins/:id',
        title: 'Admins',
        auth: true,
        component: UserAdminSavePage,
    },
};