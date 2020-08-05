import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTreeModule } from "@angular/material/tree";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AdminHeaderComponent } from "./components/admin-header/admin-header.component";
import { AdminAccountListComponent } from "./components/admin-account-list/admin-account-list.component";
import { AdminAccountAddComponent } from "./components/admin-account-add/admin-account-add.component";
import { AdminPostListComponent } from "./components/admin-post-list/admin-post-list.component";
import { AdminCategoryListComponent } from "./components/admin-category-list/admin-category-list.component";
import { AdminCategoryAddComponent } from "./components/admin-category-add/admin-category-add.component";
import { AdminCategoryEditComponent } from "./components/admin-category-edit/admin-category-edit.component";
import { AdminChangePasswordComponent } from "./components/admin-change-password/admin-change-password.component";
import { AdminChangeAvatarComponent } from "./components/admin-change-avatar/admin-change-avatar.component";
import { AdminPostDetailComponent } from "./components/admin-post-detail/admin-post-detail.component";
import { MatNativeDateModule } from "@angular/material/core";
import { AdminAccountDetailComponent } from "./components/admin-account-detail/admin-account-detail.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHomeComponent,
    SidebarComponent,
    AdminHeaderComponent,
    AdminAccountListComponent,
    AdminAccountAddComponent,
    AdminPostListComponent,
    AdminCategoryListComponent,
    AdminCategoryAddComponent,
    AdminCategoryEditComponent,
    AdminChangePasswordComponent,
    AdminChangeAvatarComponent,
    AdminPostDetailComponent,
    AdminAccountDetailComponent,
    ConfirmDialogComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTreeModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [
    AdminLayoutComponent,
    AdminHomeComponent,
    SidebarComponent,
    AdminHeaderComponent,
  ],
})
export class AdminModule {}
