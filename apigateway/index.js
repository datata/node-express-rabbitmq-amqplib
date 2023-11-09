import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/services", async(__req, res) => {
	const result = await fetch("http://mailing:3001/api/mailing");
	const resultJson = await result.json();

	return res.status(200).json({
		success: true,
		message: [
			{
				apigetway: true
			},
			{
				mailing: resultJson.success
			}
		],
	});
});

app.post("/api/auth/register", (req, res) => {
	try {
		// todo crear usuario

		// toDo enviar mail con microservicio mailing

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
	console.log(`Apigetway Service listening on port: ${PORT}`)
);
