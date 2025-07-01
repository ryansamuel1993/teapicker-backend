import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/common.gql");

export const commonTypeDefs = fs.readFileSync(filePath, "utf-8");
