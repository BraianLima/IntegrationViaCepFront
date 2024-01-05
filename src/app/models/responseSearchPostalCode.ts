import { postalCode } from "./postalCode";

export class responseSearchPostalCode {
    public statusCode: number = 500;
    public message: string | undefined;
    public data: postalCode[] | undefined;
}