import request from "./Api";

export const applyForRoom = async (listingId, message) => {
    return await request(
        `/user/apply/${listingId}`,
        {
            method: "POST",
            body: JSON.stringify({
                message: message,
            }),
        }
    );
};


export const getMyApplications = async () => {
    return await request("/user/applications");
};


export const requestRoommate = async (roommateData) => {
    return await request(
        "/user/Application_for_roommate",
        {
            method: "POST",
            body: JSON.stringify(roommateData),
        }
    );
};


export const getMyRoommateRequests = async () => {
    return await request(
        "/user/roommate_applications"
    );
};