import { ChemicalServer } from "chemicaljs";
import express from "express";
import { execSync } from "node:child_process";
import fs from "node:fs";

if (!fs.existsSync("dist")) {
    console.log("No build found. Building...");
    execSync("pnpm run build");
    console.log("Built!");
}

const chemical = new ChemicalServer({
    scramjet: false,
});
const port = process.env.PORT || 3000;

chemical.app.use(
    express.static("dist", {
        index: "index.html",
        extensions: ["html"],
    }),
);

chemical.app.use((req, res) => {
    res.status(404);
    res.sendFile("dist/index.html", { root: "." });
});

chemical.server.listen(port, () => {
    console.log(`nano listening on port ${port}`);
});