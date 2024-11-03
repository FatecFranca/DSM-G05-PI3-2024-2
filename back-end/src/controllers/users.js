import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const controller = {};

controller.create = async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email e senha são obrigatórios." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).send({ message: "Usuário criado com sucesso." });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);

        if (error.code === 'P2002' && error.meta?.target.includes('email')) {
            return res.status(409).send({ message: "Email já está em uso." });
        }

        return res.status(500).send({ message: "Erro ao criar usuário." });
    }
};

controller.login = async function (req, res) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        const isValidPassword = user && (await bcrypt.compare(password, user.password));

        if (user && isValidPassword) {
            return res.status(200).send({ 
                success: true, 
                user, 
                message: 'Login bem-sucedido. Preencha os dados adicionais.' 
            });
        } else {
            return res.status(401).send({ message: 'Email ou senha incorretos.' });
        }
    } catch (error) {
        console.error("Erro no backend durante o login:", error);
        res.status(500).send({ message: 'Erro interno no servidor.' });
    }
};

controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.user.findMany({
            orderBy: [{ name: 'asc' }],
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

controller.retrieveOne = async function (req, res) {
    try {
        const result = await prisma.user.findUnique({
            where: { id: req.params.id },
        });
        if (result) res.send(result);
        else res.status(404).end();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

controller.update = async function (req, res) {
    try {
        const result = await prisma.user.update({
            where: { id: req.params.id },
            data: req.body,
        });
        if (result) res.status(204).end();
        else res.status(404).end();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

controller.delete = async function (req, res) {
    try {
        await prisma.user.delete({
            where: { id: req.params.id },
        });
        res.status(204).end();
    } catch (error) {
        if (error?.code === 'P2025') {
            res.status(404).end();
        } else {
            console.error(error);
            res.status(500).send(error);
        }
    }
};

export default controller;
