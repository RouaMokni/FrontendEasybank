import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PartenariatComponent } from './partenariat/partenariat.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { TeamComponent } from './team/team.component';
import { QaComponent } from './qa/qa.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet,HeaderComponent,MainComponent,ReviewsComponent,PartenariatComponent,AboutComponent,ServicesComponent,QaComponent,TeamComponent,ContactComponent,FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'EasyBank';
}
