import { GeneratorPaths } from '../generatorResolvers';
/**
 * Old Photon generator resolver. Since Photon has been renamed to Prisma
 * Client, this resolver will simply throw an error about that.
 * @param baseDir
 */
export declare function photonResolver(baseDir: string): Promise<GeneratorPaths>;
