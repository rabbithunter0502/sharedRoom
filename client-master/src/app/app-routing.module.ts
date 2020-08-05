import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedLayoutComponent } from './shared/components/shared-layout/shared-layout.component';
import { HomeComponent } from './shared/components/home/home.component';
import { PostsComponent } from './shared/components/posts/posts.component';
import { PostFormComponent } from './shared/components/post-form/post-form.component';
import { PostDetailComponent } from './shared/components/post-detail/post-detail.component';

import { AuthLayoutComponent } from './auth/components/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { UserPostsComponent } from './shared/components/user-posts/user-posts.component';
import { ChangeAvatarComponent } from './shared/components/change-avatar/change-avatar.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { PostEditComponent } from './shared/components/post-edit/post-edit.component';
import { AdminAccountListComponent } from './admin/components/admin-account-list/admin-account-list.component';
import { AdminCategoryAddComponent } from './admin/components/admin-category-add/admin-category-add.component';
import { AdminCategoryListComponent } from './admin/components/admin-category-list/admin-category-list.component';
import { AdminCategoryEditComponent } from './admin/components/admin-category-edit/admin-category-edit.component';
import { AdminPostListComponent } from './admin/components/admin-post-list/admin-post-list.component';
import { AdminPostDetailComponent } from './admin/components/admin-post-detail/admin-post-detail.component';
import { AdminChangePasswordComponent } from './admin/components/admin-change-password/admin-change-password.component';
import { AdminChangeAvatarComponent } from './admin/components/admin-change-avatar/admin-change-avatar.component';
import { AdminAccountAddComponent } from './admin/components/admin-account-add/admin-account-add.component';
import { AdminAccountDetailComponent } from './admin/components/admin-account-detail/admin-account-detail.component';
import { AboutComponent } from './shared/components/about/about.component';
import { PostExtendComponent } from './shared/components/post-extend/post-extend.component';

const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'posts/form', component: PostFormComponent },
      { path: 'posts/:id', component: PostDetailComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'user',
        component: UserLayoutComponent,
        children: [
          { path: '', component: UserFormComponent },
          { path: 'posts', component: UserPostsComponent },
          { path: 'posts/:id', component: PostEditComponent },
          { path: 'posts/extend/:id', component: PostExtendComponent },
          { path: 'change-avatar', component: ChangeAvatarComponent },
          { path: 'change-password', component: ChangePasswordComponent },
          { path: 'post-form', component: PostFormComponent },
        ]
      },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'account-list', component: AdminAccountListComponent },
      { path: 'account-detail/:id', component: AdminAccountDetailComponent },
      { path: 'account-new', component: AdminAccountAddComponent },
      { path: 'category-list', component: AdminCategoryListComponent },
      { path: 'category-detail/:id', component: AdminCategoryEditComponent },
      { path: 'category-new', component: AdminCategoryAddComponent },
      { path: 'post-list', component: AdminPostListComponent },
      { path: 'post-detail/:id', component: AdminPostDetailComponent },
      { path: 'change-password', component: AdminChangePasswordComponent },
      { path: 'change-avatar', component: AdminChangeAvatarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
