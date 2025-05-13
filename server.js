const express = require('express');
const cors = require('cors');

const { exec } = require('child_process');

const app = express();
// Run on port 3001 so React can run on 3000.
const port = 3001;

// Allow requests from React app.
app.use(cors({
    origin: 'http://localhost:3000'
}));

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
                const match = part.trim().match(/^([\d.]+)\s+([\w/]+)$/);
                if (match) memory[match[2]] = parseFloat(match[1]);
            });
        }

        // Parse processes.
        const processes = [];

        // Loop through lines to find the process information.
        for (let i = 0; i < lines.length; i++) {
            // Each process line starts with the PID, which is a number, but may
            // be preceded by whitespace. Match for that here.
            if (lines[i].match(/^\s+([\d.]+)/)) {
                // This line contains process information.
                const parts = lines[i].trim().split(/\s+/);
                const processInfo = {
                    pid: parseInt(parts[0], 10),
                    user: parts[1],
                    cpu: parseFloat(parts[8]),
                    mem: parseFloat(parts[9]),
                    time: parts[10],
                    command: parts.slice(11).join(' ')
                }

                processes.push(processInfo);
            }
        }

        // Render JSON response.
        res.json({ memory, processes });
    });
});

app.listen(port, () => {
    console.log(`topjs server running at http://localhost:${port}`);
});
