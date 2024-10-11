import { RequirementFileType, FileType } from '../../utils/enums';
import Requirement from './Requirement';
declare class UploadRequirement extends Requirement {
    constructor(id: string, fileExt: FileType, fileContent: string, fileType: RequirementFileType);
}
export default UploadRequirement;
