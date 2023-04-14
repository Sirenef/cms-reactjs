import React from 'react';

import { accessRouteTypeEnum } from '@constants';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import routes from '.';
import PublicLayout from '@modules/main/PublicLayout';
import MainLayout from '@modules/main/MainLayout';

const ValidateAccess = ({
    authRequire,
    component: Component,
    componentProps,
    isAuthenticated,
    profile,
    layout,
}) => {
    const location = useLocation();

    const getRedirect = (authRequire) => {
        if (authRequire === accessRouteTypeEnum.NOT_LOGIN && isAuthenticated) {
            return routes.adminsListPage.path;
        }

        if (authRequire === accessRouteTypeEnum.REQUIRE_LOGIN && !isAuthenticated) {
            return routes.loginPage.path;
        }

        // check permistion

        return false;
    };

    const redirect = getRedirect(authRequire);

    if (redirect) {
        return <Navigate state={{ from: location }} key={redirect} to={redirect} replace />;
    }

    // currently, only support custom layout for authRequire route
    const Layout = authRequire ? (layout || MainLayout) : PublicLayout;

    return (
        <Layout>
            <Component {...(componentProps || {})}>
                <Outlet />
            </Component>
        </Layout>
    );
};

export default ValidateAccess;
