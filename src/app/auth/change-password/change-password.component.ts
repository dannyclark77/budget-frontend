import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthApiService } from '../auth-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('changePasswordModal') changePasswordModal: any;

  form: NgForm;
  modalRef: NgbModalRef;

  open() {
    this.modalRef = this.modalService.open(this.changePasswordModal);
  }

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private authApiService: AuthApiService
  ) { 
    this.authApiService.changedPassword$.subscribe(
      changedPassword => {
        if (changedPassword === true) {
          this.form.reset();
          this.modalRef.close();
        } else {
          console.log('did not change password ', changedPassword);
        }
      }
    )
  }

  ngOnInit() {
  }

  onChangePassword(form: NgForm, credentials) {
    if (credentials.newPassword === credentials.newPasswordConfirmation && credentials.newPassword !== '' && credentials.newPassword !== undefined) {
      console.log('change password credentials ', credentials);
      this.authService.changePassword(credentials.oldPassword, credentials.newPassword)
      this.form = form;
    } else {
      console.log('There was an issue with updating your password. Please try again.')
    }
  }

}
