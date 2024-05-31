import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PersonalTimeComponent } from './personalTime/personalTime.component';
import { PreTimeTestComponent } from './preTimeTest/preTimeTest.component';
import { AddPreTimeComponent } from './addPreTime/addPreTime.component';
import { EditDeleteTimeComponent } from './editDeleteTime/editDeleteTime.component';
import { AppApiService } from './services/appAPI.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PersonalTimeComponent,
    PreTimeTestComponent,
    AddPreTimeComponent,
    EditDeleteTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [AppApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
