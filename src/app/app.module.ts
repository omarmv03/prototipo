import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FWKModule } from './fwk/fwk.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	FWKModule,
    BrowserAnimationsModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAinZXTXtxFUZnKEB4iQfKWAnU5AKLWxSo",
      libraries: ["places"]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
