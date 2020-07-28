import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AuthService, CustomersService } from '../_core/services';
import { Customer } from '../_core/interfaces/customer';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ProjectsDialogComponent } from './projects-dialog/projects-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public selection = new SelectionModel<Customer>(true, []);
  public tableColumns: string[] = ['id', 'name', 'lastProject', 'updatedAt'];
  public dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(private customersService: CustomersService,
              private matDialog: MatDialog,
              private authService: AuthService) {
  }

  public async ngOnInit() {
    await this.buildTable();
  }

  public async buildTable() {
    try {
      this.customersService.getCustomers().subscribe(
        (customers) => {
          this.dataSource = new MatTableDataSource<Customer>(customers);
          this.dataSource.sort = this.sort;

        });
    } catch (err) {
      console.error(`Error retrieving customers`);
    }
  }

  onLogOut() {
    this.authService.signOut()
  }

  openProjectsDialog(customer: Customer) {
    this.matDialog.open(ProjectsDialogComponent, {
      data: customer
    })
  }
}
