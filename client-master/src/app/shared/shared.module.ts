import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule  } from 'ngx-bootstrap/pagination';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedLayoutComponent } from './components/shared-layout/shared-layout.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFilterComponent } from './components/post-filter/post-filter.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { PostSortComponent } from './components/post-sort/post-sort.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { FilterByPipe } from '../pipes/filter-by.pipe';
import { FilterPostsActivePipe } from '../pipes/filter-posts-active.pipe';
import { AgmCoreModule } from '@agm/core';
import { PostFilterMapComponent } from './components/post-filter-map/post-filter-map.component';
import { SearchByPipe } from '../pipes/search-by.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { PostExtendComponent } from './components/post-extend/post-extend.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    FaqComponent,
    FeedbackComponent,
    HomeComponent,
    FooterComponent,
    SharedLayoutComponent,
    PostsComponent,
    PostFormComponent,
    PostDetailComponent,
    PostFilterComponent,
    UserLayoutComponent,
    UserMenuComponent,
    UserFormComponent,
    UserPostsComponent,
    ChangePasswordComponent,
    ChangeAvatarComponent,
    SortByPipe,
    FilterByPipe,
    SearchByPipe,
    FilterPostsActivePipe,
    PostSortComponent,
    PostEditComponent,
    PostFilterMapComponent,
    LoadingComponent,
    PostExtendComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbT3Pxb5GcCi1jazGWm8z6jZMB1joTvak'
    })
  ],
  exports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    FaqComponent,
    FeedbackComponent,
    HomeComponent,
    FooterComponent,
    SharedLayoutComponent,
    PostsComponent,
    PostFormComponent,
    PostDetailComponent
  ]
})
export class SharedModule { }
