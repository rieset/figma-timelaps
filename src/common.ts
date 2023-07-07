import { Timelapse } from './timelapse';
import { TimelapseOptions } from './timelapse.model';

export const common = async (cmd, options: TimelapseOptions): Promise<any> => {

  const timelapse = new Timelapse(options);
  await timelapse.init();

  switch (cmd) {
    case 'snapshot':
      return await timelapse.snapshot();

    default:
      throw new Error('Command not defined');
  }

  // if (!connect) {
  //   console.log('Не удалось подключиться к базе данных');
  //   return false;
  // }
}
