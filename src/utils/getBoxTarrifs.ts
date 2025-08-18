import type { ResponseDataType, ReturnDatatype } from '../types.ts';
import { parseDate } from './parseDate.ts';
import 'dotenv/config';

export async function getBoxTarrifs(date: Date) : Promise<ReturnDatatype | undefined> {
  const parsedDate = parseDate(date)
  const href = 'https://common-api.wildberries.ru/api/v1/tariffs/box'
  const query = `?date=${parsedDate}`
  try {
    const res = await fetch(`${href}${query}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${process.env.API_KEY}`
      }
    })
    const json = await res.json()
    return (json as ResponseDataType).response.data
  }
  catch (error) {
    console.log(error)
  }
}