import { google } from 'googleapis';
import { insertDataSheets } from './insertDataSheets.ts';

export async function updateSheets(sheetIds: string[]) {
    const auth = new google.auth.GoogleAuth({
    keyFile: './btlz-wb-test-469415-f829d479cf7a.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const tariffs = await insertDataSheets()

  if (!tariffs) return

  const values = tariffs.map(tariff => [
      tariff.warehouse_name,
      tariff.geo_name,
      tariff.box_delivery_coef,
      tariff.box_storage_coef,
      tariff.date?.toISOString().split('T')[0] || null
    ])

  for (const sheetId of sheetIds) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'stocks_coefs!A2',
        valueInputOption: 'RAW',
        requestBody: {
          values,
        },
      })
    }
}
