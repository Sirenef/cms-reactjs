import CategoryListPage from ".";
import CategorySavePage from "./CategorySavePage";
import CategoryChildSavePage from "./CategoryChildSavePage";
import CategoryChildListPage from "./CategoryChildListPage";
export default {
    categoryListPage: {
        path: '/category',
        title: 'Category',
        auth:true,
        component: CategoryListPage,
    },
    categorySavePage: {
        path: '/category/:id',
        title: 'Category',
        auth: true,
        component: CategorySavePage,
    },
    categoryChildSavePage: {
        path: '/category/child/:parentId/:id',
        title: 'Category',
        auth: true,
        component: CategoryChildSavePage,
    },
    CategoryChildListPage: {
        path: '/category/child/:id',
        title: 'Category',
        auth:true,
        component: CategoryChildListPage,
    },
};