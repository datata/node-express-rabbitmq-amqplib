import express from "express";
import rabbitmq from "./rabbitmq/rabbitmq.js";

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/api/mailing", (__req, res) => {
	return res.status(200).json({
		success: true,
		message: "Mailing Service Healthy",
	});
});

const { channel } = await rabbitmq.connect();
const queue = "USER_QUEUE";

async function startListening() {
	rabbitmq.consumeMessage(channel, queue, handleMessage);
}

function handleMessage(message) {
	const userData = JSON.parse(message);

	if (userData.command === "datata.auth.command.sendWelcomeEmail") {
		console.log("------------------");
		console.log(`Message received user data: ${JSON.stringify(userData)}`);
		console.log("------------------");
	}

	// Lógica para enviar mail segun el message
}

// Iniciar la escucha continua
startListening();

app.listen(PORT, () =>
	console.log(`Mailing Service listening on port: ${PORT}`)
);
