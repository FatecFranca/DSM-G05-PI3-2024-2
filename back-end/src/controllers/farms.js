import prisma from '../database/client.js';

const controller = {};

controller.create = async (req, res) => {
    try {
        await prisma.farm.create({ data: req.body });
        res.status(200).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar fazenda.' });
    }
};

controller.retrieveAll = async (req, res) => {
    try {
        const farms = await prisma.farm.findMany({
            orderBy: { fantasy_name: 'asc' },
        });
        res.status(200).json(farms);
    } catch (error) {
        console.error('Erro ao buscar fazendas:', error);
        res.status(500).json({ error: 'Erro ao buscar fazendas.' });
    }
};

controller.retrieveOne = async (req, res) => {
    try {
        const farm = await prisma.farm.findUnique({
            where: { id: req.params.id },
        });

        if (!farm) {
            return res.status(404).json({ error: 'Fazenda não encontrada.' });
        }
        res.status(200).json(farm);
    } catch (error) {
        console.error('Erro ao buscar fazenda:', error);
        res.status(500).json({ error: 'Erro ao buscar fazenda.' });
    }
};

controller.update = async (req, res) => {
    try {
        const { id, registration_date, ...dataToUpdate } = req.body;

        if (registration_date) {
            dataToUpdate.registration_date = new Date(registration_date).toISOString();
        }

        const updatedFarm = await prisma.farm.update({
            where: { id: req.params.id },
            data: dataToUpdate,
        });

        res.status(200).json(updatedFarm);
    } catch (error) {
        console.error('Erro ao atualizar fazenda:', error);
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: 'Fazenda não encontrada para atualização.' });
        }
        res.status(500).json({ error: 'Erro ao atualizar fazenda.' });
    }
};

controller.delete = async (req, res) => {
    try {
        await prisma.farm.delete({
            where: { id: req.params.id },
        });
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar fazenda:', error);
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: 'Fazenda não encontrada para exclusão.' });
        }
        res.status(500).json({ error: 'Erro ao deletar fazenda.' });
    }
};

export default controller;
