import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  exports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
})
export class FirebaseModule {}
