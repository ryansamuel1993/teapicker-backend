import { Staff } from "@prisma/client";

export type CreateStaffInput = Omit<Staff, "id">;
