import axios from 'axios';
import { formatAPIUri } from '.';

export class ItemsService {
  
  // This is how we would implement an external call to external API (Won't work because access-control-allow-origin is not a present header in the endpoint)
  static async get () {
    const items = await axios(formatAPIUri`items.json`);
    return items;
  }

  // Retrieve mockData simulating an API call
  static async getMockData () {
    const {data: items} = await axios('http://localhost:8080/src/api/mockData/mockItems.json');
    return items;
  }
}

