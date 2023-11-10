import express from "express";
import { randomUUID } from "crypto";
import { connect, sendMessage } from "./rabbitmq/rabbitmq.js";

const app = express();

const PORT = process.env.PORT || 3000;

const { channel } = await connect();

app.get("/api/services", async (__req, res) => {
	// Ejemplo de comunicación entre servicios
	const result = await fetch("http://mailing:3001/api/mailing");
	const resultJson = await result.json();

	return res.status(200).json({
		success: true,
		message: [
			{
				apigetway: true,
			},
			{
				mailing: resultJson.success,
			},
		],
	});
});

app.post("/api/auth/register", async (req, res) => {
	try {
		// TODO crear usuario

		// TODO enviar mail con microservicio mailing
		const message = JSON.stringify({
			command: "datata.auth.command.sendWelcomeEmail",
			uuid: randomUUID(),
			username: "danilo",
			email: "danilo@danilo.com",
		});

		// toOo patron Event Subscriber
		await sendMessage(channel, "USER_QUEUE", message);

		return res.status(201).json({
			success: true,
			message: "User registered",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error registering users",
			error: error.message,
		});
	}
});

app.listen(PORT, () =>
	console.log(`Apigateway Service listening on port: ${PORT}`)
);
