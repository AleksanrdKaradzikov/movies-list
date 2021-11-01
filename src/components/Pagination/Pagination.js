import React from 'react';
import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { useMoviesContext } from '../../hooks/useMoviesContext';

const cn = classNames.bind(styles);
const BLOCK_CLASS_NAME = 'Pagination';

export const Pagination = () => {
    const { 
        isLoadingData,
        pagination: {
            totalPages,
            page,
        },
        handleChangePage: setPage,
    } = useMoviesContext();

    const handleChangePage = ({ selected }) => {
        if (isLoadingData) {
            return;
        }

        setPage(selected + 1);
        window.scrollTo(0, 0);
    }

    if (totalPages === null) {
        return null;
    }

    return (
        <div className={cn(BLOCK_CLASS_NAME, {
            [`${BLOCK_CLASS_NAME}--hide`]: isLoadingData,
        })}>
            {isLoadingData && <div className={cn(`${BLOCK_CLASS_NAME}__disabled-block`)}/>}
            <ReactPaginate
                disableInitialCallback
                forcePage={page - 1}
                containerClassName={cn(`${BLOCK_CLASS_NAME}__paginate`)}
                pageClassName={cn(`${BLOCK_CLASS_NAME}__paginate-item`)}
                breakClassName={cn(`${BLOCK_CLASS_NAME}__paginate-item`)}
                breakLinkClassName={cn(`${BLOCK_CLASS_NAME}__paginate-link`)}
                pageLinkClassName={cn(`${BLOCK_CLASS_NAME}__paginate-link`)}
                activeLinkClassName={cn(`${BLOCK_CLASS_NAME}__paginate-link--active`)}
                previousLinkClassName={cn(`${BLOCK_CLASS_NAME}__paginate-item-tab`)}
                nextLinkClassName={cn(`${BLOCK_CLASS_NAME}__paginate-item-tab`)}
                disabledClassName={cn(`${BLOCK_CLASS_NAME}__paginate-item-tab--disable`)}
                breakLabel="..."
                nextLabel="Следущая >"
                onPageChange={handleChangePage}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< Предыдущая"
                renderOnZeroPageCount={null}
            />
        </div>
    )
};