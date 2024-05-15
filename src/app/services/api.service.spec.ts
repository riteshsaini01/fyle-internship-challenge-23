import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, Repository } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data from GitHub API', () => {
    const mockUser = { login: 'johnpapa', id: 1 };
    service.getUser('johnpapa').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('https://api.github.com/users/johnpapa');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch repos data from GitHub API', () => {
    const mockRepos: Repository[] = [
      { id: 1, name: 'repo1', full_name: 'johnpapa/repo1', html_url: 'https://github.com/johnpapa/repo1', description: 'First repo', topics: ['topic1', 'topic2'] },
      { id: 2, name: 'repo2', full_name: 'johnpapa/repo2', html_url: 'https://github.com/johnpapa/repo2', description: 'Second repo', topics: ['topic3'] }
    ];
    service.getRepos('johnpapa', 1, 10).subscribe(repos => { // Provide page and perPage arguments here
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne('https://api.github.com/users/johnpapa/repos');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });
});
