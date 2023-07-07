#!/usr/bin/env node
const yargs = require('yargs')
.usage(`
Usage: $0 <command> [options]
`)
.options({
  nodes: {
    alias: 'n',
    description: 'Discover nodes',
    type: 'string',
    default: '0-1'
  },
  obsolescence: {
    alias: 'o',
    description: 'Moral obsolescence',
    type: 'number',
    default: 43200
  },
  frequency: {
    alias: 'f',
    description: 'Frequency create snapshot',
    type: 'number',
    demandOption: true,
  },
  file: {
    description: 'Figma file uuid',
    type: 'string',
    demandOption: true,
  }
})
.describe({})
.boolean([])
.help()
.alias('h', 'help');

const argv = yargs.argv;

run(argv._[0]);

function run(value) {
  const module = require('./dist/common.js');

  module.common(value, {
    nodes: argv.nodes,
    obsolescence: argv.obsolescence,
    frequency: argv.frequency,
    file: argv.file,
  }).then((data) => {
    console.log(data);
    process.exit(0);
  })
}
