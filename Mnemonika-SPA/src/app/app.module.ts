import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms' ;
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { NewMnemoComponent } from './Mnemo/Mnemo.component';
import { CollectionMnemosComponent } from './CollectionMnemos/CollectionMnemos.component';
import { CreateMnemoComponent } from './CreateMnemo/CreateMnemo.component';

import { HighlightDirective } from './directives/highlight.directive';
import { MnemoHighlightDirective } from './directives/mnemoHighlight.directive';

import { LoginServiceService } from './services/Login/loginService.service';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      AppComponent,
      HighlightDirective,
      MnemoHighlightDirective,
      NavComponent,
      LoginComponent,
      NewMnemoComponent,
      CollectionMnemosComponent,
      CreateMnemoComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      LoginServiceService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
