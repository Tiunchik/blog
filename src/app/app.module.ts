import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayotComponent} from './shared/components/main-layot/main-layot.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {AdminModule} from './admin/admin.module';
import {PostComponent} from './shared/components/post/post.component';
import {SharedModule} from './admin/shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/components/auth.interceptor';
import { environment } from '../environments/environment';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayotComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
