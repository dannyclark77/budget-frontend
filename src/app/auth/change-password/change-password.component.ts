import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('changePasswordModal') changePasswordModal: any;

  modalRef: NgbModalRef;

  open() {
    this.modalService.open(this.changePasswordModal);
  }

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  onChangePassword(credentials) {
    if (credentials.newPassword === credentials.newPasswordConfirmation && credentials.newPassword !== '' && credentials.newPassword !== undefined) {
      console.log('change password credentials ', credentials);
      this.authService.changePassword(credentials.oldPassword, credentials.newPassword)
    } else {
      console.log('There was an issue with updating your password. Please try again.')
    }
  }

}
