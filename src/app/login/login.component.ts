import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../Shared/Model/login.model';
import { CommonService } from '../Shared/Services/common.service';
import { LoginService } from '../Shared/Services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService,
    private commonservice: CommonService,
    private toastrservice: ToastrService,
    private router: Router) { }

  login: Login = new Login();
  IsError: boolean = false;
  ngOnInit(): void {
    this.login.Email = "",
      this.login.Password = ""
  }

  ResetForm() {
    this.login.Email = '';
    this.login.Password = '';
  }

  Validate(form: NgForm): boolean {
    if (this.login.Email == null || this.login.Email == "" && this.login.Password == null || this.login.Password == "") {
      this.IsError = true;

      return false;
    }
    return true;
  }
  onSubmit(formdata: NgForm) {
    if(this.Validate(formdata)) {
      this.service.SendLogin(formdata.value).subscribe((res: any) => {
        if (res.access_token != null) {
          var token = { name: 'token', value: res.access_token }
          var roles = { name: 'roles', value: res.role }
          this.toastrservice.success('Login successful..');
          this.commonservice.SetItem(token);
          this.commonservice.SetItem(roles);
          this.router.navigate(['/home']);
          this.ResetForm();
        }
        else {
          this.IsError = true;
          this.toastrservice.error('Invalid username/password');
          this.ResetForm();
        }
      },
        (err: HttpErrorResponse) => {
          this.IsError = true;
          this.toastrservice.error(err.error);
          this.ResetForm();
        }
      );
    }
  }
}
