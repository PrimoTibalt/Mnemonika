import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { HighlightDirective } from './highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms' ;
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      AppComponent,
      HighlightDirective,
      NavComponent,
      LoginComponent,
      LoginComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
