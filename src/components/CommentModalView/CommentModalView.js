import React, { useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import { useMoviesContext } from '../../hooks/useMoviesContext';
import styles from './CommentModalView.module.scss';

const cn = classNames.bind(styles);
const BLOCK_CLASS_NAME = 'CommentModalView';

export const CommentModalView = () => {
    const {
        modalData: {
            isShowModal,
            currentId,
        },
        movies,
        deleteComment,
        setModalData,
        addComment,
    } = useMoviesContext();

    const modalRef = useRef(null);

    const findMovie = useMemo(() => {
        return movies.find(({ id }) => id === currentId);
    }, [currentId, movies]);

    const handleClose = ({ target }) => {
        if (
            modalRef.current.contains(target) && 
            modalRef.current !== target && 
            !target.classList.contains(cn(`${BLOCK_CLASS_NAME}__close-btn`))
        ) {
            return;
        }

        setModalData({ currentId: null, isShowModal: false });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const comment = {
            id: `${currentId}-${Date.now()}`,
            text: event.target.elements[0].value,
            dateCreated: new Date().toLocaleDateString(),
        };

        addComment(currentId, comment);
        event.target.reset();
    }

    const isEmpty = findMovie && findMovie.comments.length === 0;

    return (
        <div 
            ref={modalRef}
            className={cn(BLOCK_CLASS_NAME, {
                [`${BLOCK_CLASS_NAME}--show`]: isShowModal,
            })}
            onClick={handleClose}
        >   
            <div className={cn(`${BLOCK_CLASS_NAME}__window`)}>
                <button 
                    type="button"
                    className={cn(`${BLOCK_CLASS_NAME}__close-btn`)}
                    onClick={handleClose}
                >
                    &times;
                </button>
                <h2 className={cn(`${BLOCK_CLASS_NAME}__heading`)}>
                    Комментариев: {findMovie?.comments.length || 0 }
                </h2>
                <div className={cn(`${BLOCK_CLASS_NAME}__comments`)}>
                    {isEmpty ? (
                        <div className={cn(`${BLOCK_CLASS_NAME}__empty-block`)}>
                            Комментариев пока нет, будте первым 
                        </div>
                    ) : (
                        <ul className={cn(`${BLOCK_CLASS_NAME}__comments-list`)}>
                            {findMovie?.comments.map(({ id, dateCreated, text }) => {
                                return (
                                    <li key={id} className={cn(`${BLOCK_CLASS_NAME}__list-item`)}>
                                        <p className={cn(`${BLOCK_CLASS_NAME}__info`)}>Дата комментария: {dateCreated}</p>
                                        <p className={cn(`${BLOCK_CLASS_NAME}__info`)}>Комментарий: {text}</p>
                                        <button
                                            className={cn(`${BLOCK_CLASS_NAME}__delete-btn`)}
                                            onClick={() => deleteComment(currentId, id)}
                                        >
                                            &times;
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    <form className={cn(`${BLOCK_CLASS_NAME}__form`)} onSubmit={handleSubmit}>
                            <textarea 
                                className={cn(`${BLOCK_CLASS_NAME}__textarea`)} 
                                required 
                                name="comment" 
                                placeholder="Текст комментария..."
                                minLength={5} 
                            />
                            <div className={cn(`${BLOCK_CLASS_NAME}__button-wrap`)}>
                                <button
                                    className={cn(`${BLOCK_CLASS_NAME}__button-send`)}
                                    type="submit"
                                >
                                    Комментировать
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}