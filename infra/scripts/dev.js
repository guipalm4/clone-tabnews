const { spawn } = require('child_process');

function execCommand(command, args = []) {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: true });
    child.on('error', (error) => reject(error));
    child.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`"${command} ${args.join(' ')}" finalizou com código ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function run() {
  try {
    await execCommand('npm', ['run', 'services:up']);
    await execCommand('npm', ['run', 'services:wait:database']);
    await execCommand('npm', ['run', 'migrations:up']);
  } catch (err) {
    console.error('Erro ao executar comandos iniciais:', err);
    process.exit(1);
  }

  const nextDev = spawn('next', ['dev'], { stdio: 'inherit', shell: true });

  const cleanup = async () => {
    if (cleanup.called) return;
    cleanup.called = true;

    console.log('\n ❗️Interrupção detectada! ✋🏼Parando os serviços...');
    try {
      if (!nextDev.killed) {
        nextDev.kill('SIGINT');
      }
      await execCommand('npm', ['run', 'services:stop']);
    } catch (err) {
      console.error('Erro ao parar os serviços:', err);
    } finally {
      process.exit();
    }
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  nextDev.on('exit', cleanup);
}

run();
