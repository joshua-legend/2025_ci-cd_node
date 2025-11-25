import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const MovieRepository = {
  findAll: async (name) => {
    return await prisma.movies.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  },
  findByID: async (id) => {
    return await prisma.movies.findUnique({
      where: {
        id: +id,
      },
    });
  },
  findByName: async (name) => {
    return await prisma.movies.findFirst({ where: { name: name } });
  },
  create: async (name, rating) => {
    return await prisma.movies.create({
      data: {
        name: name,
        rating: rating,
      },
    });
  },
  update: async (name, rating) => {
    return await prisma.movies.update({
      where: { id: +id },
      data: {
        name: name || target.name,
        rating: rating || target.rating,
      },
    });
  },
  delete: async (id) => {
    return await prisma.movies.delete({ where: { id: +id } });
  },
};
