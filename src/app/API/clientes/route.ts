import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { nombres, apellidos, genero, fechaNacimiento, estado } = await req.json();

    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombres,
        apellidos,
        genero,
        fechaNacimiento: new Date(fechaNacimiento),
        estado,
      },
    });

    return NextResponse.json(nuevoCliente, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear cliente" }, { status: 500 });
  }
}
