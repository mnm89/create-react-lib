import program from "commander";
import inquirer from "inquirer";
import { createProject } from "./main";
import packageDotJson from "../package.json";

const defaultTemplate = "TypeScript";

program
  .version(packageDotJson.version, "-v", "--version")
  .description(packageDotJson.description)
  .option("-g, --git", "Initialize a git repository")
  .option("-s, --skip", "skip prompts")
  .option("-i, --install", "run npm install")
  .arguments("<name>");

function parseProgramOptions(args) {
  program.parse(args);
  const programOptions = program.opts();
  return {
    name: program.args[0] ? program.args[0] : null,
    skipPrompts: programOptions.skip ? true : false,
    git: programOptions.git ? true : false,
    install: programOptions.install ? true : false,
    template: null
  };
}

async function promptForMissingOptions(options) {
  if (options.skipPrompts && options.name) {
    return {
      name: options.name,
      git: options.git,
      install: options.install,
      template: options.template || defaultTemplate
    };
  }

  const questions = [];
  if (!options.name) {
    questions.push({
      type: "input",
      name: "name",
      message: "Give a project name",
      default: "",
      validate: value => {
        return value ? true : false;
      }
    });
  }

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["JavaScript", "TypeScript"],
      default: defaultTemplate
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false
    });
  }
  if (!options.install) {
    questions.push({
      type: "confirm",
      name: "install",
      message: "run npm install",
      default: false
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    name: options.name || answers.name,
    template: options.template || answers.template,
    git: options.git || answers.git,
    install: options.install || answers.install
  };
}

export async function cli(args) {
  let options = parseProgramOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
