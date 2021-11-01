import React from 'react'; 
import classNames from 'classnames/bind';

import { useMoviesContext } from '../../hooks/useMoviesContext';
import { MoviewItem } from '../MovieItem/MovieItem';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import styles from './MoviesView.module.scss';

const cn = classNames.bind(styles);
const BLOCK_CLASS_NAME = 'MoviesView';

export const MoviesView = () => {
    const { movies, isLoadingData } = useMoviesContext();

    return (
        <section className={cn(BLOCK_CLASS_NAME)}>
            <h2 className={cn(`${BLOCK_CLASS_NAME}__heading`)}>
                Список фильмов
            </h2>
            <div className={cn(`${BLOCK_CLASS_NAME}__pagination`)}>
                <Pagination />
            </div>
            <div className={cn(`${BLOCK_CLASS_NAME}__data`, 'row', {
                [`${BLOCK_CLASS_NAME}__data--hide`]: isLoadingData,
            })}>
                {movies.map(({ id, title, medium_cover_image, year, torrents, isHide = false, comments }) => {
                    return (
                        <div key={id} className="col">
                            <MoviewItem 
                                id={id}
                                commentsCount={comments.length}
                                isHide={isHide}
                                image={medium_cover_image}
                                title={title}
                                year={year}
                                qualitys={torrents.map(({ quality }) =>  quality)}
                            />
                        </div>
                    )
                })}
            </div>
            <div className={cn(`${BLOCK_CLASS_NAME}__pagination`, {
                [`${BLOCK_CLASS_NAME}__pagination--top`]: true,
            })}>
                <Pagination />
            </div>
            <div className={cn(`${BLOCK_CLASS_NAME}__loader`, {
                [`${BLOCK_CLASS_NAME}__loader--hide`]: !isLoadingData,
            })}>
                <Loader />
            </div>
        </section>
    );
}