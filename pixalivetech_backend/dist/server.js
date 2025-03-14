"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./router/index")); // Adjust the path if necessary
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URL)
    .then(() => {
    console.log("MongoDB Connected Successfully");
})
    .catch((error) => {
    console.error("MongoDB Connection Failed:", error);
});
// Use express.json() for parsing JSON requests
app.use(express_1.default.json());
// Use the router
app.use('/api', index_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Pixalive Technology Pvt Ltd.');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
