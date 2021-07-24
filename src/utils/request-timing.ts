import { SdkFunctionWrapper } from 'src/generated/graphql';

export const clientTimingWrapper: SdkFunctionWrapper = async <T>(
  action: () => Promise<T>,
): Promise<T> => {
  const startTime = +new Date();
  const result = await action();
  console.log('request duration (ms)', +new Date() - startTime);
  return result;
};
