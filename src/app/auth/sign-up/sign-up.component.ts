import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthApiService } from '../auth-api.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('signUpModal') signUpModal: any;

  form: NgForm;
  modalRef: NgbModalRef;

  open() {
    this.modalRef = this.modalService.open(this.signUpModal);
  }

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private authApiService: AuthApiService
  ) {
    this.authApiService.signedUp$.subscribe(
      signedUp => {
        if (signedUp === true) {
          this.form.reset();
          this.modalRef.close();
        } else {
          console.log('signed Up not true', signedUp);
        }
      }
    )
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm, credentials) {
    console.log('on sign up ran', credentials);
    this.authService.signUp(credentials.email, credentials.password);
    this.form = form;
  }

}