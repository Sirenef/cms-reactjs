import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useFetch from './useFetch';
import apiConfig from '@constants/apiConfig';

const useQueryParams = () => {
    let [ searchParams, setSearchParams ] = useSearchParams();
    // return a URLSearchParams object
    const serializeParams = (object = {}) => {
        const params = new URLSearchParams();
        Object.keys(object).forEach((key) => {        
            if (object[key] !== undefined && object[key] !== ''){
                // console.log(object[key]);
                // console.log(key);
                // console.log(object);
                params.set(key, object[key]);
            }
        });

        return params;
    };

    // return a plain object
    const deserializeParams = (params) => {
        const object = {};
        params.forEach((value, key) => {
            if (value !== undefined && value !== '') 
                object[key] = value;
        });

        return object;
    };

    const setQueryParams = (queryObj) => {
        setSearchParams(queryObj);
    };

    return { params: searchParams, setQueryParams, serializeParams, deserializeParams };
};

export default useQueryParams;
