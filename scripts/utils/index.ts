export const getMovieRating = (rating: number): string => {
    return `.${rating >= 10 ? '' : '0'}${rating}`;
};
