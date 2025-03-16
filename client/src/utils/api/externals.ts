import axios from "axios";
import { stdin } from "process";
import http from "./axios";
import { courseApi } from "./urls";

export const executeCode = async (code: string) => {
  try {
    const encodedCode = btoa(code);
    const postUrl = `https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*`;
    const resp = await axios.post(
      postUrl,
      {
        source_code: encodedCode,
        language_id: 102,
        stdin: "",
      },
      {
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_JUDGE_URL,
          "Content-Type": "application/json",
        },
      }
    );
    let token = null;
    if (resp) {
      token = resp?.data?.token;
    }
    let output = "";
    const getUrl = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
    while (true) {
      const result = await axios.get(getUrl, {
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_JUDGE_URL,
          "Content-Type": "application/json",
        },
      });

      if (result.data.status.id >= 3) {
        output = atob(result.data.stdout) || atob(result.data.stderr);
        break;
      }
    }

    return output;
  } catch (error) {
    console.error(error);
  }
};
export const getCourseraCourses = async (keyword: string) => {
  try {
    const resp = await http.get(`${courseApi}/api/coursera/${keyword}`);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};
