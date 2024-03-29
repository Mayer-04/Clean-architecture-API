import { Validators } from "@config/index";

interface Object {
  email: string;
  password: string;
}

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(object: Object): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
