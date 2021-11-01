import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { MoviesContext } from '../../context/MoviesContext';
import { Api } from '../../service/apiService';
import { MoviesView } from '../../components/MoviesView/MoviesView';
import { CommentModalView } from '../../components/CommentModalView/CommentModalView';

const HIDE_MOVIES_KEY = 'hideMovies';
const COMMENT_MOVIES_KEY = 'commentsMoview';
const portalElement = document.getElementById('portal');

const getDataStorage = (key) => {
    return JSON.parse(localStorage.getItem(key) || '{}');
};

const setDataStorage = (key, data) => {
    if (Object.keys(data).length === 0) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export const Movies = () => {
    const [isLoadingData, setLoadigData] = useState(false);

    const [modalData, setModalData] = useState({
        currentId: null,
        isShowModal: false,
    });

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalPages: null,
        totalItems: null,
    });

    const [moviesList, setMovies] = useState([]);

    const handleChangePage = useCallback((page) => {
        setPagination((prev) => ({...prev, page }));
    }, []);

    const handleToggleHideMoview = useCallback((movieId) => {
        setMovies((prev) => {
            return prev.map((movie) => {
                if (movie.id === movieId) {
                    return {
                        ...movie,
                        isHide: movie.isHide === undefined ? true : ! movie.isHide,
                    }
                }

                return movie;
            })
        })

        const hideMoviesMap = getDataStorage(HIDE_MOVIES_KEY);

        if (hideMoviesMap[movieId] === undefined) {
            hideMoviesMap[movieId] = true;
        } else {
            delete hideMoviesMap[movieId];
        }
        
        setDataStorage(HIDE_MOVIES_KEY, hideMoviesMap);
        
    }, []);

    const addComment = useCallback((currentId, comment) => {
        setMovies((prev) => {
            return prev.map((movie) => {
                if (movie.id === currentId) {
                    return {
                        ...movie,
                        comments: [...movie.comments, comment],
                    }
                }

                return movie;
            });
        });

        const commensMovieMap = getDataStorage(COMMENT_MOVIES_KEY);

        if (commensMovieMap[currentId]) {
            commensMovieMap[currentId] = [
                ...commensMovieMap[currentId],
                comment,
            ]
        } else {
            commensMovieMap[currentId] = [comment];
        }

        setDataStorage(COMMENT_MOVIES_KEY, commensMovieMap);
    }, []);

    const deleteComment = useCallback((movieId, commentId) => {
        setMovies((prev) => {
            return prev.map((movie) => {
                if (movie.id === movieId) {
                    return {
                        ...movie,
                        comments: movie.comments.filter(({ id }) => id !== commentId),
                    }
                }

                return movie;
            });
        });

        const commensMovieMap = getDataStorage(COMMENT_MOVIES_KEY);

        commensMovieMap[movieId] =  commensMovieMap[movieId].filter(({ id }) => id !== commentId);

        if (commensMovieMap[movieId].length === 0) {
            delete commensMovieMap[movieId];
        }

        setDataStorage(COMMENT_MOVIES_KEY, commensMovieMap);

    }, []);

    useEffect(() => {
        async function fetchData() {
            setLoadigData(true);

            const hideMoviesMap = getDataStorage(HIDE_MOVIES_KEY);
            const commensMovieMap = getDataStorage(COMMENT_MOVIES_KEY);

            try {
                const { data } = await Api.getMovies({ page: pagination.page });

                const {
                    movie_count,
                    movies,
                } = data;

                setPagination((prev) => ({
                    ...prev,
                    totalItems:  movie_count,
                    totalPages: Math.ceil(movie_count / prev.limit),
                }));

                setMovies(movies.map((movie) => {
                    const comments = commensMovieMap[movie.id] || [];

                    if (hideMoviesMap[movie.id]) {
                        return {
                            ...movie,
                            isHide: true,
                            comments,
                        }
                    } 

                    return {
                        ...movie,
                        comments,
                    };
                }
                ));

                setLoadigData(false);

            } catch (err) {
                console.log('err: ', err);
                setLoadigData(false);
            }
        }

        fetchData();
    }, [pagination.page]);


    const contextValue = useMemo(() => {
        return {
            pagination,
            isLoadingData,
            movies: moviesList,
            handleChangePage,
            handleToggleHideMoview,
            setModalData,
            modalData,
            addComment,
            deleteComment,
        }
    }, [
        isLoadingData, 
        pagination, 
        moviesList, 
        handleChangePage, 
        modalData,
        handleToggleHideMoview,
        addComment,
        deleteComment,
    ]);

    return (
        <MoviesContext.Provider value={contextValue}>
            <MoviesView />
            {portalElement && createPortal(
                <CommentModalView />,
                portalElement
            )}
        </MoviesContext.Provider>
    )
};