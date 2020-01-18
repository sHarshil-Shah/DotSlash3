import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { WelcomeComponent } from "./components/welcome.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { CodingComponent } from "./components/code/coding.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CodingAreaComponent } from "./components/coding-area/coding-area.component";
import { MonacoEditorModule } from "ngx-monaco-editor";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CodingComponent,
    CodingAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,

    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
