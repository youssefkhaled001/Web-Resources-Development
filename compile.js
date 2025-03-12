const { exec } = require("child_process");

const filename = process.argv[2];
if (!filename) {
  console.error("Error: No file name provided.");
  process.exit(1);
}
console.log(filename.split('/').slice(0, -1).join('/'));
const command = `tsc --outDir "Web Resources/${filename.split('/').slice(0, -1).join('/')}" "Development Factory/${filename}"`;
console.log(`Running: ${command}`);

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}Make Sure The Directory Is Correct.`);
    process.exit(1);
  }
  console.log(stdout);
});
