import prisma from '../database/client.js'

const controller = {}

controller.create = async function (req, res) {
    try {
        const createdAt = req.body.created_at ? new Date(req.body.created_at).toISOString() : new Date().toISOString()

        const data = {
            subject: req.body.subject,
            category: req.body.category,
            description: req.body.description,
            created_at: createdAt
        }

        await prisma.info.create({ data })
        res.status(200).end()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.info.findMany({
            orderBy: [{ id: 'asc' }]
        })
        res.send(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function (req, res) {
    try {
        const result = await prisma.info.findUnique({
            where: { id: req.params.id }
        })

        if (result) res.send(result)
        else res.status(404).end()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.update = async function (req, res) {
    try {
        const formattedDate = req.body.created_at ? new Date(req.body.created_at).toISOString() : new Date().toISOString();

        const result = await prisma.info.update({
            where: { id: req.params.id },
            data: {
                subject: req.body.subject,
                category: req.body.category,
                description: req.body.description,
                created_at: formattedDate
            }
        })

        if (result) res.status(204).end()
        else res.status(404).end()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.delete = async function (req, res) {
    try {
        const result = await prisma.info.delete({
            where: { id: req.params.id }
        })
        res.status(204).end()
    } catch (error) {
        if (error?.code === 'P2025') {
            res.status(404).end()
        } else {
            console.error(error)
            res.status(500).send(error)
        }
    }
}

export default controller
