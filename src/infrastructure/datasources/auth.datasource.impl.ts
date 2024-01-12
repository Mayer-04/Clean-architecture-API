import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
  CustomError,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => Promise<string>;
type CompareFunction = (password: string, hashed: string) => Promise<boolean>;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        throw CustomError.badRequest("User could not be created");
      }

      const hashedPassword = await this.hashPassword(password);

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError("Internal server error");
    }
  }
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}
