import { Generatable } from './helpers';
import { DMMF } from '@prisma/generator-helper';
import { DMMFDocument, DMMFMapping } from './transformDMMF';
type TOCStructure = {
    models: TOCModel[];
    types: TOCTypes;
};
type TOCModel = {
    name: string;
    fields: string[];
    operations: string[];
};
type TOCTypes = {
    inputTypes: string[];
    outputTypes: string[];
};
export default class TOCGenerator implements Generatable<TOCStructure> {
    data: TOCStructure;
    constructor(d: DMMFDocument);
    getTOCSubHeaderHTML(name: string): string;
    getSubFieldHTML(identifier: string, root: string, field: string): string;
    toHTML(): string;
    getModels(dmmfModel: DMMF.Model[], mappings: DMMFMapping[]): TOCModel[];
    getTypes(dmmfSchema: DMMF.Schema): TOCTypes;
    getData(d: DMMFDocument): {
        models: TOCModel[];
        types: TOCTypes;
    };
}
export {};
