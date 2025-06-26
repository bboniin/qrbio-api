import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface PartnerRequest {
  id: string;
  name: string;
  latitude: number;
  photo: string;
  userId: string;
  longitude: number;
  url: string;
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
  categories: Array<string>;
  keywords: string;
  map_visible: boolean;
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
    street,
    number,
    postal_code,
    complement,
    neighborhood,
    city,
    state,
    description,
    whatsapp,
    instagram,
    map_visible,
    categories,
    keywords,
    url,
  }: PartnerRequest) {
    const getPartner = await prismaClient.partner.findUnique({
      where: {
        id: id,
      },
      include: {
        categories: true,
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

    if (map_visible) {
      if (
        !street ||
        !number ||
        !postal_code ||
        !street ||
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

    let data = {
      name: name,
      latitude: latitude,
      label: label,
      longitude: longitude,
      url: url,
      email: email || null,
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
      keywords: keywords,
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

    const objetosNaoContidos = getPartner.categories.filter(
      (obj) => !categories.includes(obj.category_id)
    );

    const idsParaExcluir = objetosNaoContidos.map((obj) => obj.id);

    await prismaClient.partnerCategory.deleteMany({
      where: {
        id: {
          in: idsParaExcluir,
        },
      },
    });

    await Promise.all(
      categories.map(async (category) => {
        const categoryExist = getPartner.categories.find(
          (obj) => obj.category_id === category
        );
        if (!categoryExist) {
          await prismaClient.partnerCategory.create({
            data: {
              category_id: category,
              partner_id: id,
            },
          });
        }
      })
    );

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
