/**
 * Function to validate if the date corresponds to a person who is at least 18 years old
 * @param {string} birthDate - The birthdate in the format 'YYYY-MM-DD'
 * @returns {boolean}
 */
const isValidMajor = (birthDate) => {
    const [year, month, day] = birthDate.split('-').map(Number);
    const birthDateObj = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age >= 18;
}

export default isValidMajor;