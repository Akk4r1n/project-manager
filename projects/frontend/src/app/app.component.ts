import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UsersService } from './services/api/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, ToolbarComponent],
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
      .login({
        email: 'jeremy@gmail.com',
        password_plain: 'jeremy',
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
