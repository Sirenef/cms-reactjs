import { Card } from 'antd';
import React from 'react';

import styles from './ListPage.module.scss';

function ListPage({ searchForm, actionBar, baseTable }) {
    return (
        <Card className={styles.baseListPage}>
            <div className={styles.baseListPageList}>
                {searchForm}
                <div className={styles.actionBar}>{actionBar}</div>
                <div className={styles.actionBar}>{baseTable}</div>
            </div>
        </Card>
    );
}

export default ListPage;
