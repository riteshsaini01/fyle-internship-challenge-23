import { Component, OnInit } from '@angular/core';
import { ApiService, Repository } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';
  githubUsername: string = '';
  user: any = null;
  repos: Repository[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  page: number = 1;
  perPage: number = 10;
  totalRepos: number = 0;
  pageSizeOptions: number[] = [10, 20, 30, 50, 100];

  constructor(private apiService: ApiService) { }

  ngOnInit() {}

  getUserData() {
    this.isLoading = true;
    this.apiService.getUser(this.githubUsername).subscribe(
      data => {
        this.user = data;
        this.errorMessage = '';
        this.getReposData();
      },
      error => {
        this.errorMessage = 'User not found';
        this.user = null;
        this.repos = [];
        this.isLoading = false;
      }
    );
  }

  getReposData() {
    this.apiService.getRepos(this.githubUsername, this.page, this.perPage).subscribe(
      data => {
        this.repos = data;
        this.isLoading = false;
      },
      error => {
        this.errorMessage = 'Error fetching repositories';
        this.isLoading = false;
      }
    );
  }

  onPageChange(page: number) {
    this.page = page;
    this.getReposData();
  }

  onPageSizeChange(size: number) {
    this.perPage = size;
    this.page = 1;
    this.getReposData();
  }
}
