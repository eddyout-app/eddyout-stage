export default function transformTrip(formData) {
    if (!formData.id) {
        throw new Error("TripFormData is missing a valid id.");
    }
    const parsedCrewNum = Number(formData.crewNum);
    if (isNaN(parsedCrewNum) || parsedCrewNum < 1) {
        throw new Error("Invalid crew number.");
    }
    return {
        id: formData.id,
        email: formData.email,
        riverName: formData.riverName,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        putIn: formData.putIn,
        takeOut: formData.takeOut,
        crewNum: parsedCrewNum,
    };
}
export function toDateOnlyString(date) {
    return new Date(date).toISOString().split("T")[0];
}
