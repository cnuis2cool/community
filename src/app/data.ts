export const sampleData = {

  //products: ['vegetables', 'fruits', 'milk'],

  categories: [
    {
      id: 0,
      name: 'Vegetables',
      image: './assets/img/category/vegetables.jpeg',
      description: 'Order for 100 get 5% off',
    },
    {
      id: 1,
      name: 'Fruits',
      image: './assets/img/category/fruits.jpeg',
      description: 'Order for 100 get 10% off',
    },
    {
      id: 2,
      name: 'Milk',
      image: './assets/img/category/milk.jpeg',
      description: 'Order for 50 get 5% off',
    },
  ],

  products: [
      // 0 - Veggies, 1 - Fruits, 2 - Milk
      {
        image: './assets/img/category/capsicum.jpeg',
        name: 'Capsicum',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
        category: 0,
      },
      {
        image: './assets/img/category/mirchi.jpeg',
        name: 'Mirchi',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
        category: 0,
      },
      {
        image: './assets/img/category/tomato.jpeg',
        name: 'Tomato',
        price: 10,
        quantity: [500, 1000],
        units: 'gm',
        category: 0,
      },
      {
        image: './assets/img/category/capsicum.jpeg',
        name: 'Capsicum',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
        category: 0,
      },
      {
        image: './assets/img/category/mirchi.jpeg',
        name: 'Mirchi',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
        category: 0,
      },
      {
        image: './assets/img/category/tomato.jpeg',
        name: 'Tomato',
        price: 10,
        quantity: [500, 1000],
        units: 'gm',
        category: 0,
      },

      {
        image: './assets/img/category/fruit-apple.jpeg',
        name: 'Apple',
        price: 10,
        quantity: [100, 250, 500],
        units: 'gm',
        category: 1,
      },
      {
        image: './assets/img/category/fruit-banana.jpeg',
        name: 'Banana',
        price: 30,
        quantity: [500, 1000],
        units: 'gm',
        category: 1,
      },
      {
        image: './assets/img/category/fruit-strawberry.jpeg',
        name: 'Strawberry',
        price: 20,
        quantity: [250, 500, 1000],
        units: 'gm',
        category: 1,
      },

      {
        image: './assets/img/category/milk-heritage.jpg',
        name: 'Heritage',
        price: 21,
        quantity: [500, 1000],
        units: 'ml',
        category: 2,
      },
      {
        image: './assets/img/category/milk-jersey.png',
        name: 'Jersey',
        price: 22,
        quantity: [500, 1000],
        units: 'ml',
        category: 2,
      }
    ],

    delivery_slots: [
      {
        type: 'weekday',
        slots: {
            start: '06:00',
            end: '18:30',
            duration: 1 //hr
          }
      },
      {
        type: 'weekend',
        slots: {
            start: '06:00',
            end: '19:30',
            duration: 1 //hr
          }
      },
      {
        type: 'holiday',
        slots: {
            start: '06:00',
            end: '17:30',
            duration: 2 //hr
          }
      }
    ],


  // AUthentication
  AUTHENTiCATE: '/user/api/Login/IsUserAuthenticated'
};
