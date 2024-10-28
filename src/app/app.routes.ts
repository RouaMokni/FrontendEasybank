import { Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { QaComponent } from './qa/qa.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './form/form.component';
import { ProfilComponent } from './profil/profil.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

export const routes: Routes = [ 
    { path: 'home', component: HomeComponent ,data: { title: 'Home' } },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'services', component: ServicesComponent , },
    { path: 'company', component: AboutComponent } ,
    { path: 'conatct', component: ContactComponent } ,
    { path: 'qa', component: QaComponent} ,
    { path: 'signin', component: SigninComponent , data: { title: 'Signin' }} ,
    { path: 'register', component: RegisterComponent , data: { title: 'Register' } } ,
    { path: 'form',component: FormComponent , data: { title: 'Form' }} ,
    { path: 'profile',component:ProfilComponent},
    {path: 'admin',component:AdmindashboardComponent,data: { titre: ['admin'] }}
];
 
export const APP_PROVIDERS = [
    provideHttpClient(withInterceptors([authInterceptor])),
    // autres providers si nécessaire
  ];
  
  
