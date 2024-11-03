export const formatCurrency = (amount: number | null) => {
    const value = amount || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  export function formatQuantity(quantity: number, noun: string): string {
    // pluralize the noun based on the quantity
    return quantity === 1 ? `${quantity} ${noun}` : `${quantity} ${noun}s`;
  }