import fs from 'fs';
import path from 'path';
import configs from './config/excel';

const xl = require('excel4node');

interface Excel {
	wb: any;
	ws: any;
	styles: any;
	create: Function;
	destroy: Function;
	createWorksheet: Function;
	getStyles: Function;
	_loadStyles: Function;
	_loadReportStyles: Function;
	saveExcel: Function;
}

const excel: Excel = {
	wb: null,
	ws: null,
	styles: {},

	create: function () {
		this.wb = new xl.Workbook(configs.workbook);
		this._loadStyles();

		return this.wb;
	},

	destroy: function () {
		this.wb = null;
		this.ws = null;
		this.styles = {};
	},

	createWorksheet: function (name: string) {
		if (this.wb) return this.wb.addWorksheet(name, configs.worksheets);
	},

	getStyles: function () {
		return this.styles;
	},

	_loadStyles: function () {
		// Create a reusable style
		this.styles.header = this.wb.createStyle({
			...configs.styles,
			font: {
				color: '#000000',
				size: 10,
			},
		});

		this.styles.titles = this.wb.createStyle({
			...configs.styles,
			font: {
				color: '#333333',
				bold: true,
			},
		});

		this.styles.body = this.wb.createStyle({
			...configs.styles,
			font: {
				color: '#666666',
				size: 10,
			},
		});

		// Report Styles
		this.styles.report = this._loadReportStyles();
	},

	_loadReportStyles: function () {
		var styleHeaders = this.wb.createStyle({
			...configs.styles,
			font: {
				color: '#000000',
				size: 11,
			},
		});

		var styleTitles = this.wb.createStyle({
			...configs.styles,
			font: {
				color: '#000000',
				size: 10,
				bold: true,
			},
			alignment: {
				horizontal: 'right',
				vertical: 'center',
			},
		});

		var styleBody = this.wb.createStyle({
			...configs.styles,
			font: {
				color: '#444444',
				size: 10,
			},
			alignment: {
				horizontal: 'right',
				vertical: 'center',
			},
		});

		var styleBodyEven = this.wb.createStyle({
			...configs.styles,
			font: {
				color: '#444444',
				size: 10,
			},
			alignment: {
				horizontal: 'right',
				vertical: 'center',
			},
			fill: {
				type: 'pattern',
				patternType: 'solid',
				bgColor: '#EDEDED',
				fgColor: '#EDEDED',
			},
		});

		var styleTotal = this.wb.createStyle({
			...configs.styles,
			font: {
				color: '#444444',
				size: 10,
			},
			alignment: {
				horizontal: 'right',
				vertical: 'center',
			},
			fill: {
				type: 'pattern',
				patternType: 'solid',
				bgColor: '#BCBCBC',
				fgColor: '#BCBCBC',
			},
		});

		var styleEcoML = this.wb.createStyle({
			font: {
				color: '#444444',
				size: 9,
			},
			alignment: {
				horizontal: 'center',
				vertical: 'bottom',
			},
			fill: {
				type: 'pattern',
				patternType: 'solid',
				bgColor: '#C6E0B4',
				fgColor: '#C6E0B4',
			},
		});

		var styleEcoNumberML = this.wb.createStyle({
			font: {
				color: '#444444',
				size: 26,
			},
			alignment: {
				horizontal: 'center',
				vertical: 'top',
			},
			fill: {
				type: 'pattern',
				patternType: 'solid',
				bgColor: '#C6E0B4',
				fgColor: '#C6E0B4',
			},
		});

		var styleEcoMLN = this.wb.createStyle({
			font: {
				color: '#444444',
				size: 10,
			},
			alignment: {
				horizontal: 'center',
				vertical: 'bottom',
			},
			fill: {
				type: 'pattern',
				patternType: 'solid',
				bgColor: '#F8CBAD',
				fgColor: '#F8CBAD',
			},
		});

		var styleEcoNumberMLN = this.wb.createStyle({
			font: {
				color: '#444444',
				size: 24,
			},
			alignment: {
				horizontal: 'center',
				vertical: 'top',
			},
			fill: {
				type: 'pattern',
				patternType: 'solid',
				bgColor: '#F8CBAD',
				fgColor: '#F8CBAD',
			},
		});

		var styleNegativeNumber = this.wb.createStyle({
			font: {
				size: 10,
				color: '#FF0000',
			},
		});

		return {
			headers: styleHeaders,
			titles: styleTitles,
			body: styleBody,
			bodyEven: styleBodyEven,
			total: styleTotal,
			ecoML: styleEcoML,
			ecoNumberML: styleEcoNumberML,
			ecoMLN: styleEcoMLN,
			ecoNumberMLN: styleEcoNumberMLN,
			negative: styleNegativeNumber,
		};
	},

	saveExcel: async function (folder: string, name: string) {
		let file = name + '.xlsx';
		let filePath = path.resolve(folder, name + '.xlsx');

		if (!fs.existsSync(folder)) fs.mkdirSync(folder);

		await new Promise((resolve) =>
			this.wb.write(filePath, (err: any, stats: any) => !err && stats && resolve(stats)),
		);

		this.create(); // Renew workbook

		return { file, filePath };
	},
};

export default excel;
