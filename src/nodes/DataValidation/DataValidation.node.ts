import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from "n8n-workflow";
import Ajv, { Schema } from "ajv";

export class DataValidation implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Data Validation",
    name: "dataValidation",
    group: ["transform"],
    version: 1,
    description: "Validate incoming data before continuing the workflow",
    defaults: {
      name: "Data Validation",
      color: "#000000",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "JSON Schema",
        name: "jsonSchema",
        type: "json",
        default: `{
		type: "object",
		properties: {
			foo: {type: "integer"},
			bar: {type: "string"}
		},
		required: ["foo"],
		additionalProperties: false,
}`,
        placeholder: "",
        description:
          "Visit https://JSON-schema.org/ to learn how to describe your validation rules in JSON Schemas",
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = items[itemIndex]!;

      const jsonSchemaString = this.getNodeParameter("myString", itemIndex, "");

      if (typeof jsonSchemaString !== "string") {
        throw new NodeOperationError(
          this.getNode(),
          new Error("Invalid JSON Schema"),
          {
            itemIndex,
          }
        );
      }

      let jsonSchema: Schema;

      try {
        jsonSchema = JSON.parse(jsonSchemaString) as Schema;
      } catch (err) {
        throw new NodeOperationError(
          this.getNode(),
          new Error("Invalid JSON Schema"),
          {
            itemIndex,
          }
        );
      }

      const ajv = new Ajv();
      let validate: ReturnType<typeof ajv["compile"]>;

      try {
        validate = ajv.compile(jsonSchema);
      } catch (err) {
        throw new NodeOperationError(
          this.getNode(),
          new Error("Invalid JSON Schema"),
          {
            itemIndex,
          }
        );
      }

      const valid = validate(item["json"]);

      if (!valid) {
        throw new NodeOperationError(
          this.getNode(),
          JSON.stringify(validate.errors, undefined, 4),
          {
            itemIndex,
          }
        );
      }

      returnData.push({
        json: {},
        pairedItem: {
          item: itemIndex,
        },
      });
    }

    return [returnData];
  }
}
