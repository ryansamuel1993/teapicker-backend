import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/play.gql");

export const preferencesTypeDefs = fs.readFileSync(filePath, "utf-8");
