import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
let myusername = process.env.DB_USERNAME;
console.log("value: ", myusername);

console.log("start of backend project ");
