import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/preferences.gql");

export const preferencesTypeDefs = fs.readFileSync(filePath, "utf-8");
