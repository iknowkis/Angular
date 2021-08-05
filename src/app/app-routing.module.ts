import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddPostComponent } from './components/add-post/add-post.component'
import { PostDetailComponent } from './components/post-detail/post-detail.component'
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { FormTestComponent } from './components/form-test/form-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-form-test', pathMatch: 'full' },
  { path: 'app-add-post', component: AddPostComponent },
  { path: 'app-dashboard', component: DashboardComponent },
  { path: 'app-post-detail/:id', component: PostDetailComponent },
  { path: 'app-edit-post/:id', component: EditPostComponent},
  { path: 'app-form-test', component: FormTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
