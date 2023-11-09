import express from "express";

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/api/mailing", (__req, res) => {
	return res.status(200).json({
		success: true,
		message: "Mailing Service Healthy",
	});
});


app.listen(PORT, () => console.log(`Mailing Service listening on port: ${PORT}`));
