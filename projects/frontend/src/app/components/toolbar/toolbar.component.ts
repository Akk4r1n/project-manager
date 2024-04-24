import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroWrench } from '@ng-icons/heroicons/outline';
import { UsersService } from '../../services/api/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ heroChevronDown, heroWrench })],
})
export class ToolbarComponent {
  menuState: 'open' | 'close' = 'close';

  constructor(private usersService: UsersService, private router: Router) {}

  onAvatarClick() {
    if (this.menuState === 'open') this.menuState = 'close';
    else this.menuState = 'open';
  }

  onProfileClick() {
    this.menuState = 'close';
    alert('Profile not implemented yet');
  }

  onSettingsClick() {
    this.menuState = 'close';
    alert('Settings not implemented yet');
  }

  onLogoutClick() {
    this.menuState = 'close';
    this.usersService.logout().subscribe((_) => {
      this.router.navigateByUrl('/');
    });
  }
}
