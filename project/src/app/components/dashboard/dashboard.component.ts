import { Component, OnInit, HostListener } from "@angular/core";
import { ApplicationStateService } from "src/app/services/application-state.service";
import {
  animate,
  state,
  transition,
  trigger,
  style,
  keyframes
} from "@angular/animations";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormBuilder, Validators } from "@angular/forms";
import { APIService } from "src/app/services/api.service";
import { DiffEditorModel } from "ngx-monaco-editor";
import { ActionModalDialog } from '../dialog/action/action.component';
import { MatDialog } from '@angular/material';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public isLoading: Boolean = true;

  public actions: {};
  public sub_actions: {};
  public languages: {};

  public current_action: {} = null;
  public current_sub_action: {} = null;
  public current_language: {} = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public applicationStateService: ApplicationStateService,
    public apiService: APIService,
    public dialog: MatDialog
  ) {}

  setAction(event, action: {}) {
    this.current_sub_action = null;
    this.sub_actions = null;

    this.languages = null;
    this.current_language = null;

    this.code = null;

    if (event.isUserInput) {
      console.log(event);
      this.current_action = action;
      this.updateSubActions();
    }
  }
  setSubAction(event, sub_action: {}) {
    this.languages = null;
    this.current_language = null;

    this.code = null;

    if (event.isUserInput) {
      console.log(event);
      this.current_sub_action = sub_action;
      this.updateLanguages();
    }
  }

  setLanguage(event, template: {}) {
    if (event.isUserInput) {
      console.log(event);
      this.current_language = template;
      this.editorOptions.language = this.current_language["language"].toLowerCase();
    }
  }

  updateLanguages() {
    this.isLoading = true;

    console.log("Updating");
    console.log(this.current_sub_action);

    this.apiService.getTemplates(
      this.current_sub_action["_id"],
      languages => {
        this.isLoading = false;
        this.languages = languages;
        console.log(languages);
      },
      error => {
        this.isLoading = false;
        alert(error);
        console.log(error);
      }
    );
  }

  updateSubActions() {
    this.isLoading = true;
    console.log("Updating");
    console.log(this.current_action);

    this.apiService.getSubActions(
      this.current_action["_id"],
      sub_actions => {
        this.isLoading = false;
        this.sub_actions = sub_actions;
        console.log(sub_actions);
      },
      error => {
        this.isLoading = false;
        alert(error);
        console.log(error);
      }
    );
  }

  onActionSelect(e) {
    console.log(e);
  }
  retreiveActions() {
    this.apiService.getActions(
      actions => {
        this.isLoading = false;
        this.actions = actions;
        console.log(actions);
      },
      error => {
        this.isLoading = false;
        alert(error);
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.retreiveActions();
  }

  addAction() {
    const dialogRef = this.dialog.open(ActionModalDialog, {
      width: '500px',
      data: {
        name: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Back :)");
      this.retreiveActions();
    });
  }

  editAction(act) {

    const dialogRef = this.dialog.open(ActionModalDialog, {
      width: '500px',
      data: {
        _id: act["_id"],
        name: act["name"]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Back :)");
    });

  }
  deleteActionAction(act) {

  }

  copy() {
    //alert(this.code);
  }
  /*
    Coding-Area
    */
  editorOptions = {
    theme: "vs-dark",
    language: "javascript"
  };

  instructions: string = null;
  code: string = null;

  options = {
    theme: "vs-dark"
  };
}
