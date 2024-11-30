import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  users$ = this.usersSubject.asObservable();

  addUser(user: User): boolean {
    // Check if username already exists
    if (this.users.some(u => u.username === user.username)) {
      return false;
    }

    this.users.push(user);
    this.usersSubject.next([...this.users]);
    return true;
  }

  deleteUser(username: string) {
    this.users = this.users.filter(u => u.username !== username);
    this.usersSubject.next([...this.users]);
  }

  getUserList(): User[] {
    return [...this.users];
  }
}