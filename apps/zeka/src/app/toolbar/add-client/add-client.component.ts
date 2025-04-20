import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { City, CivilStatus, Client, Gender, Nationality} from '@frontend/api-interface';
//import { ServicesIspFacadeService, PartnersFacadeService } from '@frontend/core-state';
import { tools } from '@frontend/shared';
import * as _ from 'lodash-es';
import { ConvertAddresstoJSON } from 'libs/core-data/src/lib/services/share';

@Component({
  selector: 'frontend-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  public frm: FormGroup;
  public ctlReferenceNumber: FormControl;
  public ctlCivilStatus: FormControl;
  public ctlFirstName: FormControl;
  public ctlLastName: FormControl;
  public ctlGender: FormControl;
  public ctlBirthDate: FormControl;
  public ctlPlaceOfBirthId: FormControl;
  public ctlNationalityId: FormControl;
  public ctlSsn: FormControl;
  public ctlEmail: FormControl;
  public ctlPhone: FormControl;
  public ctlMobilePhone: FormControl;
  public ctlAddressStreet: FormControl;
  public ctlAddressStreetNumber: FormControl;
  public ctlAddressBoxNumber: FormControl;
  public ctlAddressPostalCode: FormControl;
  public ctlAddressCity: FormControl;
  public isNew: boolean;

  listOfCities: City[] = [];
  filteredCities: any[] = [];

  listOfNationalities: Nationality[] = [];
  filteredNationalities: any[] = [];

  sex: Gender[] = [
    { id: 0, value: 'Male'},
    { id: 1, value: 'Female'},
    { id: 2, value: 'Diverse'},
  ]

  civilStatus: CivilStatus[] = [
    { id: 0, value: 'Other'},
    { id: 1, value: 'Single'},
    { id: 2, value: 'Married'},
    { id: 3, value: 'Widowed'},
    { id: 4, value: 'Divorced'}
  ]


  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client; nationalities: Nationality[], cities: City[]; isNew: boolean },
    private fb: FormBuilder
    ){
      this.ctlReferenceNumber = this.fb.control('', []);
      this.ctlFirstName = this.fb.control('', []);
      this.ctlLastName = this.fb.control('', []);
      this.ctlGender = this.fb.control('', []);
      this.ctlBirthDate= this.fb.control('', []);
      this.ctlPlaceOfBirthId= this.fb.control('', []);
      this.ctlNationalityId= this.fb.control('', []);
      this.ctlSsn= this.fb.control('', []);
      this.ctlEmail= this.fb.control('', []);
      this.ctlPhone= this.fb.control('', []);
      this.ctlMobilePhone= this.fb.control('', []);
      this.ctlAddressStreet= this.fb.control('', []);
      this.ctlAddressStreetNumber  = this.fb.control('', []);
      this.ctlAddressBoxNumber= this.fb.control('', []);
      this.ctlAddressPostalCode= this.fb.control('', []);
      this.ctlAddressCity= this.fb.control('', []);
      this.ctlCivilStatus = this.fb.control('',[]);

      this.frm = this.fb.group({
        referenceNumber: this.ctlReferenceNumber,
        civilStatus: this.ctlCivilStatus,
        firstName: this.ctlFirstName,
        lastName: this.ctlLastName,
        gender: this.ctlGender,
        birthDate: this.ctlBirthDate,
        placeOfBirth: this.ctlPlaceOfBirthId,
        nationality: this.ctlNationalityId,
        ssn: this.ctlSsn,
        email: this.ctlEmail,
        phone: this.ctlPhone,
        mobilePhone: this.ctlMobilePhone,
        addressStreet: this.ctlAddressStreet,
        addressStreetNumber: this.ctlAddressStreetNumber,
        addressStreetPostalCode: this.ctlAddressPostalCode,
        addressStreetCity: this.ctlAddressCity
      });

      this.listOfCities = data.cities;
      this.listOfNationalities = data.nationalities;

      this.filteredCities =  this.listOfCities;
      this.filteredNationalities = this.listOfNationalities;


      this.isNew = data.isNew;
      //this.frm.patchValue(data.client);

      this.frm.get("referenceNumber").patchValue(data.client.referenceNumber);
      this.frm.get("civilStatus").patchValue(data.client.civilStatus);
      this.frm.get("firstName").patchValue(data.client.firstname);
      this.frm.get("lastName").patchValue(data.client.lastname);
      this.frm.get("gender").patchValue(data.client.gender);
      this.frm.get("birthDate").patchValue(tools.formatDate(new Date(data.client.birthDate)));
      this.frm.get("placeOfBirth").patchValue(data.client.placeOfBith);
      this.frm.get("nationality").patchValue(data.client.nationality);
      this.frm.get("ssn").patchValue(data.client.ssn);
      this.frm.get("email").patchValue(data.client.email);
      this.frm.get("phone").patchValue(data.client.phone);
      this.frm.get("mobilePhone").patchValue(data.client.mobilePhone);
      this.frm.get("addressStreet").patchValue(data.client?.address?.name);
      this.frm.get("addressStreetNumber").patchValue(data.client?.address?.number);
      this.frm.get("addressStreetPostalCode").patchValue(data.client?.address?.postalCode);
      this.frm.get("addressStreetCity").patchValue(data.client?.address?.city);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    save() {
      const data = this.frm.value;
      this.dialogRef.close(data);
    }

    cancel() {
      this.dialogRef.close();
    }


  onSearch(value: string, type : string) {
    if(type == 'nationality'){
      this.filteredNationalities = this.search(value,type);
    } else if(type == 'city'){
      this.filteredCities = this.search(value,type);
    }
  }

  search(value: string, type: string)  {
    let filter = value.toLowerCase();
    if(type == 'nationality'){
      return this.listOfNationalities.filter(option =>
        option.name.toLowerCase().includes(filter)
      );
    } else {
        return this.listOfCities.filter(option =>
          option.name.toLowerCase().includes(filter)
        );
    }
  }
}
