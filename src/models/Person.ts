import { Gender, Role } from '../../utils/enums';
import Encodable from './Encodable';

/**
 * Class representing a person.
 */
class Person implements Encodable {
  /**
   * * Male (M),
   * * Female (F)
   */
  gender: Gender;
  /**  */
  firstName: string;
  /**  */
  lastName: string;
  /**  */
  email?: string;
  /**  */
  phoneNumber?: string;
  /**  */
  roles: Array<Role>;
  /** */
  birthDate?: string;

  /**
   * @constructor
   * @param gender
   * * Male (M),
   * * Female (F)
   * @param firstName -
   * @param lastName -
   * @param email -
   * @param phoneNumber -
   * @param roles -
   * @param birthDate -
   * @example
   * ````typescript
   *let person = new Person(Gender.Male, "John", "Doe", "john.doe@foo.com", "+14151231234", [Role.BeneficialOwner, Role.Manager])
   *
   * ````
   */
  constructor(
    gender: Gender,
    firstName: string,
    lastName: string,
    roles: Array<Role>,
    birthDate?: string,
    email?: string,
    phoneNumber?: string
  );
  /**
   * @constructor
   * @param data - Object which contains required person attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   * @example
   * ````typescript
   *let data = {
   *   gender: "M",
   *   firstName: "John",
   *   lastName: "Doe",
   *   email: "john.doe@foo.com",
   *   phoneNumber: "+14151231234",
   *   roles: ["BE", "D"]
   *}
   *try {
   *   let person = new Person(data)
   *} catch (err) {
   *   console.log(err)
   *}
   *
   * ````
   */
  constructor(data: { [key: string]: any });
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];

      if (
        data.gender &&
        Object.values(Gender).some((gender: string) => gender === data.gender)
      )
        this.gender = <Gender>data.gender;
      else throw new Error('Missing required field or invalid data: gender');

      if (!data.firstName) throw new Error('Missing required field: firstName');
      if (!data.lastName) throw new Error('Missing required field: lastName');
      // if (!data.birthDate) throw new Error('Missing required field: birthDate');
      if (!data.roles) throw new Error('Missing required field: roles');

      this.roles = [];
      data.roles.forEach((x: any) => {
        if (Object.values(Role).some((role: string) => role === x))
          this.roles.push(<Role>x);
        else throw new Error('Invalid data: role');
      });

      this.gender = data.gender;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.birthDate = data.birthDate;
    } else {
      this.gender = args[0];
      this.firstName = args[1];
      this.lastName = args[2];
      this.roles = args[3];
      this.birthDate = args[4];
      this.email = args[5];
      this.phoneNumber = args[6];
    }
  }

  encode(): { [key: string]: any } {
    return {
      gender: this.gender,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      birthDate: this.birthDate,
      roles: this.roles
        ? this.roles.map((x) => {
            return {
              role: x
            };
          })
        : []
    };
  }
}

export default Person;
