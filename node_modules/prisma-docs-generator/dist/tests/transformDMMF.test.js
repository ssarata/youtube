"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformDMMF_1 = __importDefault(require("../generator/transformDMMF"));
//@ts-ignore
const internals_1 = require("@prisma/internals");
describe('transformDMMF', () => {
    it('show relation fields when includeRelationFields = true', async () => {
        const datamodelString = /* Prisma */ `
      model User {
        id String @default(cuid()) @id
        name String
        otherField Int
        posts Post[]
      }

      model Post {
        id String @id @default(cuid())
        title String?
        userId String
        user User @relation(fields:[userId], references:[id])
      }
    `;
        const dmmf = await (0, internals_1.getDMMF)({ datamodel: datamodelString });
        const transformedDmmf = (0, transformDMMF_1.default)(dmmf, {
            includeRelationFields: true,
        });
        expect(transformedDmmf).toMatchObject({
            datamodel: {
                models: [
                    {
                        name: 'User',
                        fields: [
                            { name: 'id' },
                            { name: 'name' },
                            { name: 'otherField' },
                            { name: 'posts' },
                        ],
                    },
                    {
                        name: 'Post',
                        fields: [
                            { name: 'id' },
                            { name: 'title' },
                            { name: 'userId' },
                            { name: 'user' },
                        ],
                    },
                ],
            },
        });
    });
    it('hide relation fields when includeRelationFields = false', async () => {
        const datamodelString = /* Prisma */ `
      model User {
        id String @default(cuid()) @id
        name String
        otherField Int
        posts Post[]
      }

      model Post {
        id String @id @default(cuid())
        title String?
        userId String
        user User @relation(fields:[userId], references:[id])
      }
    `;
        const dmmf = await (0, internals_1.getDMMF)({ datamodel: datamodelString });
        const transformedDmmf = (0, transformDMMF_1.default)(dmmf, {
            includeRelationFields: false,
        });
        expect(transformedDmmf).toMatchObject({
            datamodel: {
                models: [
                    {
                        name: 'User',
                        fields: [{ name: 'id' }, { name: 'name' }, { name: 'otherField' }],
                    },
                    {
                        name: 'Post',
                        fields: [{ name: 'id' }, { name: 'title' }, { name: 'userId' }],
                    },
                ],
            },
        });
    });
});
//# sourceMappingURL=transformDMMF.test.js.map