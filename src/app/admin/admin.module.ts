import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from './shared/shared.module';

import {AdminLayotComponent} from './shared/components/admin-layot/admin-layot.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './shared/services/auth.guard';
import {SearchPipe} from './shared/pipes/search.pipe';
import {AlertService} from './shared/services/alert.service';

/**
 * Локализация дат на другой язык. ruLocal импортируется как объект из angular/common/locales/ru
 */
registerLocaleData(ruLocale, 'ru');

const routes: Routes = [
  {
    path: '', component: AdminLayotComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
      {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayotComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AlertService
  ]
})
export class AdminModule {
}
