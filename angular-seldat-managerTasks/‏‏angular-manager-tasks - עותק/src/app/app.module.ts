
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { ManagerMenuComponent } from './components/manager-menu/manager-menu.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './shared/services/user.service';
import { ChartsModule } from 'ng2-charts';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { AuthGuard } from './shared/auth.guard';
import { HttpModule } from '@angular/http';
import { WorkerService } from './shared/services/worker.service';
import { TeamleaderService } from './shared/services/teamleader.service';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { EditService } from './shared/services/edit-service.service';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputComponent } from './components/input/input.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { PasswordComponent } from './components/password/password.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';
import { NumericTextBoxComponent } from './components/numeric-text-box/numeric-text-box.component';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { WorkerComponent } from './components/worker/worker.component';
import { ConectManagerComponent } from './components/conect-manager/conect-manager.component';
import { TextareaComponent } from './components/textarea/textarea.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ManagerMenuComponent,
    InputComponent,
    DatepickerComponent,
    PasswordComponent,
    DropDownListComponent,
    NumericTextBoxComponent,
    WorkerComponent,
    ConectManagerComponent,
    TextareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    DateInputsModule,
    DialogsModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
   RouterModule, // Need this module for the routing
   ChartsModule,
   InputsModule,
   ExcelExportModule,
   HttpClientJsonpModule,
   DialogModule,
   DropDownsModule,
   NbThemeModule.forRoot({ name: 'default' }),
   NbLayoutModule

  ],
  providers: [UserService,AuthGuard,WorkerService,TeamleaderService,  {
    deps: [HttpClient],
    provide: EditService,
    useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
