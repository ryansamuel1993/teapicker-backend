import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/ratings.gql");

export const ratingsTypeDefs = fs.readFileSync(filePath, "utf-8");
