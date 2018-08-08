export class CartService {

  static async checkout (items, successFunction, errorFunction) {
    try {
      setTimeout(() => {
        successFunction()
      }, 100) 
    } catch (error) {
      errorFunction()
    }
  }
}

