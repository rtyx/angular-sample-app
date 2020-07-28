import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

type ProjectsResponse = Project[];

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  get projects(): Project[] {
    return this._projects;
  }

  set projects(newProjects: Project[]) {
    this._projects = newProjects;
    this.projectsChanged.next(this.projects);
  }

  public projectsChanged = new BehaviorSubject<Project[]>(this.projects);
  private _projects: Project[];

  constructor(private apiService: ApiService) {
  }

  public getProjects(id: string): Observable<ProjectsResponse> {
    const req = this.apiService.get<ProjectsResponse>('projects');

    req.subscribe(
      (projects) => {
        this.projects = projects;
      },
      (err) => {
        console.error(err);
      }
    );

    return req;
  }

}
