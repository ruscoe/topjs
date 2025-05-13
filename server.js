const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.get('/top', (req, res) => {
    // Run the 'top' command a single time and parse the output.
    exec('top -b -n 1', (error, stdout, stderr) => {
        // Handle errors.
        if (error) return res.status(500).json({ error: error.message });
        if (stderr) return res.status(500).json({ stderr });

        const lines = stdout.split('\n');

        // Parse memory line.
        const memLine = lines.find(l => l.toLowerCase().includes('mem :'));
        const memory = {};
        if (memLine) {
            memLine.split(',').forEach(part => {
                const match = part.trim().match(/^([\d.]+)\s+(\w+)/);
                if (match) memory[match[2]] = parseFloat(match[1]);
            });
        }

        // Render JSON response.
        res.json({ memory });
    });
});

app.listen(port, () => {
    console.log(`topjs server running at http://localhost:${port}/top`);
});
