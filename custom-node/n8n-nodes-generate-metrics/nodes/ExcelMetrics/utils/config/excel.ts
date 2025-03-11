export default {
	workbook: {
			defaultFont: {
					size: 11,
					name: 'Calibri',
					color: '#FFFFFF',
				},
			// dateFormat: 'dd/mm/yyyy hh:mm:ss'
			dateFormat: 'dd/mm/yyyy',
			author: 'Educ System',
	},
	worksheets: {
			sheetFormat: {
					baseColWidth: 16,
					defaultColWidth: 16,
					defaultRowHeight: 15,
			},
			printOptions: {
					centerHorizontal: true,
					centerVertical: false
			},
			pageSetup: {
					orientation: 'portrait',
					// paperSize: 9,
			},
			margins: {
					bottom: 0.3,
					footer: 0,
					header: 0,
					left: 0.3,
					right: 0.3,
					top: 0.3,
			},
	},
	styles: {
			alignment: {
					indent: 1,
					horizontal: 'left',
					vertical: 'center'
			},
	}
}
