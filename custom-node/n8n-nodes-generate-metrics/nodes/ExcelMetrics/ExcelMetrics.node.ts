import {
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	IExecuteFunctions,
	NodeConnectionType,
} from 'n8n-workflow';

import Worksheet from './utils/worksheets';

export class ExcelMetrics implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Excel Metrics',
		name: 'ExcelMetrics',
		icon: 'file:ExcelMetrics.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Export Metrics to Excel File by Json',
		defaults: {
			name: 'Generate Excel Metrics',
		},

		// ✅ Correção: Utilizando NodeConnectionType[]
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],

		properties: [
			{
				displayName: 'File Name',
				name: 'fileName',
				type: 'string',
				noDataExpression: false,
				default: 'Excel Data',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		let fileName = this.getNodeParameter('fileName', 0);

		// Test Excel
		Worksheet.init();
		let excelInfos = await Worksheet.exportXLS(fileName, items);

		returnData.push({
			json: excelInfos,
		});

		return [returnData];
	}
}
