import { Component, OnInit } from '@angular/core';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../_interfaces/login';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean =false;
  credentials: LoginModel = {username:'', password:''};

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login(form: NgForm) {
    if (form.valid) {
      const headers = new HttpHeaders({ "Content-Type": "application/json" });
  
      this.http.post<AuthenticatedResponse>("https://localhost:7153/api/auth/login", this.credentials, { headers })
        .subscribe(
          (response: AuthenticatedResponse) => {
            const token = response.token;
            localStorage.setItem("jwt", token); 
            this.invalidLogin = false; 
            this.router.navigate(["/home"]);
          },
          (err: HttpErrorResponse) => {
            this.invalidLogin = true;
          }
        );
    }
  }
}