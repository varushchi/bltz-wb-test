import cron from 'node-cron'
import { insertData } from './utils/insertData.ts'
import { updateSheets } from './utils/sheets.ts'

const MAX_RETRIES_DB = 3
const MAX_RETRIES_SHEETS = 3
const sheetIds = [
  '1pFLQttagLoGHpp4FWezoV_QvGkjUYGVAzBXEhnoPrzw'
]

cron.schedule('0 * * * *', async () => {
  let retries = 0
  while (retries < MAX_RETRIES_DB) {
    try {
      console.log(`inserting data attempt ${retries + 1}`)
      await insertData()
      console.log('inserting data done')
      break
    } catch (error) {
      retries++
      console.error(`attempt ${retries} failed:`, error)
      if (retries === MAX_RETRIES_DB) {
        console.error('max retries')
      }
    }
  }

  retries = 0
  while (retries < MAX_RETRIES_SHEETS) {
    try {
      console.log(`inserting data sheets attempt ${retries + 1}`)
      await updateSheets(sheetIds)
      console.log('inserting data sheets done')
      break
    } catch (error) {
      retries++
      console.error(`sheets attempt ${retries} failed:`, error)
      if (retries === MAX_RETRIES_SHEETS) {
        console.error('max retries sheets')
      }
    }
  }
})
