import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Client, Gender} from '@frontend/api-interface';
//import { ServicesIspFacadeService, PartnersFacadeService } from '@frontend/core-state';
import { tools } from '@frontend/shared';
import * as _ from 'lodash-es';

@Component({
  selector: 'frontend-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  public frm: FormGroup;
  public ctlReferenceNumber: FormControl;
  // public ctlCivilStatus: FormControl;
  public ctlFirstName: FormControl;
  public ctlLastName: FormControl;
  public ctlGender: FormControl;
  public ctlBirthDate: FormControl;
  public ctlPlaceOfBirth: FormControl;
  public ctlNationality: FormControl;
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

  status: Gender[] = [
    { id: 0, value: 'Male'},
    { id: 1, value: 'Female'},
    { id: 2, value: 'Diverse'},
  ]



  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client; isNew: boolean },
    private fb: FormBuilder
    ){
      this.ctlReferenceNumber = this.fb.control('', []);
      this.ctlFirstName = this.fb.control('', []);
      this.ctlLastName = this.fb.control('', []);
      this.ctlGender = this.fb.control('', []);
      this.ctlBirthDate= this.fb.control('', []);
      this.ctlPlaceOfBirth= this.fb.control('', []);
      this.ctlNationality= this.fb.control('', []);
      this.ctlSsn= this.fb.control('', []);
      this.ctlEmail= this.fb.control('', []);
      this.ctlPhone= this.fb.control('', []);
      this.ctlMobilePhone= this.fb.control('', []);
      this.ctlAddressStreet= this.fb.control('', []);
      this.ctlAddressStreetNumber  = this.fb.control('', []);
      this.ctlAddressBoxNumber= this.fb.control('', []);
      this.ctlAddressPostalCode= this.fb.control('', []);
      this.ctlAddressCity= this.fb.control('', []);

      this.frm = this.fb.group({
        referenceNumber: this.ctlReferenceNumber,
        // civilStatus: this.data.client.civilStatus,
        firstName: this.ctlFirstName,
        lastName: this.ctlLastName,
        gender: this.ctlGender,
        birthDate: this.ctlBirthDate,
        placeOfBirth: this.ctlPlaceOfBirth,
        nationality: this.ctlNationality,
        ssn: this.ctlSsn,
        email: this.ctlEmail,
        phone: this.ctlPhone,
        mobilePhone: this.ctlMobilePhone
      });

      this.isNew = data.isNew;
      //this.frm.patchValue(data.client);

      this.frm.get("referenceNumber").patchValue(data.client.referenceNumber);
      // this.frm.get("civilStatus").patchValue(data.client.civilStatus);
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
}
