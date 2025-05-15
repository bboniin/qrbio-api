import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface PartnerRequest {
  name: string;
  latitude: number;
  photo: string;
  url: string;
  userId: string;
  longitude: number;
  label: string;
  email: string;
  password: string;
  street: string;
  number: string;
  postal_code: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  description: string;
  whatsapp: string;
  instagram: string;
  map_visible: boolean;
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
    street,
    number,
    postal_code,
    complement,
    neighborhood,
    city,
    state,
    description,
    whatsapp,
    map_visible,
    instagram,
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

    if (map_visible) {
      if (
        !street ||
        !number ||
        !postal_code ||
        !street ||
        !complement ||
        !neighborhood ||
        !city ||
        !state ||
        !description
      ) {
        throw new Error(
          "Preencha todos os campos do endereço e descrição do parceiro"
        );
      }
    }

    const partnerCreated = await prismaClient.partner.create({
      data: {
        name: name,
        photo: photo,
        url: url,
        label: label,
        latitude: latitude,
        longitude: longitude,
        street: street,
        number: number,
        postal_code: postal_code,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state: state,
        description: description,
        whatsapp: whatsapp,
        instagram: instagram,
        map_visible: map_visible,
        email: email || null,
        password: email ? password : "",
      },
    });

    return partnerCreated;
  }
}

export { CreatePartnerService };
