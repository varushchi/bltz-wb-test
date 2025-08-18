import cron from 'node-cron'
import { insertData } from './utils/insertData.js'

const MAX_RETRIES = 3;

cron.schedule('0 * * * *', async () => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      console.log(`inserting data attempt ${retries + 1}`)
      await insertData()
      console.log('inserting data done')
      break
    } catch (error) {
      retries++
      console.error(`attempt ${retries} failed:`, error)
      if (retries === MAX_RETRIES) {
        console.error('max retries')
      }
    }
  }
});