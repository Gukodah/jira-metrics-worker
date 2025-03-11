import path from 'path';
import excel from './excel';

// Styles
import styles from './config/styles';

const worksheet: any = {
	excel: undefined,
	styles: undefined,
	height: [],
	line: 0,
	maxColumnWidths: [],

	init: function () {
		excel.create();
		this.excel = excel;
	},

	exportXLS: async function (filename: string, data: any) {
		let folder = path.resolve(__dirname, 'files');
		this.excel.create();

		// Loop para criar dados
		data.map((el: any) => {
			const item = el.json;
			let ws = this.excel.createWorksheet(item.sheet);
			const limitColumn = item.lines[0].data.length;

			ws.cell(1, 1, 1, limitColumn, true)
				.style(styles.general.title)
				.string(`Métricas da Sprint: "${item.sheet}"`);
			ws.row(1).setHeight(50);

			let line = 3;
			let column = 1;

			item.lines.map((lineData: any) => {
				if (!this.maxColumnWidths) {
					this.maxColumnWidths = [];
				}

				let style = lineData.type === 'label' ? styles.general.label : styles.general.default;
				lineData.data.map((infoData: string, idx: number) => {
					let textLength = infoData.length;

					if (this.maxColumnWidths[idx] === undefined) {
						this.maxColumnWidths[idx] = textLength;
					} else {
						this.maxColumnWidths[idx] = Math.max(this.maxColumnWidths[idx], textLength);
					}

					ws.cell(line, column, line, column, true).style(style).string(infoData);
					column++;
				});

				ws.row(line).setHeight(lineData.type === 'label' ? 50 : 25);

				line++;
				column = 1;
			});

			// Set Column Width
			this.maxColumnWidths.map((el: number, idx: number) => {
				let width = this.spaceCalculator(el);
				ws.column(idx + 1).setWidth(width);
			});

			// Create Metrics
			column = item.lines[0].data.length + 2;
			ws.cell(3, column, 3, column + 1, true)
				.style(styles.metrics.label)
				.string('Métricas');

			line = 4;
			item.metrics.map((metric: any) => {
				ws.cell(line, column, line + 1, column, true)
					.style(styles.metrics.default)
					.style({
						font: {
							bold: true,
							color: metric.color,
						},
						fill: {
							type: 'pattern',
							patternType: 'solid',
							bgColor: metric.fill,
							fgColor: metric.fill,
						},
					})
					.string(metric.name);

				ws.cell(line, column + 1, line + 1, column + 1, true)
					.style(styles.metrics.default)
					.style({ font: { color: metric.color } })
					.string(metric.value.toString());

				// Set Width and Height
				ws.column(column).setWidth(20);
				ws.column(column + 1).setWidth(20);
				ws.row(line).setHeight(25);
				ws.row(line + 1).setHeight(25);

				line = line + 2;
			});
		});

		let excelInfos = await this.excel.saveExcel(folder, filename);

		return excelInfos;
	},

	spaceCalculator: function (numCaracteres: number): number {
		if (numCaracteres <= 5) return 15; // Muito curto
		if (numCaracteres <= 12) return 20; // Pequeno
		if (numCaracteres <= 20) return 30; // Médio-pequeno
		if (numCaracteres <= 31) return 60; // Médio
		if (numCaracteres <= 50) return 80; // Grande
		if (numCaracteres <= 80) return 100; // Muito grande
		if (numCaracteres <= 120) return 130; // Enorme
		return 160;
	},
};

export default worksheet;
