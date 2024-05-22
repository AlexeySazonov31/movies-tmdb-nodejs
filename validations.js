import { query, param } from "express-validator";

const regExpForSortBy = /^((popularity)|(vote_average)|(vote_count))\.(desc|asc)$/;

export const filtersValidation = [
    query("page", "Invalid page format").isNumeric().matches(/^[1-9]([0-9]{1,2})?$/),
    query("sort_by", "Invalid sort format").isString().matches(regExpForSortBy),
    query("genres", "Invalid genres format").isArray().custom((value) => {
        if (!value.every(elem => Boolean(Number(elem)))) throw new Error('Array does not contain Integers'); // check that contains Integers
        return true;
    }).optional(),
    query("release_year", "Invalid release year format").isNumeric().matches(/^[0-9]{4,4}$/).optional(),
    query("rating_min", "Invalid rating min format").matches(/^([0-9]\.?[0-9]*|10)$/).isNumeric().optional(),
    query("rating_max", "Invalid rating max format").matches(/^([0-9]\.?[0-9]*|10)$/).isNumeric().optional(),
];
export const movieValidation = [
    param("id", "Invalid ID format").isNumeric(),
];
export const imageValidation = [
    param("mode", "Invalid size name image").matches(/^(full|middle)$/),
    param("path", "Invalid path image").isString(),
];

// page, sort_by, genres, release_year, rating_min, rating_max