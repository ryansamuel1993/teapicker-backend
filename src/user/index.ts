import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/user.gql");

export const userTypeDefs = fs.readFileSync(filePath, "utf-8");
