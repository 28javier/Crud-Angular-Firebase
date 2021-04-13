import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// module
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// componentes
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
