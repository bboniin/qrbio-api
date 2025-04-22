import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface PartnerRequest {
  name: string;
  latitude: string;
  photo: string;
  url: string;
  userId: string;
  longitude: string;
  label: string;
  email: string;
  password: string;
}

class CreatePartnerService {
  async execute({
    name,
    label,
    email,
    password,
    latitude,
    longitude,
    photo,
    url,
    userId,
  }: PartnerRequest) {
    if (photo) {
      const s3Storage = new S3Storage();
      await s3Storage.saveFile(photo);
    } else {
      photo = "";
    }

    if (email) {
      if (!password) {
        throw new Error("Email e Senha são obrigatórios");
      }
      const partnerEmail = await prismaClient.partner.findUnique({
        where: {
          email: email,
        },
      });

      if (partnerEmail) {
        throw new Error("Email já está sendo usado por outro Parceiro");
      }
    }

    if (password) {
      password = await hash(password, 8);
    }

    const partnerCreated = await prismaClient.partner.create({
      data: {
        name: name,
        photo: photo,
        url: url,
        label: label,
        latitude: latitude,
        longitude: longitude,
        email: email,
        password: email ? password : "",
      },
    });

    return partnerCreated;
  }
}

export { CreatePartnerService };
