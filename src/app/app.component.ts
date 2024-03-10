import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TabMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'annoncify_front';
  items: MenuItem[] = [
    { label: 'Products', icon: 'pi pi-fw pi-home', routerLink: ['/products'] },
    { label: 'Categories', icon: 'pi pi-fw pi-calendar', routerLink: ['/route-to-tab2'] }
  ];
}
