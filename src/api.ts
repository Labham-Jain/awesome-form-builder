import ky from "ky";

const API = ky.create({
  prefixUrl: "http://localhost:5000",
  throwHttpErrors: false,
});

export default API;
