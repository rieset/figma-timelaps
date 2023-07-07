import { Timelapse } from './timelapse';

export const common = async (cmd): Promise<any> => {

  const timelapse = new Timelapse();
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
