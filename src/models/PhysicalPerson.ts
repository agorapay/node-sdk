import Requirement from './Requirement';
import Encodable from './Encodable';

/**
 * Class representing a person.
 */
class PhysicalPersons implements Encodable {
  /**  */
  firstName: string;
  /**  */
  lastName: string;
  /**  */
  id: string;
  /**  */
  requirements: Array<Requirement> = [];

  /**
   * @constructor
   * @param data - Object which contains required physical person attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   */
  constructor(data: { [key: string]: any });
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];

      if (!data.firstName) throw new Error('Missing required field: firstName');
      if (!data.lastName) throw new Error('Missing required field: lastName');
      if (!data.id) throw new Error('Missing required field: id');
      // if (!data.requirements) throw new Error('Missing required field: requirements')

      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.id = data.id;
      this.requirements = data.requirements
        ? data.requirements.map((x: any) => new Requirement(x))
        : [];
    } else {
      this.firstName = args[0];
      this.lastName = args[1];
      this.id = args[2];
      this.requirements = args[3];
    }
  }

  encode(): { [key: string]: any } {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id,
      requirements: this.requirements.map((x) => x.encode())
    };
  }
}

export default PhysicalPersons;
