import React from 'react';
import classNames from 'classnames/bind';

import { useMoviesContext } from '../../hooks/useMoviesContext';
import styles from './MoviewItem.module.scss';

const cn = classNames.bind(styles);
const BLOCK_CLASS_NAME = 'MoviewItem';

export const MoviewItem = ({ title, year, image, qualitys, isHide, id, commentsCount }) => {
    const { handleToggleHideMoview, setModalData } = useMoviesContext();

    const handleHideClick = () => {
        handleToggleHideMoview(id);
    };

    const handleShowClick = () => {
        handleToggleHideMoview(id);
    }

    const handleCommentClick = () => {
        setModalData({
            isShowModal: true,
            currentId: id,
        })
    };

    return (
        <div className={cn(BLOCK_CLASS_NAME)}>
            { isHide ? (
                <div className={cn(`${BLOCK_CLASS_NAME}__hide-block`)}>
                    <button 
                        onClick={handleShowClick}
                        className={cn(`${BLOCK_CLASS_NAME}__hide-button`)}    
                    >
                        Показать фильм
                    </button>
                    <h4>
                        Фильм скрыт от показа
                    </h4>
                </div>
            ): (
                <>
                    <div className={cn(`${BLOCK_CLASS_NAME}__image-wrap`)}>
                        <img
                            className={cn(`${BLOCK_CLASS_NAME}__image`)}
                            src={image} 
                            alt={title} 
                        />
                        <div className={cn(`${BLOCK_CLASS_NAME}__info`)}>
                            <button 
                                onClick={handleHideClick}
                                className={cn(`${BLOCK_CLASS_NAME}__hide-button`)}
                            >
                                Скрыть фильм
                            </button>
                            <button 
                                onClick={handleCommentClick}
                                className={cn(`${BLOCK_CLASS_NAME}__comment-button`)}
                            >
                                Комментировать {commentsCount || ''}
                            </button>
                        </div>
                    </div>
                    <div className={cn(`${BLOCK_CLASS_NAME}__info-wrap`)}>
                        <p className={cn(`${BLOCK_CLASS_NAME}__title`)}>
                            {title}
                        </p>
                        <span className={cn(`${BLOCK_CLASS_NAME}__year`)}>Год выхода: {year}</span>
                        <div className={cn(`${BLOCK_CLASS_NAME}__qualitys`)}>
                            {qualitys.map((quality) => (
                                <span className={cn(`${BLOCK_CLASS_NAME}__quality`)} key={quality}>
                                    {quality}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}