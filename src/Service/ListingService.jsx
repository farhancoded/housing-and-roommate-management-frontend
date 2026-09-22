import request from "./Api";

export const getAllListings = async (filters = {}) => {
    const params = new URLSearchParams();


    if (filters.search) {
        params.append(
            "search",
            filters.search
        );
    }

 
    if (filters.category) {
        params.append(
            "category",
            filters.category
        );
    }

    if (filters.location) {
        params.append(
            "location",
            filters.location
        );
    }

 
    if (filters.min_price) {
        params.append(
            "min_price",
            filters.min_price
        );
    }

  
    if (filters.max_price) {
        params.append(
            "max_price",
            filters.max_price
        );
    }

  
    if (filters.sort_by) {
        params.append(
            "sort_by",
            filters.sort_by
        );
    }

  
    params.append(
        "page",
        filters.page || 1
    );

    params.append(
        "limit",
        filters.limit || 10
    );

    const query = params.toString();

    return await request(
        `/listings?${query}`
    );
};


export const getListingById = async (listingId) => {

    return await request(
        `/listings/${listingId}`
    );

};