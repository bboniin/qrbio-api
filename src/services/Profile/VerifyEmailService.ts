import { validateEmail } from "../../config/functions";
import prismaClient from "../../prisma";

interface ProfileRequest {
  email: string;
}

class VerifyEmailService {
  async execute({ email }: ProfileRequest) {
    if (!validateEmail(email)) {
      throw new Error("Email é inválido");
    }
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Email já está sendo usado");
    } else {
      return { message: "Email disponivel" };
    }
  }
}

export { VerifyEmailService };
