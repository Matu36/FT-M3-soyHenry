const commands = require('./commands/index.js');

const print= function (output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ')
} 

process.stdout.write ("prompt >");
process.stdin.on ("data", function (data) {
let args = data.toString().trim(). split(" ");
let cmd = args.shift();

if (commands[cmd]) {
  commands [cmd] (args, print);
} else {
  print ("command not found");
}
process.stdout.write('\nprompt > ');
})





/*const commands = require("./commands");

const done = (output) => {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
};

process.stdout.write("prompt > ");
process.stdin.on("data", function (data) {
  const args = data.toString().trim().split(" ");
  const cmd = args.shift();
  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](args, done);
  } else {
    process.stdout.write("command not found");
  }
  //   process.stdout.write("\nprompt > ");
});

// Output un prompt
// process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
 var cmd = data.toString().trim(); // remueve la nueva línea
if (cmd === "date") {
   process.stdout.write(Date());
  }
     if (cmd === "pwd") {
    process.stdout.write(process.mainModule.path);
  }
  process.stdout.write("\nprompt > ");
});

*/ 