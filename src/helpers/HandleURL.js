export const teacherApiUrl = "http://localhost:5000/api/teacher";
export const studentApiUrl = "http://localhost:5000/api/student";

export const modifyTeacherUrl = (addOnUrl) => {
    return `${teacherApiUrl}/${addOnUrl}`;
}

export const modifyStudentUrl = (addOnUrl) => {
    return `${studentApiUrl}/${addOnUrl}`;
}
