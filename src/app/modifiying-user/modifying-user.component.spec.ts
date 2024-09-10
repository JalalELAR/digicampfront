import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { HttpClientTestingModule } from '@angular/common/http/testing'; // For HTTP testing
import { of, throwError } from 'rxjs'; // For mocking observables
import { UsersService } from '../services/users.service'; // Import the UserService
import { ModifyingUserComponent } from './modifying-user.component';
import { Utilisateur } from '../models/utilisateur';

describe('ModifyingUserComponent', () => {
  let component: ModifyingUserComponent;
  let fixture: ComponentFixture<ModifyingUserComponent>;
  let userService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyingUserComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [UsersService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyingUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateUser() and handle success', () => {
    const mockUser: Utilisateur = { id: 1, fullName: 'John Doe', email: 'john@example.com', role: 'user' };
    spyOn(userService, 'updateUser').and.returnValue(of(mockUser));
    
    component.user = mockUser;
    component.updateUser();

    expect(userService.updateUser).toHaveBeenCalledWith(mockUser.id, mockUser);
    expect(component.successMessage).toBe('User updated successfully!');
    expect(component.errorMessage).toBeNull();
  });

  it('should call updateUser() and handle error', () => {
    const mockUser: Utilisateur = { id: 1, fullName: 'John Doe', email: 'john@example.com', role: 'user' };
    const errorResponse = 'Error updating user: Some error';
    spyOn(userService, 'updateUser').and.returnValue(throwError(() => new Error(errorResponse)));
    
    component.user = mockUser;
    component.updateUser();

    expect(userService.updateUser).toHaveBeenCalledWith(mockUser.id, mockUser);
    expect(component.errorMessage).toBe(errorResponse);
    expect(component.successMessage).toBeNull();
  });
});
