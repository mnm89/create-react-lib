import path from "path";
import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import Listr from "listr";
import ncp from "ncp";
import { promisify } from "util";
import { projectInstall } from "pkg-install";

const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDirectory
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

/**
 *
 * @param {{install:boolean,git:boolean,template:'TypeScript'|'JavaScript',name:string}} params
 */
export async function createProject(params) {
  let options = {
    ...params,
    targetDirectory: path.join(process.cwd(), params.name)
  };
  const templateDir = path.resolve(
    new URL(import.meta.url).pathname,
    "../../templates",
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;
  console.log(options);
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: "Copy project files",
        task: () => copyTemplateFiles(options)
      },
      {
        title: "Initialize git",
        task: () => initGit(options),
        enabled: () => options.git
      },
      {
        title: "Install dependencies",
        task: () =>
          projectInstall({
            cwd: options.targetDirectory
          }),
        skip: () =>
          !options.install
            ? "Pass --install to automatically install dependencies"
            : undefined
      }
    ],
    {
      exitOnError: false
    }
  );
  await tasks.run();
  console.log("%s Project ready", chalk.green.bold("DONE"));
  return true;
}
