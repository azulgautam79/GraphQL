import { registerEnumType } from "@nestjs/graphql";

export enum StudentSortField {
    ID = "id",
    NAME = "name",
    EMAIL = "email",
}

registerEnumType(StudentSortField, {
    name: "StudentSortField",
});
