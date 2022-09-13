import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
// import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
// import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { SETTINGS } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MainModule } from './main/main.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FirebaseModule } from './shared/firebase.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    MainModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthGuardModule,
    FirebaseModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      // To use Firestore
      provide: SETTINGS,
      useValue: { experimentalAutoDetectLongPolling: true },
    },
    // When using emulators =>>
    // {
    //   provide: USE_AUTH_EMULATOR,
    //   useValue: environment.useEmulators
    //     ? ['http://localhost:9099']
    //     : undefined,
    // },
    // {
    //   provide: SETTINGS,
    //   useValue: environment.useEmulators
    //     ? { host: 'localhost:8080', ssl: false }
    //     : undefined,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
