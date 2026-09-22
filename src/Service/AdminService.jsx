import request from "./Api";

export const createListing = async (listingData) => {
    return await request("/admin/create_listing", {
        method: "POST",
        body: JSON.stringify(listingData),
    });
};


export const updateListing = async (listingId, listingData) => {
    return await request(
        `/admin/update_listing/${listingId}`,
        {
            method: "PUT",
            body: JSON.stringify(listingData),
        }
    );
};


export const deleteListing = async (listingId) => {
    return await request(
        `/admin/delete_listing/${listingId}`,
        {
            method: "DELETE",
        }
    );
};


export const releaseListing = async (listingId) => {
    return await request(
        `/admin/release_listing/${listingId}`,
        {
            method: "PUT",
        }
    );
};


export const getAllApplications = async () => {
    return await request("/admin/applications");
};


export const approveApplication = async (applicationId, action) => {
    return await request(
        "/admin/approve_application",
        {
            method: "POST",
            body: JSON.stringify({
                application_id: applicationId,
                action: action,
            }),
        }
    );
};


export const getRoommateRequests = async () => {
    return await request(
        "/admin/roommate_requests"
    );
};


export const reviewRoommateRequest = async (
    requestId,
    action
) => {

    return await request(
        "/admin/review_roommate_request",
        {
            method: "POST",
            body: JSON.stringify({
                request_id: requestId,
                action: action,
            }),
        }
    );
};