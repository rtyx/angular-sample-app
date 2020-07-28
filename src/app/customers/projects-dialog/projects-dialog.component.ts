import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../_core/interfaces/customer';
import { ProjectsService } from '../../_core/services/projects.service';
import { Project } from '../../_core/interfaces/project';

@Component({
  selector: 'app-projects-dialog',
  templateUrl: './projects-dialog.component.html',
  styleUrls: ['./projects-dialog.component.scss']
})
export class ProjectsDialogComponent implements OnInit {

  public projects: Project[];

  constructor(private dialogRef: MatDialogRef<ProjectsDialogComponent>,
              private projectsService: ProjectsService,
              @Inject(MAT_DIALOG_DATA) public customer: Customer) { }

  ngOnInit() {
    this.projectsService.getProjects(this.customer.id).toPromise().then(
      (projects) => {
        this.projects = projects;
      }
    )
  }

}
