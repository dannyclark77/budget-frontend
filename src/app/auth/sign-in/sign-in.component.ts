import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthApiService } from '../auth-api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('signInModal') signInModal: any;

  modalRef: NgbModalRef;

  open() {
    this.modalRef = this.modalService.open(this.signInModal);
  }

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private authApiService: AuthApiService,
  ) { 
    this.authApiService.loggedIn$.subscribe(
      loggedIn => {
        if (loggedIn === true) {
          this.modalRef.close();
        } else {
          console.log('loggedIn not true', loggedIn);
        }
      }
    )
  }

  ngOnInit() {
  }

  onSignIn(credentials) {
    this.authService.login(credentials.email, credentials.password);
  }

}
