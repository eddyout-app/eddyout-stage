import auth from '../utils/auth';
const retrieveCrew = async (tripId) => {
    try {
        const response = await fetch(`/api/trips/crew/${tripId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval: ', err);
        return [];
    }
};
const retrieveUser = async (id) => {
    try {
        const response = await fetch(`/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Could not invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval: ', err);
        return Promise.reject('Could not fetch singular ticket');
    }
};
const retrieveAllUsers = async () => {
    const res = await fetch(`/api/users`, {
        headers: {
            Authorization: `Bearer ${auth.getToken()}`,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch all users");
    }
    return res.json();
};
const addCrewMember = async (tripId, userId) => {
    const res = await fetch(`/api/trips/crew/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({ tripId, userId }),
    });
    if (!res.ok) {
        throw new Error("Failed to add user to crew");
    }
    return res.json();
};
const updateCrew = async (crewId, body) => {
    try {
        const response = await fetch(`/api/trips/crew/${crewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.error('Update did not work', err);
        return Promise.reject('Update did not work');
    }
};
const deleteCrew = async (crewId) => {
    try {
        const response = await fetch(`/api/trips/crew/${crewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.error('Error in deleting user', err);
        return Promise.reject('Could not delete user');
    }
};
export { retrieveCrew, retrieveUser, retrieveAllUsers, addCrewMember, updateCrew, deleteCrew };
