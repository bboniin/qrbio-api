import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface PartnerRequest {
  id: string;
  name: string;
  latitude: string;
  photo: string;
  userId: string;
  longitude: string;
  url: string;
  label: string;
  email: string;
  password: string;
}

class EditPartnerService {
  async execute({
    name,
    password,
    email,
    label,
    id,
    latitude,
    longitude,
    photo,
    userId,
    url,
  }: PartnerRequest) {
    const getPartner = await prismaClient.partner.findUnique({
      where: {
        id: id,
      },
    });

    if (!getPartner) {
      throw new Error("Parceiro não encontrado");
    }

    if (email) {
      if (!password && !getPartner.email) {
        throw new Error("Email e Senha são obrigatórios");
      }
      const partnerEmail = await prismaClient.partner.findUnique({
        where: {
          email: email,
        },
      });

      if (email != getPartner.email && partnerEmail) {
        throw new Error("Email já está sendo usado por outro Parceiro");
      }
    }

    if (password) {
      password = await hash(password, 8);
    }

    let data = {
      name: name,
      latitude: latitude,
      label: label,
      longitude: longitude,
      url: url,
      email: email,
      password: email ? password || getPartner.password : "",
    };

    if (photo) {
      const s3Storage = new S3Storage();

      if (getPartner["photo"]) {
        await s3Storage.deleteFile(getPartner["photo"]);
      }

      await s3Storage.saveFile(photo);

      data["photo"] = photo;
    }

    const partnerEdited = await prismaClient.partner.update({
      where: {
        id: id,
      },
      data: data,
    });

    return partnerEdited;
  }
}

export { EditPartnerService };
