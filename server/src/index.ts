import app from "./app";
import { deleteRecords, queryDb } from "./query";
import { ApiError, Provider } from "./utils/ApiError";

(() => {
	try {
		app.listen({ port: 8080 });
		console.log(`Server listening at http://localhost:8080`);
	} catch (err) {
		new ApiError(Provider.SERVER, "Server failed to start", 500, err);
		process.exit(1);
	}
})();

// deleteRecords()