#!/usr/bin/env ts-node

import { Command } from "commander";
import fs from "fs";
import path from "path";

const program = new Command();

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createDirectories(domainDir: string, directories: string[]): void {
  directories.forEach((dir) => {
    const fullPath = path.join(domainDir, dir);
    fs.mkdirSync(fullPath, { recursive: true });
  });
}

function writeFileWithContent(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content.trim() + "\n");
}

function createGqlFile(gqlDir: string, domainName: string): void {
  const gqlFilePath = path.join(gqlDir, `${domainName}.gql`);
  const gqlContent = `
# --------------------- Types --------------------#

# --------------------- Inputs --------------------#

# --------------------- Responses --------------------#

# --------------------- Queries --------------------#

# --------------------- Mutations --------------------#
  `;
  writeFileWithContent(gqlFilePath, gqlContent);
}

function createResolverFile(gqlDir: string, domainName: string): void {
  const resolverFilePath = path.join(gqlDir, "resolver.ts");
  const resolverContent = `
import { I${capitalizeFirstLetter(domainName)}Service } from '../service/service';

export type ${capitalizeFirstLetter(domainName)}Context = {
  ${domainName}Service: I${capitalizeFirstLetter(domainName)}Service;
};

export const resolver = {
  Query: {},
  Mutation: {},
};
  `;
  writeFileWithContent(resolverFilePath, resolverContent);
}

function createRepositoryFile(repositoryDir: string, domainName: string): void {
  const repositoryFilePath = path.join(repositoryDir, "repository.ts");
  const repositoryContent = `
export interface I${capitalizeFirstLetter(domainName)}Repository {}

export class ${capitalizeFirstLetter(domainName)}Repository implements I${capitalizeFirstLetter(domainName)}Repository {}
  `;
  writeFileWithContent(repositoryFilePath, repositoryContent);
}

function createServiceFile(serviceDir: string, domainName: string): void {
  const serviceFilePath = path.join(serviceDir, "service.ts");
  const serviceContent = `
import { I${capitalizeFirstLetter(domainName)}Repository } from '../repository/repository';

export interface I${capitalizeFirstLetter(domainName)}Service {}

export class ${capitalizeFirstLetter(domainName)}Service implements I${capitalizeFirstLetter(domainName)}Service {
  constructor(private ${domainName}Repository: I${capitalizeFirstLetter(domainName)}Repository) {}
}
  `;
  writeFileWithContent(serviceFilePath, serviceContent);
}

function createIndexFile(domainDir: string, domainName: string): void {
  const indexFilePath = path.join(domainDir, "index.ts");
  const indexContent = `
import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'gql/${domainName}.gql');

export const ${domainName}TypeDefs = fs.readFileSync(filePath, 'utf-8');
  `;
  writeFileWithContent(indexFilePath, indexContent);
}

program
  .argument("<domainName>", "Name of the domain to generate")
  .action((domainName: string) => {
    const domainDir: string = path.join(process.cwd(), "src", domainName);

    createDirectories(domainDir, ["gql", "repository", "service"]);
    createGqlFile(path.join(domainDir, "gql"), domainName);
    createResolverFile(path.join(domainDir, "gql"), domainName);
    createRepositoryFile(path.join(domainDir, "repository"), domainName);
    createServiceFile(path.join(domainDir, "service"), domainName);
    createIndexFile(domainDir, domainName);

    console.log(
      "Please do not forget to add the type defs and resolvers into schema.ts",
    );
  });

program.parse(process.argv);
