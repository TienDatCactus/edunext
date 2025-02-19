const apiPort = process.env.REACT_APP_API_URL;

const accessApi = `${apiPort}/auth`;
const homeApi = `${apiPort}/home`;
const usersApi = `${apiPort}/users`;
const courseApi = `${apiPort}/course`;
const questionApi = `${apiPort}/question`;
export { accessApi, homeApi, courseApi, usersApi, questionApi };
