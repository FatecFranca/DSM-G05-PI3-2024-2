import { raw } from '@prisma/client/runtime/library'
import prisma from '../database/client.js'

const controller = {}

controller.create = async function (req, res) {
    try {
        await prisma.animal.create({ data: req.body })
        res.status(200).end()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
    
}

controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.animal.findMany({
            orderBy: [{ name_animal: 'asc' }]
        })
        res.send(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function (req, res) {
    try {
            const result = await prisma.animal.findUnique({
            where: { id: req.body.id }
        })

        if(result) res.send(result)
        else res.send(404).end()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.update = async function (req, res) {
    try {
        const result = await prisma.animal.update({
            where: { id: req.params.id },
            data: req.body
        })

        if(result) res.status(204).end()
        res.status(404).end()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.delete = async function (req, res) {
    try {
        const result = await prisma.animal.delete ({
            where: { id: req.params.id }
        })
        raw.status(204).end()
    } catch (error) {
        if(error?.code === 'P2025') {
            res.status(404).end()
        }
        else {
            console.error(error)
            res.status(500).send(error)
        }
    }
}

export default controller