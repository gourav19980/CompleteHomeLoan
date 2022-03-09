import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/Services/user-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userloginServ: UserLoginService) { }

  adminLoginForm: any;
  ngOnInit(): void {
    this.adminLoginForm = this.formBuilder.group({
      primaryEmail: ['', Validators.required],
      password: ['',Validators.required],
      formName: ['Admin']
    })
  }
  get primaryEmail() {
    return this.adminLoginForm.get('primaryEmail');
  }
  get password() {
    return this.adminLoginForm.get('password');
  }


  onSubmit() {
    if (this.adminLoginForm.invalid) {

      alert("Please enter the username and password")
      console.log("Form Submitted!");
    }
    else{
    this.userloginServ.validateUser(this.adminLoginForm.value)
      .subscribe(data => {
        console.log(data)

        if (data == 0) { 
          localStorage.setItem('userResId',JSON.stringify(data))
        this.router.navigate(['afterAdminLogin']);   }
        else { alert("Username or Passord invalid") }        
      });
  }
}
}
