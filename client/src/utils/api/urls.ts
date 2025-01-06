const apiPort = process.env.REACT_APP_API_URL;

const loginApi = `${apiPort}/auth/login`;
const homeApi = `${apiPort}/home`;
const courseApi = `${apiPort}/course`;
export { loginApi, homeApi, courseApi };
