import { common } from './common';
const [ command ] = process.argv

common(command, {
  obsolescence: 100,
  frequency: 100,
  nodes: '0-1',
  file: ''
})
.then((result: string | null) => {
  if (result) {
    console.log(result);
  }
  process.exit(0);
})
.catch((error) => {
  console.error('Unexpected error', error);
  process.exit(1);
})
