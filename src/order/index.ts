import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "gql/order.gql");

export const orderTypeDefs = fs.readFileSync(filePath, "utf-8");
