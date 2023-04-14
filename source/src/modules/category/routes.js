import CategoryListPage from ".";
import CategorySavePage from "./CategorySavePage";
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
};