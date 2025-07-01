import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/team.gql");

export const teamTypeDefs = fs.readFileSync(filePath, "utf-8");
