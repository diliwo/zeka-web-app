import { capitalize } from "libs/core-data/src/lib/services/share";
import { Address } from "./Address";

export interface IClient {
  clientId?: string;
  referenceNumber?: string;
  civilStatus?: string;
  firstname: string;
  lastname: string;
  fullName: string | undefined;
  gender: string;
  birthDate: Date | undefined;
  placeOfBith?: string | undefined;
  nationality?: string;
  ssn?: string;
  email?: string | undefined;
  phone?: string | undefined;
  mobilePhone?: string;
  supportStaffMemberName?: string | undefined;
  supportStaffMemberService?: string | undefined;
  supportStartDate?: Date | undefined;
  supportEndDate?: Date | undefined;
  supports?: any[] | undefined;
  nativeLanguage?: string | undefined;
  contactLanguage?: string;
  address?: Address;
}

export class Client implements IClient {
  clientId?: string;
  referenceNumber?: string;
  civilStatus?: string;
  firstname: string;
  lastname: string;
  fullName: string | undefined;
  gender: string;
  birthDate: Date | undefined;
  placeOfBith?: string | undefined;
  nationality?: string;
  ssn?: string;
  email?: string | undefined;
  phone?: string | undefined;
  mobilePhone?: string;
  supportStaffMemberName?: string | undefined;
  supportStaffMemberService?: string | undefined;
  supportStartDate?: Date | undefined;
  supportEndDate?: Date | undefined;
  supports?: any[] | undefined;
  nativeLanguage?: string | undefined;
  contactLanguage?: string;
  address?: Address;

  constructor(data?: IClient) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.clientId = data['clientId'];
      this.civilStatus = data['civilStatus'];
      this.firstname = data['firstName'];
      this.lastname = data['lastName'];
      this.fullName = data['lastName'] +' '+ capitalize(data['firstName']);
      this.gender = data['gender'];
      this.birthDate = data['birthDate'];
      this.nationality = data['nationality'];
      this.ssn = data['niss'];
      this.email = data['email'];
      this.phone = data['phone'];
      this.mobilePhone = data['mobilePhone'];
      this.supportStaffMemberName = data['supportStaffMemberName'];
      this.supportStaffMemberService = data['supportStaffMemberService'];
      this.supportStartDate = data['supportStartDate'];
      this.supportEndDate = data['supportEndDate'];
      this.nativeLanguage = data['nativeLanguage'];
      this.contactLanguage = data['contactLanguage'];
      this.address = Address.fromJS(data['address']);

      // if (Array.isArray(data['supports'])) {

      //   this.supports = [] as any;
      //   for (let item of data['supports'])
      //     this.supports!.push(SupportDetail.fromJS(item));
      // }
    }
  }

  static fromJS(data: any): Client {
    data = typeof data === 'object' ? data : {};
    let result = new Client();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['clientId'] = this.clientId;
    data['civilStatus'] = this.civilStatus;
    data['firstname'] = this.firstname;
    data['lastname'] = this.lastname;
    data['gender'] = this.gender;
    data['birthDate'] = this.birthDate;
    data['nationality'] = this.nationality;
    data['ssn'] = this.ssn;
    data['email'] = this.email;
    data['phone'] = this.phone;
    data['mobilePhone'] = this.mobilePhone;
    data['supportStaffMemberName'] = this.supportStaffMemberName;
    data['supportStaffMemberService'] = this.supportStaffMemberService;
    data['supportStartDate'] = this.supportStartDate;
    data['supportEndDate'] = this.supportEndDate;
    data['nativeLanguage'] = this.nativeLanguage;
    data['contactLanguage'] = this.contactLanguage;
    data['address'] = this.address;

    if (Array.isArray(this.supports)) {
      data['supports'] = [];
      for (let item of this.supports) data['supports'].push(item.toJSON());
    }
    return data;
  }
}
