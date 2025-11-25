// Phone number formatting utilities for different countries
export const phoneFormats = {
  'US': {
    format: '(XXX) XXX-XXXX',
    placeholder: '(123) 456-7890',
    regex: /^\(\d{3}\) \d{3}-\d{4}$/,
    maxLength: 14
  },
  'IN': {
    format: '+91 XXXXX XXXXX',
    placeholder: '+91 98765 43210',
    regex: /^\+91 \d{5} \d{5}$/,
    maxLength: 14
  },
  'GB': {
    format: '+44 XXXX XXX XXX',
    placeholder: '+44 7123 456 789',
    regex: /^\+44 \d{4} \d{3} \d{3}$/,
    maxLength: 15
  },
  'CA': {
    format: '+1 (XXX) XXX-XXXX',
    placeholder: '+1 (123) 456-7890',
    regex: /^\+1 \(\d{3}\) \d{3}-\d{4}$/,
    maxLength: 17
  },
  'AU': {
    format: '+61 XXX XXX XXX',
    placeholder: '+61 412 345 678',
    regex: /^\+61 \d{3} \d{3} \d{3}$/,
    maxLength: 13
  },
  'DE': {
    format: '+49 XXX XXXXXXX',
    placeholder: '+49 170 1234567',
    regex: /^\+49 \d{3} \d{7}$/,
    maxLength: 13
  },
  'FR': {
    format: '+33 X XX XX XX XX',
    placeholder: '+33 6 12 34 56 78',
    regex: /^\+33 \d \d{2} \d{2} \d{2} \d{2}$/,
    maxLength: 16
  },
  'JP': {
    format: '+81 XX-XXXX-XXXX',
    placeholder: '+81 90-1234-5678',
    regex: /^\+81 \d{2}-\d{4}-\d{4}$/,
    maxLength: 14
  },
  'BR': {
    format: '+55 (XX) XXXXX-XXXX',
    placeholder: '+55 (11) 98765-4321',
    regex: /^\+55 \(\d{2}\) \d{5}-\d{4}$/,
    maxLength: 16
  },
  'MX': {
    format: '+52 XXX XXX XXXX',
    placeholder: '+52 55 1234 5678',
    regex: /^\+52 \d{2} \d{4} \d{4}$/,
    maxLength: 13
  },
  'QA': {
    format: '+974 XXXXXXXX',
    placeholder: '+974 33123456',
    regex: /^\+974 \d{8}$/,
    maxLength: 12
  },
  'AE': {
    format: '+971 XX XXX XXXX',
    placeholder: '+971 50 123 4567',
    regex: /^\+971 \d{2} \d{3} \d{4}$/,
    maxLength: 14
  },
  'SA': {
    format: '+966 XX XXX XXXX',
    placeholder: '+966 50 123 4567',
    regex: /^\+966 \d{2} \d{3} \d{4}$/,
    maxLength: 14
  },
  'EG': {
    format: '+20 XXX XXX XXXX',
    placeholder: '+20 100 123 4567',
    regex: /^\+20 \d{3} \d{3} \d{4}$/,
    maxLength: 14
  },
  'NG': {
    format: '+234 XXX XXX XXXX',
    placeholder: '+234 803 123 4567',
    regex: /^\+234 \d{3} \d{3} \d{4}$/,
    maxLength: 15
  },
  'ZA': {
    format: '+27 XX XXX XXXX',
    placeholder: '+27 71 123 4567',
    regex: /^\+27 \d{2} \d{3} \d{4}$/,
    maxLength: 13
  },
  'CN': {
    format: '+86 XXX XXXX XXXX',
    placeholder: '+86 139 1234 5678',
    regex: /^\+86 \d{3} \d{4} \d{4}$/,
    maxLength: 15
  },
  'KR': {
    format: '+82 XX-XXXX-XXXX',
    placeholder: '+82 10-1234-5678',
    regex: /^\+82 \d{2}-\d{4}-\d{4}$/,
    maxLength: 14
  },
  'TH': {
    format: '+66 X XXXX XXXX',
    placeholder: '+66 8 1234 5678',
    regex: /^\+66 \d \d{4} \d{4}$/,
    maxLength: 12
  },
  'TR': {
    format: '+90 XXX XXX XX XX',
    placeholder: '+90 532 123 45 67',
    regex: /^\+90 \d{3} \d{3} \d{2} \d{2}$/,
    maxLength: 15
  },
  'IT': {
    format: '+39 XXX XXX XXXX',
    placeholder: '+39 333 123 4567',
    regex: /^\+39 \d{3} \d{3} \d{4}$/,
    maxLength: 14
  },
  'ES': {
    format: '+34 XXX XX XX XX',
    placeholder: '+34 612 34 56 78',
    regex: /^\+34 \d{3} \d{2} \d{2} \d{2}$/,
    maxLength: 14
  },
  'NL': {
    format: '+31 X XXXX XXXX',
    placeholder: '+31 6 1234 5678',
    regex: /^\+31 \d \d{4} \d{4}$/,
    maxLength: 12
  },
  'SE': {
    format: '+46 XX-XXX XX XX',
    placeholder: '+46 70-123 45 67',
    regex: /^\+46 \d{2}-\d{3} \d{2} \d{2}$/,
    maxLength: 14
  },
  'NO': {
    format: '+47 XXX XX XXX',
    placeholder: '+47 412 34 567',
    regex: /^\+47 \d{3} \d{2} \d{3}$/,
    maxLength: 12
  },
  'DK': {
    format: '+45 XX XX XX XX',
    placeholder: '+45 12 34 56 78',
    regex: /^\+45 \d{2} \d{2} \d{2} \d{2}$/,
    maxLength: 13
  },
  'FI': {
    format: '+358 XX XXX XX XX',
    placeholder: '+358 40 123 45 67',
    regex: /^\+358 \d{2} \d{3} \d{2} \d{2}$/,
    maxLength: 15
  },
  'PL': {
    format: '+48 XXX XXX XXX',
    placeholder: '+48 512 345 678',
    regex: /^\+48 \d{3} \d{3} \d{3}$/,
    maxLength: 13
  },
  'PT': {
    format: '+351 XXX XXX XXX',
    placeholder: '+351 912 345 678',
    regex: /^\+351 \d{3} \d{3} \d{3}$/,
    maxLength: 14
  },
  'GR': {
    format: '+30 XXX XXX XXXX',
    placeholder: '+30 691 234 5678',
    regex: /^\+30 \d{3} \d{3} \d{4}$/,
    maxLength: 14
  },
  'CZ': {
    format: '+420 XXX XXX XXX',
    placeholder: '+420 602 123 456',
    regex: /^\+420 \d{3} \d{3} \d{3}$/,
    maxLength: 14
  },
  'HU': {
    format: '+36 XX XXX XXXX',
    placeholder: '+36 20 123 4567',
    regex: /^\+36 \d{2} \d{3} \d{4}$/,
    maxLength: 13
  },
  'RO': {
    format: '+40 XXX XXX XXX',
    placeholder: '+40 721 234 567',
    regex: /^\+40 \d{3} \d{3} \d{3}$/,
    maxLength: 13
  },
  'SK': {
    format: '+421 XXX XXX XXX',
    placeholder: '+421 905 123 456',
    regex: /^\+421 \d{3} \d{3} \d{3}$/,
    maxLength: 14
  },
  'AT': {
    format: '+43 XXX XXXXXXX',
    placeholder: '+43 664 1234567',
    regex: /^\+43 \d{3} \d{7}$/,
    maxLength: 13
  },
  'CH': {
    format: '+41 XX XXX XX XX',
    placeholder: '+41 79 123 45 67',
    regex: /^\+41 \d{2} \d{3} \d{2} \d{2}$/,
    maxLength: 14
  },
  'BE': {
    format: '+32 XXX XX XX XX',
    placeholder: '+32 471 23 45 67',
    regex: /^\+32 \d{3} \d{2} \d{2} \d{2}$/,
    maxLength: 14
  },
  'IE': {
    format: '+353 XX XXX XXXX',
    placeholder: '+353 85 123 4567',
    regex: /^\+353 \d{2} \d{3} \d{4}$/,
    maxLength: 14
  },
  'LU': {
    format: '+352 XXX XXX XXX',
    placeholder: '+352 621 123 456',
    regex: /^\+352 \d{3} \d{3} \d{3}$/,
    maxLength: 14
  },
  'MT': {
    format: '+356 XXXX XXXX',
    placeholder: '+356 9900 1234',
    regex: /^\+356 \d{4} \d{4}$/,
    maxLength: 12
  },
  'CY': {
    format: '+357 XX XXX XXX',
    placeholder: '+357 96 123 456',
    regex: /^\+357 \d{2} \d{3} \d{3}$/,
    maxLength: 13
  },
  'SI': {
    format: '+386 XX XXX XXX',
    placeholder: '+386 40 123 456',
    regex: /^\+386 \d{2} \d{3} \d{3}$/,
    maxLength: 13
  },
  'EE': {
    format: '+372 XXXX XXXX',
    placeholder: '+372 5123 4567',
    regex: /^\+372 \d{4} \d{4}$/,
    maxLength: 12
  },
  'LV': {
    format: '+371 XX XXX XXX',
    placeholder: '+371 26 123 456',
    regex: /^\+371 \d{2} \d{3} \d{3}$/,
    maxLength: 13
  },
  'LT': {
    format: '+370 XXX XXXXX',
    placeholder: '+370 612 34567',
    regex: /^\+370 \d{3} \d{5}$/,
    maxLength: 12
  },
  'HR': {
    format: '+385 XX XXX XXXX',
    placeholder: '+385 91 123 4567',
    regex: /^\+385 \d{2} \d{3} \d{4}$/,
    maxLength: 14
  },
  'BA': {
    format: '+387 XX XXX XXX',
    placeholder: '+387 61 123 456',
    regex: /^\+387 \d{2} \d{3} \d{3}$/,
    maxLength: 13
  },
  'ME': {
    format: '+382 XX XXX XXX',
    placeholder: '+382 67 123 456',
    regex: /^\+382 \d{2} \d{3} \d{3}$/,
    maxLength: 13
  },
  'MK': {
    format: '+389 XX XXX XXX',
    placeholder: '+389 70 123 456',
    regex: /^\+389 \d{2} \d{3} \d{3}$/,
    maxLength: 13
  },
  'AL': {
    format: '+355 XX XXX XXXX',
    placeholder: '+355 69 123 4567',
    regex: /^\+355 \d{2} \d{3} \d{4}$/,
    maxLength: 14
  },
  'RS': {
    format: '+381 XX XXX XXXX',
    placeholder: '+381 60 123 4567',
    regex: /^\+381 \d{2} \d{3} \d{4}$/,
    maxLength: 14
  },
  'BG': {
    format: '+359 XX XXX XXX',
    placeholder: '+359 87 123 456',
    regex: /^\+359 \d{2} \d{3} \d{3}$/,
    maxLength: 13
  },
  'MD': {
    format: '+373 XXXX XXXX',
    placeholder: '+373 6123 4567',
    regex: /^\+373 \d{4} \d{4}$/,
    maxLength: 12
  },
  'UA': {
    format: '+380 XX XXX XX XX',
    placeholder: '+380 50 123 45 67',
    regex: /^\+380 \d{2} \d{3} \d{2} \d{2}$/,
    maxLength: 15
  },
  'BY': {
    format: '+375 XX XXX XX XX',
    placeholder: '+375 29 123 45 67',
    regex: /^\+375 \d{2} \d{3} \d{2} \d{2}$/,
    maxLength: 15
  },
  'GE': {
    format: '+995 XXX XX XX XX',
    placeholder: '+995 555 12 34 56',
    regex: /^\+995 \d{3} \d{2} \d{2} \d{2}$/,
    maxLength: 15
  },
  'AM': {
    format: '+374 XX XXX XXX',
    placeholder: '+374 77 123 456',
    regex: /^\+374 \d{2} \d{3} \d{3}$/,
    maxLength: 13
  },
  'AZ': {
    format: '+994 XX XXX XX XX',
    placeholder: '+994 50 123 45 67',
    regex: /^\+994 \d{2} \d{3} \d{2} \d{2}$/,
    maxLength: 15
  },
  'KZ': {
    format: '+7 XXX XXX XX XX',
    placeholder: '+7 777 123 45 67',
    regex: /^\+7 \d{3} \d{3} \d{2} \d{2}$/,
    maxLength: 15
  },
  'UZ': {
    format: '+998 XX XXX XX XX',
    placeholder: '+998 90 123 45 67',
    regex: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
    maxLength: 15
  },
  'TM': {
    format: '+993 XX XXXXXX',
    placeholder: '+993 65 123456',
    regex: /^\+993 \d{2} \d{6}$/,
    maxLength: 12
  },
  'TJ': {
    format: '+992 XX XXX XXXX',
    placeholder: '+992 90 123 4567',
    regex: /^\+992 \d{2} \d{3} \d{4}$/,
    maxLength: 14
  },
  'KG': {
    format: '+996 XXX XX XX XX',
    placeholder: '+996 555 12 34 56',
    regex: /^\+996 \d{3} \d{2} \d{2} \d{2}$/,
    maxLength: 15
  },
  'MN': {
    format: '+976 XXXX XXXX',
    placeholder: '+976 9911 2233',
    regex: /^\+976 \d{4} \d{4}$/,
    maxLength: 12
  },
  'NP': {
    format: '+977 XX-XXXXXXX',
    placeholder: '+977 98-1234567',
    regex: /^\+977 \d{2}-\d{7}$/,
    maxLength: 13
  },
  'BD': {
    format: '+880 XXXX-XXXXXX',
    placeholder: '+880 1712-345678',
    regex: /^\+880 \d{4}-\d{6}$/,
    maxLength: 14
  },
  'LK': {
    format: '+94 XX XXX XXXX',
    placeholder: '+94 71 234 5678',
    regex: /^\+94 \d{2} \d{3} \d{4}$/,
    maxLength: 13
  },
  'MM': {
    format: '+95 X XXX XXXX',
    placeholder: '+95 9 123 4567',
    regex: /^\+95 \d \d{3} \d{4}$/,
    maxLength: 11
  },
  'KH': {
    format: '+855 XX XXX XXX',
    placeholder: '+855 12 345 678',
    regex: /^\+855 \d{2} \d{3} \d{3}$/,
    maxLength: 12
  },
  'LA': {
    format: '+856 XX XXX XXX',
    placeholder: '+856 20 123 456',
    regex: /^\+856 \d{2} \d{3} \d{3}$/,
    maxLength: 12
  },
  'VN': {
    format: '+84 XXX XXX XXXX',
    placeholder: '+84 912 345 678',
    regex: /^\+84 \d{3} \d{3} \d{4}$/,
    maxLength: 13
  },
  'MY': {
    format: '+60 X-XXXX XXXX',
    placeholder: '+60 12-345 6789',
    regex: /^\+60 \d-\d{4} \d{4}$/,
    maxLength: 13
  },
  'SG': {
    format: '+65 XXXX XXXX',
    placeholder: '+65 9123 4567',
    regex: /^\+65 \d{4} \d{4}$/,
    maxLength: 11
  },
  'ID': {
    format: '+62 XXX-XXXX-XXXX',
    placeholder: '+62 812-3456-7890',
    regex: /^\+62 \d{3}-\d{4}-\d{4}$/,
    maxLength: 15
  },
  'PH': {
    format: '+63 XXX XXX XXXX',
    placeholder: '+63 917 123 4567',
    regex: /^\+63 \d{3} \d{3} \d{4}$/,
    maxLength: 13
  },
  'NZ': {
    format: '+64 XX XXX XXXX',
    placeholder: '+64 21 123 4567',
    regex: /^\+64 \d{2} \d{3} \d{4}$/,
    maxLength: 13
  },
  'FJ': {
    format: '+679 XX XXXXX',
    placeholder: '+679 71 23456',
    regex: /^\+679 \d{2} \d{5}$/,
    maxLength: 11
  },
  'PG': {
    format: '+675 XXXX XXXX',
    placeholder: '+675 7012 3456',
    regex: /^\+675 \d{4} \d{4}$/,
    maxLength: 12
  },
  'SB': {
    format: '+677 XXXXX',
    placeholder: '+677 74234',
    regex: /^\+677 \d{5}$/,
    maxLength: 9
  },
  'VU': {
    format: '+678 XX XXXXX',
    placeholder: '+678 54 12345',
    regex: /^\+678 \d{2} \d{5}$/,
    maxLength: 11
  },
  'KI': {
    format: '+686 XX XXX',
    placeholder: '+686 62 123',
    regex: /^\+686 \d{2} \d{3}$/,
    maxLength: 9
  },
  'WS': {
    format: '+685 XX XXX',
    placeholder: '+685 72 123',
    regex: /^\+685 \d{2} \d{3}$/,
    maxLength: 9
  },
  'TO': {
    format: '+676 XXXXX',
    placeholder: '+676 71234',
    regex: /^\+676 \d{5}$/,
    maxLength: 9
  },
  'TV': {
    format: '+688 XX XXX',
    placeholder: '+688 90 123',
    regex: /^\+688 \d{2} \d{3}$/,
    maxLength: 9
  },
  'MH': {
    format: '+692 XXX-XXXX',
    placeholder: '+692 235-1234',
    regex: /^\+692 \d{3}-\d{4}$/,
    maxLength: 11
  },
  'FM': {
    format: '+691 XXX-XXXX',
    placeholder: '+691 350-1234',
    regex: /^\+691 \d{3}-\d{4}$/,
    maxLength: 11
  },
  'PW': {
    format: '+680 XXX XXXX',
    placeholder: '+680 775 1234',
    regex: /^\+680 \d{3} \d{4}$/,
    maxLength: 11
  },
  'CK': {
    format: '+682 XX XXX',
    placeholder: '+682 71 234',
    regex: /^\+682 \d{2} \d{3}$/,
    maxLength: 9
  },
  'NU': {
    format: '+683 XXXX',
    placeholder: '+683 1234',
    regex: /^\+683 \d{4}$/,
    maxLength: 8
  },
  'AS': {
    format: '+1 (684) XXX-XXXX',
    placeholder: '+1 (684) 733-1234',
    regex: /^\+1 \(684\) \d{3}-\d{4}$/,
    maxLength: 16
  },
  'GU': {
    format: '+1 (671) XXX-XXXX',
    placeholder: '+1 (671) 300-1234',
    regex: /^\+1 \(671\) \d{3}-\d{4}$/,
    maxLength: 16
  },
  'MP': {
    format: '+1 (670) XXX-XXXX',
    placeholder: '+1 (670) 234-5678',
    regex: /^\+1 \(670\) \d{3}-\d{4}$/,
    maxLength: 16
  },
  'PR': {
    format: '+1 (787) XXX-XXXX',
    placeholder: '+1 (787) 123-4567',
    regex: /^\+1 \(787\) \d{3}-\d{4}$/,
    maxLength: 16
  },
  'VI': {
    format: '+1 (340) XXX-XXXX',
    placeholder: '+1 (340) 776-1234',
    regex: /^\+1 \(340\) \d{3}-\d{4}$/,
    maxLength: 16
  },
  'default': {
    format: '+XXXXXXXXXXXXXXX',
    placeholder: '+123456789012345',
    regex: /^\+\d{1,15}$/,
    maxLength: 16
  }
};

// Function to get phone format for a country
export const getPhoneFormat = (countryCode) => {
  return phoneFormats[countryCode] || phoneFormats['default'];
};

// Function to format phone number as user types
export const formatPhoneNumber = (value, countryCode) => {
  const format = getPhoneFormat(countryCode);
  let cleanValue = value.replace(/\D/g, '');

  if (!cleanValue) return '';

  // Remove country code if present
  const countryCodeDigits = format.format.match(/^\+(\d+)/)?.[1] || '';
  if (cleanValue.startsWith(countryCodeDigits)) {
    cleanValue = cleanValue.slice(countryCodeDigits.length);
  }

  let formatted = '';
  let valueIndex = 0;

  for (let i = 0; i < format.format.length && valueIndex < cleanValue.length; i++) {
    const char = format.format[i];
    if (char === 'X') {
      formatted += cleanValue[valueIndex];
      valueIndex++;
    } else {
      formatted += char;
    }
  }

  return formatted;
};

// Function to validate phone number format
export const validatePhoneNumber = (phoneNumber, countryCode) => {
  const format = getPhoneFormat(countryCode);
  return format.regex.test(phoneNumber);
};