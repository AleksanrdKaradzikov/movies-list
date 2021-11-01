import React from 'react';
import classNames from 'classnames/bind';

import styles from './Loader.module.scss';

const cn = classNames.bind(styles);
const BLOCK_CLASS_NAME = 'Loader';

export const Loader = () => {
    return (
        <svg className={cn(BLOCK_CLASS_NAME)} viewBox="0 0 50 50">
            <circle className={cn(`${BLOCK_CLASS_NAME}__path`)} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
    );
}