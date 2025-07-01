import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/picker.gql");

export const pickerTypeDefs = fs.readFileSync(filePath, "utf-8");
