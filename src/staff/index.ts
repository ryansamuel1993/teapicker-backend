import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/staff.gql");

export const staffTypeDefs = fs.readFileSync(filePath, "utf-8");
