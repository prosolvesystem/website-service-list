const { spawn } = require('child_process');

const surge = spawn('npx.cmd', ['-y', 'surge', '.', 'prosolve-menu-v1.surge.sh'], {
    cwd: 'c:\\Users\\rumelaroy2004\\OneDrive\\Documents\\prosolve systems\\Services Lists',
    shell: true
});

surge.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
    
    if (output.includes('email:')) {
        surge.stdin.write('prosolve.test.2026@gmail.com\n');
    }
    if (output.includes('password:')) {
        surge.stdin.write('Prosolve2026!\n');
    }
    if (output.includes('domain:')) {
        surge.stdin.write('\n');
    }
});

surge.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

surge.on('close', (code) => {
    console.log(`Surge process exited with code ${code}`);
});
