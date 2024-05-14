import { PrismaClient } from "@prisma/client"
// const PrismaClient = require("@prisma/client").PrismaClient

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma : ReturnType<typeof prismaClientSingleton> = global.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production"){
    globalThis.prismaGlobal = prisma
}