import NewsListPage from ".";
import NewsSavePage from "./NewsSavePage";

export default{
    newsListPage:{
        path:"/news",
        title:"News",
        auth:true,
        component:NewsListPage,
    },
    newsSavePage:{
        path:"/news/:id",
        title:"News",
        auth: true,
        component: NewsSavePage,
    },
};