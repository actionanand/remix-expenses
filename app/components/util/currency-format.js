export const formatMyCurrency = (value, currency='INR', locale='en-IN') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);