import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('signInModal') signInModal: any;

  modalRef: NgbModalRef;

  open() {
    this.modalService.open(this.signInModal);
  }

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  onSignIn(credentials) {
    this.authService.login(credentials.email, credentials.password);
  }

}
