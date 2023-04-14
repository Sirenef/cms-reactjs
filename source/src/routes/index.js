import PageNotFound from '@components/common/page/PageNotFound';
import PageNotAllowed from '@components/common/page/PageNotAllowed';
import LoginPage from '@modules/login/index';
import Dashboard from '@modules/dashboard';
import ProfilePage from '@modules/profile/index';
import adminsRoutes from '@modules/user/routes';
import newsRoutes from "@modules/news/routes";
import GroupPermissionListPage from '@modules/groupPermission';
import categoryRoutes from "@modules/category/routes";
import PermissionSavePage from '@modules/groupPermission/PermissionSavePage';
/*
	auth
		+ null: access login and not login
		+ true: access login only
		+ false: access not login only
*/
const routes = {
    pageNotAllowed: {
        path: '/not-allowed',
        component: PageNotAllowed,
        auth: null,
        title: 'Page not allowed',
    },
    homePage: {
        path: '/',
        component: Dashboard,
        auth: true,
        title: 'Home',
    },
    settingPage: {
        path: '/setting',
        component: Dashboard,
        auth: true,
        title: 'Setting',
    },
    loginPage: {
        path: '/login',
        component: LoginPage,
        auth: false,
        title: 'Login page',
    },
    profilePage: {
        path: '/profile',
        component: ProfilePage,
        auth: true,
        title: 'Profile page',
    },
    groupPermissionPage: {
        path: '/group-permission',
        component: GroupPermissionListPage,
        auth: true,
        title: 'Profile page',
    },
    groupPermissionSavePage: {
        path: '/group-permission/:id',
        component: PermissionSavePage,
        auth: true,
        title: 'Profile page',
    },
    
    ...newsRoutes,
    ...adminsRoutes,
    ...categoryRoutes,
    

    // keep this at last
    notFound: {
        component: PageNotFound,
        auth: null,
        title: 'Page not found',
        path: '*',
    },
};

export default routes;
