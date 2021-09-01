import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormTestModule } from './components/form-test/form-test.module';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { StudyNgForModule } from './components/study-ng-for/study-ng-for.module';


//
// import { FirebaseService } from './firebase.service';
// import { MatSlideToggleModule } from '@angular/material';
// import { PaginationService } from './pagination.service';
// import { MasonryModule } from 'angular2-masonry';
// import { ScrollableDirective } from './scrollable.directive';
// import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddPostComponent,
    PostDetailComponent,
    EditPostComponent,
    RxjsComponent,

    // ScrollableDirective,
    // LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    InfiniteScrollModule,
    
    // MatSlideToggleModule
    ReactiveFormsModule,
    FormTestModule,
    
    StudyNgForModule,

  ],
  providers: [
    // AngularFirestore,
    // FirebaseService
    // PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
