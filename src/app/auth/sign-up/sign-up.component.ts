import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('signUpModal') signUpModal: any;

  modalRef: NgbModalRef;

  open() {
    this.modalService.open(this.signUpModal);
  }

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  onSignUp(credentials) {
    console.log('on sign up ran', credentials);
    this.authService.signUp(credentials.email, credentials.password);
  }

}