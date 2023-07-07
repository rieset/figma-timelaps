import { common } from './common';

const [ node, script, command ] = process.argv
common(command)
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
