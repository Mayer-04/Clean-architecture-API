import { CustomError, UserEntity } from "@domain/index";

export class UserMapper {
  static userEntityFromObject(data: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password, roles } = data;

    if (!_id || !id) {
      throw CustomError.badRequest("Missing id");
    }

    if (!name) throw CustomError.badRequest("Missing name");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");
    if (!roles) throw CustomError.badRequest("Missing roles");

    return {
      id: _id || id,
      name,
      email,
      password,
      roles,
    };
  }
}
