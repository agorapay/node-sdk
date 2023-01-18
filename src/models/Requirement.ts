import { RequirementFileType, RequirementStatus } from "../../utils/enums";
import Encodable from "./Encodable";
import Utils from "../../utils/Utils";

export default class Requirement implements Encodable {
  /** Requirement identification number. */
  public id: string;
  /** Type of file provided in fileContent (PDF). */
  public fileExt?: string | undefined;
  /** Content of the document base64 encoded. */
  public fileContent?: string | undefined;
  /** Document status. */
  public status?: RequirementStatus | undefined;
  /** Date of validation of the document in ISO8601 format. */
  public validationDate?: string | undefined;
  /** Date of document reception in ISO8601 format */
  public receiptDate?: string | undefined;
  /**  */
  public fileType?: RequirementFileType;

  constructor(id: string, fileExt: string, fileContent: string, fileType: RequirementFileType);
  /**
   * @constructor
   * @param data - Object which contains required requirement attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   */
  constructor(data: { [key: string]: any });
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data: Partial<Requirement> = args[0];

      if (!data.id) {
        throw new Error("Missing required field: id");
      }

      this.id = data.id;
      // this.label = data.label;
      this.fileExt = data.fileExt;
      this.fileContent = data.fileContent;
      this.status = Utils.hasEnumOrDefault(data.status, RequirementStatus, undefined);
      this.validationDate = data.validationDate;
      this.receiptDate = data.receiptDate;
    } else {
      this.id = args[0];
      this.fileExt = args[1];
      this.fileContent = args[2];
      this.fileType = args[3];
    }
  }

  public encode(): { [key: string]: any } {
    return {
      id: this.id,
      fileExt: this.fileExt,
      fileContent: this.fileContent,
      status: this.status,
      validationDate: this.validationDate,
      receiptDate: this.receiptDate,
      fileType: this.fileType
    };
  }
}
