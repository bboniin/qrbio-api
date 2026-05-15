import { validateCpf } from "../../config/functions";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  cpf: string;
}

class CreateUserService {
  async execute({ name, email, phone_number, cpf, password }: UserRequest) {
    if (!email || !name || !phone_number || !password) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado");
    }

    if (cpf) {
      if (!validateCpf(cpf)) {
        throw new Error("CPF é inválido");
      }

      const cpfAlreadyExists = await prismaClient.user.findFirst({
        where: {
          cpf: cpf,
        },
      });

      if (cpfAlreadyExists) {
        throw new Error("CPF já cadastrado");
      }
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        cpf: cpf,
        password: passwordHash,
        phone_number: phone_number,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
