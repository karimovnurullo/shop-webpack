import { alertFunction } from '../model/other';
import { User } from '../model/user';

export class UserService {
  private userList: User[] = [];
  // private userList: User[] = JSON.parse(localStorage.getItem("userList") || "[]");
  // private localUserlist = Object.setPrototypeOf(this.userList, User.prototype) as User[];  
  private idGenerator = 0;

  checkUsername(username: string): boolean {
    for (const user of this.userList) {
      if (user.getUsername() === username) {
        return true;
      }
    }
    return false;
  }

  add(user: User) {
    if (this.checkUsername(user.getUsername())) {
      alertFunction(`User ${user.getUsername()} already exists`, false);
      throw new Error(`User ${user.getUsername()} already exists`);
    }
    user.setId(++this.idGenerator);
    this.userList.push(user);
    // localStorage.setItem('userList', JSON.stringify(this.userList));
  }

  signUp(name: string, username: string, password: string) {
    if (this.checkUsername(username)) {
      alertFunction(`User ${username} already exists`, false);
      throw new Error(`User ${username} already exists`);
    }
    let newUser = new User(name, username, password, 1000000);
    this.add(newUser);
  }

  signIn(username: string, password: string) {
    for (const user of this.userList) {
      if (user.getUsername() === username && user.getPassword() === password) {
        return user;
      }
    }
    return alertFunction("user not found", false);
  }
  getUserByUserName(userName: string):User{
    for (const user of this.userList) {
      if(user.getUsername() == userName) return user;
    }
    alertFunction("user not found", false);
    throw new Error("user not found");
  }

  getUserList() {
    return this.userList;
  }
}
