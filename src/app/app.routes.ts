import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { ProjectsComponent } from './projects/projects.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import {ParametresComponent} from './parametres/parametres.component';
 
export const routes: Routes = [
    {path: '',redirectTo: 'login',pathMatch: 'full',},
    {path: 'login',component: LoginComponent,title: 'Log In'},
    { path: 'home',component: HomeComponent,title: 'Home'},
    { path: 'collaborateur',component: CollaborateurComponent,title: 'Colaborateurs'},
    { path: 'projects',component: ProjectsComponent,title: 'Projects'},
    { path: 'parametres',component: ParametresComponent,title: 'Parametres'},
    { path: 'utilisateurs',component: UtilisateursComponent,title: 'utilisateurs'}
];