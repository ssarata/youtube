import { Generatable } from './helpers';
import { DMMF } from '@prisma/generator-helper';
import { DMMFDocument, DMMFMapping } from './transformDMMF';
type ModelGeneratorStructure = {
    models: MGModel[];
};
type MGModel = {
    documentation?: string;
    name: string;
    directives: MGModelDirective[];
    fields: MGModelField[];
    operations: MGModelOperation[];
};
type MGModelDirective = {
    name: string;
    values: any[];
};
type MGModelField = {
    name: string;
    type: string;
    bareTypeName: string;
    directives: string[];
    documentation?: string;
    required: boolean;
};
type MGModelOperationKeys = {
    name: string;
    types: DMMF.SchemaArgInputType[];
    required: boolean;
};
type MGModelOperationOutput = {
    type: string;
    required: boolean;
    list: boolean;
};
type MakeOptionallyUndefined<T> = {
    [k in keyof T]: T[k] | undefined;
};
type MGModelOperation = {
    name: string;
    description: string;
    opKeys: MGModelOperationKeys[] | undefined;
    usage: string;
    output: MakeOptionallyUndefined<MGModelOperationOutput>;
};
export default class ModelGenerator implements Generatable<ModelGeneratorStructure> {
    data: ModelGeneratorStructure;
    constructor(d: DMMFDocument);
    getModelDiretiveHTML(directive: MGModelDirective): string;
    getModelFieldTableRow(field: MGModelField, modelName: string): string;
    getModelOperationMarkup(operation: MGModelOperation, modelName: string): string;
    toHTML(): string;
    getModelDirective(model: DMMF.Model): MGModelDirective[];
    getModelFields(model: DMMF.Model): MGModelField[];
    getFieldType(field: DMMF.Field): string;
    getFieldDirectives(field: DMMF.Field): string[];
    getModelOperations(model: DMMF.Model, mappings: DMMFMapping | undefined, schema: DMMF.Schema): MGModelOperation[];
    getModels(dmmf: DMMFDocument): MGModel[];
    getData(d: DMMFDocument): {
        models: MGModel[];
    };
}
export {};
