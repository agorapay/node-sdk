import { RequirementFileType, RequirementStatus } from "../../utils/enums";
import Encodable from "./Encodable";
export default class Requirement implements Encodable {
    /** Requirement identification number. */
    id: string;
    /** Type of file provided in fileContent (PDF). */
    fileExt?: string | undefined;
    /** Content of the document base64 encoded. */
    fileContent?: string | undefined;
    /** Document status. */
    status?: RequirementStatus | undefined;
    /** Date of validation of the document in ISO8601 format. */
    validationDate?: string | undefined;
    /** Date of document reception in ISO8601 format */
    receiptDate?: string | undefined;
    /**  */
    fileType?: RequirementFileType;
    constructor(id: string, fileExt: string, fileContent: string, fileType: RequirementFileType);
    /**
     * @constructor
     * @param data - Object which contains required requirement attributes.
     * @throws Will throw an error if one of the required attributes is missing.
     */
    constructor(data: {
        [key: string]: any;
    });
    encode(): {
        [key: string]: any;
    };
}
