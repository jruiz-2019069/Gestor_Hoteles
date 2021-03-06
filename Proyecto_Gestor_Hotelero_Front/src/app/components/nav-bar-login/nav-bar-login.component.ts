import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/client.model';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar-login',
  templateUrl: './nav-bar-login.component.html',
  styleUrls: ['./nav-bar-login.component.css']
})
export class NavBarLoginComponent implements OnInit {

  dataUser = {
    username: "",
    password: ""
  }

  client: Client;

  constructor(
    public navBarRest: NavBarLoginRestService,
  ) { 
    this.client = new Client("", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
  }

  login(){
    this.navBarRest.login(this.dataUser).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.admin || res.manager || res.client));
        console.log("hola");
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  register(){
    this.navBarRest.register(this.client).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

}
