import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const listado = await prisma.cliente.findMany({
      include: {
        informacion: true,
      },
      orderBy: [
        { fechaNacimiento: "asc" }, 
        { apellidos: "asc" },
      ],
    });

    return NextResponse.json(listado, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener el listado general" }, { status: 500 });
  }
}
