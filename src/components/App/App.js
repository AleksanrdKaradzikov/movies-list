import React from 'react';
import classNames from 'classnames/bind';

import { Movies } from '../../containers/Movies/Movies';
import styles from './App.module.scss';

const cn = classNames.bind(styles);
const BLOCK_CLASS_NAME = "App";

export const App = () => {
    return (
        <div className={cn(BLOCK_CLASS_NAME)}>
            <div className={cn('container')}>
                <Movies />
            </div>
        </div>  
    );    
}