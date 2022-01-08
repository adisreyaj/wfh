const KEYBOARDS = [
  {
    name: 'K2 (Hot-Swappable) Version 2',
    price: 7840,
    description: '',
    images: [
      'https://keychron.in/wp-content/uploads/2021/04/Keychron-K2-hot-swappable-wireless-mechanical-keyboard-for-Mac-Windows-iOS-Gateron-switch-brown-with-type-C-RGB-white-backlight_1800x1800-300x300.jpg',
    ],
    category: 'Keyboard',
    brand: 'Keychron',
    colors: ['black', 'white'],
    type: 'Wireless',
    numberOfKeys: 84,
    illumination: 'RGB',
    keyCaps: 'PBT',
  },
  {
    name: 'Keychron K8 Wireless Mechanical Keyboard',
    price: 8999,
    description: '',
    images: [
      'https://keychron.in/wp-content/uploads/2021/04/Keychron-K2-hot-swappable-wireless-mechanical-keyboard-for-Mac-Windows-iOS-Gateron-switch-brown-with-type-C-RGB-white-backlight_1800x1800-300x300.jpg',
    ],
    category: 'Keyboard',
    brand: 'Keychron',
    colors: ['black', 'white'],
    type: 'Wireless',
    numberOfKeys: 84,
    illumination: 'LED',
    keyCaps: 'ABS',
  },
  {
    type: 'Wired',
    numberOfKeys: 84,
    illumination: 'RGB',
    keyCaps: 'PBT',
    name: 'Razer Huntsman Elite TE Wired Mechanical Keyboard',
    price: 8999,
    originalPrice: 9599,
    description:
      'Razer Hunstman Elite TE Edition is a wired mechanical keyboard. It comes with Razer Red switches for fast actuation. Per-key RGB lights can increase your gaming performance.',
    images: ['https://m.media-amazon.com/images/I/61BXjB6ufhL._SL1326_.jpg'],
    category: 'Keyboard',
    colors: ['black'],
    kind: 'ProductKeyboard',
    brand: 'Razer',
  },
  {
    type: 'Wired',
    numberOfKeys: 84,
    illumination: 'RGB',
    keyCaps: 'PBT',
    name: 'Razer Huntsman Wired Mechanical Keyboard',
    price: 12400,
    description:
      'Razer Huntsman is a full size wired keyboard. It comes with Razer brown switches and per-key RGB lighting.  Has a full number pad for your other needs.',
    images: [
      'https://www.techbooze.in/wp-content/uploads/2021/05/Razer-Huntsman-V2-Analog-Temp.jpg',
    ],
    category: 'Keyboard',
    colors: ['black'],
    kind: 'ProductKeyboard',
    brand: 'Razer',
    originalPrice: 14999,
  },
];

export const PRODUCTS = [{ items: KEYBOARDS, kind: 'ProductKeyboard' }];
