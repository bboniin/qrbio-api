import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "./../../utils/auth";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email e Senha não correspondem");
    }

    const passwordMatch = await compare(password, user.password);

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      authConfig.jwt.secret,
      {
        subject: user.id,
        expiresIn: "365d",
      }
    );

    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem");
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        email_confirmation: user.email_confirmation,
        phone_number: user.phone_number,
      },
      token,
    };
  }
}

export { AuthUserService };
