import { RequirementFileType, FileType } from '../../utils/enums.js';
import Requirement from './Requirement.js';
declare class UploadRequirement extends Requirement {
    constructor(id: string, fileExt: FileType, fileContent: string, fileType: RequirementFileType);
}
export default UploadRequirement;
