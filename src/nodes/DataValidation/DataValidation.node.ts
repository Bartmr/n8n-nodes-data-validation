import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
} from "n8n-workflow";
import Ajv, { Schema } from "ajv";

export class DataValidation implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Data Validation",
    name: "dataValidation",
    group: ["transform"],
    version: 1,
    description: "Validate input data before continuing the workflow",
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
        default: JSON.stringify(
          {
            type: "object",
            properties: {
              foo: { type: "integer" },
              bar: { type: "string" },
            },
            required: ["foo"],
            additionalProperties: false,
          },
          undefined,
          2
        ),
        placeholder: "",
        description:
          "Visit https://ajv.js.org/ or https://JSON-schema.org/ to learn how to describe your validation rules in JSON Schemas",
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const jsonSchemaString = this.getNodeParameter("jsonSchema", 0);

    if (typeof jsonSchemaString !== "string") {
      throw new NodeApiError(this.getNode(), {
        message: "Invalid JSON Schema",
      });
    }

    let jsonSchema: Schema;

    try {
      jsonSchema = JSON.parse(jsonSchemaString) as Schema;
    } catch (err) {
      throw new NodeApiError(this.getNode(), {
        message: "Invalid JSON Schema",
      });
    }

    const ajv = new Ajv();
    let validate: ReturnType<typeof ajv["compile"]>;

    try {
      validate = ajv.compile(jsonSchema);
    } catch (err) {
      throw new NodeApiError(this.getNode(), {
        message: "Invalid JSON Schema",
      });
    }

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = items[itemIndex]!;

      const json = item["json"];

      const valid = validate(json);

      if (!valid) {
        throw new NodeApiError(
          this.getNode(),
          {
            errors: JSON.stringify(validate.errors, undefined, 4),
          },
          {
            itemIndex,
            message: "Invalid data",
            description: JSON.stringify(validate.errors, undefined, 4),
            httpCode: "400",
          }
        );
      }

      returnData.push({
        json,
        pairedItem: {
          item: itemIndex,
        },
      });
    }

    return this.prepareOutputData(returnData);
  }
}
