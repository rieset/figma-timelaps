export const s3Provider = async (): Promise<any> => {

  const getProvider = async () => {
    switch(process.env.TIMELAPSE_S3_VENDOR) {
      case 'aws':
        return await require('./aws/s3-aws-provider').s3ProviderInit()
      case 'minio':
        return await require('./minio/s3-minio-provider').s3ProviderInit()
      default:
        throw new Error('Type S3 provider not defined. Declare S3_VENDOR in .env file');
    }
  }

  return await getProvider();
}
