import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../utils/auth";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthPartnerService {
  async execute({ email, password }: AuthRequest) {
    const partner = await prismaClient.partner.findFirst({
      where: {
        email: email,
      },
    });

    if (!partner) {
      throw new Error("Email e Senha não correspondem");
    }

    const passwordMatch = await compare(password, partner.password);

    const token = sign(
      {
        name: partner.name,
        email: partner.email,
      },
      authConfig.jwt.secret,
      {
        subject: partner.id,
        expiresIn: "365d",
      }
    );

    if (!passwordMatch) {
      throw new Error("Email e Senha não correspondem");
    }

    return token;
  }
}

export { AuthPartnerService };
